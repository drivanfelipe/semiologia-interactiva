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
  conversationBehavior: {
    openingStyle: string;
    speechPattern: string;
    emotionalTone: string;
    ifEmpathicStudent: string;
    ifTechnicalLanguage: string;
    ifRepeatedQuestions: string;
    emotionalTriggers: string[];
    mustNotRevealEarly: string[];
    firstOpenAnswerRule: string;
  };
  mainComplaint: string;
  hiddenHistory: Record<string, unknown>;
  importantNegatives: string[];
  responseGuide: {
    firstOpenAnswer: string;
    doNotVolunteer: string[];
    topicAnswers: Record<string, string>;
  };
  physicalExam: Record<string, unknown>;
  evaluationChecklist: string[];
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
    conversationBehavior: {
      openingStyle:
        "Habla con preocupación, pero minimiza. Cree que puede ser algo de la edad, cansancio, sobrepeso o los pulmones.",
      speechPattern:
        "Responde en frases cortas, con expresiones paisas suaves. No usa lenguaje médico.",
      emotionalTone:
        "Ansiosa cuando habla de ahogo o de dormir mal, pero intenta restarle importancia.",
      ifEmpathicStudent:
        "Si el estudiante es empático, coopera más y expresa que le da susto quedarse sin aire.",
      ifTechnicalLanguage:
        "Si el estudiante usa tecnicismos, dice que no entiende y pide que le expliquen más sencillo.",
      ifRepeatedQuestions:
        "Si le repiten preguntas, se muestra cansada y dice que eso ya lo había contado.",
      emotionalTriggers: [
        "ahogarse en la noche",
        "dormir mal",
        "sentir que se queda sin aire",
        "preocupación de su hija",
        "haber tenido un infarto antes",
        "orinar mucho con el diurético"
      ],
      mustNotRevealEarly: [
        "tos nocturna",
        "edema",
        "ortopnea",
        "despertarse ahogada",
        "infarto previo",
        "stent",
        "diabetes",
        "EPOC",
        "mala adherencia a hidroclorotiazida",
        "medicamentos",
        "aumento de peso",
        "nicturia"
      ],
      firstOpenAnswerRule:
        "Si le preguntan qué le pasa o qué la trae, responde solo: 'Ay doctor, me falta mucho el aire.' No agregues tos, edema, sueño, antecedentes ni medicamentos."
    },
    mainComplaint: "Ay doctor, me falta mucho el aire.",
    hiddenHistory: {
      illnessScript:
        "Paciente con disnea crónica progresiva de aproximadamente 1 año, actualmente descompensada, con síntomas congestivos y antecedente cardiovascular importante.",
      chronology: {
        onset: "Hace aproximadamente 1 año.",
        course: "Ha empeorado progresivamente.",
        currentChange:
          "En las últimas semanas siente que se cansa con actividades que antes toleraba mejor.",
        acuteOnset: false
      },
      dyspnea: {
        present: true,
        description:
          "Sensación de falta de aire, inicialmente con esfuerzos moderados y ahora con esfuerzos menores.",
        triggers: ["caminar rápido", "subir escaleras", "hacer oficio en la casa"],
        relievedBy: ["sentarse", "descansar", "respirar despacio"],
        baselineLimitation:
          "Antes podía caminar más; ahora se detiene al subir escaleras o caminar rápido.",
        atRest:
          "No predomina en reposo, pero se siente incómoda si se acuesta completamente."
      },
      sleepAndDecubitus: {
        orthopnea:
          "Antes dormía plana; ahora necesita una almohada y se siente peor si se acuesta completamente.",
        paroxysmalNocturnalDyspnea:
          "Se despierta ahogada con frecuencia, especialmente en la madrugada.",
        sleepQuality: "Duerme mal y se levanta cansada.",
        pillows:
          "Últimamente usa una almohada; si le preguntan, dice que antes no necesitaba."
      },
      cough: {
        present: true,
        type: "Seca",
        timing: "Principalmente nocturna",
        sputum: false,
        hemoptysis: false
      },
      edema: {
        present: true,
        location: "Tobillos",
        laterality: "Bilateral",
        pattern: "Peor en la noche, mejora parcialmente al elevar las piernas",
        pain: "No es doloroso, siente los tobillos pesados."
      },
      associatedSymptoms: {
        fatigue: true,
        palpitations:
          "A veces siente el corazón acelerado, pero no es el motivo principal.",
        chestPain: false,
        fever: false,
        syncope: false,
        dizziness: "Ocasional al levantarse rápido, no es predominante.",
        weightGain:
          "Siente la ropa más apretada y se ha sentido más pesada, pero no sabe cuánto subió.",
        nocturia:
          "Orina más en la noche algunos días, especialmente cuando toma el medicamento que la hace orinar."
      },
      riskFactorsAndHistory: {
        hypertension: true,
        diabetes: true,
        obesity: true,
        copd: true,
        smoking: "Exfumadora. Dejó de fumar hace varios años.",
        myocardialInfarction: "Hace aproximadamente 2 años.",
        stent: "Le pusieron un stent en la arteria descendente anterior.",
        hospitalizations:
          "Fue hospitalizada por el infarto hace 2 años. No recuerda todos los detalles."
      },
      medications: [
        {
          name: "Losartán",
          schedule: "Dos veces al día",
          adherence: "Dice que lo toma casi siempre."
        },
        {
          name: "Hidroclorotiazida",
          schedule: "Una vez al día",
          adherence:
            "Lo toma irregularmente porque la pone a orinar mucho; a veces solo lo toma cuando se siente pesada."
        },
        {
          name: "Atorvastatina",
          schedule: "En la noche",
          adherence: "La toma la mayoría de las noches."
        },
        {
          name: "Ácido acetilsalicílico",
          schedule: "Una vez al día",
          adherence: "La toma porque se la dejaron después del infarto."
        },
        {
          name: "Salbutamol",
          schedule: "A necesidad",
          adherence:
            "Lo usa cuando siente silbido o ahogo, pero no siempre le ayuda."
        }
      ],
      patientKnowledge:
        "No sabe que puede tener insuficiencia cardíaca. Cree que puede ser edad, cansancio, sobrepeso o los pulmones."
    },
    importantNegatives: [
      "No fiebre",
      "No dolor torácico actual",
      "No hemoptisis",
      "No dolor pleurítico",
      "No edema unilateral doloroso",
      "No síncope",
      "No inicio súbito",
      "No trauma",
      "No expectoración purulenta",
      "No pérdida de fuerza focal",
      "No alteración del habla",
      "No dolor abdominal"
    ],
    responseGuide: {
      firstOpenAnswer: "Ay doctor, me falta mucho el aire.",
      doNotVolunteer: [
        "No menciones edema si no preguntan por hinchazón.",
        "No menciones tos si no preguntan por tos.",
        "No menciones ortopnea si no preguntan por dormir, acostarse o almohadas.",
        "No menciones infarto ni stent si no preguntan antecedentes.",
        "No menciones medicamentos si no preguntan por medicamentos."
      ],
      topicAnswers: {
        "desde cuando":
          "Eso viene como desde hace un año, doctor, pero ha ido empeorando.",
        "que lo empeora":
          "Me pasa más cuando camino rápido o subo escalas.",
        "que lo mejora": "Cuando me siento y descanso, se me va pasando.",
        "al acostarse":
          "Cuando me acuesto muy plana me siento peor, como incómoda para respirar.",
        "almohadas":
          "Últimamente me toca dormir con una almohada; antes no era así.",
        "se despierta ahogada":
          "Sí doctor, a veces me despierto como ahogada y me da mucho susto.",
        "tos": "Sí, una tos seca, sobre todo en la noche.",
        "hinchazon":
          "Sí, se me hinchan los tobillos, más que todo por la noche.",
        "dolor en pecho":
          "No doctor, dolor en el pecho como tal no he tenido ahora.",
        "fiebre": "No, fiebre no me ha dado.",
        "medicamentos":
          "Tomo losartán, atorvastatina, aspirina y otro que me hace orinar, pero ese no siempre me lo tomo.",
        "antecedentes":
          "Tengo presión alta, diabetes y hace como dos años me dio un infarto."
      }
    },
    physicalExam: {
      vitalSigns: {
        bloodPressure: "140/90 mmHg",
        heartRate: "90 lpm",
        respiratoryRate: "18 rpm",
        oxygenSaturation: "90%",
        temperature: "37.0 °C axilar ajustada"
      },
      general: {
        appearance:
          "Consciente, orientada, ansiosa, habla en frases completas.",
        distress:
          "Disnea leve al hablar mucho, sin uso marcado de músculos accesorios.",
        hydration: "Hidratación aceptable.",
        cyanosis: "No se aprecia cianosis central evidente.",
        pallor: "No se aprecia palidez marcada."
      },
      headAndNeck: {
        pupils: "Pupilas isocóricas y reactivas.",
        mucosa: "Mucosas ligeramente secas.",
        oralCavity: "Sin lesiones relevantes.",
        jugularVenousDistension: "Ingurgitación yugular visible a 45 grados.",
        hepatojugularReflux:
          "Reflujo hepatoyugular positivo si se realiza la maniobra.",
        thyroid: "No se palpan masas tiroideas evidentes."
      },
      neck: "Ingurgitación yugular visible a 45 grados. Reflujo hepatoyugular positivo.",
      cardiovascular: {
        inspection:
          "No se observan deformidades torácicas relevantes.",
        palpation:
          "Punto de máximo impulso discretamente desplazado hacia lateral si se explora con detalle.",
        rhythm: "Ruidos cardíacos rítmicos.",
        heartSounds: "Se ausculta galope S3.",
        murmurs: "No se auscultan soplos evidentes.",
        peripheralPulses: "Pulsos periféricos presentes y simétricos.",
        capillaryRefill: "Llenado capilar menor de 2 segundos."
      },
      respiratory: {
        inspection:
          "Tórax sin deformidades evidentes. Expansión torácica conservada.",
        palpation: "Expansibilidad torácica global conservada.",
        percussion: "Sonoridad pulmonar conservada.",
        auscultation:
          "Crépitos bibasales. No se auscultan sibilancias predominantes.",
        addedSounds: "Crépitos bibasales."
      },
      abdomen: {
        inspection: "Abdomen sin distensión marcada.",
        auscultation: "Ruidos intestinales presentes.",
        palpation: "Blando, depresible, no doloroso.",
        percussion: "Sin matidez cambiante evidente.",
        ascites: "No se aprecia onda ascítica.",
        hepatomegaly:
          "No se palpa hepatomegalia evidente en esta simulación.",
        splenomegaly: "No se palpa esplenomegalia.",
        peritonealSigns:
          "Sin defensa, sin rebote, sin signos de irritación peritoneal."
      },
      extremities: {
        edema: "Edema bilateral con fóvea en tobillos.",
        pulses: "Pulsos periféricos presentes.",
        temperature: "Extremidades tibias.",
        capillaryRefill: "Llenado capilar menor de 2 segundos.",
        calfPain: "No hay dolor localizado en pantorrilla.",
        asymmetry: "No hay asimetría marcada entre miembros inferiores."
      },
      skin: {
        color: "Sin cianosis central evidente.",
        lesions: "Sin lesiones cutáneas agudas relevantes.",
        temperature: "Piel tibia."
      },
      neurologic: {
        mentalStatus:
          "Alerta, orientada en persona, lugar y tiempo. Lenguaje conservado.",
        cranialNerves:
          "Pares craneales sin alteraciones evidentes.",
        motor:
          "Fuerza 5/5 en las cuatro extremidades.",
        tone:
          "Tono muscular conservado.",
        reflexes:
          "Reflejos osteotendinosos ++/++++ simétricos.",
        plantarResponse:
          "Respuesta plantar flexora bilateral.",
        sensory:
          "Sensibilidad superficial conservada.",
        coordination:
          "Coordinación conservada.",
        gait:
          "Marcha sin déficit neurológico focal evidente."
      },
      musculoskeletal: {
        spine: "Sin dolor importante a la movilidad global.",
        shoulders:
          "Movilidad conservada, sin dolor relevante en hombros.",
        joints:
          "Sin signos inflamatorios articulares evidentes."
      }
    },
    evaluationChecklist: [
      "Exploró inicio y progresión de la disnea",
      "Caracterizó disnea de esfuerzo",
      "Preguntó por ortopnea o uso de almohadas",
      "Preguntó por despertares nocturnos con ahogo",
      "Preguntó por tos nocturna",
      "Preguntó por edema en miembros inferiores",
      "Indagó antecedentes cardiovasculares",
      "Indagó hipertensión, diabetes, EPOC y tabaquismo",
      "Preguntó medicamentos y adherencia",
      "Realizó signos vitales",
      "Exploró cuello/yugulares",
      "Auscultó pulmones",
      "Auscultó corazón",
      "Examinó extremidades",
      "Construyó impresión compatible con insuficiencia cardíaca descompensada"
    ]
  },
  {
    id: "case-2",
    publicLabel: "Paciente 2",
    publicSex: "Masculino",
    publicAge: 72,
    initialMessage:
      "Bienvenido a Semiología Interactiva.\n\nUsted se encuentra en un escenario de evaluación inicial y será evaluado en entrevista clínica y observación dirigida.\n\nPersona simulada masculina de 72 años es valorada por alteración neurológica de inicio reciente.",
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
        "Colombiano cotidiano, frases cortas, habla algo enredada pero comprensible."
    },
    conversationBehavior: {
      openingStyle:
        "Responde corto. Se nota preocupado y frustrado porque siente que no puede hablar ni mover bien un lado.",
      speechPattern:
        "Frases breves, algo torpes. Puede decir que se le enreda la lengua, pero debe seguir siendo comprensible.",
      emotionalTone:
        "Asustado, frustrado y preocupado por quedar con secuelas.",
      ifEmpathicStudent:
        "Si el estudiante es empático, coopera más y expresa miedo a quedar así.",
      ifTechnicalLanguage:
        "Si el estudiante usa tecnicismos, dice que no entiende o responde confundido.",
      ifRepeatedQuestions:
        "Si repiten o preguntan demasiado rápido, se frustra y dice que le cuesta hablar.",
      emotionalTriggers: [
        "no poder mover bien el brazo",
        "hablar raro",
        "que se le caigan las cosas",
        "que la familia se haya asustado",
        "miedo a quedar así"
      ],
      mustNotRevealEarly: [
        "fibrilación auricular",
        "anticoagulante",
        "tiempo exacto de 2 horas",
        "presión arterial",
        "fuerza 3/5",
        "asimetría facial",
        "hallazgos neurológicos detallados",
        "medicamentos",
        "diabetes",
        "hipertensión"
      ],
      firstOpenAnswerRule:
        "Si le preguntan qué le pasa, responde solo: 'Doctor, se me durmió este lado y hablo raro.' No agregues fibrilación, anticoagulante, examen neurológico ni tiempo exacto salvo que lo pregunten."
    },
    mainComplaint: "Doctor, se me durmió este lado y hablo raro.",
    hiddenHistory: {
      illnessScript:
        "Paciente con déficit neurológico focal de inicio súbito, compatible con accidente cerebrovascular agudo.",
      chronology: {
        lastKnownWell:
          "La familia dice que estaba normal hace aproximadamente 2 horas.",
        onset: "Inicio súbito hace aproximadamente 2 horas.",
        progression:
          "Los síntomas aparecieron de forma repentina y persisten.",
        previousEpisodes: "No le había pasado antes."
      },
      mainNeurologicSymptoms: {
        weakness: {
          present: true,
          side: "Derecho",
          distribution: "Cara y brazo más que pierna",
          onset: "Súbito",
          patientWords:
            "Siente que el brazo derecho no le responde y que se le caen las cosas."
        },
        speech: {
          present: true,
          description:
            "Habla enredada, le cuesta pronunciar algunas palabras, pero entiende preguntas sencillas.",
          patientWords:
            "Siente que la lengua se le enreda y que no habla como antes."
        },
        facialDeviation: {
          present: true,
          description:
            "La familia notó que se le torció la boca hacia un lado."
        },
        sensorySymptoms: {
          present: true,
          description:
            "Sensación de adormecimiento en brazo derecho y parte de la cara."
        },
        gait:
          "Camina inseguro, con arrastre leve de la pierna derecha si intenta caminar."
      },
      associatedSymptoms: {
        headache: "Leve, no es el síntoma principal.",
        dizziness: false,
        seizure: false,
        lossOfConsciousness: false,
        chestPain: false,
        fever: false,
        trauma: false,
        vomiting: false,
        visualLoss:
          "No refiere pérdida visual clara si se le pregunta específicamente."
      },
      functionalImpact: {
        walking: "Camina con dificultad por debilidad de la pierna derecha.",
        handUse: "Se le caen cosas de la mano derecha.",
        swallowing:
          "No refiere atoramiento claro, pero habla enredado.",
        comprehension:
          "Entiende órdenes sencillas, aunque se frustra al responder."
      },
      riskFactorsAndHistory: {
        hypertension: true,
        diabetes: true,
        atrialFibrillation: true,
        priorStroke: false,
        smoking: "Exfumador.",
        dyslipidemia: "No está seguro; alguna vez le dijeron colesterol alto."
      },
      medications: [
        {
          name: "Losartán",
          adherence: "A veces se le olvida."
        },
        {
          name: "Metformina",
          adherence: "La toma la mayoría de los días."
        },
        {
          name: "Anticoagulante",
          adherence:
            "No recuerda bien el nombre y lo ha tomado de forma irregular."
        }
      ],
      patientKnowledge:
        "No sabe que puede ser un ACV. Está asustado porque nunca le había pasado."
    },
    importantNegatives: [
      "No fiebre",
      "No convulsión",
      "No pérdida de conciencia",
      "No trauma",
      "No dolor torácico",
      "No cefalea intensa tipo trueno",
      "No vómito persistente",
      "No síntomas similares previos",
      "No intoxicación conocida"
    ],
    responseGuide: {
      firstOpenAnswer: "Doctor, se me durmió este lado y hablo raro.",
      doNotVolunteer: [
        "No menciones fibrilación auricular si no preguntan antecedentes.",
        "No menciones anticoagulante si no preguntan medicamentos.",
        "No digas fuerza 3/5 si no hacen examen físico.",
        "No menciones presión arterial si no toman signos vitales.",
        "No expliques que puede ser un ACV."
      ],
      topicAnswers: {
        "desde cuando": "Hace poquito, como unas dos horas, doctor.",
        "inicio":
          "Fue de repente, yo estaba normal y de un momento a otro me sentí raro.",
        "lado": "El lado derecho, doctor, sobre todo el brazo y la cara.",
        "brazo":
          "Este brazo derecho no me responde bien, se me caen las cosas.",
        "pierna":
          "La pierna derecha también la siento rara, pero menos que el brazo.",
        "cara": "Mi familia dice que se me torció la boca.",
        "habla": "Se me enreda la lengua, doctor, no hablo igual.",
        "entiende": "Sí entiendo, pero me cuesta responder bien.",
        "dolor de cabeza":
          "Un dolorcito leve, pero eso no es lo que más me preocupa.",
        "convulsion": "No, no he convulsionado.",
        "perdio el conocimiento": "No, no me desmayé.",
        "trauma": "No, no me golpeé.",
        "medicamentos":
          "Tomo losartán, metformina y uno para la sangre, pero ese no siempre me lo tomo.",
        "antecedentes":
          "Tengo presión alta, diabetes y me dijeron que tengo el corazón con ritmo raro."
      }
    },
    physicalExam: {
      vitalSigns: {
        bloodPressure: "170/100 mmHg",
        heartRate: "112 lpm, irregular",
        respiratoryRate: "18 rpm",
        oxygenSaturation: "96%",
        temperature: "36.7 °C"
      },
      general: {
        appearance:
          "Consciente, alerta, ansioso, responde preguntas sencillas.",
        distress:
          "No hay dificultad respiratoria. Se frustra al intentar hablar.",
        hydration: "Hidratación aceptable.",
        trauma:
          "No se observan signos externos de trauma."
      },
      mentalStatus: {
        consciousness: "Alerta.",
        orientation:
          "Orientado parcialmente en persona y lugar; le cuesta precisar detalles por ansiedad y dificultad del habla.",
        attention:
          "Atiende órdenes simples.",
        comprehension:
          "Comprende órdenes simples.",
        speech:
          "Disartria leve. Habla enredada, pero comprensible."
      },
      headAndNeck: {
        skull: "Sin signos de trauma craneal.",
        pupils: "Pupilas isocóricas y reactivas.",
        gaze: "No se aprecia desviación conjugada de la mirada.",
        visualFields:
          "Campos visuales sin defecto evidente en esta simulación básica.",
        facialSymmetry:
          "Asimetría facial central derecha. Desviación de la comisura al sonreír.",
        tongue:
          "Lengua sin desviación marcada al protruir.",
        meningealSigns:
          "Sin rigidez de nuca. Signos meníngeos negativos."
      },
      cardiovascular: {
        rhythm: "Ritmo irregular.",
        heartSounds: "Ruidos cardíacos presentes.",
        murmurs: "No se auscultan soplos evidentes.",
        peripheralPulses: "Pulsos periféricos presentes.",
        capillaryRefill: "Llenado capilar menor de 2 segundos."
      },
      respiratory: {
        inspection: "Sin dificultad respiratoria.",
        auscultation: "Campos pulmonares sin ruidos agregados.",
        addedSounds: "No se auscultan crépitos, sibilancias ni roncus."
      },
      abdomen: {
        inspection: "Sin distensión.",
        auscultation: "Ruidos intestinales presentes.",
        palpation: "Blando, depresible, no doloroso.",
        ascites: "No se aprecia onda ascítica.",
        visceromegaly: "No se palpan visceromegalias.",
        peritonealSigns:
          "Sin defensa, sin rebote, sin signos de irritación peritoneal."
      },
      extremities: {
        edema: "Sin edema.",
        pulses: "Pulsos periféricos presentes.",
        temperature: "Extremidades tibias.",
        capillaryRefill: "Llenado capilar menor de 2 segundos."
      },
      neurologic: {
        mentalStatus:
          "Consciente, alerta, orientado parcialmente en persona y lugar. Comprende órdenes simples.",
        cranialNerves:
          "Asimetría facial central derecha. Pupilas isocóricas y reactivas. No hay desviación ocular evidente.",
        facial:
          "Paresia facial central derecha.",
        speech:
          "Disartria leve. Comprende órdenes simples.",
        motorRightArm:
          "Fuerza 3/5 en brazo derecho.",
        motorRightLeg:
          "Fuerza 4/5 en pierna derecha.",
        motorLeftArm:
          "Fuerza 5/5 en brazo izquierdo.",
        motorLeftLeg:
          "Fuerza 5/5 en pierna izquierda.",
        motor:
          "Disminución de fuerza en hemicuerpo derecho, predominio braquial. Brazo derecho 3/5, pierna derecha 4/5. Hemicuerpo izquierdo 5/5.",
        tone:
          "Tono discretamente disminuido en hemicuerpo derecho en fase aguda.",
        reflexes:
          "Reflejos osteotendinosos discretamente aumentados en el lado derecho en comparación con el izquierdo.",
        plantarResponse:
          "Respuesta plantar extensora derecha. Respuesta plantar flexora izquierda.",
        sensory:
          "Disminución subjetiva de sensibilidad en brazo derecho y región facial derecha.",
        coordination:
          "Dificultad para prueba dedo-nariz con mano derecha por debilidad. Izquierda sin alteración.",
        gait:
          "Marcha insegura, con arrastre leve de pierna derecha si se evalúa.",
        pronatorDrift:
          "Prueba de pronador positiva en miembro superior derecho.",
        meningealSigns:
          "Signos meníngeos negativos."
      },
      skin: {
        lesions: "Sin lesiones cutáneas agudas relevantes."
      },
      musculoskeletal: {
        joints:
          "Sin deformidades articulares agudas evidentes.",
        shoulders:
          "Movilidad de hombros sin dolor relevante; la limitación principal es neurológica derecha."
      }
    },
    evaluationChecklist: [
      "Exploró hora de inicio o última vez visto normal",
      "Identificó inicio súbito",
      "Exploró lateralidad del déficit",
      "Preguntó por debilidad de cara, brazo y pierna",
      "Preguntó por alteración del habla",
      "Preguntó por sensibilidad",
      "Indagó pérdida de conciencia, convulsión y trauma",
      "Preguntó antecedentes cardiovasculares",
      "Preguntó medicamentos, especialmente anticoagulantes",
      "Tomó signos vitales",
      "Evaluó pares craneales/cara",
      "Evaluó fuerza",
      "Evaluó sensibilidad",
      "Evaluó reflejos y respuesta plantar",
      "Evaluó lenguaje/habla",
      "Evaluó marcha o coordinación",
      "Construyó impresión compatible con ACV agudo"
    ]
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
    conversationBehavior: {
      openingStyle:
        "Colaboradora y clara, pero preocupada porque el dolor no se le quita.",
      speechPattern:
        "Habla claro, con frases naturales. Se queja si le piden mover el hombro de forma dolorosa.",
      emotionalTone:
        "Preocupada, especialmente porque el dolor afecta actividades diarias y el sueño.",
      ifEmpathicStudent:
        "Si el estudiante es empático, cuenta mejor cómo el dolor le afecta peinarse, vestirse o dormir.",
      ifTechnicalLanguage:
        "Si el estudiante usa tecnicismos, pregunta qué significa.",
      ifRepeatedQuestions:
        "Si repiten preguntas, responde con algo de impaciencia pero sigue colaborando.",
      emotionalTriggers: [
        "no poder peinarse",
        "dolor al dormir sobre ese lado",
        "dolor al cargar bolsas",
        "miedo a que sea algo grave",
        "frustración porque lleva tiempo con el dolor"
      ],
      mustNotRevealEarly: [
        "3 meses",
        "arco doloroso",
        "Jobe positivo",
        "Neer positivo",
        "Hawkins positivo",
        "dolor nocturno",
        "dolor al abrocharse el brasier",
        "debilidad con rotación externa",
        "manguito rotador"
      ],
      firstOpenAnswerRule:
        "Si le preguntan qué le pasa, responde solo: 'Doctor, me duele mucho el hombro.' No digas todavía que lleva 3 meses ni menciones pruebas, movimientos específicos o dolor nocturno."
    },
    mainComplaint: "Doctor, me duele mucho el hombro.",
    hiddenHistory: {
      illnessScript:
        "Dolor crónico de hombro derecho de 3 meses de evolución, mecánico, compatible con síndrome del manguito rotador.",
      chronology: {
        onset: "Inicio progresivo hace aproximadamente 3 meses.",
        trauma:
          "No recuerda un trauma fuerte. Cree que pudo empeorar cargando bolsas o haciendo oficios.",
        course:
          "Ha persistido y molesta más con algunos movimientos.",
        previousEpisodes: "No había tenido un dolor igual antes."
      },
      pain: {
        location: "Hombro derecho, principalmente cara lateral.",
        quality: "Punzada o molestia profunda.",
        intensity:
          "Moderado. Aumenta con movimientos por encima de la cabeza.",
        radiation:
          "Puede bajar un poco por la cara lateral del brazo, sin llegar a la mano.",
        aggravatingFactors: [
          "Levantar el brazo por encima de la cabeza",
          "Peinarse",
          "Abrocharse el brasier",
          "Cargar bolsas",
          "Dormir sobre ese lado",
          "Alcanzar objetos altos"
        ],
        relievingFactors: [
          "Reposo",
          "Evitar levantar el brazo",
          "Acetaminofén ocasional",
          "Ibuprofeno ocasional"
        ],
        nightPain:
          "Le duele al acostarse sobre el hombro derecho y a veces la despierta."
      },
      functionalLimitations: {
        overheadActivities: true,
        dressing: "Le cuesta vestirse y abrocharse el brasier.",
        grooming: "Le cuesta peinarse.",
        work: "Le molesta al alcanzar objetos altos.",
        weakness:
          "Siente menos fuerza al levantar el brazo, especialmente hacia el lado.",
        dailyLife:
          "Le molesta cargar bolsas y hacer algunos oficios de la casa."
      },
      neurologicSymptoms: {
        numbness: false,
        tingling: false,
        handWeakness: false,
        distalRadiation: false
      },
      redFlags: {
        fever: false,
        weightLoss: false,
        cancerHistory: false,
        directTrauma: false,
        deformity: false,
        inflammatorySigns: false,
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
        {
          name: "Acetaminofén",
          adherence: "Lo toma ocasionalmente."
        },
        {
          name: "Ibuprofeno",
          adherence:
            "Lo toma cuando le duele mucho, pero no todos los días."
        }
      ],
      patientKnowledge:
        "No sabe qué es el manguito rotador. Cree que puede ser estrés, mala postura o edad."
    },
    importantNegatives: [
      "No trauma fuerte",
      "No fiebre",
      "No pérdida de peso",
      "No dolor cervical predominante",
      "No hormigueo",
      "No adormecimiento",
      "No dolor torácico",
      "No pérdida de fuerza distal en mano",
      "No deformidad visible",
      "No signos inflamatorios marcados"
    ],
    responseGuide: {
      firstOpenAnswer: "Doctor, me duele mucho el hombro.",
      doNotVolunteer: [
        "No digas 3 meses si no preguntan duración.",
        "No menciones Jobe, Neer o Hawkins como paciente.",
        "No menciones arco doloroso si no exploran movilidad.",
        "No menciones dolor nocturno si no preguntan por sueño o noche.",
        "No menciones manguito rotador como diagnóstico."
      ],
      topicAnswers: {
        "desde cuando": "Desde hace como tres meses.",
        "donde": "En el hombro derecho, más por este lado de afuera.",
        "como es el dolor": "Es como una punzada o una molestia profunda.",
        "que lo empeora":
          "Me duele más cuando levanto el brazo o intento alcanzar cosas arriba.",
        "que lo mejora": "Si dejo quieto el brazo mejora un poco.",
        "peinarse": "Sí, peinarme me cuesta y me duele.",
        "vestirse":
          "Sí, sobre todo para ponerme ciertas prendas o abrocharme atrás.",
        "noche":
          "Me duele cuando me acuesto sobre ese lado y a veces me despierta.",
        "trauma": "No tuve un golpe fuerte, doctor.",
        "hormigueo": "No, hormigueo no he sentido.",
        "adormecimiento": "No, no se me duerme la mano.",
        "cuello": "El cuello no es lo que más me molesta.",
        "medicamentos":
          "A veces tomo acetaminofén o ibuprofeno cuando me duele mucho."
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
      general: {
        appearance:
          "Consciente, orientada, sin dificultad respiratoria. Colaboradora.",
        distress:
          "Se queja de dolor al movilizar el hombro derecho por encima de la cabeza.",
        hydration: "Hidratación normal.",
        posture:
          "Puede proteger ligeramente el hombro derecho cuando se le pide moverlo."
      },
      headAndNeck: {
        pupils: "Pupilas isocóricas y reactivas.",
        oralCavity: "Sin hallazgos relevantes.",
        jugularVenousDistension: "No se aprecia ingurgitación yugular.",
        cervicalInspection:
          "Cuello sin deformidades evidentes."
      },
      neck: "Sin ingurgitación yugular. Cuello sin masas evidentes.",
      cardiovascular: {
        rhythm: "Ruidos cardíacos rítmicos.",
        heartSounds: "Ruidos cardíacos normales.",
        murmurs: "Sin soplos evidentes.",
        peripheralPulses: "Pulsos periféricos presentes.",
        capillaryRefill: "Llenado capilar menor de 2 segundos."
      },
      respiratory: {
        inspection: "Sin dificultad respiratoria.",
        auscultation: "Campos pulmonares sin ruidos agregados.",
        addedSounds: "No se auscultan crépitos, sibilancias ni roncus."
      },
      abdomen: {
        inspection: "Sin distensión.",
        auscultation: "Ruidos intestinales presentes.",
        palpation: "Blando, depresible, no doloroso.",
        ascites: "No se aprecia onda ascítica.",
        visceromegaly: "No se palpan visceromegalias.",
        peritonealSigns:
          "Sin defensa, sin rebote, sin signos de irritación peritoneal."
      },
      extremities: {
        edema: "Sin edema.",
        pulses: "Pulsos periféricos presentes.",
        temperature: "Extremidades tibias.",
        capillaryRefill: "Llenado capilar menor de 2 segundos."
      },
      cervical: {
        rangeOfMotion:
          "Movilidad cervical conservada.",
        spurling:
          "Prueba de Spurling negativa.",
        painReproduction:
          "La movilidad cervical no reproduce claramente el dolor del hombro."
      },
      neurologic: {
        mentalStatus:
          "Alerta, orientada en persona, lugar y tiempo.",
        cranialNerves:
          "Pares craneales sin alteraciones evidentes.",
        motor:
          "Fuerza distal conservada en ambas manos. La fuerza proximal derecha está limitada por dolor de hombro.",
        tone:
          "Tono muscular conservado.",
        reflexes:
          "Reflejos osteotendinosos ++/++++ simétricos en miembros superiores.",
        plantarResponse:
          "Respuesta plantar flexora bilateral.",
        sensory:
          "Sensibilidad distal conservada.",
        coordination:
          "Coordinación conservada.",
        gait:
          "Marcha normal."
      },
      neurovascularUpperLimb: {
        radialPulse: "Pulso radial presente.",
        capillaryRefill: "Llenado capilar distal menor de 2 segundos.",
        distalSensitivity:
          "Sensibilidad distal conservada.",
        distalMotor:
          "Movilidad distal de mano y dedos conservada."
      },
      shoulder: {
        side: "Derecho",
        inspection:
          "Sin deformidad evidente. No hay eritema, calor local ni aumento de volumen marcado.",
        palpation:
          "Dolor a la palpación en región lateral del hombro derecho y zona subacromial.",
        acromioclavicularJoint:
          "Articulación acromioclavicular sin dolor predominante.",
        bicipitalGroove:
          "Dolor leve inespecífico, no predominante en corredera bicipital.",
        activeRangeOfMotion:
          "Dolor al elevar el brazo por encima de 90 grados. Abducción activa limitada por dolor.",
        passiveRangeOfMotion:
          "Movilidad pasiva relativamente conservada y menos dolorosa que la activa.",
        painfulArc:
          "Arco doloroso positivo entre 60 y 120 grados de abducción.",
        strength:
          "Disminución de fuerza por dolor en abducción y rotación externa.",
        externalRotation:
          "Dolor y leve disminución de fuerza contra resistencia en rotación externa.",
        internalRotation:
          "Rotación interna dolorosa al llevar la mano hacia la espalda.",
        neer:
          "Prueba de Neer positiva por dolor.",
        hawkins:
          "Prueba de Hawkins-Kennedy positiva por dolor.",
        jobe:
          "Prueba de Jobe positiva por dolor y debilidad.",
        emptyCan:
          "Prueba de lata vacía positiva por dolor y debilidad.",
        dropArm:
          "Prueba de caída del brazo negativa; puede sostener el brazo, aunque con dolor.",
        externalRotationLag:
          "Signo de retraso en rotación externa negativo.",
        bellyPress:
          "Prueba de belly press negativa.",
        liftOff:
          "Prueba de lift-off dolorosa pero sin clara incapacidad.",
        speed:
          "Prueba de Speed negativa o con dolor leve no predominante.",
        yergason:
          "Prueba de Yergason negativa.",
        apprehension:
          "Prueba de aprehensión negativa.",
        crossBodyAdduction:
          "Aducción cruzada sin dolor acromioclavicular predominante."
      },
      skin: {
        lesions: "Sin lesiones cutáneas relevantes.",
        inflammation:
          "No hay eritema ni calor local marcado."
      }
    },
    evaluationChecklist: [
      "Exploró duración del dolor",
      "Exploró localización",
      "Caracterizó calidad e intensidad",
      "Preguntó movimientos que empeoran",
      "Preguntó limitación funcional",
      "Preguntó dolor nocturno",
      "Preguntó trauma",
      "Preguntó síntomas neurológicos negativos",
      "Preguntó fiebre, pérdida de peso u otros signos de alarma",
      "Exploró movilidad activa y pasiva",
      "Realizó palpación del hombro",
      "Exploró arco doloroso",
      "Realizó Jobe o lata vacía",
      "Realizó Neer o Hawkins",
      "Evaluó rotación externa",
      "Evaluó cuello o síntomas radiculares",
      "Construyó impresión compatible con síndrome del manguito rotador"
    ]
  }
];

export function getCaseById(caseId: string | undefined | null): CaseData {
  return CASES.find((item) => item.id === caseId) || CASES[0];
}