export const CASE_TITLE = "Semiología Interactiva — Paciente Virtual";

export const INITIAL_CASE_MESSAGE = `Bienvenido a Semiología Interactiva.

Usted se encuentra en consulta externa y será evaluado en entrevista clínica y observación dirigida.

Persona simulada femenina de 68 años consulta por dificultad respiratoria.`;

export const CASE_DATA = {
  simulatedPerson: {
    sex: "femenino",
    age: 68,
    occupation: "ama de casa",
    education: "media",
    language: "paisa colombiano cotidiano",
    personality: ["dramática", "ansiosa", "emocional", "expresiva", "colaboradora si se siente escuchada"]
  },
  hiddenAcademicObjective: "síndrome compatible con insuficiencia cardíaca crónica descompensada",
  openingComplaint: "Doctor, me falta mucho el aire.",
  history: {
    evolution: "síntomas progresivos desde hace aproximadamente 1 año, con empeoramiento gradual",
    mainFeatures: ["dificultad respiratoria al esfuerzo", "tos nocturna seca", "edema en tobillos"],
    dyspnea: ["al subir escaleras", "al caminar rápido"],
    sleep: ["antes dormía plana", "actualmente necesita una almohada", "se despierta ahogada frecuentemente", "duerme mal"],
    edema: ["bilateral", "en tobillos", "peor en la noche"],
    cough: ["seca", "principalmente nocturna"]
  },
  background: {
    cardiovascular: ["hipertensión arterial", "evento coronario hace aproximadamente 2 años", "stent en descendente anterior"],
    respiratory: ["EPOC", "exfumadora"],
    metabolic: ["diabetes", "obesidad"]
  },
  medications: [
    "losartán dos veces al día",
    "hidroclorotiazida de forma irregular porque la pone a orinar mucho",
    "atorvastatina en las noches",
    "ácido acetilsalicílico",
    "inhalador de salbutamol a necesidad"
  ],
  physicalExam: {
    vitalSigns: {
      bloodPressure: "140/90 mmHg",
      heartRate: "90 lpm",
      respiratoryRate: "18 rpm",
      oxygenSaturation: "90%",
      temperature: "37.0 °C axilar ajustada"
    },
    general: ["consciente", "orientada", "ansiosa"],
    cardiovascular: ["ingurgitación yugular", "galope S3"],
    respiratory: ["crépitos bibasales"],
    extremities: ["edema bilateral con fóvea"]
  }
};
