export type CaseData = {
  id: string;
  publicLabel: string;
  publicSex: string;
  publicAge: number;
  initialMessage: string;
  hiddenAcademicObjective: string;
  simulatedPerson: {
    sex: string;
    age: number;
    occupation: string;
    educationLevel: string;
    personality: string;
    languageStyle: string;
  };
  mainComplaint: string;
  hiddenHistory: Record<string, unknown>;
  physicalExam: Record<string, unknown>;
};

export const CASES: CaseData[] = [
  {
    id: "case-1",
    publicLabel: "Paciente 1",
    publicSex: "Femenino",
    publicAge: 68,
    initialMessage:
      "Bienvenido a Semiología Interactiva.\n\nUsted se encuentra en consulta externa y será evaluado en entrevista clínica y observación dirigida.\n\nPersona simulada femenina de 68 años consulta por dificultad respiratoria.",
    hiddenAcademicObjective:
      "Síndrome compatible con insuficiencia cardíaca crónica descompensada.",
    simulatedPerson: {
      sex: "Femenino",
      age: 68,
      occupation: "Ama de casa",
      educationLevel: "Medio",
      personality:
        "Dramática, ansiosa, emocional, minimiza síntomas pero dice la verdad.",
      languageStyle: "Paisa colombiano natural, cotidiano, sin tecnicismos."
    },
    mainComplaint: "Doctor, me falta mucho el aire.",
    hiddenHistory: {
      evolution: "Síntomas progresivos desde hace aproximadamente 1 año.",
      dyspnea: {
        present: true,
        triggers: ["caminar rápido", "subir escaleras"],
        progression: "Ha empeorado progresivamente."
      },
      sleep: {
        orthopnea: "Antes dormía plana, ahora usa una almohada.",
        nocturnalAwakening: "Se despierta ahogada con frecuencia.",
        sleepQuality: "Duerme mal."
      },
      cough: {
        present: true,
        type: "Seca",
        timing: "Principalmente nocturna."
      },
      edema: {
        present: true,
        location: "Tobillos",
        pattern: "Bilateral, peor en la noche."
      },
      pastHistory: {
        hypertension: true,
        myocardialInfarction: "Hace aproximadamente 2 años.",
        stent: "Stent en descendente anterior.",
        diabetes: true,
        obesity: true,
        copd: true,
        smoking: "Exfumadora."
      },
      medications: [
        "Losartán dos veces al día",
        "Hidroclorotiazida irregular porque la hace orinar mucho",
        "Atorvastatina en la noche",
        "Ácido acetilsalicílico",
        "Salbutamol a necesidad"
      ]
    },
    physicalExam: {
      vitalSigns: {
        bloodPressure: "140/90 mmHg",
        heartRate: "90 lpm",
        respiratoryRate: "18 rpm",
        oxygenSaturation: "90%",
        temperature: "37.0 °C axilar ajustada"
      },
      general: "Consciente, orientada, ansiosa.",
      neck: "Ingurgitación yugular.",
      cardiovascular: "Galope S3.",
      respiratory: "Crépitos bibasales.",
      extremities: "Edema bilateral con fóvea."
    }
  },
  {
    id: "case-2",
    publicLabel: "Paciente 2",
    publicSex: "Masculino",
    publicAge: 72,
    initialMessage:
      "Bienvenido a Semiología Interactiva.\n\nUsted se encuentra en consulta externa y será evaluado en entrevista clínica y observación dirigida.\n\nPersona simulada masculina de 72 años consulta por alteración neurológica de inicio reciente.",
    hiddenAcademicObjective:
      "Síndrome compatible con accidente cerebrovascular agudo.",
    simulatedPerson: {
      sex: "Masculino",
      age: 72,
      occupation: "Jubilado",
      educationLevel: "Medio",
      personality:
        "Preocupado, algo confundido, responde corto, se frustra porque siente que no habla igual.",
      languageStyle:
        "Colombiano cotidiano, frases cortas, puede tener habla algo enredada pero comprensible."
    },
    mainComplaint: "Doctor, se me durmió este lado y hablo raro.",
    hiddenHistory: {
      evolution: "Inicio súbito hace aproximadamente 2 horas.",
      mainNeurologicSymptoms: {
        weakness: {
          present: true,
          side: "Derecho",
          distribution: "Cara y brazo más que pierna",
          onset: "Súbito"
        },
        speech: {
          present: true,
          description:
            "Habla enredada, le cuesta pronunciar algunas palabras, pero entiende preguntas sencillas."
        },
        facialDeviation: {
          present: true,
          description:
            "La familia notó que se le torció la boca hacia un lado."
        },
        sensorySymptoms: {
          present: true,
          description: "Sensación de adormecimiento en brazo derecho."
        }
      },
      associatedSymptoms: {
        headache: "Leve, no es el síntoma principal.",
        dizziness: false,
        seizure: false,
        lossOfConsciousness: false,
        chestPain: false,
        fever: false
      },
      functionalImpact: {
        walking: "Camina con dificultad por debilidad de la pierna derecha.",
        handUse: "Se le caen cosas de la mano derecha."
      },
      pastHistory: {
        hypertension: true,
        diabetes: true,
        atrialFibrillation: true,
        priorStroke: false,
        smoking: "Exfumador."
      },
      medications: [
        "Losartán, pero a veces se le olvida",
        "Metformina",
        "Un anticoagulante que no recuerda bien el nombre y que ha tomado de forma irregular"
      ],
      patientKnowledge:
        "No sabe que puede ser un ACV. Está asustado porque nunca le había pasado."
    },
    physicalExam: {
      vitalSigns: {
        bloodPressure: "170/100 mmHg",
        heartRate: "112 lpm, irregular",
        respiratoryRate: "18 rpm",
        oxygenSaturation: "96%",
        temperature: "36.7 °C"
      },
      general:
        "Consciente, alerta, ansioso, responde preguntas sencillas, habla algo disártrica.",
      neurologic: {
        mentalStatus: "Consciente, orientado parcialmente en persona y lugar.",
        cranialNerves:
          "Asimetría facial central derecha. Desviación de la comisura al sonreír.",
        motor:
          "Disminución de fuerza en hemicuerpo derecho, predominio braquial. Brazo derecho 3/5, pierna derecha 4/5.",
        sensory:
          "Disminución subjetiva de sensibilidad en brazo derecho.",
        coordination:
          "Dificultad para prueba dedo-nariz con mano derecha por debilidad.",
        gait:
          "Marcha insegura, con arrastre leve de pierna derecha si se evalúa.",
        speech:
          "Disartria leve. Comprende órdenes simples."
      },
      cardiovascular:
        "Ritmo irregular. No se describen soplos evidentes en esta simulación.",
      respiratory: "Campos pulmonares sin ruidos agregados.",
      extremities: "Sin edema."
    }
  },
  {
    id: "case-3",
    publicLabel: "Paciente 3",
    publicSex: "Femenino",
    publicAge: 49,
    initialMessage:
      "Bienvenido a Semiología Interactiva.\n\nUsted se encuentra en consulta externa y será evaluado en entrevista clínica y observación dirigida.\n\nPersona simulada femenina de 49 años consulta por dolor de hombro.",
    hiddenAcademicObjective:
      "Síndrome compatible con lesión o síndrome del manguito rotador de 3 meses de evolución.",
    simulatedPerson: {
      sex: "Femenino",
      age: 49,
      occupation: "Auxiliar administrativa",
      educationLevel: "Medio",
      personality:
        "Colaboradora, algo preocupada porque el dolor no mejora, minimiza al inicio pero se queja al mover el brazo.",
      languageStyle:
        "Colombiano cotidiano, claro, sin tecnicismos médicos."
    },
    mainComplaint: "Doctor, me duele mucho el hombro desde hace meses.",
    hiddenHistory: {
      evolution: "Dolor de hombro derecho desde hace aproximadamente 3 meses.",
      pain: {
        location: "Hombro derecho, principalmente cara lateral.",
        onset: "Progresivo, sin trauma fuerte claro.",
        duration: "3 meses.",
        quality: "Dolor tipo punzada o molestia profunda.",
        intensity: "Moderado, aumenta con ciertos movimientos.",
        radiation:
          "Puede bajar un poco por la cara lateral del brazo, sin llegar a la mano.",
        aggravatingFactors: [
          "Levantar el brazo por encima de la cabeza",
          "Peinarse",
          "Abrocharse el brasier",
          "Cargar bolsas",
          "Dormir sobre ese lado"
        ],
        relievingFactors: [
          "Reposo",
          "Evitar levantar el brazo",
          "Analgésicos ocasionales"
        ],
        nightPain:
          "Le duele al acostarse sobre el hombro derecho y a veces la despierta."
      },
      functionalLimitations: {
        overheadActivities: true,
        dressing: "Le cuesta vestirse y peinarse.",
        work: "Le molesta al alcanzar objetos altos.",
        weakness:
          "Siente menos fuerza al levantar el brazo, especialmente hacia el lado."
      },
      negatives: {
        neckPain: "No predominante.",
        numbness: false,
        tingling: false,
        fever: false,
        weightLoss: false,
        directTrauma: false,
        chestPain: false
      },
      pastHistory: {
        diabetes: false,
        thyroidDisease: false,
        priorShoulderInjury: false,
        occupationRisk:
          "Trabaja en escritorio, pero hace oficios de casa y carga bolsas."
      },
      medications: [
        "Acetaminofén ocasional",
        "Ibuprofeno ocasional cuando le duele mucho"
      ],
      patientKnowledge:
        "No sabe qué es el manguito rotador. Cree que puede ser estrés, mala postura o edad."
    },
    physicalExam: {
      vitalSigns: {
        bloodPressure: "122/78 mmHg",
        heartRate: "76 lpm",
        respiratoryRate: "16 rpm",
        oxygenSaturation: "98%",
        temperature: "36.6 °C"
      },
      general: "Consciente, orientada, sin dificultad respiratoria.",
      shoulder: {
        inspection:
          "Sin deformidad evidente. No hay cambios inflamatorios marcados.",
        palpation:
          "Dolor a la palpación en región lateral del hombro derecho y zona subacromial.",
        activeRangeOfMotion:
          "Dolor al elevar el brazo por encima de 90 grados. Abducción limitada por dolor.",
        passiveRangeOfMotion:
          "Menos dolorosa que la movilidad activa, relativamente conservada.",
        painfulArc:
          "Dolor entre 60 y 120 grados de abducción si se explora.",
        strength:
          "Disminución de fuerza por dolor en abducción y rotación externa.",
        neer:
          "Prueba de Neer positiva si se realiza.",
        hawkins:
          "Prueba de Hawkins-Kennedy positiva si se realiza.",
        jobe:
          "Prueba de Jobe positiva por dolor y debilidad."
      },
      cervical:
        "Movilidad cervical conservada. No reproduce claramente el dolor del hombro.",
      neurologicUpperLimb:
        "Sensibilidad distal conservada. Pulsos presentes. Sin déficit motor distal claro.",
      cardiovascular: "Ruidos cardíacos rítmicos, sin hallazgos relevantes.",
      respiratory: "Campos pulmonares sin ruidos agregados."
    }
  }
];

export function getCaseById(caseId: string | undefined | null): CaseData {
  return CASES.find((item) => item.id === caseId) || CASES[0];
}