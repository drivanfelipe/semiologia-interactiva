export type CaseData = {
  id: string;
  publicLabel: string;
  publicSex: string;
  publicAge: number;
  simulatedPerson: {
    fullName: string;
    age: number;
    sex: string;
    occupation: string;
    personality: string;
  };
  hiddenAcademicObjective: string;
  mainComplaint: string;
  conversationBehavior: {
    baseline: string;
    ifEmpathic: string;
    ifRudeOrDisorganized: string;
    ifTooManyQuestions: string;
  };
  importantNegatives: string[];
  responseGuide: {
    topicAnswers: Record<string, string>;
  };
  hiddenHistory: Record<string, unknown>;
  physicalExam: Record<string, unknown>;
  evaluationChecklist: string[];
};

export const CASES: CaseData[] = [
  {
    id: "case-1",
    publicLabel: "Paciente 1",
    publicSex: "Femenino",
    publicAge: 68,
    simulatedPerson: {
      fullName: "Gloria Cecilia Restrepo Álvarez",
      age: 68,
      sex: "Femenino",
      occupation: "Ama de casa",
      personality:
        "Paciente amable, algo ansiosa por la falta de aire, habla de forma sencilla y tiende a minimizar sus síntomas."
    },
    hiddenAcademicObjective:
      "Reconocer síndrome congestivo compatible con insuficiencia cardíaca crónica descompensada.",
    mainComplaint: "Ay doctor, me falta mucho el aire.",
    conversationBehavior: {
      baseline:
        "Responde de forma breve, natural y progresiva. No entrega toda la información si no se la preguntan.",
      ifEmpathic:
        "Coopera más, explica mejor los síntomas y se muestra agradecida.",
      ifRudeOrDisorganized:
        "Responde más corto, se muestra confundida o cansada.",
      ifTooManyQuestions:
        "Dice que se confundió y pide que le pregunten de a poquito."
    },
    importantNegatives: [
      "Niega fiebre.",
      "Niega dolor torácico actual.",
      "Niega hemoptisis.",
      "Niega síncope.",
      "Niega inicio súbito del cuadro.",
      "Niega síntomas neurológicos focales."
    ],
    responseGuide: {
      topicAnswers: {
        "disnea":
          "Me falta el aire, sobre todo cuando camino rápido o subo escalas.",
        "ortopnea":
          "Cuando me acuesto completamente me ahogo más, por eso duermo con almohadas.",
        "edema":
          "Se me hinchan los tobillos, más que todo por la noche.",
        "tos":
          "Me da una tos seca, sobre todo en la noche.",
        "dolor toracico":
          "Dolor en el pecho ahora no tengo, doctor.",
        "medicamentos":
          "Tomo pastillas para la presión y para el colesterol, pero la que me hace orinar a veces no me la tomo."
      }
    },
    hiddenHistory: {
      identification: {
        fullName: "Gloria Cecilia Restrepo Álvarez",
        documentId: "43.568.291",
        bloodTypeRh: "O positivo (O+)",
        age: 68,
        sex: "Femenino",
        genderIdentity: "Mujer cisgénero",
        ethnicity: "Se autorreconoce como mestiza",
        birthDate: "1958-02-14",
        phone: "300 000 0001",
        address: "Envigado, Antioquia",
        socioeconomicStratum: "Estrato 3",
        educationLevel: "Bachillerato completo",
        residenceArea: "Residencia urbana",
        insurance: "EPS simulada Sura",
        maritalStatus: "Viuda",
        occupation: "Ama de casa",
        placeOfBirth: "Medellín, Antioquia",
        emergencyContact: "Hija: Carolina Restrepo, 300 000 0101",
        dominantHand: "Diestra",
        mainLanguage: "Español",
        disability: "No refiere discapacidad conocida",
        companion: "Consulta sola, aunque su hija está pendiente de ella",
        informantReliability:
          "Información confiable, aunque no recuerda con precisión algunos nombres de medicamentos"
      },
      presentIllness:
        "Disnea de aproximadamente un año de evolución, progresiva. Inicialmente con esfuerzos moderados y actualmente con esfuerzos menores. Empeora al acostarse, presenta despertares nocturnos con sensación de ahogo, tos seca nocturna y edema bilateral de tobillos de predominio vespertino.",
      history: {
        pathological: [
          "Hipertensión arterial",
          "Diabetes mellitus tipo 2",
          "EPOC referido por la paciente",
          "Infarto agudo de miocardio hace aproximadamente 2 años",
          "Obesidad"
        ],
        surgical: [
          "Angioplastia coronaria con colocación de stent en arteria descendente anterior"
        ],
        traumatic: ["Niega traumas recientes relevantes"],
        pharmacological: [
          "Losartán",
          "Hidroclorotiazida de uso irregular",
          "Atorvastatina",
          "Ácido acetilsalicílico",
          "Salbutamol a necesidad"
        ],
        allergies: ["Niega alergias medicamentosas conocidas"],
        toxicological: [
          "Exfumadora",
          "Niega alcohol en exceso",
          "Niega sustancias psicoactivas"
        ],
        gynecoObstetric: [
          "Menopausia desde hace varios años",
          "Niega sangrado genital actual"
        ],
        family: [
          "Padre con hipertensión arterial",
          "Madre con diabetes mellitus tipo 2"
        ],
        occupational: [
          "Ama de casa",
          "Oficios domésticos limitados por disnea"
        ],
        epidemiological: [
          "Niega viajes recientes",
          "Niega contacto con personas con infección respiratoria"
        ]
      },
      reviewOfSystems: {
        general:
          "Cansancio progresivo. Niega fiebre. Refiere posible aumento de peso.",
        cardiovascular:
          "Disnea de esfuerzo, ortopnea, despertares nocturnos con ahogo y edema bilateral de tobillos.",
        respiratory:
          "Tos seca nocturna y disnea progresiva. Niega expectoración purulenta y hemoptisis.",
        gastrointestinal:
          "Niega dolor abdominal, vómito, diarrea o sangrado digestivo.",
        genitourinary:
          "Niega disuria. Orina más cuando toma el diurético.",
        neurologic:
          "Niega pérdida de fuerza, alteración del habla o pérdida de conciencia.",
        musculoskeletal:
          "Cansancio al esfuerzo, sin dolor articular agudo relevante.",
        skin:
          "Edema en tobillos. Niega lesiones cutáneas.",
        endocrine:
          "Diabetes mellitus tipo 2 conocida.",
        psychiatric:
          "Ansiedad relacionada con la falta de aire nocturna."
      },
      results: {
        labs: [
          "Hemograma sin leucocitosis marcada",
          "Creatinina 1.1 mg/dL",
          "Potasio 4.2 mEq/L",
          "BNP elevado: 980 pg/mL",
          "Glicemia 148 mg/dL"
        ],
        imaging: [
          "Radiografía de tórax: cardiomegalia leve y signos de congestión pulmonar bibasal"
        ],
        complementaryStudies: [
          "ECG: ritmo sinusal, signos de antecedente isquémico antiguo",
          "Ecocardiograma: fracción de eyección moderadamente reducida"
        ]
      }
    },
    physicalExam: {
      vitalSigns: {
        bloodPressure: "146/86 mmHg",
        heartRate: "96 lpm",
        respiratoryRate: "22 rpm",
        oxygenSaturation: "93%",
        temperature: "36.7 °C"
      },
      general:
        "Consciente, orientada, algo disneica al hablar frases largas.",
      headAndNeck: {
        jugularVenousDistension: "Ingurgitación yugular leve.",
        hepatojugularReflux: "Reflujo hepatoyugular positivo."
      },
      cardiovascular: {
        rhythm: "Rítmico.",
        heartSounds: "Ruidos cardíacos rítmicos, con S3 audible.",
        murmurs: "No se auscultan soplos evidentes.",
        peripheralPulses: "Pulsos periféricos presentes.",
        capillaryRefill: "Llenado capilar conservado."
      },
      respiratory: {
        auscultation:
          "Crepitantes bibasales, de predominio en bases pulmonares.",
        addedSounds: "Crepitantes bibasales."
      },
      abdomen: {
        palpation: "Blando, depresible, no doloroso.",
        visceromegaly: "No se palpan visceromegalias.",
        ascites: "No se aprecia ascitis."
      },
      extremities: {
        edema: "Edema bilateral en miembros inferiores con fóvea +/++.",
        pulses: "Pulsos presentes."
      },
      neurologic: {
        mentalStatus: "Alerta y orientada.",
        motor: "Fuerza conservada en las cuatro extremidades.",
        reflexes: "Reflejos osteotendinosos simétricos.",
        sensory: "Sensibilidad conservada.",
        gait: "Marcha limitada por disnea."
      },
      skin: "Sin lesiones cutáneas agudas."
    },
    evaluationChecklist: [
      "Caracterizó disnea.",
      "Preguntó ortopnea.",
      "Preguntó disnea paroxística nocturna.",
      "Preguntó edema.",
      "Indagó antecedentes cardiovasculares.",
      "Preguntó adherencia a medicamentos.",
      "Solicitó signos vitales.",
      "Exploró cuello, corazón, pulmones y extremidades."
    ]
  },

  {
    id: "case-2",
    publicLabel: "Paciente 2",
    publicSex: "Masculino",
    publicAge: 72,
    simulatedPerson: {
      fullName: "Álvaro Hernán Gómez Ramírez",
      age: 72,
      sex: "Masculino",
      occupation: "Jubilado",
      personality:
        "Paciente preocupado, frustrado por hablar raro. Puede responder con dificultad leve, pero entiende."
    },
    hiddenAcademicObjective:
      "Reconocer déficit neurológico focal agudo compatible con accidente cerebrovascular.",
    mainComplaint: "Doctor, se me durmió este lado y hablo raro.",
    conversationBehavior: {
      baseline:
        "Responde con frases cortas, algo lentas, como si le costara hablar.",
      ifEmpathic:
        "Se tranquiliza y colabora mejor.",
      ifRudeOrDisorganized:
        "Se frustra y responde poco.",
      ifTooManyQuestions:
        "Se confunde y dice que le pregunten más despacio."
    },
    importantNegatives: [
      "Niega trauma.",
      "Niega pérdida de conciencia.",
      "Niega convulsiones.",
      "Niega fiebre.",
      "Niega dolor torácico.",
      "Niega cefalea intensa tipo trueno."
    ],
    responseGuide: {
      topicAnswers: {
        "inicio":
          "Eso empezó de repente, hace como dos horas.",
        "debilidad":
          "Siento muy flojo este lado derecho, sobre todo el brazo.",
        "habla":
          "Me cuesta hablar bien, siento la lengua como enredada.",
        "cara":
          "Mi esposa me dijo que se me torció un poquito la boca.",
        "dolor de cabeza":
          "No doctor, dolor de cabeza fuerte no tengo.",
        "trauma":
          "No me caí ni me golpeé."
      }
    },
    hiddenHistory: {
      identification: {
        fullName: "Álvaro Hernán Gómez Ramírez",
        documentId: "70.123.456",
        bloodTypeRh: "A positivo (A+)",
        age: 72,
        sex: "Masculino",
        genderIdentity: "Hombre cisgénero",
        ethnicity: "Se autorreconoce como mestizo",
        birthDate: "1954-04-10",
        phone: "300 000 0002",
        address: "Medellín, Antioquia",
        socioeconomicStratum: "Estrato 3",
        educationLevel: "Bachillerato incompleto",
        residenceArea: "Residencia urbana",
        insurance: "Nueva EPS simulada",
        maritalStatus: "Casado",
        occupation: "Jubilado",
        placeOfBirth: "Medellín, Antioquia",
        emergencyContact: "Esposa: Marta Ramírez, 300 000 0102",
        dominantHand: "Diestro",
        mainLanguage: "Español",
        disability: "No refiere discapacidad previa conocida",
        companion: "Acude acompañado por su esposa",
        informantReliability:
          "Información parcialmente confiable; la esposa complementa por la dificultad del habla"
      },
      presentIllness:
        "Inicio súbito hace aproximadamente dos horas de debilidad en hemicuerpo derecho, alteración del habla, adormecimiento en cara y brazo derechos y asimetría facial.",
      history: {
        pathological: [
          "Hipertensión arterial",
          "Diabetes mellitus tipo 2",
          "Fibrilación auricular referida",
          "Dislipidemia probable"
        ],
        surgical: ["Niega cirugías mayores recientes"],
        traumatic: [
          "Niega trauma craneoencefálico reciente",
          "Niega caídas previas al inicio del cuadro"
        ],
        pharmacological: [
          "Losartán",
          "Metformina",
          "Anticoagulante de nombre no recordado, con adherencia irregular"
        ],
        allergies: ["Niega alergias medicamentosas conocidas"],
        toxicological: [
          "Exfumador",
          "Niega alcohol en exceso",
          "Niega sustancias psicoactivas"
        ],
        family: [
          "Padre con antecedente de evento cerebrovascular",
          "Familia con hipertensión arterial"
        ],
        occupational: ["Jubilado", "Actividad física limitada"],
        epidemiological: [
          "Niega viajes recientes",
          "Niega síntomas infecciosos recientes"
        ]
      },
      reviewOfSystems: {
        general: "Niega fiebre o malestar general previo importante.",
        cardiovascular:
          "Antecedente de ritmo cardíaco irregular. Niega dolor torácico actual.",
        respiratory: "Niega disnea, tos o expectoración.",
        gastrointestinal: "Niega vómito, dolor abdominal o sangrado digestivo.",
        genitourinary: "Niega disuria.",
        neurologic:
          "Debilidad derecha, habla enredada, asimetría facial y adormecimiento derecho.",
        musculoskeletal:
          "Niega dolor articular o trauma. Limitación actual por debilidad.",
        skin: "Sin lesiones cutáneas agudas.",
        endocrine: "Diabetes mellitus tipo 2.",
        psychiatric: "Ansioso y frustrado por dificultad para hablar."
      },
      results: {
        labs: [
          "Glucometría 128 mg/dL",
          "Hemograma sin leucocitosis marcada",
          "Creatinina 1.0 mg/dL",
          "INR no terapéutico"
        ],
        imaging: [
          "TAC simple de cráneo: sin hemorragia intracraneal evidente"
        ],
        complementaryStudies: [
          "ECG: fibrilación auricular con respuesta ventricular moderada"
        ]
      }
    },
    physicalExam: {
      vitalSigns: {
        bloodPressure: "164/92 mmHg",
        heartRate: "112 lpm",
        respiratoryRate: "18 rpm",
        oxygenSaturation: "96%",
        temperature: "36.6 °C"
      },
      general:
        "Consciente, alerta, ansioso, con dificultad leve para articular palabras.",
      mentalStatus: {
        consciousness: "Alerta.",
        orientation: "Orientado en persona y lugar.",
        speech: "Disartria leve.",
        comprehension: "Comprende órdenes simples."
      },
      headAndNeck: {
        pupils: "Isocóricas y reactivas.",
        facialSymmetry: "Asimetría facial derecha leve.",
        visualFields: "Sin alteración evidente en confrontación."
      },
      cardiovascular: {
        rhythm: "Irregular.",
        heartSounds: "Ruidos cardíacos arrítmicos.",
        murmurs: "Sin soplos evidentes."
      },
      respiratory: {
        auscultation: "Murmullo vesicular conservado.",
        addedSounds: "Sin ruidos agregados."
      },
      neurologic: {
        mentalStatus: "Alerta, con disartria leve.",
        cranialNerves:
          "Asimetría facial derecha leve. Pupilas isocóricas y reactivas.",
        speech: "Disartria leve.",
        motor: "Debilidad en hemicuerpo derecho.",
        motorRightArm: "Fuerza 3/5.",
        motorRightLeg: "Fuerza 4/5.",
        motorLeftArm: "Fuerza 5/5.",
        motorLeftLeg: "Fuerza 5/5.",
        tone: "Tono ligeramente disminuido en lado derecho.",
        reflexes: "Reflejos osteotendinosos aumentados en lado derecho.",
        plantarResponse: "Babinski derecho positivo.",
        sensory: "Hipoestesia leve en cara y brazo derechos.",
        coordination: "Limitada por debilidad derecha.",
        gait: "No se evalúa por seguridad.",
        pronatorDrift: "Desviación pronadora derecha positiva."
      },
      abdomen: "Blando, no doloroso.",
      extremities: "Sin edema. Pulsos presentes."
    },
    evaluationChecklist: [
      "Identificó inicio súbito.",
      "Preguntó hora de inicio.",
      "Exploró déficit motor.",
      "Exploró lenguaje.",
      "Preguntó antecedentes cardiovasculares.",
      "Preguntó anticoagulación.",
      "Solicitó glucometría.",
      "Solicitó examen neurológico dirigido.",
      "Reconoció signos de alarma neurológica."
    ]
  },

  {
    id: "case-3",
    publicLabel: "Paciente 3",
    publicSex: "Femenino",
    publicAge: 49,
    simulatedPerson: {
      fullName: "Marcela Andrea Ruiz Castaño",
      age: 49,
      sex: "Femenino",
      occupation: "Auxiliar administrativa",
      personality:
        "Paciente colaboradora, preocupada porque el dolor limita actividades cotidianas."
    },
    hiddenAcademicObjective:
      "Reconocer síndrome doloroso de hombro compatible con lesión o tendinopatía del manguito rotador.",
    mainComplaint: "Doctor, me duele mucho el hombro.",
    conversationBehavior: {
      baseline:
        "Responde de forma natural, describe dolor y limitación si le preguntan.",
      ifEmpathic:
        "Coopera mejor y explica cómo afecta su vida diaria.",
      ifRudeOrDisorganized:
        "Responde más corto y se muestra incómoda.",
      ifTooManyQuestions:
        "Dice que son muchas preguntas y pide ir por partes."
    },
    importantNegatives: [
      "Niega trauma fuerte.",
      "Niega fiebre.",
      "Niega pérdida de peso.",
      "Niega deformidad.",
      "Niega dolor torácico.",
      "Niega hormigueo persistente.",
      "Niega pérdida de fuerza distal en la mano."
    ],
    responseGuide: {
      topicAnswers: {
        "dolor":
          "Me duele en el hombro derecho, más hacia el ladito.",
        "tiempo":
          "Llevo como tres meses con eso.",
        "movimiento":
          "Me duele cuando levanto el brazo o cuando intento peinarme.",
        "noche":
          "Dormir sobre ese lado me molesta mucho.",
        "trauma":
          "No, no me caí ni me golpeé duro.",
        "medicamentos":
          "A veces tomo acetaminofén, y cuando me duele mucho, ibuprofeno."
      }
    },
    hiddenHistory: {
      identification: {
        fullName: "Marcela Andrea Ruiz Castaño",
        documentId: "43.890.127",
        bloodTypeRh: "B positivo (B+)",
        age: 49,
        sex: "Femenino",
        genderIdentity: "Mujer cisgénero",
        ethnicity: "Se autorreconoce como mestiza",
        birthDate: "1977-09-02",
        phone: "300 000 0003",
        address: "Medellín, Antioquia",
        socioeconomicStratum: "Estrato 3",
        educationLevel: "Técnico laboral",
        residenceArea: "Residencia urbana",
        insurance: "EPS simulada Sanitas",
        maritalStatus: "Unión libre",
        occupation: "Auxiliar administrativa",
        placeOfBirth: "Itagüí, Antioquia",
        emergencyContact: "Pareja: Andrés Castaño, 300 000 0103",
        dominantHand: "Diestra",
        mainLanguage: "Español",
        disability: "No refiere discapacidad conocida",
        companion: "Consulta sola",
        informantReliability: "Información confiable"
      },
      presentIllness:
        "Dolor de hombro derecho de tres meses de evolución, progresivo, en cara lateral del hombro. Empeora al elevar el brazo, peinarse, vestirse, cargar bolsas y dormir sobre ese lado.",
      history: {
        pathological: [
          "Niega diabetes",
          "Niega enfermedad tiroidea",
          "Niega enfermedad reumatológica conocida"
        ],
        surgical: [
          "Niega cirugías previas en hombro",
          "Niega cirugías recientes"
        ],
        traumatic: [
          "Niega trauma fuerte",
          "Posible sobrecarga al cargar bolsas y hacer oficios"
        ],
        pharmacological: [
          "Acetaminofén ocasional",
          "Ibuprofeno ocasional"
        ],
        allergies: ["Niega alergias medicamentosas conocidas"],
        toxicological: [
          "Niega tabaquismo",
          "Alcohol social ocasional",
          "Niega sustancias psicoactivas"
        ],
        gynecoObstetric: [
          "Ciclos irregulares ocasionales",
          "Niega embarazo actual",
          "Niega sangrado genital anormal"
        ],
        family: [
          "Madre con artrosis",
          "Niega familiares con enfermedades inflamatorias articulares"
        ],
        occupational: [
          "Auxiliar administrativa",
          "Trabajo prolongado en escritorio",
          "Realiza oficios domésticos y carga bolsas"
        ],
        epidemiological: [
          "Niega viajes recientes",
          "Niega exposición infecciosa relevante"
        ]
      },
      reviewOfSystems: {
        general: "Niega fiebre, pérdida de peso o sudoración nocturna.",
        cardiovascular: "Niega dolor torácico, palpitaciones o síncope.",
        respiratory: "Niega tos, disnea o expectoración.",
        gastrointestinal: "Niega dolor abdominal, vómito o diarrea.",
        genitourinary: "Niega síntomas urinarios.",
        neurologic:
          "Niega adormecimiento, hormigueo o pérdida de fuerza distal en mano.",
        musculoskeletal:
          "Dolor de hombro derecho con limitación funcional.",
        skin: "Niega enrojecimiento, calor local marcado o lesiones cutáneas.",
        endocrine: "Niega diabetes y enfermedad tiroidea conocida.",
        psychiatric:
          "Preocupada por persistencia del dolor y limitación funcional."
      },
      results: {
        labs: ["No se solicitan laboratorios de rutina inicialmente"],
        imaging: [
          "Radiografía de hombro: sin fractura ni luxación",
          "Ecografía de hombro: tendinopatía del supraespinoso, sin ruptura completa evidente"
        ],
        complementaryStudies: [
          "Evaluación funcional compatible con compromiso del manguito rotador"
        ]
      }
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
        inspection: "Sin deformidad evidente.",
        palpation:
          "Dolor a la palpación en región lateral del hombro derecho y zona subacromial.",
        activeRangeOfMotion:
          "Dolor al elevar el brazo por encima de 90 grados.",
        passiveRangeOfMotion:
          "Menos dolorosa que la movilidad activa, relativamente conservada.",
        painfulArc: "Dolor entre 60 y 120 grados de abducción.",
        strength:
          "Disminución de fuerza por dolor en abducción y rotación externa.",
        neer: "Prueba de Neer positiva.",
        hawkins: "Prueba de Hawkins-Kennedy positiva.",
        jobe: "Prueba de Jobe positiva por dolor y debilidad.",
        dropArm: "Negativa.",
        speed: "Negativa.",
        yergason: "Negativa."
      },
      cervical:
        "Movilidad cervical conservada. No reproduce claramente el dolor.",
      neurovascularUpperLimb:
        "Sensibilidad distal conservada, pulsos presentes, sin déficit motor distal claro.",
      cardiovascular: "Ruidos cardíacos rítmicos, sin hallazgos relevantes.",
      respiratory: "Campos pulmonares sin ruidos agregados.",
      neurologic: {
        motor: "Fuerza distal conservada.",
        reflexes: "Reflejos simétricos.",
        sensory: "Sensibilidad distal conservada."
      }
    },
    evaluationChecklist: [
      "Caracterizó dolor de hombro.",
      "Preguntó duración.",
      "Preguntó limitación funcional.",
      "Preguntó trauma.",
      "Exploró movilidad activa y pasiva.",
      "Realizó maniobras de manguito rotador.",
      "Evaluó cuello y neurovascular distal.",
      "Reconoció signos compatibles con manguito rotador."
    ]
  },

  {
    id: "case-4",
    publicLabel: "Paciente 4",
    publicSex: "Masculino",
    publicAge: 27,
    simulatedPerson: {
      fullName: "Javier Andrés Correa Gómez",
      age: 27,
      sex: "Masculino",
      occupation: "Mensajero",
      personality:
        "Paciente joven, incómodo por el dolor abdominal, responde con preocupación y se queja al moverse."
    },
    hiddenAcademicObjective:
      "Reconocer dolor abdominal agudo compatible con apendicitis aguda.",
    mainComplaint:
      "Doctor, tengo un dolor muy fuerte en el lado derecho del abdomen.",
    conversationBehavior: {
      baseline:
        "Responde con frases cortas porque está incómodo. Si le preguntan bien, describe la evolución del dolor.",
      ifEmpathic:
        "Coopera mejor y permite orientar la historia.",
      ifRudeOrDisorganized:
        "Se desespera y dice que le duele mucho.",
      ifTooManyQuestions:
        "Dice que le pregunten de a poquito porque el dolor no lo deja concentrarse."
    },
    importantNegatives: [
      "Niega diarrea.",
      "Niega disuria.",
      "Niega hematuria.",
      "Niega trauma.",
      "Niega dolor testicular.",
      "Niega antecedentes quirúrgicos abdominales."
    ],
    responseGuide: {
      topicAnswers: {
        "dolor":
          "Me empezó alrededor del ombligo y ahora lo siento más abajo a la derecha.",
        "inicio":
          "Empezó ayer, hace como 18 horas.",
        "vomito":
          "Sí, he vomitado dos veces y tengo muchas náuseas.",
        "apetito":
          "No me provoca comer nada.",
        "fiebre":
          "Me he sentido caliente, como con fiebre.",
        "diarrea":
          "No doctor, diarrea no he tenido.",
        "orina":
          "No me arde para orinar ni he visto sangre."
      }
    },
    hiddenHistory: {
      identification: {
        fullName: "Javier Andrés Correa Gómez",
        documentId: "1.037.456.219",
        bloodTypeRh: "O positivo (O+)",
        age: 27,
        sex: "Masculino",
        genderIdentity: "Hombre cisgénero",
        ethnicity: "Se autorreconoce como mestizo",
        birthDate: "1999-03-21",
        phone: "300 000 0004",
        address: "Medellín, Antioquia",
        socioeconomicStratum: "Estrato 2",
        educationLevel: "Bachillerato completo",
        residenceArea: "Residencia urbana",
        insurance: "EPS simulada Savia Salud",
        maritalStatus: "Soltero",
        occupation: "Mensajero",
        placeOfBirth: "Medellín, Antioquia",
        emergencyContact: "Madre: Luz Gómez, 300 000 0104",
        dominantHand: "Diestro",
        mainLanguage: "Español",
        disability: "No refiere discapacidad conocida",
        companion: "Acude acompañado por la madre",
        informantReliability: "Información confiable"
      },
      presentIllness:
        "Dolor abdominal de 18 horas de evolución, inicialmente periumbilical y luego migrado a fosa ilíaca derecha. Progresivo, empeora al caminar y moverse. Asociado a náuseas, dos episodios de vómito, hiporexia y sensación febril.",
      history: {
        pathological: [
          "Niega hipertensión",
          "Niega diabetes",
          "Niega enfermedad gastrointestinal previa"
        ],
        surgical: ["Niega cirugías previas"],
        traumatic: ["Niega trauma reciente"],
        pharmacological: ["Acetaminofén ocasional"],
        allergies: ["Niega alergias medicamentosas conocidas"],
        toxicological: [
          "Alcohol social ocasional",
          "Niega tabaquismo",
          "Niega sustancias psicoactivas"
        ],
        family: ["Padre con hipertensión arterial"],
        occupational: ["Mensajero, pasa gran parte del día en moto"],
        epidemiological: [
          "Niega viajes recientes",
          "Niega consumo de alimentos en mal estado claramente identificado"
        ]
      },
      reviewOfSystems: {
        general: "Sensación febril, malestar e hiporexia.",
        cardiovascular: "Niega dolor torácico o palpitaciones.",
        respiratory: "Niega tos o disnea.",
        gastrointestinal:
          "Dolor abdominal migratorio, náuseas, vómito e hiporexia. Niega diarrea.",
        genitourinary:
          "Niega disuria, hematuria o dolor testicular.",
        neurologic: "Niega pérdida de conciencia o convulsiones.",
        musculoskeletal: "Dolor aumenta con la marcha por el movimiento abdominal.",
        skin: "Niega lesiones cutáneas.",
        endocrine: "Niega diabetes.",
        psychiatric: "Ansioso por el dolor."
      },
      results: {
        labs: [
          "Leucocitos 15.200",
          "Neutrofilia",
          "PCR elevada"
        ],
        imaging: [
          "Ecografía abdominal compatible con apendicitis aguda"
        ],
        complementaryStudies: [
          "Parcial de orina sin datos sugestivos de infección urinaria"
        ]
      }
    },
    physicalExam: {
      vitalSigns: {
        bloodPressure: "118/72 mmHg",
        heartRate: "102 lpm",
        respiratoryRate: "20 rpm",
        oxygenSaturation: "98%",
        temperature: "38.1 °C"
      },
      general: "Paciente incómodo, camina lento por dolor.",
      abdomen: {
        inspection: "Sin distensión marcada.",
        auscultation: "Ruidos intestinales presentes.",
        palpation: "Dolor en fosa ilíaca derecha.",
        guarding: "Defensa localizada en fosa ilíaca derecha.",
        rebound: "Blumberg positivo.",
        mcburney: "McBurney positivo.",
        rovsing: "Rovsing positivo.",
        psoas: "Psoas positivo leve.",
        obturator: "Obturador negativo.",
        masses: "No se palpan masas."
      },
      genitourinary: "Sin dolor testicular referido.",
      cardiovascular: "Taquicardia leve, sin soplos.",
      respiratory: "Campos pulmonares sin ruidos agregados.",
      neurologic: "Sin déficit neurológico focal."
    },
    evaluationChecklist: [
      "Caracterizó inicio del dolor.",
      "Preguntó migración del dolor.",
      "Preguntó náuseas y vómito.",
      "Preguntó fiebre e hiporexia.",
      "Descartó diarrea y síntomas urinarios.",
      "Exploró abdomen.",
      "Buscó signos de irritación peritoneal.",
      "Reconoció abdomen agudo inflamatorio."
    ]
  },

  {
    id: "case-5",
    publicLabel: "Paciente 5",
    publicSex: "Masculino",
    publicAge: 58,
    simulatedPerson: {
      fullName: "Carlos Alberto Londoño Ruiz",
      age: 58,
      sex: "Masculino",
      occupation: "Conductor de taxi",
      personality:
        "Paciente ansioso, asustado por el dolor en el pecho, responde con preocupación."
    },
    hiddenAcademicObjective:
      "Reconocer dolor torácico sugestivo de síndrome coronario agudo.",
    mainComplaint:
      "Tengo un dolor muy fuerte en el pecho desde hace rato.",
    conversationBehavior: {
      baseline:
        "Responde preocupado, con frases cortas. Quiere saber si es algo grave.",
      ifEmpathic:
        "Se calma un poco y describe mejor el dolor.",
      ifRudeOrDisorganized:
        "Se angustia y se irrita.",
      ifTooManyQuestions:
        "Dice que no puede responder tantas cosas al tiempo porque le duele el pecho."
    },
    importantNegatives: [
      "Niega trauma.",
      "Niega dolor que cambie con palpación.",
      "Niega fiebre.",
      "Niega tos productiva.",
      "Niega síncope.",
      "Niega consumo reciente de cocaína."
    ],
    responseGuide: {
      topicAnswers: {
        "dolor":
          "Es una presión fuerte en el centro del pecho.",
        "inicio":
          "Empezó hace como una hora.",
        "irradiacion":
          "Se me va para el brazo izquierdo y como hacia la mandíbula.",
        "sudor":
          "Sí doctor, estoy sudando frío.",
        "nauseas":
          "Sí, me han dado náuseas.",
        "reposo":
          "Me quedé quieto, pero no se me quitó del todo.",
        "fumador":
          "Sí, fumo desde hace muchos años."
      }
    },
    hiddenHistory: {
      identification: {
        fullName: "Carlos Alberto Londoño Ruiz",
        documentId: "71.456.982",
        bloodTypeRh: "A positivo (A+)",
        age: 58,
        sex: "Masculino",
        genderIdentity: "Hombre cisgénero",
        ethnicity: "Se autorreconoce como mestizo",
        birthDate: "1968-08-12",
        phone: "300 000 0005",
        address: "Bello, Antioquia",
        socioeconomicStratum: "Estrato 3",
        educationLevel: "Bachillerato completo",
        residenceArea: "Residencia urbana",
        insurance: "EPS simulada Salud Total",
        maritalStatus: "Casado",
        occupation: "Conductor de taxi",
        placeOfBirth: "Bello, Antioquia",
        emergencyContact: "Esposa: Patricia Ruiz, 300 000 0105",
        dominantHand: "Diestro",
        mainLanguage: "Español",
        disability: "No refiere discapacidad conocida",
        companion: "Acude solo",
        informantReliability: "Información confiable"
      },
      presentIllness:
        "Dolor torácico retroesternal opresivo de una hora de evolución, intensidad 8/10, irradiado a brazo izquierdo y mandíbula, asociado a diaforesis, náuseas y disnea. No mejora completamente con reposo.",
      history: {
        pathological: [
          "Hipertensión arterial",
          "Diabetes mellitus tipo 2",
          "Dislipidemia"
        ],
        surgical: ["Niega cirugías cardíacas previas"],
        traumatic: ["Niega trauma torácico"],
        pharmacological: [
          "Losartán",
          "Metformina",
          "Atorvastatina de uso irregular"
        ],
        allergies: ["Niega alergias medicamentosas conocidas"],
        toxicological: [
          "Fumador activo de larga data",
          "Alcohol social ocasional",
          "Niega consumo de cocaína u otras sustancias"
        ],
        family: [
          "Padre falleció por infarto",
          "Madre hipertensa"
        ],
        occupational: [
          "Conductor de taxi",
          "Sedentarismo por largas jornadas laborales"
        ],
        epidemiological: [
          "Niega fiebre o síntomas respiratorios infecciosos recientes"
        ]
      },
      reviewOfSystems: {
        general: "Diaforesis y ansiedad.",
        cardiovascular:
          "Dolor torácico opresivo, irradiado a brazo izquierdo y mandíbula.",
        respiratory: "Sensación de falta de aire.",
        gastrointestinal: "Náuseas, sin vómito claro.",
        genitourinary: "Niega síntomas urinarios.",
        neurologic: "Niega pérdida de conciencia o déficit focal.",
        musculoskeletal:
          "Dolor no se reproduce claramente con palpación o movimiento.",
        skin: "Sudoración fría.",
        endocrine: "Diabetes mellitus tipo 2.",
        psychiatric: "Ansioso por el dolor torácico."
      },
      results: {
        labs: [
          "Troponina elevada",
          "Glicemia elevada",
          "Creatinina 1.0 mg/dL"
        ],
        imaging: [
          "Radiografía de tórax sin hallazgos agudos evidentes"
        ],
        complementaryStudies: [
          "ECG: elevación del ST en cara inferior"
        ]
      }
    },
    physicalExam: {
      vitalSigns: {
        bloodPressure: "154/92 mmHg",
        heartRate: "108 lpm",
        respiratoryRate: "24 rpm",
        oxygenSaturation: "95%",
        temperature: "36.7 °C"
      },
      general: "Paciente ansioso, diaforético, con dolor.",
      cardiovascular: {
        rhythm: "Rítmico, taquicárdico.",
        heartSounds: "Ruidos cardíacos rítmicos.",
        murmurs: "Sin soplos evidentes.",
        peripheralPulses: "Pulsos presentes."
      },
      respiratory: {
        auscultation: "Murmullo vesicular conservado.",
        addedSounds: "Sin sibilancias ni crépitos."
      },
      chestWall:
        "El dolor no se reproduce claramente con la palpación de la pared torácica.",
      abdomen: "Blando, no doloroso.",
      neurologic: "Sin déficit neurológico focal."
    },
    evaluationChecklist: [
      "Caracterizó dolor torácico.",
      "Preguntó irradiación.",
      "Preguntó duración e inicio.",
      "Preguntó diaforesis, náuseas y disnea.",
      "Indagó factores de riesgo cardiovascular.",
      "Preguntó tabaquismo.",
      "Solicitó signos vitales.",
      "Solicitó ECG y troponinas.",
      "Reconoció signos de alarma."
    ]
  },

  {
    id: "case-6",
    publicLabel: "Paciente 6",
    publicSex: "Femenino",
    publicAge: 64,
    simulatedPerson: {
      fullName: "Rosa Elena Martínez Salazar",
      age: 64,
      sex: "Femenino",
      occupation: "Vendedora informal",
      personality:
        "Paciente cansada, con tos, algo agitada, preocupada porque le falta el aire."
    },
    hiddenAcademicObjective:
      "Reconocer síndrome febril respiratorio compatible con neumonía adquirida en la comunidad.",
    mainComplaint: "Tengo mucha tos y me falta el aire.",
    conversationBehavior: {
      baseline:
        "Responde con pausas porque tose y se cansa. Describe síntomas si le preguntan.",
      ifEmpathic:
        "Coopera mejor y se siente acompañada.",
      ifRudeOrDisorganized:
        "Se cansa y responde muy poco.",
      ifTooManyQuestions:
        "Dice que se ahoga y pide que le pregunten más despacio."
    },
    importantNegatives: [
      "Niega dolor torácico opresivo.",
      "Niega hemoptisis.",
      "Niega pérdida de conciencia.",
      "Niega edema en piernas.",
      "Niega contacto claro con tuberculosis.",
      "Niega viaje reciente."
    ],
    responseGuide: {
      topicAnswers: {
        "tos":
          "Empezó seca, pero ahora boto flema amarilla.",
        "fiebre":
          "Me he sentido con fiebre y escalofríos.",
        "aire":
          "Me falta el aire, sobre todo cuando camino o hablo mucho.",
        "dolor":
          "Me duele el pecho cuando respiro profundo o cuando toso.",
        "flema":
          "La flema es amarillenta.",
        "cigarrillo":
          "Fumé antes, pero ya no fumo."
      }
    },
    hiddenHistory: {
      identification: {
        fullName: "Rosa Elena Martínez Salazar",
        documentId: "43.222.908",
        bloodTypeRh: "B positivo (B+)",
        age: 64,
        sex: "Femenino",
        genderIdentity: "Mujer cisgénero",
        ethnicity: "Se autorreconoce como mestiza",
        birthDate: "1962-11-03",
        phone: "300 000 0006",
        address: "Medellín, Antioquia",
        socioeconomicStratum: "Estrato 2",
        educationLevel: "Primaria completa",
        residenceArea: "Residencia urbana",
        insurance: "EPS simulada Savia Salud",
        maritalStatus: "Separada",
        occupation: "Vendedora informal",
        placeOfBirth: "Medellín, Antioquia",
        emergencyContact: "Hijo: Juan Martínez, 300 000 0106",
        dominantHand: "Diestra",
        mainLanguage: "Español",
        disability: "No refiere discapacidad conocida",
        companion: "Consulta acompañada por su hijo",
        informantReliability: "Información confiable"
      },
      presentIllness:
        "Cuadro de 5 días de evolución con tos inicialmente seca, luego productiva con expectoración amarillenta, fiebre subjetiva, escalofríos, dolor torácico pleurítico, disnea progresiva y fatiga.",
      history: {
        pathological: [
          "Hipertensión arterial",
          "EPOC leve referido"
        ],
        surgical: ["Colecistectomía hace varios años"],
        traumatic: ["Niega trauma reciente"],
        pharmacological: [
          "Losartán",
          "Salbutamol inhalado ocasional"
        ],
        allergies: ["Niega alergias medicamentosas conocidas"],
        toxicological: [
          "Exfumadora",
          "Niega alcohol en exceso",
          "Niega sustancias psicoactivas"
        ],
        gynecoObstetric: [
          "Menopausia desde hace varios años",
          "Niega sangrado genital actual"
        ],
        family: [
          "Madre hipertensa",
          "Niega tuberculosis familiar conocida"
        ],
        occupational: [
          "Vendedora informal",
          "Trabaja en calle, expuesta a cambios de clima"
        ],
        epidemiological: [
          "Niega viaje reciente",
          "Niega contacto claro con tuberculosis",
          "Refiere contacto con personas con gripa en el trabajo"
        ]
      },
      reviewOfSystems: {
        general: "Fiebre subjetiva, escalofríos y fatiga.",
        cardiovascular:
          "Niega dolor torácico opresivo, palpitaciones o edema.",
        respiratory:
          "Tos productiva, expectoración amarilla, disnea y dolor pleurítico.",
        gastrointestinal:
          "Disminución del apetito, sin vómito persistente ni diarrea.",
        genitourinary: "Niega disuria.",
        neurologic: "Niega pérdida de conciencia o déficit focal.",
        musculoskeletal: "Dolor en el pecho asociado a tos y respiración profunda.",
        skin: "Niega lesiones cutáneas.",
        endocrine: "Niega diabetes conocida.",
        psychiatric: "Preocupada por la falta de aire."
      },
      results: {
        labs: [
          "Leucocitosis",
          "Neutrofilia",
          "PCR elevada"
        ],
        imaging: [
          "Radiografía de tórax: consolidación basal derecha"
        ],
        complementaryStudies: [
          "Oximetría con saturación disminuida",
          "Gram de esputo no disponible inicialmente"
        ]
      }
    },
    physicalExam: {
      vitalSigns: {
        bloodPressure: "126/78 mmHg",
        heartRate: "104 lpm",
        respiratoryRate: "26 rpm",
        oxygenSaturation: "91%",
        temperature: "38.5 °C"
      },
      general: "Paciente febril, taquipneica, cansada.",
      respiratory: {
        inspection: "Uso leve de músculos accesorios.",
        palpation: "Expansión torácica algo disminuida en base derecha.",
        percussion: "Matidez leve en base pulmonar derecha.",
        auscultation:
          "Disminución del murmullo vesicular en base derecha con crepitantes.",
        addedSounds: "Crepitantes en base pulmonar derecha."
      },
      cardiovascular: {
        rhythm: "Rítmico, taquicárdico.",
        heartSounds: "Ruidos cardíacos sin soplos evidentes."
      },
      abdomen: "Blando, no doloroso.",
      extremities: "Sin edema.",
      neurologic: "Alerta y orientada, sin déficit focal."
    },
    evaluationChecklist: [
      "Caracterizó tos.",
      "Preguntó expectoración.",
      "Preguntó fiebre y escalofríos.",
      "Preguntó disnea.",
      "Preguntó dolor pleurítico.",
      "Exploró antecedentes respiratorios.",
      "Solicitó signos vitales.",
      "Realizó examen pulmonar dirigido.",
      "Solicitó radiografía de tórax."
    ]
  }
];

export function getCaseById(caseId: string | undefined | null): CaseData {
  return CASES.find((item) => item.id === caseId) || CASES[0];
}