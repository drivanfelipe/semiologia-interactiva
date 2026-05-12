import OpenAI from "openai";
import { NextResponse } from "next/server";
import { isValidAccessCode } from "../../../lib/accessCodes";
import { getCaseById } from "../../../lib/cases";
import { buildPatientPrompt } from "../../../lib/prompts";
import {
  cleanText,
  detectNonConversationalPattern,
  hasTooManyQuestions
} from "../../../lib/validators";
import type { Message } from "../../../lib/validators";

export const runtime = "nodejs";

const SUSPENSION_MESSAGE = `La interacción ha sido suspendida porque se detectó un patrón no conversacional incompatible con el ejercicio académico de semiología interactiva.

Por favor informe esta situación al docente.`;

function normalizeForIntent(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function textIncludesAny(text: string, words: string[]): boolean {
  return words.some((word) => text.includes(word));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function formatValue(value: unknown): string {
  if (!value) return "";

  if (typeof value === "string") return value;

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(formatValue).filter(Boolean).join(", ");
  }

  if (isRecord(value)) {
    return Object.values(value)
      .map(formatValue)
      .filter(Boolean)
      .join(" ");
  }

  return "";
}

function getSection(
  physicalExam: Record<string, unknown>,
  key: string
): Record<string, unknown> | null {
  const value = physicalExam[key];
  return isRecord(value) ? value : null;
}

function getString(
  physicalExam: Record<string, unknown>,
  section: string,
  key?: string
): string {
  const sectionValue = physicalExam[section];

  if (!key) {
    return formatValue(sectionValue);
  }

  if (!isRecord(sectionValue)) {
    return "";
  }

  return formatValue(sectionValue[key]);
}

function getFirstString(...values: unknown[]): string {
  for (const value of values) {
    const formatted = formatValue(value);
    if (formatted) return formatted;
  }

  return "";
}

function hasFinding(sectionText: string, findingWords: string[]): boolean {
  const normalized = normalizeForIntent(sectionText);
  return findingWords.some((word) => normalized.includes(word));
}

function normal(section: string): string {
  return `${section}: normal, no se aprecian alteraciones.`;
}

function absentSign(sign: string): string {
  return `No, no se aprecia ${sign}.`;
}

function isSimpleGreeting(message: string): boolean {
  const normalized = normalizeForIntent(message);

  const greetings = [
    "hola",
    "buenos dias",
    "buen dia",
    "buenas tardes",
    "buenas noches",
    "hola doctor",
    "hola doctora",
    "buenos dias doctor",
    "buenos dias doctora",
    "buenas tardes doctor",
    "buenas tardes doctora",
    "buenas noches doctor",
    "buenas noches doctora",
    "como esta",
    "como esta usted",
    "hola como esta",
    "buenos dias como esta",
    "buenas tardes como esta",
    "buenas noches como esta"
  ];

  return normalized.length <= 60 && greetings.includes(normalized);
}

function getGreetingReply(message: string): string {
  const normalized = normalizeForIntent(message);

  if (normalized.includes("buenas tardes")) return "Buenas tardes, doctor.";
  if (normalized.includes("buenas noches")) return "Buenas noches, doctor.";
  if (normalized.includes("como esta")) return "Pues aquí, doctor.";

  return "Buenos días, doctor.";
}

function isChiefComplaintQuestion(message: string): boolean {
  const normalized = normalizeForIntent(message);

  const chiefComplaintQuestions = [
    "que le pasa",
    "que le ocurre",
    "que siente",
    "que tiene",
    "que le molesta",
    "que le duele",
    "que lo trae",
    "que la trae",
    "que lo trae hoy",
    "que la trae hoy",
    "cual es el motivo de consulta",
    "cual es su motivo de consulta",
    "cual es la razon de consulta",
    "en que le puedo ayudar",
    "cuenteme que le pasa",
    "cuenteme que siente",
    "cuenteme que le ocurre",
    "cuenteme por que consulta",
    "por que consulta",
    "por que vino",
    "por que viene",
    "a que viene",
    "cual es su problema",
    "cual es el problema"
  ];

  return normalized.length <= 120 && chiefComplaintQuestions.includes(normalized);
}

function getVitalSignsReply(
  normalized: string,
  physicalExam: Record<string, unknown>
): string {
  const vitalSigns = getSection(physicalExam, "vitalSigns");

  if (!vitalSigns) {
    return "Signos vitales: no disponibles en esta simulación.";
  }

  if (normalized.includes("presion") || normalized.includes("tension arterial")) {
    return `Presión arterial: ${formatValue(vitalSigns.bloodPressure) || "no disponible"}.`;
  }

  if (normalized.includes("frecuencia cardiaca") || normalized.includes("pulso")) {
    return `Frecuencia cardíaca: ${formatValue(vitalSigns.heartRate) || "no disponible"}.`;
  }

  if (normalized.includes("frecuencia respiratoria")) {
    return `Frecuencia respiratoria: ${formatValue(vitalSigns.respiratoryRate) || "no disponible"}.`;
  }

  if (normalized.includes("saturacion")) {
    return `Saturación de oxígeno: ${formatValue(vitalSigns.oxygenSaturation) || "no disponible"}.`;
  }

  if (normalized.includes("temperatura")) {
    return `Temperatura: ${formatValue(vitalSigns.temperature) || "no disponible"}.`;
  }

  return `Signos vitales: presión arterial ${formatValue(vitalSigns.bloodPressure) || "no disponible"}, frecuencia cardíaca ${formatValue(vitalSigns.heartRate) || "no disponible"}, frecuencia respiratoria ${formatValue(vitalSigns.respiratoryRate) || "no disponible"}, saturación ${formatValue(vitalSigns.oxygenSaturation) || "no disponible"} y temperatura ${formatValue(vitalSigns.temperature) || "no disponible"}.`;
}

function getSpecificCardioReply(
  normalized: string,
  physicalExam: Record<string, unknown>
): string | null {
  const cardiovascular = getSection(physicalExam, "cardiovascular");
  const headAndNeck = getSection(physicalExam, "headAndNeck");
  const neckText = formatValue(physicalExam.neck);

  if (textIncludesAny(normalized, ["ingurgitacion yugular", "yugular", "yugulares", "ingurgitacion"])) {
    const finding = getFirstString(headAndNeck?.jugularVenousDistension, neckText);

    if (hasFinding(finding, ["ingurgitacion", "yugular"])) {
      return `Sí. Cuello: ${finding}`;
    }

    return "No, no se aprecia ingurgitación yugular.";
  }

  if (textIncludesAny(normalized, ["reflujo hepatoyugular", "hepatoyugular"])) {
    const finding = formatValue(headAndNeck?.hepatojugularReflux);

    if (finding) {
      return `Reflujo hepatoyugular: ${finding}`;
    }

    return "Reflujo hepatoyugular: normal, no se aprecia alteración.";
  }

  if (textIncludesAny(normalized, ["s3", "tercer ruido", "galope"])) {
    const finding = getFirstString(cardiovascular?.heartSounds, formatValue(cardiovascular));

    if (hasFinding(finding, ["s3", "tercer ruido", "galope"])) {
      return `Sí. Cardiovascular: ${finding}`;
    }

    return "No, no se ausculta S3 ni galope.";
  }

  if (textIncludesAny(normalized, ["soplo", "soplos"])) {
    const finding = getFirstString(cardiovascular?.murmurs, formatValue(cardiovascular));

    if (hasFinding(finding, ["soplo"]) && !hasFinding(finding, ["sin soplo", "no se auscultan soplos"])) {
      return `Sí. Cardiovascular: ${finding}`;
    }

    return "No, no se auscultan soplos evidentes.";
  }

  if (textIncludesAny(normalized, ["ritmo", "arritmia", "irregular"])) {
    const finding = getFirstString(cardiovascular?.rhythm, formatValue(cardiovascular));

    if (finding) {
      return `Ritmo cardíaco: ${finding}`;
    }

    return normal("Ritmo cardíaco");
  }

  if (
    textIncludesAny(normalized, [
      "punto de maximo impulso",
      "pmi",
      "choque de punta",
      "impulso apical"
    ])
  ) {
    const finding = formatValue(cardiovascular?.palpation);

    if (finding) {
      return `Palpación precordial: ${finding}`;
    }

    return "Palpación precordial: normal, no se aprecian alteraciones.";
  }

  if (textIncludesAny(normalized, ["fremito", "thrill"])) {
    return "No, no se palpa frémito.";
  }

  if (textIncludesAny(normalized, ["pulsos", "pulsos perifericos"])) {
    const finding = getFirstString(
      cardiovascular?.peripheralPulses,
      getString(physicalExam, "extremities", "pulses")
    );

    return finding ? `Pulsos periféricos: ${finding}` : normal("Pulsos periféricos");
  }

  if (textIncludesAny(normalized, ["llenado capilar"])) {
    const finding = getFirstString(
      cardiovascular?.capillaryRefill,
      getString(physicalExam, "extremities", "capillaryRefill")
    );

    return finding ? `Llenado capilar: ${finding}` : normal("Llenado capilar");
  }

  return null;
}

function getSpecificRespiratoryReply(
  normalized: string,
  physicalExam: Record<string, unknown>
): string | null {
  const respiratory = getSection(physicalExam, "respiratory");
  const respiratoryText = formatValue(respiratory);

  if (textIncludesAny(normalized, ["crepitos", "estertores", "crepitantes"])) {
    const finding = getFirstString(respiratory?.addedSounds, respiratory?.auscultation, respiratoryText);

    if (hasFinding(finding, ["crepitos", "estertores", "crepitantes"])) {
      return `Sí. Respiratorio: ${finding}`;
    }

    return "No, no se auscultan crépitos ni estertores.";
  }

  if (textIncludesAny(normalized, ["sibilancias", "roncus"])) {
    const finding = getFirstString(respiratory?.addedSounds, respiratory?.auscultation, respiratoryText);

    if (hasFinding(finding, ["sibilancias", "roncus"])) {
      return `Sí. Respiratorio: ${finding}`;
    }

    return "No, no se auscultan sibilancias ni roncus.";
  }

  if (textIncludesAny(normalized, ["murmullo vesicular"])) {
    const finding = getFirstString(respiratory?.auscultation, respiratoryText);

    return finding ? `Auscultación pulmonar: ${finding}` : normal("Auscultación pulmonar");
  }

  return null;
}

function getSpecificAbdomenReply(
  normalized: string,
  physicalExam: Record<string, unknown>
): string | null {
  const abdomen = getSection(physicalExam, "abdomen");

  if (textIncludesAny(normalized, ["onda ascitica", "ascitis", "matidez cambiante"])) {
    const finding = getFirstString(abdomen?.ascites, abdomen?.percussion);

    if (hasFinding(finding, ["no se aprecia", "sin matidez", "no"])) {
      return "No, no se aprecia onda ascítica ni signos de ascitis.";
    }

    return finding ? `Ascitis: ${finding}` : "No, no se aprecia onda ascítica ni signos de ascitis.";
  }

  if (textIncludesAny(normalized, ["murphy"])) {
    return "No, no se aprecia signo de Murphy.";
  }

  if (textIncludesAny(normalized, ["blumberg", "rebote", "defensa abdominal", "irritacion peritoneal"])) {
    const finding = formatValue(abdomen?.peritonealSigns);

    if (finding) {
      return `Signos peritoneales: ${finding}`;
    }

    return "No, no se aprecian signos de irritación peritoneal.";
  }

  if (textIncludesAny(normalized, ["hepatomegalia", "higado"])) {
    const finding = getFirstString(abdomen?.hepatomegaly, abdomen?.visceromegaly);

    if (finding) {
      return `Hígado: ${finding}`;
    }

    return "No, no se palpa hepatomegalia.";
  }

  if (textIncludesAny(normalized, ["esplenomegalia", "bazo"])) {
    const finding = getFirstString(abdomen?.splenomegaly, abdomen?.visceromegaly);

    if (finding) {
      return `Bazo: ${finding}`;
    }

    return "No, no se palpa esplenomegalia.";
  }

  if (textIncludesAny(normalized, ["masa abdominal", "masas abdominales", "visceromegalia", "visceromegalias"])) {
    const finding = getFirstString(abdomen?.visceromegaly, abdomen?.palpation);

    if (hasFinding(finding, ["sin masas", "no se palpan", "no"])) {
      return "No, no se palpan masas ni visceromegalias.";
    }

    return finding ? `Abdomen: ${finding}` : "No, no se palpan masas ni visceromegalias.";
  }

  return null;
}

function getSpecificExtremitiesReply(
  normalized: string,
  physicalExam: Record<string, unknown>
): string | null {
  const extremities = getSection(physicalExam, "extremities");
  const extremitiesText = formatValue(extremities);

  if (textIncludesAny(normalized, ["edema", "fovea"])) {
    const finding = getFirstString(extremities?.edema, extremitiesText);

    if (hasFinding(finding, ["edema", "fovea"]) && !hasFinding(finding, ["sin edema", "no se aprecia edema"])) {
      return `Sí. Extremidades: ${finding}`;
    }

    return "No, no se aprecia edema ni fóvea.";
  }

  if (textIncludesAny(normalized, ["homans", "pantorrilla", "dolor pantorrilla"])) {
    const finding = formatValue(extremities?.calfPain);

    if (finding) {
      return `Pantorrilla: ${finding}`;
    }

    return "No hay dolor localizado en pantorrilla.";
  }

  if (textIncludesAny(normalized, ["asimetria", "asimetria de piernas"])) {
    const finding = formatValue(extremities?.asymmetry);

    if (finding) {
      return `Extremidades: ${finding}`;
    }

    return "No se aprecia asimetría relevante entre extremidades.";
  }

  return null;
}

function getSpecificNeurologicReply(
  normalized: string,
  physicalExam: Record<string, unknown>
): string | null {
  const neurologic = getSection(physicalExam, "neurologic");
  const mentalStatus = getSection(physicalExam, "mentalStatus");
  const headAndNeck = getSection(physicalExam, "headAndNeck");

  if (!neurologic && !mentalStatus && !headAndNeck) {
    return null;
  }

  if (textIncludesAny(normalized, ["glasgow", "estado de conciencia", "conciencia", "alerta"])) {
    const finding = getFirstString(
      mentalStatus?.consciousness,
      neurologic?.mentalStatus,
      getString(physicalExam, "general", "appearance")
    );

    return finding ? `Estado de conciencia: ${finding}` : normal("Estado de conciencia");
  }

  if (textIncludesAny(normalized, ["orientacion", "orientado", "persona lugar tiempo"])) {
    const finding = getFirstString(mentalStatus?.orientation, neurologic?.mentalStatus);

    return finding ? `Orientación: ${finding}` : normal("Orientación");
  }

  if (textIncludesAny(normalized, ["pupilas", "isocoricas", "reactivas"])) {
    const finding = getFirstString(headAndNeck?.pupils, neurologic?.cranialNerves);

    return finding ? `Pupilas: ${finding}` : normal("Pupilas");
  }

  if (textIncludesAny(normalized, ["campos visuales", "vision", "visual"])) {
    const finding = formatValue(headAndNeck?.visualFields);

    return finding ? `Campos visuales: ${finding}` : normal("Campos visuales");
  }

  if (
    textIncludesAny(normalized, [
      "pares craneales",
      "nervios craneales",
      "cara",
      "facial",
      "asimetria facial",
      "boca torcida",
      "desviacion de la boca",
      "comisura"
    ])
  ) {
    const finding = getFirstString(
      neurologic?.facial,
      headAndNeck?.facialSymmetry,
      neurologic?.cranialNerves
    );

    return finding ? `Pares craneales/cara: ${finding}` : normal("Pares craneales/cara");
  }

  if (textIncludesAny(normalized, ["lenguaje", "habla", "disartria", "afasia"])) {
    const finding = getFirstString(
      neurologic?.speech,
      mentalStatus?.speech,
      mentalStatus?.comprehension
    );

    return finding ? `Lenguaje/habla: ${finding}` : normal("Lenguaje/habla");
  }

  if (
    textIncludesAny(normalized, [
      "fuerza brazo derecho",
      "fuerza del brazo derecho",
      "miembro superior derecho",
      "msd"
    ])
  ) {
    const finding = getFirstString(neurologic?.motorRightArm, neurologic?.motor);

    return finding ? `Fuerza brazo derecho: ${finding}` : "Fuerza brazo derecho: 5/5, normal.";
  }

  if (
    textIncludesAny(normalized, [
      "fuerza brazo izquierdo",
      "fuerza del brazo izquierdo",
      "miembro superior izquierdo",
      "msi"
    ])
  ) {
    const finding = getFirstString(neurologic?.motorLeftArm, neurologic?.motor);

    return finding ? `Fuerza brazo izquierdo: ${finding}` : "Fuerza brazo izquierdo: 5/5, normal.";
  }

  if (
    textIncludesAny(normalized, [
      "fuerza pierna derecha",
      "fuerza de la pierna derecha",
      "miembro inferior derecho",
      "mid"
    ])
  ) {
    const finding = getFirstString(neurologic?.motorRightLeg, neurologic?.motor);

    return finding ? `Fuerza pierna derecha: ${finding}` : "Fuerza pierna derecha: 5/5, normal.";
  }

  if (
    textIncludesAny(normalized, [
      "fuerza pierna izquierda",
      "fuerza de la pierna izquierda",
      "miembro inferior izquierdo",
      "mii"
    ])
  ) {
    const finding = getFirstString(neurologic?.motorLeftLeg, neurologic?.motor);

    return finding ? `Fuerza pierna izquierda: ${finding}` : "Fuerza pierna izquierda: 5/5, normal.";
  }

  if (textIncludesAny(normalized, ["fuerza", "motor", "motricidad"])) {
    const finding = formatValue(neurologic?.motor);

    return finding ? `Fuerza/motor: ${finding}` : normal("Fuerza/motor");
  }

  if (textIncludesAny(normalized, ["tono", "espasticidad", "flacidez"])) {
    const finding = formatValue(neurologic?.tone);

    return finding ? `Tono muscular: ${finding}` : normal("Tono muscular");
  }

  if (textIncludesAny(normalized, ["reflejos", "osteotendinosos", "rotuliano", "aquiliano", "bicipital", "tricipital"])) {
    const finding = formatValue(neurologic?.reflexes);

    return finding ? `Reflejos: ${finding}` : normal("Reflejos");
  }

  if (textIncludesAny(normalized, ["babinski", "respuesta plantar", "plantar"])) {
    const finding = formatValue(neurologic?.plantarResponse);

    if (finding) {
      return `Respuesta plantar/Babinski: ${finding}`;
    }

    return "Respuesta plantar/Babinski: respuesta flexora bilateral, normal.";
  }

  if (textIncludesAny(normalized, ["sensibilidad", "hipoestesia", "parestesias"])) {
    const finding = formatValue(neurologic?.sensory);

    return finding ? `Sensibilidad: ${finding}` : normal("Sensibilidad");
  }

  if (textIncludesAny(normalized, ["coordinacion", "dedo nariz", "talon rodilla"])) {
    const finding = formatValue(neurologic?.coordination);

    return finding ? `Coordinación: ${finding}` : normal("Coordinación");
  }

  if (textIncludesAny(normalized, ["marcha", "caminar", "camina"])) {
    const finding = formatValue(neurologic?.gait);

    return finding ? `Marcha: ${finding}` : normal("Marcha");
  }

  if (textIncludesAny(normalized, ["pronador", "barré", "barre"])) {
    const finding = formatValue(neurologic?.pronatorDrift);

    return finding ? `Prueba de pronador: ${finding}` : "Prueba de pronador: normal, no se aprecia desviación.";
  }

  if (textIncludesAny(normalized, ["rigidez de nuca", "meningeos", "kernig", "brudzinski"])) {
    const finding = getFirstString(headAndNeck?.meningealSigns, neurologic?.meningealSigns);

    return finding ? `Signos meníngeos: ${finding}` : "Signos meníngeos: negativos.";
  }

  return null;
}

function getSpecificShoulderReply(
  normalized: string,
  physicalExam: Record<string, unknown>
): string | null {
  const shoulder = getSection(physicalExam, "shoulder");
  const cervical = getSection(physicalExam, "cervical");
  const neurovascularUpperLimb = getSection(physicalExam, "neurovascularUpperLimb");

  if (!shoulder && !cervical && !neurovascularUpperLimb) {
    return null;
  }

  if (textIncludesAny(normalized, ["jobe", "lata vacia", "empty can"])) {
    const finding = getFirstString(shoulder?.jobe, shoulder?.emptyCan);

    return finding ? `Prueba de Jobe/lata vacía: ${finding}` : "Prueba de Jobe/lata vacía: normal, no se aprecian alteraciones.";
  }

  if (textIncludesAny(normalized, ["neer"])) {
    const finding = formatValue(shoulder?.neer);

    return finding ? `Prueba de Neer: ${finding}` : "Prueba de Neer: normal, no se aprecian alteraciones.";
  }

  if (textIncludesAny(normalized, ["hawkins"])) {
    const finding = formatValue(shoulder?.hawkins);

    return finding ? `Prueba de Hawkins-Kennedy: ${finding}` : "Prueba de Hawkins-Kennedy: normal, no se aprecian alteraciones.";
  }

  if (textIncludesAny(normalized, ["drop arm", "caida del brazo", "brazo caido"])) {
    const finding = formatValue(shoulder?.dropArm);

    return finding ? `Prueba de caída del brazo: ${finding}` : "Prueba de caída del brazo: negativa.";
  }

  if (textIncludesAny(normalized, ["rotacion externa", "external rotation"])) {
    const finding = getFirstString(shoulder?.externalRotation, shoulder?.externalRotationLag);

    return finding ? `Rotación externa: ${finding}` : normal("Rotación externa");
  }

  if (textIncludesAny(normalized, ["rotacion interna"])) {
    const finding = getFirstString(shoulder?.internalRotation, shoulder?.liftOff, shoulder?.bellyPress);

    return finding ? `Rotación interna: ${finding}` : normal("Rotación interna");
  }

  if (textIncludesAny(normalized, ["belly press"])) {
    const finding = formatValue(shoulder?.bellyPress);

    return finding ? `Belly press: ${finding}` : "Belly press: negativa.";
  }

  if (textIncludesAny(normalized, ["lift off", "liftoff"])) {
    const finding = formatValue(shoulder?.liftOff);

    return finding ? `Lift-off: ${finding}` : "Lift-off: normal, no se aprecian alteraciones.";
  }

  if (textIncludesAny(normalized, ["speed"])) {
    const finding = formatValue(shoulder?.speed);

    return finding ? `Prueba de Speed: ${finding}` : "Prueba de Speed: negativa.";
  }

  if (textIncludesAny(normalized, ["yergason"])) {
    const finding = formatValue(shoulder?.yergason);

    return finding ? `Prueba de Yergason: ${finding}` : "Prueba de Yergason: negativa.";
  }

  if (textIncludesAny(normalized, ["aprehension", "apprehension"])) {
    const finding = formatValue(shoulder?.apprehension);

    return finding ? `Prueba de aprehensión: ${finding}` : "Prueba de aprehensión: negativa.";
  }

  if (textIncludesAny(normalized, ["aduccion cruzada", "cross body", "acromioclavicular"])) {
    const finding = getFirstString(shoulder?.crossBodyAdduction, shoulder?.acromioclavicularJoint);

    return finding ? `Articulación acromioclavicular: ${finding}` : normal("Articulación acromioclavicular");
  }

  if (textIncludesAny(normalized, ["corredera bicipital", "bicipital"])) {
    const finding = formatValue(shoulder?.bicipitalGroove);

    return finding ? `Corredera bicipital: ${finding}` : normal("Corredera bicipital");
  }

  if (textIncludesAny(normalized, ["arco doloroso", "arco"])) {
    const finding = formatValue(shoulder?.painfulArc);

    return finding ? `Arco doloroso: ${finding}` : "Arco doloroso: negativo.";
  }

  if (textIncludesAny(normalized, ["movilidad activa"])) {
    const finding = formatValue(shoulder?.activeRangeOfMotion);

    return finding ? `Movilidad activa: ${finding}` : normal("Movilidad activa");
  }

  if (textIncludesAny(normalized, ["movilidad pasiva"])) {
    const finding = formatValue(shoulder?.passiveRangeOfMotion);

    return finding ? `Movilidad pasiva: ${finding}` : normal("Movilidad pasiva");
  }

  if (textIncludesAny(normalized, ["movilidad", "abduccion", "elevacion"])) {
    const finding = getFirstString(shoulder?.activeRangeOfMotion, shoulder?.passiveRangeOfMotion);

    return finding ? `Movilidad del hombro: ${finding}` : normal("Movilidad del hombro");
  }

  if (textIncludesAny(normalized, ["palpo", "palpacion", "dolor a la palpacion"])) {
    const finding = formatValue(shoulder?.palpation);

    return finding ? `Palpación del hombro: ${finding}` : normal("Palpación del hombro");
  }

  if (textIncludesAny(normalized, ["fuerza hombro", "fuerza del hombro", "manguito"])) {
    const finding = formatValue(shoulder?.strength);

    return finding ? `Fuerza del hombro: ${finding}` : normal("Fuerza del hombro");
  }

  if (textIncludesAny(normalized, ["spurling", "radicular", "cervical", "cuello"])) {
    const finding = getFirstString(cervical?.spurling, cervical?.rangeOfMotion, cervical?.painReproduction);

    return finding ? `Columna cervical: ${finding}` : normal("Columna cervical");
  }

  if (textIncludesAny(normalized, ["neurovascular", "pulso radial", "sensibilidad distal", "mano", "dedos"])) {
    const finding = formatValue(neurovascularUpperLimb);

    return finding ? `Evaluación neurovascular distal: ${finding}` : normal("Evaluación neurovascular distal");
  }

  if (textIncludesAny(normalized, ["hombro"])) {
    const finding = getFirstString(
      shoulder?.inspection,
      shoulder?.palpation,
      shoulder?.activeRangeOfMotion
    );

    return finding ? `Hombro: ${finding}` : normal("Hombro");
  }

  return null;
}

function getPhysicalExamReply(
  message: string,
  physicalExam: Record<string, unknown>
): string | null {
  const normalized = normalizeForIntent(message);

  const examKeywords = [
    "examino",
    "evaluo",
    "exploro",
    "reviso",
    "ausculto",
    "palpo",
    "tomo",
    "realizo",
    "observo",
    "inspecciono",
    "mido",
    "percuto",
    "busco",
    "signo",
    "maniobra",
    "reflejos",
    "babinski",
    "jobe",
    "neer",
    "hawkins",
    "drop arm",
    "belly press",
    "speed",
    "yergason",
    "spurling"
  ];

  const isExamAction = textIncludesAny(normalized, examKeywords);

  if (!isExamAction) {
    return null;
  }

  const specificReply =
    getSpecificCardioReply(normalized, physicalExam) ||
    getSpecificRespiratoryReply(normalized, physicalExam) ||
    getSpecificAbdomenReply(normalized, physicalExam) ||
    getSpecificExtremitiesReply(normalized, physicalExam) ||
    getSpecificNeurologicReply(normalized, physicalExam) ||
    getSpecificShoulderReply(normalized, physicalExam);

  if (specificReply) {
    return specificReply;
  }

  if (
    textIncludesAny(normalized, [
      "signos vitales",
      "vitales",
      "presion",
      "tension arterial",
      "frecuencia cardiaca",
      "pulso",
      "frecuencia respiratoria",
      "saturacion",
      "temperatura"
    ])
  ) {
    return getVitalSignsReply(normalized, physicalExam);
  }

  if (textIncludesAny(normalized, ["estado general", "general", "aspecto"])) {
    const finding = getString(physicalExam, "general");
    return finding ? `Estado general: ${finding}` : normal("Estado general");
  }

  if (
    textIncludesAny(normalized, [
      "cabeza",
      "ojos",
      "pupilas",
      "boca",
      "orofaringe",
      "oidos",
      "cabeza y cuello"
    ])
  ) {
    const finding = getString(physicalExam, "headAndNeck");
    return finding ? `Cabeza y cuello: ${finding}` : normal("Cabeza y cuello");
  }

  if (textIncludesAny(normalized, ["cuello", "yugular", "yugulares"])) {
    const finding = getFirstString(getString(physicalExam, "neck"), getString(physicalExam, "headAndNeck"));
    return finding ? `Cuello: ${finding}` : normal("Cuello");
  }

  if (
    textIncludesAny(normalized, [
      "corazon",
      "cardiaco",
      "cardiovascular",
      "precordio",
      "ruidos cardiacos"
    ])
  ) {
    const finding = getString(physicalExam, "cardiovascular");
    return finding ? `Cardiovascular: ${finding}` : normal("Cardiovascular");
  }

  if (
    textIncludesAny(normalized, [
      "pulmon",
      "pulmones",
      "respiratorio",
      "campos pulmonares",
      "torax"
    ])
  ) {
    const finding = getString(physicalExam, "respiratory");
    return finding ? `Respiratorio: ${finding}` : normal("Respiratorio");
  }

  if (
    textIncludesAny(normalized, [
      "abdomen",
      "abdominal",
      "barriga",
      "epigastrio",
      "hipocondrio",
      "fosa iliaca",
      "peristaltismo",
      "ruidos intestinales"
    ])
  ) {
    const finding = getString(physicalExam, "abdomen");
    return finding ? `Abdomen: ${finding}` : normal("Abdomen");
  }

  if (
    textIncludesAny(normalized, [
      "extremidades",
      "piernas",
      "tobillos",
      "miembros inferiores",
      "miembros superiores"
    ])
  ) {
    const finding = getString(physicalExam, "extremities");
    return finding ? `Extremidades: ${finding}` : normal("Extremidades");
  }

  if (
    textIncludesAny(normalized, [
      "neurologico",
      "neurologica",
      "sistema nervioso",
      "fuerza",
      "sensibilidad",
      "pares craneales",
      "lenguaje",
      "habla",
      "marcha",
      "coordinacion",
      "tono",
      "reflejos"
    ])
  ) {
    const finding = getString(physicalExam, "neurologic");
    return finding ? `Neurológico: ${finding}` : normal("Neurológico");
  }

  if (
    textIncludesAny(normalized, [
      "hombro",
      "musculoesqueletico",
      "osteomuscular",
      "articular"
    ])
  ) {
    const finding = getFirstString(
      getString(physicalExam, "shoulder"),
      getString(physicalExam, "musculoskeletal")
    );

    return finding ? `Osteomuscular: ${finding}` : normal("Osteomuscular");
  }

  if (textIncludesAny(normalized, ["piel", "mucosas"])) {
    const finding = getString(physicalExam, "skin");
    return finding ? `Piel y mucosas: ${finding}` : normal("Piel y mucosas");
  }

  return "Exploración física: normal, no se aprecian alteraciones relevantes.";
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          ok: false,
          error: "Falta configurar OPENAI_API_KEY en el servidor."
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const code = cleanText(body?.student?.code);
    const studentMessage = cleanText(body?.message);
    const rawMessages = Array.isArray(body?.messages) ? body.messages : [];
    const selectedCase = getCaseById(body?.caseId);

    if (!isValidAccessCode(code)) {
      return NextResponse.json(
        { ok: false, error: "Código no válido." },
        { status: 401 }
      );
    }

    if (!studentMessage) {
      return NextResponse.json(
        { ok: false, error: "El mensaje está vacío." },
        { status: 400 }
      );
    }

    const messages: Message[] = rawMessages
      .filter(
        (m: Message) =>
          m &&
          (m.role === "student" || m.role === "patient") &&
          typeof m.content === "string"
      )
      .map((m: Message) => ({
        role: m.role,
        content: cleanText(m.content)
      }))
      .filter((m: Message) => m.content.length > 0);

    if (isSimpleGreeting(studentMessage)) {
      return NextResponse.json({
        ok: true,
        reply: getGreetingReply(studentMessage)
      });
    }

    if (isChiefComplaintQuestion(studentMessage)) {
      return NextResponse.json({
        ok: true,
        reply: selectedCase.mainComplaint
      });
    }

    if (detectNonConversationalPattern(studentMessage)) {
      return NextResponse.json({
        ok: true,
        suspended: true,
        reply: SUSPENSION_MESSAGE
      });
    }

    if (hasTooManyQuestions(studentMessage)) {
      return NextResponse.json({
        ok: true,
        reply:
          "Ay doctor, fueron muchas preguntas al tiempo y me confundí. ¿Me las puede hacer más despacio, de a poquitas?"
      });
    }

    const physicalExamReply = getPhysicalExamReply(
      studentMessage,
      selectedCase.physicalExam
    );

    if (physicalExamReply) {
      return NextResponse.json({
        ok: true,
        reply: physicalExamReply
      });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const prompt = buildPatientPrompt(
      [
        ...messages,
        {
          role: "student",
          content: studentMessage
        }
      ],
      selectedCase
    );

    const model = process.env.OPENAI_MODEL_CHAT || "gpt-5-mini";

    const response = await client.responses.create({
      model,
      input: prompt,
      max_output_tokens: 180
    });

    const reply =
      response.output_text?.trim() ||
      "No entendí bien doctor, ¿me puede repetir?";

    return NextResponse.json({
      ok: true,
      reply
    });
  } catch (error: any) {
    console.error("ERROR OPENAI CHAT:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error?.message || "No se pudo generar la respuesta.",
        code: error?.code || null,
        status: error?.status || null
      },
      { status: 500 }
    );
  }
}