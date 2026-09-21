import type { CaseData } from "./cases";

function pickFromList<T>(items: T[], seed: string): T {
  let total = 0;

  for (let index = 0; index < seed.length; index += 1) {
    total += seed.charCodeAt(index) * (index + 1);
  }

  return items[Math.abs(total) % items.length];
}

function getAgeGroup(age: number): "young" | "adult" | "older" {
  if (age < 35) return "young";
  if (age < 60) return "adult";
  return "older";
}

function getLikelyRegime(occupation: string, age: number): string {
  const lowerOccupation = occupation.toLowerCase();

  if (
    lowerOccupation.includes("vendedor") ||
    lowerOccupation.includes("informal") ||
    lowerOccupation.includes("mensajero") ||
    lowerOccupation.includes("taxi")
  ) {
    return "subsidiado o contributivo como independiente, según cómo lo pregunte el estudiante";
  }

  if (age >= 60) {
    return "contributivo, beneficiario o pensionado, según cómo lo pregunte el estudiante";
  }

  return "contributivo";
}

function getLivingSituation(age: number, sex: string, seed: string): string {
  const ageGroup = getAgeGroup(age);
  const lowerSex = sex.toLowerCase();

  if (ageGroup === "young") {
    return pickFromList(
      [
        "vive con sus padres y aporta parcialmente a los gastos de la casa",
        "vive con su pareja en vivienda arrendada",
        "vive con un familiar cercano mientras trabaja"
      ],
      seed
    );
  }

  if (ageGroup === "adult") {
    return pickFromList(
      [
        "vive con su pareja y uno o dos hijos",
        "vive con su familia en vivienda arrendada",
        "vive con su pareja; sus hijos ya no dependen completamente de la casa"
      ],
      seed
    );
  }

  if (lowerSex.includes("femenino") || lowerSex.includes("mujer")) {
    return pickFromList(
      [
        "vive con una hija o un familiar cercano que le ayuda cuando se siente mal",
        "vive con su esposo y recibe apoyo de sus hijos",
        "vive con familiares cercanos y tiene buena red de apoyo"
      ],
      seed
    );
  }

  return pickFromList(
    [
      "vive con su esposa y tiene apoyo de sus hijos",
      "vive con familiares cercanos y recibe ayuda cuando la necesita",
      "vive con su pareja y cuenta con apoyo familiar"
    ],
    seed
  );
}

function getEducation(age: number, seed: string): string {
  const ageGroup = getAgeGroup(age);

  if (ageGroup === "young") {
    return pickFromList(
      [
        "bachiller completo",
        "técnico o tecnólogo incompleto",
        "técnico o tecnólogo completo"
      ],
      seed
    );
  }

  if (ageGroup === "adult") {
    return pickFromList(
      [
        "bachiller completo",
        "secundaria incompleta",
        "técnico laboral"
      ],
      seed
    );
  }

  return pickFromList(
    [
      "primaria completa",
      "secundaria incompleta",
      "bachillerato incompleto"
    ],
    seed
  );
}

function getMaritalStatus(age: number, seed: string): string {
  const ageGroup = getAgeGroup(age);

  if (ageGroup === "young") {
    return pickFromList(["soltero/a", "en unión libre"], seed);
  }

  if (ageGroup === "adult") {
    return pickFromList(["casado/a", "en unión libre", "separado/a"], seed);
  }

  return pickFromList(["casado/a", "viudo/a", "en unión libre"], seed);
}

function getChildren(age: number, seed: string): string {
  const ageGroup = getAgeGroup(age);

  if (ageGroup === "young") {
    return pickFromList(
      [
        "no tiene hijos",
        "tiene un hijo pequeño",
        "no tiene hijos a cargo"
      ],
      seed
    );
  }

  if (ageGroup === "adult") {
    return pickFromList(
      [
        "tiene uno o dos hijos",
        "tiene hijos, algunos todavía viven en casa",
        "tiene hijos pero ya son independientes"
      ],
      seed
    );
  }

  return pickFromList(
    [
      "tiene hijos adultos",
      "tiene hijos que le ayudan cuando lo necesita",
      "tiene hijos, pero no todos viven cerca"
    ],
    seed
  );
}

export function buildGenericPatientProfile(caseData: CaseData): string {
  const person = caseData.simulatedPerson;
  const age = person.age || caseData.publicAge;
  const sex = person.sex || caseData.publicSex;
  const occupation = person.occupation || "ocupación no especificada";

  const seed = `${caseData.id}-${person.fullName}-${age}-${sex}-${occupation}`;

  const municipality = pickFromList(
    ["Medellín", "Bello", "Itagüí", "Envigado", "Sabaneta", "Copacabana"],
    seed
  );

  const neighborhood = pickFromList(
    [
      "un barrio residencial urbano",
      "un barrio de estrato medio-bajo",
      "un sector urbano con acceso a transporte público",
      "una zona residencial cercana a una vía principal",
      "un barrio popular con red familiar cercana"
    ],
    seed
  );

  const eps = pickFromList(
    ["Sura", "Nueva EPS", "Savia Salud", "Salud Total", "Coosalud"],
    seed
  );

  const stratum = pickFromList(["2", "3"], seed);
  const regime = getLikelyRegime(occupation, age);
  const livingSituation = getLivingSituation(age, sex, seed);
  const education = getEducation(age, seed);
  const maritalStatus = getMaritalStatus(age, seed);
  const children = getChildren(age, seed);

  return `
PERFIL ADMINISTRATIVO Y SOCIOECONÓMICO GENÉRICO

Regla de uso:
- Usa este perfil solo para responder preguntas administrativas, de identificación, contexto social, vivienda, escolaridad, ocupación, convivencia, red de apoyo y datos socioeconómicos.
- Si el caso clínico trae un dato específico diferente, siempre tiene prioridad el dato específico del caso.
- No uses este perfil para inventar enfermedades, medicamentos, alergias, cirugías, hospitalizaciones, consumo de tabaco, consumo de alcohol, sustancias psicoactivas ni antecedentes familiares clínicos.
- Si el estudiante pregunta algo clínico que no está en el caso, responde de forma prudente: "que yo sepa no", "no recuerdo", "no me han dicho" o "eso sí no lo tengo claro".
- Responde siempre como paciente, con frases cortas y naturales, no como una ficha.

Datos administrativos y sociales de respaldo:
- Nombre: ${person.fullName}.
- Edad: ${age} años.
- Sexo registrado: ${sex}.
- Ocupación: ${occupation}.
- Estado civil probable: ${maritalStatus}.
- Hijos: ${children}.
- Escolaridad: ${education}.
- Municipio o zona de residencia: ${municipality}.
- Barrio o entorno: ${neighborhood}.
- Estrato socioeconómico: ${stratum}.
- Vivienda y convivencia: ${livingSituation}.
- Red de apoyo: tiene al menos un familiar cercano o persona de confianza que podría ayudarle si el problema de salud empeora.
- EPS o aseguradora de referencia: ${eps}.
- Régimen de afiliación: ${regime}.
- Transporte habitual: usa transporte público, taxi, moto, carro familiar o apoyo de un familiar según la situación.
- Situación económica general: recursos limitados o medios; puede cubrir necesidades básicas, pero una enfermedad o incapacidad puede afectar sus ingresos.
- Religión o creencias: si le preguntan, puede responder que es católico/a o creyente no practicante, salvo que el caso indique otra cosa.
- Lateralidad: diestro/a, salvo que el caso clínico indique otra cosa.
- Comprensión de su enfermedad: entiende sus síntomas en lenguaje cotidiano, pero no usa términos médicos complejos espontáneamente.
`.trim();
}