import type { CaseData } from "./cases";

function textIncludes(value: unknown, terms: string[]): boolean {
  const text = String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return terms.some((term) => text.includes(term));
}

function getCaseText(caseData: CaseData): string {
  return [
    caseData.id,
    caseData.mainComplaint,
    caseData.hiddenAcademicObjective,
    JSON.stringify(caseData.hiddenHistory || {}),
    JSON.stringify(caseData.physicalExam || {})
  ].join(" ");
}

function pickFromList<T>(items: T[], seed: string): T {
  let total = 0;

  for (let index = 0; index < seed.length; index += 1) {
    total += seed.charCodeAt(index) * (index + 1);
  }

  return items[Math.abs(total) % items.length];
}

function getAgeAdjustedVitals(age: number, seed: string) {
  const systolic = age >= 60 ? pickFromList([126, 132, 136], seed) : pickFromList([112, 118, 122], seed);
  const diastolic = age >= 60 ? pickFromList([72, 76, 80], seed) : pickFromList([68, 72, 76], seed);
  const heartRate = pickFromList([72, 76, 80, 84], seed);
  const respiratoryRate = pickFromList([14, 15, 16, 17], seed);
  const temperature = pickFromList(["36.4", "36.5", "36.6", "36.7"], seed);
  const oxygenSaturation = pickFromList([96, 97, 98], seed);

  return {
    bloodPressure: `${systolic}/${diastolic} mmHg`,
    heartRate: `${heartRate} lpm`,
    respiratoryRate: `${respiratoryRate} rpm`,
    temperature: `${temperature} °C`,
    oxygenSaturation: `${oxygenSaturation}% al aire ambiente`
  };
}

function getAnthropometry(age: number, sex: string, seed: string) {
  const lowerSex = sex.toLowerCase();

  const height =
    lowerSex.includes("femenino") || lowerSex.includes("mujer")
      ? pickFromList([1.55, 1.58, 1.6, 1.62, 1.65], seed)
      : pickFromList([1.66, 1.68, 1.7, 1.72, 1.75], seed);

  const weight =
    age >= 60
      ? pickFromList([62, 66, 70, 74, 78], seed)
      : pickFromList([60, 65, 70, 75, 80], seed);

  const bmi = weight / (height * height);

  return {
    height: `${height.toFixed(2)} m`,
    weight: `${weight} kg`,
    bmi: `${bmi.toFixed(1)} kg/m²`
  };
}

function getProtectedRegions(caseData: CaseData): string[] {
  const text = getCaseText(caseData);

  const regions: string[] = [];

  if (
    textIncludes(text, [
      "falla cardiaca",
      "insuficiencia cardiaca",
      "congestiv",
      "dolor toracico",
      "sindrome coronario",
      "infarto",
      "st elevado",
      "edema",
      "ingurgitacion yugular",
      "s3"
    ])
  ) {
    regions.push("cardiovascular");
  }

  if (
    textIncludes(text, [
      "neumonia",
      "respirator",
      "tos",
      "esputo",
      "disnea",
      "crepitantes",
      "murmullo vesicular",
      "saturacion",
      "consolidacion"
    ])
  ) {
    regions.push("respiratorio");
  }

  if (
    textIncludes(text, [
      "apendicitis",
      "abdomen",
      "abdominal",
      "mcburney",
      "blumberg",
      "rovsing",
      "psoas",
      "peritoneal"
    ])
  ) {
    regions.push("abdominal");
  }

  if (
    textIncludes(text, [
      "acv",
      "evento cerebrovascular",
      "ictus",
      "neurolog",
      "hemiparesia",
      "disartria",
      "babinski",
      "facial",
      "paresia"
    ])
  ) {
    regions.push("neurologico");
  }

  if (
    textIncludes(text, [
      "hombro",
      "manguito",
      "neer",
      "hawkins",
      "jobe",
      "arco doloroso",
      "abduccion",
      "rotador"
    ])
  ) {
    regions.push("osteomuscular");
  }

  return Array.from(new Set(regions));
}

function getGeneralInspection(caseData: CaseData): string {
  const text = getCaseText(caseData);

  if (textIncludes(text, ["apendicitis", "mcburney", "blumberg", "abdominal"])) {
    return "Paciente consciente y colaborador, con facies de dolor. Se observa incómodo, evita movimientos bruscos y tiende a proteger el abdomen.";
  }

  if (textIncludes(text, ["neumonia", "tos", "disnea", "saturacion", "respirator"])) {
    return "Paciente consciente, colaborador, con aspecto cansado. Puede verse algo disneico o fatigado, especialmente al hablar o movilizarse.";
  }

  if (textIncludes(text, ["falla cardiaca", "insuficiencia cardiaca", "congestiv", "edema", "disnea"])) {
    return "Paciente consciente y colaborador, con aspecto fatigado. Puede observarse disnea leve a moderada y limitación para hablar frases largas si está sintomático.";
  }

  if (textIncludes(text, ["dolor toracico", "sindrome coronario", "infarto", "st elevado"])) {
    return "Paciente consciente, ansioso o preocupado, con facies de dolor. Puede observarse diaforético si el caso lo describe.";
  }

  if (textIncludes(text, ["acv", "ictus", "hemiparesia", "disartria", "facial"])) {
    return "Paciente consciente y colaborador. Puede presentar dificultad para hablar, asimetría facial o limitación motora según los hallazgos neurológicos específicos del caso.";
  }

  if (textIncludes(text, ["hombro", "manguito", "rotador"])) {
    return "Paciente en buen estado general, consciente y colaborador. Protege el hombro doloroso y evita algunos movimientos del brazo afectado.";
  }

  return "Paciente consciente, alerta, colaborador, orientado, sin signos evidentes de compromiso vital inmediato. El estado general es conservado.";
}

export function buildGenericPhysicalExam(caseData: CaseData): string {
  const person = caseData.simulatedPerson;
  const age = person.age || caseData.publicAge;
  const sex = person.sex || caseData.publicSex;
  const seed = `${caseData.id}-${person.fullName}-${age}-${sex}`;

  const vitals = getAgeAdjustedVitals(age, seed);
  const anthropometry = getAnthropometry(age, sex, seed);
  const protectedRegions = getProtectedRegions(caseData);
  const protectedText =
    protectedRegions.length > 0
      ? protectedRegions.join(", ")
      : "ninguna región crítica específica detectada";

  return `
EXAMEN FÍSICO GENÉRICO DE RESPALDO

Regla principal:
- Usa este examen físico genérico solo cuando el estudiante pregunte por un hallazgo físico que NO esté definido en el caso.
- Si el EXAMEN FÍSICO DEL CASO tiene un dato específico, siempre tiene prioridad el dato del caso.
- No contradigas nunca el examen físico específico del caso.
- Regiones protegidas para este caso: ${protectedText}.
- En regiones protegidas, responde usando primero el examen físico del caso y no uses normalidad genérica para negar hallazgos importantes.

Inspección general:
- ${getGeneralInspection(caseData)}
- Colabora con el interrogatorio y con el examen físico en la medida de sus síntomas.
- La apariencia debe adaptarse al motivo de consulta y a los hallazgos específicos del caso.

Estado de conciencia y orientación:
- Consciente y alerta, salvo que el caso indique alteración.
- Orientado en persona, tiempo y lugar, salvo que el caso neurológico indique otra cosa.
- Responde preguntas de forma coherente, con lenguaje cotidiano.
- Si el caso tiene disartria, alteración del habla o déficit neurológico, prioriza ese dato.

Signos vitales de respaldo si el caso no trae signos vitales:
- Presión arterial aproximada: ${vitals.bloodPressure}.
- Frecuencia cardiaca aproximada: ${vitals.heartRate}.
- Frecuencia respiratoria aproximada: ${vitals.respiratoryRate}.
- Temperatura aproximada: ${vitals.temperature}.
- Saturación de oxígeno aproximada: ${vitals.oxygenSaturation}.
- Si el caso trae fiebre, taquicardia, hipertensión, hipotensión, taquipnea o desaturación, usa siempre el dato específico del caso.

Antropometría de respaldo:
- Peso aproximado: ${anthropometry.weight}.
- Talla aproximada: ${anthropometry.height}.
- IMC aproximado: ${anthropometry.bmi}.
- Estos datos son aproximados y pueden responderse como "más o menos" si el estudiante pregunta directamente.

Cabeza y cuello:
- Cabeza normocéfala, sin trauma evidente si el caso no dice lo contrario.
- Conjuntivas sin palidez marcada evidente, salvo que el caso indique anemia o compromiso específico.
- Escleras anictéricas.
- Mucosas orales húmedas o ligeramente secas según el contexto clínico.
- Cuello móvil, sin rigidez de nuca si el caso no sugiere compromiso meníngeo.
- Sin masas cervicales evidentes si no están descritas.
- No describas ingurgitación yugular como ausente si el caso cardiovascular la tiene.

Piel y mucosas:
- Piel tibia, sin lesiones agudas evidentes si el caso no describe lesiones.
- Sin cianosis central evidente si el caso no tiene compromiso respiratorio o circulatorio.
- Sin ictericia evidente si el caso no la describe.
- Llenado capilar conservado, menor de 2 segundos, salvo datos de hipoperfusión.
- Si el caso describe diaforesis, fiebre, frialdad, edema, palidez o cianosis, usa el dato del caso.

Cardiovascular basal:
- Si la región cardiovascular NO está protegida en este caso: ruidos cardiacos rítmicos, sin soplos evidentes, pulsos periféricos palpables y simétricos.
- Si el caso tiene falla cardiaca, dolor torácico, síndrome coronario, edema, ingurgitación yugular, S3, soplos o alteraciones de pulsos, responde con los hallazgos específicos del caso.
- No digas "cardiovascular normal" si el caso tiene compromiso cardiovascular.

Respiratorio basal:
- Si la región respiratoria NO está protegida en este caso: tórax simétrico, expansibilidad conservada, sin uso de músculos accesorios, murmullo vesicular conservado y sin ruidos agregados evidentes.
- Si el caso tiene neumonía, falla cardiaca, disnea, tos, crépitos, sibilancias, disminución del murmullo vesicular, matidez o desaturación, responde con los hallazgos específicos del caso.
- No digas "pulmones normales" si el caso tiene compromiso respiratorio.

Abdomen basal:
- Si la región abdominal NO está protegida en este caso: abdomen blando, depresible, no distendido, ruidos intestinales presentes, sin dolor importante a la palpación y sin signos de irritación peritoneal.
- Si el caso tiene dolor abdominal, apendicitis, defensa, McBurney, Blumberg, Rovsing, psoas o cualquier signo abdominal específico, responde con esos hallazgos.
- Nunca uses abdomen normal para contradecir un caso abdominal.

Neurológico basal:
- Si la región neurológica NO está protegida en este caso: alerta, orientado, lenguaje claro, fuerza global conservada, sensibilidad gruesa conservada, sin déficit focal evidente y marcha estable si se evalúa.
- Si el caso tiene ACV, disartria, paresia, asimetría facial, Babinski, alteración de reflejos, sensibilidad o marcha, responde con los hallazgos específicos del caso.
- No digas "neurológico normal" si el caso tiene compromiso neurológico.

Osteomuscular basal:
- Si la región osteomuscular NO está protegida en este caso: extremidades sin deformidades evidentes, movilidad global conservada, sin edema articular visible y fuerza aparentemente conservada.
- Si el caso tiene dolor de hombro, manguito rotador, arco doloroso, Neer, Hawkins, Jobe o limitación articular, responde con esos hallazgos.
- No uses normalidad genérica para negar dolor o limitación de la región comprometida.

Extremidades y vascular periférico:
- Extremidades sin cianosis evidente si el caso no dice lo contrario.
- Pulsos periféricos palpables.
- Llenado capilar conservado si no hay datos de hipoperfusión.
- Sin signos evidentes de trombosis venosa profunda si el caso no lo sugiere.
- Si el caso tiene edema, fóvea, asimetría, frialdad o alteración vascular, responde con el dato específico del caso.

Marcha y funcionalidad:
- Si el caso no compromete marcha, abdomen agudo, respiración, dolor intenso o neurología: marcha independiente y estable.
- En dolor abdominal agudo, puede caminar lento o encorvado por dolor.
- En disnea o falla cardiaca, puede tener menor tolerancia al esfuerzo.
- En ACV, usa el déficit motor o limitación funcional específica.
- En hombro doloroso, la marcha puede ser normal, pero protege el brazo afectado.

Dolor:
- Si el caso tiene dolor, responde la localización, intensidad, irradiación y características de acuerdo con la historia clínica oculta.
- Si el caso no define dolor, no inventes dolor importante.
- Si preguntan escala de dolor y el caso no trae dato, puedes responder una intensidad aproximada coherente con el motivo de consulta.

Cómo responder al estudiante:
- Si pregunta "¿qué se aprecia a la inspección?", responde primero la inspección general y luego el hallazgo específico del caso si aplica.
- Si pregunta "¿cuáles son los signos vitales?", entrega los signos vitales específicos del caso; si no existen, usa los de respaldo.
- Si pregunta por una región anatómica no relacionada con el caso y sin hallazgos específicos, puedes responder hallazgos basales normales.
- Responde como paciente o como resultado del examen físico observado, no como docente.
`.trim();
}