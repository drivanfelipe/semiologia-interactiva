import OpenAI from "openai";
import { NextResponse } from "next/server";
import { isValidAccessCode } from "../../../lib/accessCodes";
import { getCaseById } from "../../../lib/cases";
import { buildPatientPrompt } from "../../../lib/prompts";
import {
  cleanText,
  detectNonConversationalPattern,
  getMaxStudentMessages,
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

  if (normalized.includes("buenas tardes")) {
    return "Buenas tardes, doctor.";
  }

  if (normalized.includes("buenas noches")) {
    return "Buenas noches, doctor.";
  }

  if (normalized.includes("como esta")) {
    return "Pues aquí, doctor.";
  }

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

function formatValue(value: unknown): string {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(formatValue).filter(Boolean).join(", ");
  }

  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, item]) => {
        const formatted = formatValue(item);
        return formatted ? `${key}: ${formatted}` : "";
      })
      .filter(Boolean)
      .join(". ");
  }

  return "";
}

function getVitalSignsReply(
  normalized: string,
  physicalExam: Record<string, unknown>
): string | null {
  const vitalSigns = physicalExam.vitalSigns as Record<string, unknown> | undefined;

  if (!vitalSigns) {
    return "Signos vitales: no disponibles en esta simulación.";
  }

  if (normalized.includes("presion") || normalized.includes("tension arterial")) {
    return `Presión arterial: ${vitalSigns.bloodPressure || "no disponible"}.`;
  }

  if (normalized.includes("frecuencia cardiaca") || normalized.includes("pulso")) {
    return `Frecuencia cardíaca: ${vitalSigns.heartRate || "no disponible"}.`;
  }

  if (normalized.includes("frecuencia respiratoria")) {
    return `Frecuencia respiratoria: ${vitalSigns.respiratoryRate || "no disponible"}.`;
  }

  if (normalized.includes("saturacion")) {
    return `Saturación de oxígeno: ${vitalSigns.oxygenSaturation || "no disponible"}.`;
  }

  if (normalized.includes("temperatura")) {
    return `Temperatura: ${vitalSigns.temperature || "no disponible"}.`;
  }

  return `Signos vitales: presión arterial ${vitalSigns.bloodPressure || "no disponible"}, frecuencia cardíaca ${vitalSigns.heartRate || "no disponible"}, frecuencia respiratoria ${vitalSigns.respiratoryRate || "no disponible"}, saturación ${vitalSigns.oxygenSaturation || "no disponible"} y temperatura ${vitalSigns.temperature || "no disponible"}.`;
}

function textIncludesAny(text: string, words: string[]): boolean {
  return words.some((word) => text.includes(word));
}

function hasFinding(sectionText: string, findingWords: string[]): boolean {
  const normalized = normalizeForIntent(sectionText);
  return findingWords.some((word) => normalized.includes(word));
}

function getSpecificSignReply(
  normalized: string,
  physicalExam: Record<string, unknown>
): string | null {
  const respiratory = formatValue(physicalExam.respiratory);
  const cardiovascular = formatValue(physicalExam.cardiovascular);
  const neck = formatValue(physicalExam.neck);
  const extremities = formatValue(physicalExam.extremities);
  const neurologic = physicalExam.neurologic as Record<string, unknown> | undefined;
  const shoulder = physicalExam.shoulder as Record<string, unknown> | undefined;

  if (textIncludesAny(normalized, ["onda ascitica", "ascitis"])) {
    return "No, no se aprecia onda ascítica ni signos de ascitis.";
  }

  if (textIncludesAny(normalized, ["murphy", "blumberg", "rebote", "defensa abdominal", "irritacion peritoneal"])) {
    return "No, ese signo no se aprecia en esta exploración.";
  }

  if (textIncludesAny(normalized, ["masa abdominal", "masas abdominales", "visceromegalia", "hepatomegalia", "esplenomegalia"])) {
    return "No, no se palpan masas ni visceromegalias.";
  }

  if (textIncludesAny(normalized, ["crepitos", "estertores"])) {
    if (hasFinding(respiratory, ["crepitos", "estertores"])) {
      return `Sí. Respiratorio: ${respiratory}`;
    }

    return "No, no se auscultan crépitos ni estertores.";
  }

  if (textIncludesAny(normalized, ["sibilancias", "roncus"])) {
    if (hasFinding(respiratory, ["sibilancias", "roncus"])) {
      return `Sí. Respiratorio: ${respiratory}`;
    }

    return "No, no se auscultan sibilancias ni roncus.";
  }

  if (textIncludesAny(normalized, ["ingurgitacion yugular", "yugular", "yugulares"])) {
    if (hasFinding(neck, ["ingurgitacion", "yugular"])) {
      return `Sí. Cuello: ${neck}`;
    }

    return "No, no se aprecia ingurgitación yugular.";
  }

  if (textIncludesAny(normalized, ["s3", "tercer ruido", "galope"])) {
    if (hasFinding(cardiovascular, ["s3", "tercer ruido", "galope"])) {
      return `Sí. Cardiovascular: ${cardiovascular}`;
    }

    return "No, no se ausculta S3 ni galope.";
  }

  if (textIncludesAny(normalized, ["soplo", "soplos"])) {
    if (hasFinding(cardiovascular, ["soplo", "soplos"])) {
      return `Sí. Cardiovascular: ${cardiovascular}`;
    }

    return "No, no se auscultan soplos evidentes.";
  }

  if (textIncludesAny(normalized, ["edema", "fovea"])) {
    if (hasFinding(extremities, ["edema", "fovea"])) {
      return `Sí. Extremidades: ${extremities}`;
    }

    return "No, no se aprecia edema ni fóvea.";
  }

  if (textIncludesAny(normalized, ["asimetria facial", "desviacion de la boca", "boca torcida", "facial"])) {
    const cranialNerves = formatValue(neurologic?.cranialNerves);

    if (cranialNerves) {
      return `Sí. Pares craneales/cara: ${cranialNerves}`;
    }

    return "No, no se aprecia asimetría facial.";
  }

  if (textIncludesAny(normalized, ["disartria", "habla rara", "lenguaje alterado", "alteracion del habla"])) {
    const speech = formatValue(neurologic?.speech);

    if (speech) {
      return `Sí. Lenguaje/habla: ${speech}`;
    }

    return "No, no se aprecia alteración del habla en esta exploración.";
  }

  if (textIncludesAny(normalized, ["jobe"])) {
    const jobe = formatValue(shoulder?.jobe);

    if (jobe) {
      return `Prueba de Jobe: ${jobe}`;
    }

    return "Prueba de Jobe: normal, no se aprecian alteraciones.";
  }

  if (textIncludesAny(normalized, ["neer"])) {
    const neer = formatValue(shoulder?.neer);

    if (neer) {
      return `Prueba de Neer: ${neer}`;
    }

    return "Prueba de Neer: normal, no se aprecian alteraciones.";
  }

  if (textIncludesAny(normalized, ["hawkins"])) {
    const hawkins = formatValue(shoulder?.hawkins);

    if (hawkins) {
      return `Prueba de Hawkins-Kennedy: ${hawkins}`;
    }

    return "Prueba de Hawkins-Kennedy: normal, no se aprecian alteraciones.";
  }

  return null;
}

function getPhysicalExamReply(
  message: string,
  physicalExam: Record<string, unknown>
): string | null {
  const normalized = normalizeForIntent(message);

  const asksSpecificSign = textIncludesAny(normalized, [
    "onda ascitica",
    "ascitis",
    "murphy",
    "blumberg",
    "rebote",
    "defensa abdominal",
    "irritacion peritoneal",
    "masa abdominal",
    "masas abdominales",
    "visceromegalia",
    "hepatomegalia",
    "esplenomegalia",
    "crepitos",
    "estertores",
    "sibilancias",
    "roncus",
    "ingurgitacion yugular",
    "yugular",
    "yugulares",
    "s3",
    "tercer ruido",
    "galope",
    "soplo",
    "soplos",
    "edema",
    "fovea",
    "asimetria facial",
    "desviacion de la boca",
    "boca torcida",
    "disartria",
    "habla rara",
    "lenguaje alterado",
    "alteracion del habla",
    "jobe",
    "neer",
    "hawkins"
  ]);

  const isExamAction =
    normalized.includes("examino") ||
    normalized.includes("evaluo") ||
    normalized.includes("exploro") ||
    normalized.includes("reviso") ||
    normalized.includes("ausculto") ||
    normalized.includes("palpo") ||
    normalized.includes("tomo") ||
    normalized.includes("realizo") ||
    normalized.includes("observo") ||
    normalized.includes("inspecciono") ||
    normalized.includes("mido") ||
    normalized.includes("percuto") ||
    normalized.includes("busco") ||
    normalized.includes("signo") ||
    normalized.includes("maniobra");

  if (!isExamAction && !asksSpecificSign) {
    return null;
  }

  const specificSignReply = getSpecificSignReply(normalized, physicalExam);

  if (specificSignReply) {
    return specificSignReply;
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

  if (textIncludesAny(normalized, ["estado general", "general", "inspeccion general"])) {
    const general = formatValue(physicalExam.general);
    return general
      ? `Estado general: ${general}`
      : "Estado general: normal, no se aprecian alteraciones.";
  }

  if (textIncludesAny(normalized, ["cabeza", "ojos", "pupilas", "boca", "orofaringe", "oidos"])) {
    return "Cabeza y cuello: normal, no se aprecian alteraciones relevantes.";
  }

  if (textIncludesAny(normalized, ["cuello", "yugular", "yugulares"])) {
    const neck = formatValue(physicalExam.neck);
    return neck
      ? `Cuello: ${neck}`
      : "Cuello: normal, no se aprecian alteraciones.";
  }

  if (
    textIncludesAny(normalized, [
      "corazon",
      "cardiaco",
      "cardiovascular",
      "ritmo",
      "soplo",
      "ruidos cardiacos"
    ])
  ) {
    const cardiovascular = formatValue(physicalExam.cardiovascular);
    return cardiovascular
      ? `Cardiovascular: ${cardiovascular}`
      : "Cardiovascular: normal, no se aprecian alteraciones.";
  }

  if (
    textIncludesAny(normalized, [
      "pulmon",
      "pulmones",
      "respiratorio",
      "campos pulmonares",
      "torax",
      "ausculto campo"
    ])
  ) {
    const respiratory = formatValue(physicalExam.respiratory);
    return respiratory
      ? `Respiratorio: ${respiratory}`
      : "Respiratorio: normal, no se auscultan ruidos agregados.";
  }

  if (
    textIncludesAny(normalized, [
      "abdomen",
      "abdominal",
      "epigastrio",
      "hipocondrio",
      "fosa iliaca",
      "peristaltismo",
      "ruidos intestinales"
    ])
  ) {
    const abdomen = formatValue(physicalExam.abdomen);
    return abdomen
      ? `Abdomen: ${abdomen}`
      : "Abdomen: normal, no se aprecian alteraciones.";
  }

  if (
    textIncludesAny(normalized, [
      "extremidades",
      "piernas",
      "tobillos",
      "edema",
      "fovea",
      "pulsos perifericos",
      "llenado capilar"
    ])
  ) {
    const extremities = formatValue(physicalExam.extremities);
    return extremities
      ? `Extremidades: ${extremities}`
      : "Extremidades: normal, no se aprecian alteraciones.";
  }

  if (
    textIncludesAny(normalized, [
      "neurologico",
      "fuerza",
      "sensibilidad",
      "pares craneales",
      "cara",
      "facial",
      "lenguaje",
      "habla",
      "marcha",
      "coordinacion",
      "dedo nariz",
      "reflejos"
    ])
  ) {
    const neurologic = physicalExam.neurologic as Record<string, unknown> | undefined;

    if (!neurologic) {
      return "Neurológico: normal, no se aprecian alteraciones.";
    }

    if (textIncludesAny(normalized, ["fuerza", "motor"])) {
      return `Fuerza/motor: ${formatValue(neurologic.motor)}`;
    }

    if (normalized.includes("sensibilidad")) {
      return `Sensibilidad: ${formatValue(neurologic.sensory)}`;
    }

    if (textIncludesAny(normalized, ["pares", "cara", "facial"])) {
      return `Pares craneales/cara: ${formatValue(neurologic.cranialNerves)}`;
    }

    if (textIncludesAny(normalized, ["lenguaje", "habla"])) {
      return `Lenguaje/habla: ${formatValue(neurologic.speech)}`;
    }

    if (normalized.includes("marcha")) {
      return `Marcha: ${formatValue(neurologic.gait)}`;
    }

    if (textIncludesAny(normalized, ["coordinacion", "dedo nariz"])) {
      return `Coordinación: ${formatValue(neurologic.coordination)}`;
    }

    if (normalized.includes("reflejos")) {
      return "Reflejos: no se aprecian alteraciones relevantes en esta simulación.";
    }

    return `Neurológico: ${formatValue(neurologic)}`;
  }

  if (
    textIncludesAny(normalized, [
      "hombro",
      "movilidad",
      "abduccion",
      "arco",
      "jobe",
      "neer",
      "hawkins",
      "rotacion",
      "manguito"
    ])
  ) {
    const shoulder = physicalExam.shoulder as Record<string, unknown> | undefined;

    if (!shoulder) {
      return "Hombro: normal, no se aprecian alteraciones.";
    }

    if (normalized.includes("jobe")) {
      return `Prueba de Jobe: ${formatValue(shoulder.jobe)}`;
    }

    if (normalized.includes("neer")) {
      return `Prueba de Neer: ${formatValue(shoulder.neer)}`;
    }

    if (normalized.includes("hawkins")) {
      return `Prueba de Hawkins-Kennedy: ${formatValue(shoulder.hawkins)}`;
    }

    if (textIncludesAny(normalized, ["palpo", "palpacion"])) {
      return `Palpación del hombro: ${formatValue(shoulder.palpation)}`;
    }

    if (normalized.includes("movilidad activa")) {
      return `Movilidad activa: ${formatValue(shoulder.activeRangeOfMotion)}`;
    }

    if (normalized.includes("movilidad pasiva")) {
      return `Movilidad pasiva: ${formatValue(shoulder.passiveRangeOfMotion)}`;
    }

    if (normalized.includes("arco")) {
      return `Arco doloroso: ${formatValue(shoulder.painfulArc)}`;
    }

    if (textIncludesAny(normalized, ["fuerza", "rotacion"])) {
      return `Fuerza del hombro: ${formatValue(shoulder.strength)}`;
    }

    return `Hombro: ${formatValue(shoulder.activeRangeOfMotion || shoulder.inspection || shoulder)}`;
  }

  if (textIncludesAny(normalized, ["cervical", "columna cervical"])) {
    const cervical = formatValue(physicalExam.cervical);
    return cervical
      ? `Columna cervical: ${cervical}`
      : "Columna cervical: normal, no se aprecian alteraciones.";
  }

  if (textIncludesAny(normalized, ["piel", "mucosas"])) {
    return "Piel y mucosas: normal, no se aprecian alteraciones.";
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

    const studentMessagesCount = messages.filter(
      (m) => m.role === "student"
    ).length;

    if (studentMessagesCount >= getMaxStudentMessages()) {
      return NextResponse.json({
        ok: true,
        reply:
          "Doctor, ya me siento muy cansada con tantas preguntas. ¿Será que podemos ir cerrando?"
      });
    }

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