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
    id: "case-9",
    publicLabel: "Paciente 01",
    publicSex: "Masculino",
    publicAge: 36,
    simulatedPerson: {
      fullName: "Andrés Felipe Ospina Morales",
      age: 36,
      sex: "Masculino",
      occupation: "Conductor de plataforma",
      personality:
        "Inquieto, adolorido, se mueve constantemente porque no encuentra posición cómoda. Responde de forma breve por el dolor."
    },
    hiddenAcademicObjective:
      "Evaluar dolor lumbar/flanco tipo cólico usando ALICIA FREDUSA, irradiación a ingle, hematuria, síntomas urinarios, fiebre y puño-percusión renal para orientar cólico renoureteral.",
    mainComplaint:
      "Me dio un dolor muy fuerte en el lado izquierdo de la espalda y se me baja hacia la ingle.",
    conversationBehavior: {
      baseline:
        "Se muestra inquieto, cambia de posición y expresa dolor intenso. Contesta bien si le preguntan concreto.",
      ifEmpathic:
        "Agradece la ayuda y describe mejor la irradiación, la orina rojiza y las náuseas.",
      ifRudeOrDisorganized:
        "Se impacienta porque tiene mucho dolor y pide que le pregunten de forma más clara.",
      ifTooManyQuestions:
        "Dice que son muchas preguntas y que solo alcanza a explicar que el dolor es muy fuerte y se baja a la ingle."
    },
    importantNegatives: [
      "No fiebre",
      "No hipotensión",
      "No anuria",
      "No dolor testicular primario de inicio escrotal",
      "No defensa abdominal",
      "No antecedente de trauma",
      "No inmunosupresión",
      "No secreción uretral"
    ],
    responseGuide: {
      topicAnswers: {
        motivo:
          "Me empezó un dolor muy fuerte en el lado izquierdo de la espalda y se me baja hacia la ingle.",
        dolor:
          "Es un dolor tipo cólico, muy fuerte, como por oleadas. No encuentro cómo acomodarme.",
        aparicion:
          "Empezó de repente hace unas cuatro horas.",
        localizacion:
          "Lo siento en el lado izquierdo de la espalda baja, como en el flanco.",
        irradiacion:
          "Se me baja hacia la ingle izquierda y a veces hacia el testículo.",
        caracter:
          "Es como un cólico muy fuerte, viene por oleadas.",
        intensidad:
          "Está como en 9 de 10.",
        agravantesAtenuantes:
          "No encuentro posición que me lo quite. Me muevo y me muevo, pero nada me acomoda.",
        frecuenciaDuracion:
          "Viene por oleadas desde que empezó, pero no se me ha quitado del todo.",
        sintomasAsociados:
          "Me han dado náuseas, vomité una vez y la orina la vi como rojiza.",
        urinario:
          "La orina la vi algo oscura o rojiza. Ardor como tal, muy poquito.",
        fiebre:
          "No, fiebre no he tenido.",
        antecedentes:
          "No tengo enfermedad renal conocida. Tomo poca agua por el trabajo y una vez había sentido algo parecido, pero más leve.",
        paraclinicos:
          "Si me hacen orina, sale sangre en la orina. La ecografía podría mostrar algo de dilatación del lado izquierdo."
      }
    },
    hiddenHistory: {
      diagnosis: "Cólico renoureteral izquierdo por litiasis ureteral",
      aliciaFredusa: {
        aparicion: "Inicio súbito hace 4 horas.",
        localizacion: "Flanco izquierdo / región lumbar izquierda.",
        irradiacion: "Ingle izquierda y testículo izquierdo.",
        caracter: "Tipo cólico, intenso, en oleadas.",
        intensidad: "9/10.",
        atenuantesAgravantes:
          "No encuentra posición que alivie. Se mueve buscando acomodarse.",
        frecuencia: "Oleadas recurrentes sobre dolor de base.",
        duracion: "Episodios de varios minutos repetidos desde el inicio.",
        sintomasAsociados:
          "Náuseas, un vómito, orina rojiza, ardor urinario leve ocasional."
      },
      presentIllness: [
        "Dolor súbito en flanco izquierdo.",
        "Irradiación a ingle y testículo izquierdos.",
        "No encuentra posición cómoda.",
        "Náuseas y un vómito.",
        "Orina rojiza u oscura.",
        "Baja ingesta de agua por trabajo.",
        "No fiebre, no trauma, no diarrea."
      ],
      pastHistory: [
        "Sin enfermedad renal conocida.",
        "Posible episodio similar leve hace años.",
        "Familiar con antecedente de cálculos.",
        "No anticoagulantes.",
        "No cirugías urológicas.",
        "No alergias conocidas."
      ],
      paraclinics: {
        urinalysis: "Hematuria. Leucocitos ausentes o escasos. Nitritos negativos.",
        creatinine: "Normal.",
        ultrasound: "Posible hidronefrosis leve izquierda.",
        ct: "Cálculo ureteral distal izquierdo pequeño si se solicita confirmación."
      }
    },
    physicalExam: {
      general: "Paciente inquieto, adolorido, cambia de posición.",
      vitalSigns: {
        bloodPressure: "128/78 mmHg",
        heartRate: "102 lpm por dolor",
        respiratoryRate: "18 rpm",
        temperature: "36.7 °C",
        oxygenSaturation: "98% al aire ambiente"
      },
      abdomen:
        "Abdomen blando, sin defensa ni rebote. Dolor profundo en flanco izquierdo.",
      renal: "Puño-percusión lumbar izquierda positiva.",
      genital:
        "Sin hallazgo escrotal agudo si se evalúa; el dolor es irradiado, no de inicio testicular.",
      neurovascular: "Pulsos, fuerza y sensibilidad conservados."
    },
    evaluationChecklist: [
      "Caracterizó el dolor con ALICIA FREDUSA.",
      "Exploró inicio súbito, localización e irradiación a ingle/testículo.",
      "Preguntó por hematuria.",
      "Preguntó por fiebre y escalofríos.",
      "Preguntó por náuseas y vómito.",
      "Preguntó por antecedentes de cálculos e hidratación.",
      "Realizó o solicitó puño-percusión renal.",
      "Exploró abdomen y signos peritoneales.",
      "Consideró diferenciales como pielonefritis, torsión testicular, apendicitis, diverticulitis y lumbalgia."
    ]
  },

  {
    id: "case-2",
    publicLabel: "Paciente 02",
    publicSex: "Masculino",
    publicAge: 72,
    simulatedPerson: {
      fullName: "Álvaro Hernán Gómez Ramírez",
      age: 72,
      sex: "Masculino",
      occupation: "Pensionado",
      personality:
        "Preocupado, algo frustrado por la dificultad para hablar. Colaborador si le dan tiempo."
    },
    hiddenAcademicObjective:
      "Evaluar semiología neurológica de déficit focal agudo: inicio súbito, lateralidad, lenguaje, fuerza, sensibilidad, pares craneales, reflejos y signos de alarma de ACV.",
    mainComplaint:
      "Desde esta mañana tengo la boca torcida y se me dificulta mover bien el lado derecho.",
    conversationBehavior: {
      baseline:
        "Habla con cierta dificultad, responde corto y puede frustrarse si no le entienden.",
      ifEmpathic:
        "Se calma y permite explorar mejor inicio, lateralidad y síntomas neurológicos.",
      ifRudeOrDisorganized:
        "Se angustia y responde menos porque le cuesta hablar.",
      ifTooManyQuestions:
        "Dice que no puede responder tantas cosas al tiempo y que le pregunten de a poquito."
    },
    importantNegatives: [
      "No trauma craneal",
      "No fiebre",
      "No convulsión",
      "No pérdida de conciencia prolongada",
      "No dolor torácico principal",
      "No cefalea explosiva descrita"
    ],
    responseGuide: {
      topicAnswers: {
        motivo:
          "Me empezó la boca torcida y siento débil el lado derecho. También me cuesta hablar claro.",
        inicio:
          "Empezó esta mañana, de forma súbita. Mi familia se dio cuenta rápido.",
        lenguaje:
          "Me cuesta hablar claro, como si se me enredaran las palabras.",
        fuerza:
          "Siento más débil el brazo y la pierna derechos.",
        sensibilidad:
          "Siento raro el lado derecho, pero sobre todo es debilidad.",
        vision:
          "No he notado visión doble.",
        cefalea:
          "Dolor de cabeza fuerte, de esos explosivos, no.",
        antecedentes:
          "Tengo hipertensión y a veces no soy tan juicioso con los medicamentos.",
        medicamentos:
          "Tomo pastillas para la presión, pero no recuerdo bien los nombres.",
        tiempo:
          "Fue hoy en la mañana. Mi familia dice que antes estaba normal."
      }
    },
    hiddenHistory: {
      diagnosis: "Accidente cerebrovascular agudo probable",
      identification: {
        document: "70.123.456",
        rh: "A+"
      },
      presentIllness: [
        "Inicio súbito de desviación facial derecha.",
        "Dificultad para articular palabras.",
        "Debilidad en hemicuerpo derecho.",
        "Inicio en la mañana, con última vez normal antes del evento.",
        "Sin trauma, sin convulsión, sin fiebre."
      ],
      pastHistory: [
        "Hipertensión arterial.",
        "Adherencia irregular al tratamiento.",
        "Dislipidemia probable.",
        "No anticoagulación conocida."
      ]
    },
    physicalExam: {
      general: "Consciente, alerta, colaborador, con disartria.",
      vitalSigns: {
        bloodPressure: "168/94 mmHg",
        heartRate: "88 lpm",
        respiratoryRate: "17 rpm",
        temperature: "36.6 °C",
        oxygenSaturation: "96% al aire ambiente"
      },
      neurologic: {
        mentalStatus: "Consciente y orientado.",
        speech: "Disartria.",
        cranialNerves: "Asimetría facial derecha central.",
        motor: "Disminución de fuerza en miembro superior e inferior derechos.",
        reflexes: "Hiperreflexia derecha.",
        babinski: "Babinski derecho positivo.",
        sensitivity: "Sensibilidad gruesa relativamente conservada o discretamente alterada del lado derecho.",
        gait: "Marcha no segura por debilidad; requiere asistencia."
      },
      cardiovascular: "Ruidos cardíacos rítmicos, sin soplos evidentes.",
      respiratory: "Sin dificultad respiratoria, murmullo vesicular conservado."
    },
    evaluationChecklist: [
      "Identificó inicio súbito y hora de inicio/última vez normal.",
      "Exploró lenguaje y disartria.",
      "Exploró asimetría facial.",
      "Exploró fuerza por lateralidad.",
      "Exploró sensibilidad.",
      "Exploró pares craneales.",
      "Solicitó reflejos y Babinski.",
      "Preguntó por cefalea, convulsión, trauma y fiebre.",
      "Reconoció cuadro compatible con ACV agudo."
    ]
  },

  {
    id: "case-11",
    publicLabel: "Paciente 03",
    publicSex: "Femenino",
    publicAge: 29,
    simulatedPerson: {
      fullName: "Natalia Andrea Pineda Salazar",
      age: 29,
      sex: "Femenino",
      occupation: "Diseñadora gráfica",
      personality:
        "Preocupada, algo cansada, colaboradora. Se angustia cuando habla de la falta de aire."
    },
    hiddenAcademicObjective:
      "Evaluar control del asma: síntomas diurnos, despertares nocturnos, limitación funcional, uso frecuente de SABA, adherencia al controlador, técnica inhalatoria, desencadenantes y signos de gravedad.",
    mainComplaint:
      "Llevo varias semanas con mucha silbadera en el pecho y usando mucho el inhalador.",
    conversationBehavior: {
      baseline:
        "Habla frases completas, pero se nota preocupada porque los síntomas se repiten.",
      ifEmpathic:
        "Explica con detalle el uso frecuente de salbutamol, despertares nocturnos y mala adherencia al controlador.",
      ifRudeOrDisorganized:
        "Se confunde entre inhalador de rescate y controlador.",
      ifTooManyQuestions:
        "Dice que se confunde con tantas preguntas y pide ir una por una."
    },
    importantNegatives: [
      "No fiebre alta",
      "No expectoración purulenta abundante",
      "No dolor torácico opresivo irradiado",
      "No hemoptisis",
      "No edema en miembros inferiores",
      "No síncope",
      "No incapacidad para hablar",
      "No cianosis",
      "No confusión"
    ],
    responseGuide: {
      topicAnswers: {
        motivo:
          "Tengo mucha silbadera en el pecho y estoy usando mucho el inhalador azul.",
        disnea:
          "Me falta el aire sobre todo cuando subo escaleras, hago ejercicio o por la noche.",
        tos: "Me da tos seca, más de noche.",
        sibilancias:
          "Sí, siento como una silbadera en el pecho.",
        opresion:
          "Siento el pecho apretado, pero no es un dolor como de infarto.",
        nocturnos:
          "Me despierto dos o tres veces por semana por tos o falta de aire.",
        salbutamol:
          "Lo estoy usando casi todos los días, a veces varias veces al día.",
        controlador:
          "Tengo otro inhalador, pero la verdad no lo uso juiciosa. A veces se me olvida.",
        tecnica:
          "No estoy segura de estar usándolo bien. A veces disparo y respiro después.",
        desencadenantes:
          "El polvo, el frío, los olores fuertes y cuando me da gripa me ponen peor.",
        antecedentes:
          "Tengo asma desde adolescente y rinitis alérgica.",
        gravedad:
          "No he estado en UCI ni me han intubado. Una vez fui a urgencias hace más de un año."
      }
    },
    hiddenHistory: {
      diagnosis: "Asma crónica no controlada",
      symptomCharacterization: {
        dyspnea: "Variable, episódica, más con ejercicio y en la noche.",
        cough: "Seca o escasa, más nocturna.",
        wheezing: "Frecuente, descrita como silbadera.",
        chestTightness: "Pecho apretado, no dolor coronario.",
        triggers: ["Polvo", "frío", "olores fuertes", "ejercicio", "gripa"],
        relievers: "Salbutamol con mejoría parcial.",
        control:
          "No controlada por síntomas frecuentes, despertares nocturnos, limitación de actividad y uso frecuente de rescate."
      },
      pastHistory: [
        "Asma desde adolescencia.",
        "Rinitis alérgica.",
        "No intubación previa.",
        "No UCI previa.",
        "Una consulta a urgencias por asma hace más de un año.",
        "No tabaquismo activo.",
        "Alergia ambiental a polvo/ácaros."
      ],
      medications: [
        "Salbutamol de rescate, uso casi diario.",
        "Controlador inhalado, uso irregular."
      ],
      paraclinics: {
        peakFlow: "Disminuido respecto al esperado o al mejor personal si se mide.",
        spirometry:
          "Espirometría previa con patrón obstructivo reversible si se pregunta.",
        chestXray: "Sin consolidación si se solicita por duda.",
        arterialGas: "No necesaria si está estable."
      }
    },
    physicalExam: {
      general: "Consciente, orientada, habla frases completas, ansiosa leve.",
      vitalSigns: {
        bloodPressure: "118/72 mmHg",
        heartRate: "94 lpm",
        respiratoryRate: "22 rpm",
        temperature: "36.6 °C",
        oxygenSaturation: "95-96% al aire ambiente"
      },
      respiratory:
        "Sibilancias espiratorias difusas, espiración prolongada, sin crépitos focales.",
      severity:
        "Sin cianosis, sin confusión, sin incapacidad para hablar, sin tirajes severos.",
      cardiovascular: "Rítmico, sin signos de falla cardiaca.",
      extremities: "Sin edema periférico."
    },
    evaluationChecklist: [
      "Exploró frecuencia de síntomas diurnos.",
      "Exploró despertares nocturnos.",
      "Exploró limitación de actividad.",
      "Preguntó uso de salbutamol/rescate.",
      "Preguntó uso de controlador.",
      "Evaluó adherencia y técnica inhalatoria.",
      "Identificó desencadenantes.",
      "Preguntó antecedentes de crisis graves, UCI o intubación.",
      "Exploró rinitis/alergias.",
      "Solicitó auscultación pulmonar y saturación.",
      "Buscó signos de gravedad."
    ]
  },

  {
    id: "case-4",
    publicLabel: "Paciente 04",
    publicSex: "Masculino",
    publicAge: 27,
    simulatedPerson: {
      fullName: "Javier Andrés Correa Gómez",
      age: 27,
      sex: "Masculino",
      occupation: "Mensajero",
      personality:
        "Adolorido, algo impaciente, pero colaborador. Protege el abdomen y responde mejor a preguntas concretas."
    },
    hiddenAcademicObjective:
      "Evaluar dolor abdominal agudo con ALICIA FREDUSA, migración del dolor, síntomas asociados y signos de irritación peritoneal compatibles con apendicitis.",
    mainComplaint:
      "Me empezó un dolor en la barriga y ahora lo siento más fuerte abajo a la derecha.",
    conversationBehavior: {
      baseline:
        "Responde con cara de dolor. Evita moverse mucho porque el dolor empeora.",
      ifEmpathic:
        "Describe mejor la migración del dolor, náuseas, vómito e hiporexia.",
      ifRudeOrDisorganized:
        "Se molesta porque moverse o hablar mucho le aumenta el dolor.",
      ifTooManyQuestions:
        "Dice que le duele y que le pregunten más despacio."
    },
    importantNegatives: [
      "No diarrea abundante",
      "No síntomas urinarios claros",
      "No dolor testicular",
      "No trauma abdominal",
      "No sangrado digestivo",
      "No enfermedad inflamatoria intestinal conocida"
    ],
    responseGuide: {
      topicAnswers: {
        motivo:
          "Me duele la barriga, empezó como en el centro y ahora está más abajo a la derecha.",
        aparicion:
          "Empezó hace unas 18 horas.",
        localizacion:
          "Ahora me duele sobre todo abajo a la derecha.",
        irradiacion:
          "No se me va a otro lado, más bien empezó en el centro y se movió para la derecha.",
        caracter:
          "Es un dolor constante, fuerte, como profundo.",
        intensidad:
          "Está como en 8 de 10.",
        agravantesAtenuantes:
          "Me duele más al caminar, toser o cuando me tocan. Quieto mejora un poquito.",
        frecuenciaDuracion:
          "Ha sido constante desde que se pasó para la derecha.",
        sintomasAsociados:
          "Me han dado náuseas, vomité y no tengo ganas de comer. Me he sentido caliente.",
        urinario:
          "No, ardor para orinar no.",
        digestivo:
          "Diarrea fuerte no. Más bien no he querido comer.",
        examenAbdomen:
          "Me duele mucho en la parte baja derecha y cuando sueltan después de presionar duele más."
      }
    },
    hiddenHistory: {
      diagnosis: "Apendicitis aguda",
      identification: {
        document: "1.037.456.219",
        rh: "O+"
      },
      aliciaFredusa: {
        aparicion: "18 horas de evolución.",
        localizacion: "Inició periumbilical y migró a fosa iliaca derecha.",
        irradiacion: "Migración del dolor; no irradiación clásica.",
        caracter: "Dolor constante, profundo.",
        intensidad: "8/10.",
        atenuantesAgravantes:
          "Empeora con marcha, tos, movimiento y palpación. Mejora poco con quietud.",
        frecuencia: "Constante.",
        duracion: "Persistente desde la migración.",
        sintomasAsociados: "Náuseas, vómito, hiporexia, febrícula/fiebre."
      },
      presentIllness: [
        "Dolor abdominal de 18 horas.",
        "Inicio periumbilical.",
        "Migración a fosa iliaca derecha.",
        "Náuseas, vómito, hiporexia.",
        "Sensación febril."
      ],
      paraclinics: {
        cbc: "Leucocitos 15.200 con neutrofilia.",
        crp: "Elevada.",
        ultrasound: "Hallazgos sugestivos de apendicitis."
      }
    },
    physicalExam: {
      general: "Paciente con facies de dolor, evita moverse.",
      vitalSigns: {
        bloodPressure: "122/76 mmHg",
        heartRate: "102 lpm",
        respiratoryRate: "19 rpm",
        temperature: "38.1 °C",
        oxygenSaturation: "98% al aire ambiente"
      },
      abdomen:
        "Dolor en fosa iliaca derecha, McBurney positivo, Blumberg positivo, Rovsing positivo, psoas levemente positivo, defensa localizada.",
      bowelSounds: "Ruidos intestinales presentes.",
      peritonitis: "Sin peritonitis generalizada.",
      genitourinary: "Sin dolor testicular, sin síntomas urinarios claros."
    },
    evaluationChecklist: [
      "Caracterizó dolor abdominal con ALICIA FREDUSA.",
      "Identificó migración del dolor.",
      "Preguntó náuseas, vómito e hiporexia.",
      "Preguntó fiebre.",
      "Descartó síntomas urinarios y testiculares.",
      "Solicitó palpación abdominal dirigida.",
      "Exploró McBurney, Blumberg, Rovsing y psoas.",
      "Reconoció signos de irritación peritoneal localizada.",
      "Consideró apendicitis como diagnóstico probable."
    ]
  },

  {
    id: "case-7",
    publicLabel: "Paciente 05",
    publicSex: "Masculino",
    publicAge: 24,
    simulatedPerson: {
      fullName: "Juan Sebastián Ríos Castañeda",
      age: 24,
      sex: "Masculino",
      occupation: "Estudiante universitario y futbolista recreativo",
      personality:
        "Ansioso, preocupado por volver a jugar, colaborador. Quiere saber si la rodilla está grave."
    },
    hiddenAcademicObjective:
      "Evaluar trauma deportivo de rodilla usando ALICIA FREDUSA, mecanismo rotacional, pop, derrame agudo, inestabilidad, apoyo y maniobras de LCA.",
    mainComplaint:
      "Me lesioné la rodilla jugando fútbol y siento que se me va.",
    conversationBehavior: {
      baseline:
        "Está preocupado por volver a jugar. Describe bien el mecanismo si se le pregunta.",
      ifEmpathic:
        "Colabora mejor y permite explorar mecanismo, derrame e inestabilidad.",
      ifRudeOrDisorganized:
        "Se frustra porque siente que no le están entendiendo la gravedad de la rodilla.",
      ifTooManyQuestions:
        "Dice que fueron muchas preguntas y que mejor le pregunten de a una."
    },
    importantNegatives: [
      "No fiebre",
      "No herida abierta",
      "No deformidad severa",
      "No frialdad distal",
      "No pérdida de sensibilidad",
      "No dolor predominante en cadera o tobillo",
      "No bloqueo articular franco persistente"
    ],
    responseGuide: {
      topicAnswers: {
        motivo:
          "Me torcí la rodilla jugando fútbol y desde ahí siento que se me va.",
        mecanismo:
          "Iba a cambiar de dirección, giré con el pie apoyado y sentí que la rodilla se me fue.",
        pop: "Sí, sentí como un pop o un chasquido por dentro.",
        aparicion:
          "Fue ayer durante el partido.",
        localizacion:
          "Me duele en la rodilla derecha, más profundo y algo hacia la parte interna.",
        irradiacion:
          "No se me va para otro lado, es en la rodilla.",
        caracter:
          "Al principio fue un dolor agudo; ahora es dolor con presión por la inflamación.",
        intensidad:
          "Fue 7 de 10 al principio, ahora está como 5 o 6, pero sube si apoyo o giro.",
        agravantesAtenuantes:
          "Mejora con hielo y reposo. Empeora al apoyar, girar o bajar escaleras.",
        frecuenciaDuracion:
          "Desde el golpe no se me ha quitado. Es constante suave y se pone más fuerte con movimiento.",
        sintomasAsociados:
          "Se me inflamó rápido y siento que la rodilla me falla.",
        apoyo:
          "Puedo apoyar, pero con dolor y miedo a que se me vaya.",
        deporte:
          "No pude seguir jugando después de eso."
      }
    },
    hiddenHistory: {
      diagnosis: "Rotura de ligamento cruzado anterior derecho",
      aliciaFredusa: {
        aparicion: "Hace 1 día durante partido de fútbol.",
        localizacion: "Rodilla derecha, profunda, algo interna.",
        irradiacion: "No irradia claramente.",
        caracter: "Dolor agudo inicial, presión posterior por inflamación.",
        intensidad: "7/10 inicial, 5-6/10 actual.",
        atenuantesAgravantes:
          "Mejora con reposo/hielo. Empeora con apoyo, giro, escaleras.",
        frecuencia: "Continuo leve con exacerbaciones.",
        duracion: "Persistente desde el trauma.",
        sintomasAsociados:
          "Inflamación rápida, inestabilidad, dificultad para apoyar, no pudo seguir jugando."
      },
      presentIllness: [
        "Cambio brusco de dirección jugando fútbol.",
        "Sensación de que la rodilla se fue.",
        "Pop audible o sentido.",
        "Derrame en primeras horas.",
        "Sensación de inestabilidad.",
        "No herida abierta."
      ],
      pastHistory: [
        "Sin cirugías de rodilla.",
        "Sin enfermedades crónicas.",
        "No anticoagulantes.",
        "No alergias conocidas.",
        "Fútbol recreativo 2-3 veces por semana."
      ],
      paraclinics: {
        xray: "Sin fractura evidente.",
        mri: "Ruptura de LCA derecho; posible edema óseo asociado."
      }
    },
    physicalExam: {
      general: "Estado general conservado, dolor localizado en rodilla.",
      gait: "Marcha antálgica.",
      knee: {
        inspection: "Rodilla derecha con aumento de volumen.",
        effusion: "Derrame articular.",
        palpation: "Dolor periarticular.",
        rangeOfMotion: "Limitado por dolor.",
        lachman: "Positivo.",
        anteriorDrawer: "Positivo o sugestivo.",
        pivotShift: "Difícil por dolor, pero sugestivo si se logra.",
        varusValgus: "Sin bostezo marcado.",
        neurovascular: "Pulsos, sensibilidad y llenado capilar conservados."
      }
    },
    evaluationChecklist: [
      "Caracterizó dolor con ALICIA FREDUSA.",
      "Exploró mecanismo de lesión.",
      "Preguntó por pop.",
      "Preguntó aparición rápida de derrame.",
      "Preguntó capacidad de continuar jugando.",
      "Preguntó apoyo e inestabilidad.",
      "Inspeccionó derrame.",
      "Solicitó rango de movilidad.",
      "Solicitó Lachman.",
      "Solicitó cajón anterior.",
      "Consideró pivot shift si procede.",
      "Evaluó estabilidad varo/valgo.",
      "Evaluó neurovascular distal."
    ]
  },

  {
    id: "case-1",
    publicLabel: "Paciente 06",
    publicSex: "Femenino",
    publicAge: 68,
    simulatedPerson: {
      fullName: "Gloria Cecilia Restrepo Álvarez",
      age: 68,
      sex: "Femenino",
      occupation: "Ama de casa",
      personality:
        "Amable, algo cansada, habla despacio por la disnea. Colabora si le preguntan con calma."
    },
    hiddenAcademicObjective:
      "Evaluar síndrome congestivo compatible con falla cardiaca: disnea progresiva, ortopnea, disnea paroxística nocturna, edema, ingurgitación yugular, crépitos y tercer ruido.",
    mainComplaint:
      "Me falta el aire y se me están hinchando las piernas.",
    conversationBehavior: {
      baseline:
        "Se muestra cansada y preocupada por la falta de aire. Responde con frases cortas.",
      ifEmpathic:
        "Explica mejor la ortopnea, edema y limitación funcional.",
      ifRudeOrDisorganized:
        "Se confunde y responde solo que le falta el aire.",
      ifTooManyQuestions:
        "Dice que son muchas preguntas y que se cansa hablando."
    },
    importantNegatives: [
      "No fiebre",
      "No expectoración purulenta",
      "No dolor torácico opresivo actual",
      "No hemoptisis",
      "No síncope",
      "No síntomas neurológicos focales"
    ],
    responseGuide: {
      topicAnswers: {
        motivo:
          "Me falta el aire, sobre todo al caminar y al acostarme, y tengo las piernas hinchadas.",
        disnea:
          "Antes caminaba más, ahora me canso con pocas cuadras o subiendo escaleras.",
        ortopnea:
          "Tengo que dormir con dos o tres almohadas porque acostada me ahogo.",
        dpn: "A veces me despierto en la noche con falta de aire.",
        edema:
          "Se me hinchan los tobillos y las piernas, más por la tarde.",
        tos: "Tos con flema no. A veces toso seco.",
        dolorToracico:
          "Dolor fuerte en el pecho ahora no.",
        antecedentes:
          "Tengo presión alta desde hace años.",
        medicamentos:
          "Tomo pastillas para la presión, pero a veces se me olvidan.",
        examen:
          "Me encuentran las piernas hinchadas y ruidos en los pulmones abajo."
      }
    },
    hiddenHistory: {
      diagnosis: "Falla cardiaca descompensada / síndrome congestivo",
      identification: {
        document: "43.568.291",
        rh: "O+"
      },
      presentIllness: [
        "Disnea progresiva de varias semanas.",
        "Ortopnea de 2-3 almohadas.",
        "Disnea paroxística nocturna ocasional.",
        "Edema bilateral en miembros inferiores.",
        "Fatiga y menor tolerancia al ejercicio."
      ],
      pastHistory: [
        "Hipertensión arterial de larga data.",
        "Adherencia irregular a tratamiento.",
        "Sin fiebre ni cuadro infeccioso respiratorio claro."
      ]
    },
    physicalExam: {
      general: "Paciente consciente, orientada, cansada, con disnea leve al hablar.",
      vitalSigns: {
        bloodPressure: "158/92 mmHg",
        heartRate: "96 lpm",
        respiratoryRate: "22 rpm",
        temperature: "36.7 °C",
        oxygenSaturation: "93% al aire ambiente"
      },
      neck: "Ingurgitación yugular presente.",
      cardiovascular: "Ruidos rítmicos, tercer ruido S3 audible.",
      respiratory: "Crépitos bibasales.",
      extremities: "Edema bilateral en miembros inferiores con fóvea.",
      neurologic: "Sin déficit focal."
    },
    evaluationChecklist: [
      "Exploró disnea y clase funcional.",
      "Preguntó ortopnea.",
      "Preguntó disnea paroxística nocturna.",
      "Preguntó edema.",
      "Preguntó antecedentes cardiovasculares e hipertensión.",
      "Preguntó adherencia a medicamentos.",
      "Solicitó yugulares.",
      "Solicitó auscultación pulmonar.",
      "Solicitó auscultación cardíaca.",
      "Evaluó edema con fóvea.",
      "Reconoció síndrome congestivo."
    ]
  },
  {
    id: "case-12",
    publicLabel: "Paciente 07",
    publicSex: "Femenino",
    publicAge: 56,
    simulatedPerson: {
      fullName: "Beatriz Elena Arango Mejía",
      age: 56,
      sex: "Femenino",
      occupation: "Comerciante independiente",
      personality:
        "Temerosa de caerse, describe muy bien que todo le da vueltas. Colaboradora si le preguntan con calma."
    },
    hiddenAcademicObjective:
      "Evaluar vértigo verdadero, duración, desencadenantes posicionales, nistagmo, Dix-Hallpike y descarte de banderas rojas centrales.",
    mainComplaint:
      "Me da vueltas todo cuando giro la cabeza o me levanto.",
    conversationBehavior: {
      baseline:
        "Describe sensación de giro y miedo a caerse. Contesta bien si le preguntan por duración y desencadenantes.",
      ifEmpathic:
        "Explica con más claridad que los episodios son breves y posicionales.",
      ifRudeOrDisorganized:
        "Se angustia y mezcla mareo con miedo a caerse.",
      ifTooManyQuestions:
        "Dice que se marea solo de hablar de tantas cosas y pide ir despacio."
    },
    importantNegatives: [
      "No debilidad",
      "No alteración del habla",
      "No diplopía",
      "No cefalea súbita intensa",
      "No pérdida auditiva súbita",
      "No ataxia severa",
      "No síncope",
      "No dolor torácico",
      "No palpitaciones sostenidas",
      "No fiebre"
    ],
    responseGuide: {
      topicAnswers: {
        motivo:
          "Me da vueltas todo cuando giro la cabeza, me levanto o me volteo en la cama.",
        tipo:
          "Es como si todo me diera vueltas, no es solo debilidad.",
        inicio:
          "Empezó hace tres días.",
        duracion:
          "Dura poquito, segundos, menos de un minuto, pero me asusta mucho.",
        desencadenantes:
          "Me pasa al girarme en la cama, al levantarme o al mirar hacia arriba.",
        nausea:
          "Sí, me dan náuseas cuando me da la vuelta.",
        audicion:
          "No he perdido la audición de repente. Zumbido fuerte tampoco.",
        neurologico:
          "No se me ha torcido la boca, no he perdido fuerza, no veo doble y no se me enreda la lengua.",
        cefalea:
          "Dolor de cabeza súbito y terrible no.",
        marcha:
          "Camino con miedo cuando me pasa, pero no es que me vaya de lado todo el tiempo.",
        dixHallpike:
          "Cuando me acuestan y me giran la cabeza, se reproduce el mareo y aparece un movimiento de los ojos."
      }
    },
    hiddenHistory: {
      diagnosis: "Vértigo posicional paroxístico benigno probable",
      objective:
        "Diferenciar vértigo periférico de banderas rojas centrales.",
      vertigoCharacterization: {
        type: "Vértigo verdadero, sensación de giro.",
        onset: "Hace 3 días.",
        duration: "Segundos a menos de un minuto.",
        triggers: "Girarse en cama, levantarse, mirar hacia arriba.",
        associatedSymptoms: "Náuseas, inseguridad al caminar durante el episodio.",
        auditorySymptoms: "Niega hipoacusia súbita; tinnitus ausente o mínimo.",
        centralRedFlags:
          "No diplopía, no disartria, no debilidad, no ataxia severa, no cefalea explosiva."
      },
      pastHistory: [
        "Episodio similar leve hace meses.",
        "No ACV previo.",
        "No migraña vestibular conocida.",
        "No trauma craneal reciente.",
        "No infección ótica marcada.",
        "No consumo de alcohol reciente."
      ],
      paraclinics: {
        imaging:
          "No requiere imagen si cuadro típico y sin banderas rojas. Neuroimagen si hay signos centrales, déficit, cefalea intensa nueva, ataxia marcada o curso atípico.",
        audiometry:
          "Solo si hay síntomas auditivos relevantes."
      }
    },
    physicalExam: {
      general: "Consciente, orientada, temerosa de moverse rápido.",
      vitalSigns: {
        bloodPressure: "132/78 mmHg",
        heartRate: "78 lpm",
        respiratoryRate: "16 rpm",
        temperature: "36.5 °C",
        oxygenSaturation: "98% al aire ambiente"
      },
      neurologic:
        "Pares craneales sin déficit, fuerza conservada, sensibilidad conservada, coordinación conservada.",
      gait: "Marcha cautelosa, sin ataxia franca.",
      romberg: "Negativo o con inseguridad leve.",
      dixHallpike:
        "Positivo hacia un lado: reproduce vértigo y nistagmo posicional.",
      nystagmus:
        "Nistagmo compatible con periférico: posicional, con latencia y fatigable.",
      otoscopy: "Sin hallazgos agudos relevantes."
    },
    evaluationChecklist: [
      "Diferenció vértigo verdadero de mareo inespecífico.",
      "Preguntó duración de episodios.",
      "Exploró desencadenantes posicionales.",
      "Preguntó náuseas y vómito.",
      "Preguntó síntomas auditivos.",
      "Buscó síntomas neurológicos centrales.",
      "Preguntó cefalea, síncope y caídas.",
      "Evaluó marcha.",
      "Solicitó pares craneales, fuerza, sensibilidad y coordinación.",
      "Evaluó nistagmo.",
      "Solicitó Dix-Hallpike.",
      "Consideró VPPB y diferenciales centrales."
    ]
  },

  {
    id: "case-6",
    publicLabel: "Paciente 08",
    publicSex: "Femenino",
    publicAge: 64,
    simulatedPerson: {
      fullName: "Rosa Elena Martínez Salazar",
      age: 64,
      sex: "Femenino",
      occupation: "Vendedora informal",
      personality:
        "Cansada, algo disneica, pero amable. Responde mejor si le dan tiempo."
    },
    hiddenAcademicObjective:
      "Evaluar síndrome respiratorio infeccioso bajo: tos, expectoración, fiebre, dolor pleurítico, disnea, saturación y hallazgos de consolidación.",
    mainComplaint:
      "Tengo tos, fiebre y me duele el pecho al respirar.",
    conversationBehavior: {
      baseline:
        "Habla con cansancio y tos ocasional. Describe expectoración y fiebre si le preguntan.",
      ifEmpathic:
        "Colabora mejor y cuenta evolución, color del esputo y dolor pleurítico.",
      ifRudeOrDisorganized:
        "Se limita a decir que tiene tos y se siente muy cansada.",
      ifTooManyQuestions:
        "Dice que se cansa y que le pregunten de a poquito."
    },
    importantNegatives: [
      "No hemoptisis",
      "No dolor torácico opresivo irradiado",
      "No edema de miembros inferiores",
      "No síncope",
      "No síntomas neurológicos",
      "No antecedente claro de trombosis"
    ],
    responseGuide: {
      topicAnswers: {
        motivo:
          "Tengo tos con flema, fiebre y dolor en el pecho cuando respiro profundo.",
        tos: "Empecé con tos seca y luego con flema amarillenta.",
        fiebre:
          "Me he sentido con fiebre y escalofríos.",
        disnea:
          "Me falta el aire al caminar y me siento muy cansada.",
        dolor:
          "Me duele más cuando respiro profundo o toso, como una punzada.",
        expectoracion:
          "La flema es amarilla.",
        hemoptisis:
          "Sangre no he visto.",
        antecedentes:
          "No tengo enfermedad pulmonar conocida.",
        examen:
          "Me encuentran ruidos en la base derecha y la saturación algo baja."
      }
    },
    hiddenHistory: {
      diagnosis: "Neumonía adquirida en la comunidad",
      identification: {
        document: "43.222.908",
        rh: "B+"
      },
      presentIllness: [
        "Cinco días de tos.",
        "Evolución a expectoración amarillenta.",
        "Fiebre y escalofríos.",
        "Dolor pleurítico en hemitórax derecho.",
        "Disnea y fatiga."
      ],
      pastHistory: [
        "Sin EPOC conocido.",
        "Sin falla cardiaca conocida.",
        "No tabaquismo activo importante si se pregunta."
      ],
      paraclinics: {
        cbc: "Leucocitosis con neutrofilia.",
        crp: "Elevada.",
        chestXray: "Consolidación basal derecha."
      }
    },
    physicalExam: {
      general: "Paciente cansada, febril, con tos durante la entrevista.",
      vitalSigns: {
        bloodPressure: "126/78 mmHg",
        heartRate: "104 lpm",
        respiratoryRate: "26 rpm",
        temperature: "38.5 °C",
        oxygenSaturation: "91% al aire ambiente"
      },
      respiratory:
        "Disminución del murmullo vesicular en base derecha, crépitos, matidez a la percusión en base derecha.",
      cardiovascular: "Rítmico, sin signos de congestión.",
      extremities: "Sin edema periférico."
    },
    evaluationChecklist: [
      "Exploró tos y tiempo de evolución.",
      "Preguntó características de la expectoración.",
      "Preguntó fiebre y escalofríos.",
      "Caracterizó dolor pleurítico.",
      "Preguntó disnea y tolerancia al esfuerzo.",
      "Preguntó hemoptisis.",
      "Solicitó signos vitales y saturación.",
      "Solicitó auscultación pulmonar.",
      "Evaluó percusión y murmullo vesicular.",
      "Consideró neumonía y diferenciales como asma/EPOC, falla cardiaca y tromboembolismo."
    ]
  },

  {
    id: "case-10",
    publicLabel: "Paciente 09",
    publicSex: "Femenino",
    publicAge: 39,
    simulatedPerson: {
      fullName: "Laura Marcela Ceballos Restrepo",
      age: 39,
      sex: "Femenino",
      occupation: "Docente de primaria",
      personality:
        "Preocupada por no poder trabajar, colaboradora. Tiene miedo de que sea algo grave de columna."
    },
    hiddenAcademicObjective:
      "Evaluar lumbalgia mecánica usando ALICIA FREDUSA, relación con esfuerzo/movimiento, ausencia de banderas rojas y examen neurológico normal.",
    mainComplaint:
      "Me agaché a levantar una caja y me quedó un dolor muy fuerte en la espalda baja.",
    conversationBehavior: {
      baseline:
        "Describe dolor lumbar mecánico y preocupación por incapacidad laboral.",
      ifEmpathic:
        "Permite explorar banderas rojas con tranquilidad.",
      ifRudeOrDisorganized:
        "Se preocupa más y pregunta si se va a quedar paralizada.",
      ifTooManyQuestions:
        "Dice que son muchas cosas y que mejor le pregunten una por una."
    },
    importantNegatives: [
      "No fiebre",
      "No pérdida de peso",
      "No cáncer conocido",
      "No trauma mayor",
      "No uso crónico de corticoides",
      "No déficit motor",
      "No anestesia en silla de montar",
      "No incontinencia urinaria o fecal",
      "No retención urinaria",
      "No dolor radicular franco"
    ],
    responseGuide: {
      topicAnswers: {
        motivo:
          "Me agaché a levantar una caja pesada y desde ahí me duele la espalda baja.",
        aparicion:
          "Empezó ayer, justo después de levantar la caja.",
        localizacion:
          "Es en la parte baja de la espalda.",
        irradiacion:
          "A veces se me va un poco al glúteo, pero no baja claro por debajo de la rodilla.",
        caracter:
          "Es como una punzada o espasmo, como si se me hubiera contraído la espalda.",
        intensidad:
          "Al moverme es 7 de 10, quieta baja como a 4.",
        agravantesAtenuantes:
          "Empeora al agacharme, girar, levantarme de la silla o cargar peso. Mejora con reposo relativo.",
        frecuenciaDuracion:
          "Está ahí desde ayer, y se pone peor con movimientos.",
        sintomasAsociados:
          "Siento rigidez y me cuesta caminar rápido o agacharme.",
        neurologico:
          "No he perdido fuerza, no se me duermen las piernas y controlo bien esfínteres.",
        alarma:
          "No fiebre, no pérdida de peso, no cáncer, no golpe fuerte."
      }
    },
    hiddenHistory: {
      diagnosis: "Lumbalgia mecánica aguda sin signos de alarma",
      aliciaFredusa: {
        aparicion: "Empezó ayer después de levantar una caja pesada.",
        localizacion: "Región lumbar baja.",
        irradiacion: "Puede ir a glúteo, no baja claramente por debajo de la rodilla.",
        caracter: "Punzada, tensión o espasmo muscular.",
        intensidad: "7/10 al moverse, 4/10 en reposo.",
        atenuantesAgravantes:
          "Mejora con reposo relativo; empeora al agacharse, levantarse, girar o cargar peso.",
        frecuencia: "Persistente con exacerbaciones al movimiento.",
        duracion: "Cerca de 24 horas.",
        sintomasAsociados:
          "Rigidez, contractura, dificultad para caminar rápido o agacharse."
      },
      presentIllness: [
        "Dolor posterior a esfuerzo.",
        "No trauma mayor.",
        "No caída.",
        "No debilidad.",
        "No alteración de esfínteres.",
        "No anestesia en silla de montar.",
        "No fiebre ni pérdida de peso."
      ],
      pastHistory: [
        "Episodios leves previos de dolor lumbar.",
        "Sedentarismo relativo.",
        "No osteoporosis conocida.",
        "No drogas IV.",
        "No cirugías de columna.",
        "No alergias conocidas."
      ],
      paraclinics: {
        imaging:
          "No requiere imagen inicial si no hay banderas rojas.",
        labs:
          "Laboratorios no necesarios en presentación típica."
      }
    },
    physicalExam: {
      general: "Paciente estable, con dolor al moverse.",
      gait: "Marcha lenta o cautelosa, pero independiente.",
      lumbar:
        "Dolor paravertebral lumbar, contractura muscular lumbar, limitación de flexión por dolor.",
      straightLegRaise:
        "Lasègue negativo o dolor lumbar sin irradiación radicular verdadera.",
      neurologic:
        "Fuerza 5/5 en miembros inferiores, sensibilidad conservada, reflejos conservados.",
      vascular: "Pulsos distales presentes.",
      redFlags: "Sin signos de cauda equina."
    },
    evaluationChecklist: [
      "Caracterizó dolor con ALICIA FREDUSA.",
      "Exploró mecanismo de inicio.",
      "Preguntó relación con movimiento y carga.",
      "Exploró irradiación.",
      "Preguntó debilidad y sensibilidad.",
      "Preguntó esfínteres.",
      "Preguntó anestesia en silla de montar.",
      "Preguntó fiebre, pérdida de peso, cáncer, trauma y corticoides.",
      "Solicitó examen neurológico de miembros inferiores.",
      "Solicitó Lasègue.",
      "Evaluó marcha.",
      "Reconoció cuadro compatible con lumbalgia mecánica sin signos de alarma."
    ]
  },

  {
    id: "case-5",
    publicLabel: "Paciente 10",
    publicSex: "Masculino",
    publicAge: 58,
    simulatedPerson: {
      fullName: "Carlos Alberto Londoño Ruiz",
      age: 58,
      sex: "Masculino",
      occupation: "Taxista",
      personality:
        "Ansioso, asustado por el dolor torácico, responde con frases cortas."
    },
    hiddenAcademicObjective:
      "Evaluar dolor torácico con ALICIA FREDUSA, factores de riesgo cardiovascular, síntomas vegetativos e impresión de síndrome coronario agudo.",
    mainComplaint:
      "Tengo un dolor muy fuerte en el pecho que se me va al brazo izquierdo.",
    conversationBehavior: {
      baseline:
        "Se muestra angustiado, con dolor, preocupado por estar infartándose.",
      ifEmpathic:
        "Describe mejor irradiación, opresión, sudoración y factores de riesgo.",
      ifRudeOrDisorganized:
        "Se angustia y repite que le duele el pecho.",
      ifTooManyQuestions:
        "Dice que no puede responder tantas cosas porque le duele mucho."
    },
    importantNegatives: [
      "No fiebre",
      "No tos purulenta",
      "No dolor reproducible claramente con palpación",
      "No trauma torácico",
      "No hemoptisis",
      "No síncope prolongado"
    ],
    responseGuide: {
      topicAnswers: {
        motivo:
          "Tengo un dolor opresivo en el pecho que se me va al brazo izquierdo y a la mandíbula.",
        aparicion:
          "Empezó hace como una hora, mientras trabajaba.",
        localizacion:
          "En el centro del pecho.",
        irradiacion:
          "Se me va al brazo izquierdo y a la mandíbula.",
        caracter:
          "Es como una presión, como si me apretaran el pecho.",
        intensidad:
          "Está en 9 de 10.",
        agravantesAtenuantes:
          "No se me quita con reposo. Me asusta porque sigue ahí.",
        frecuenciaDuracion:
          "Es constante desde que empezó.",
        sintomasAsociados:
          "Estoy sudando, con náuseas y algo de falta de aire.",
        antecedentes:
          "Tengo presión alta, azúcar alta y colesterol. También fumé bastante.",
        familiar:
          "Mi papá tuvo un infarto.",
        examen:
          "Estoy sudoroso, taquicárdico y con presión alta."
      }
    },
    hiddenHistory: {
      diagnosis: "Síndrome coronario agudo con elevación del ST inferior",
      identification: {
        document: "71.456.982",
        rh: "A+"
      },
      aliciaFredusa: {
        aparicion: "Hace 1 hora.",
        localizacion: "Centro del pecho.",
        irradiacion: "Brazo izquierdo y mandíbula.",
        caracter: "Opresivo.",
        intensidad: "9/10.",
        atenuantesAgravantes: "No cede claramente con reposo.",
        frecuencia: "Constante.",
        duracion: "Desde el inicio, una hora.",
        sintomasAsociados: "Diaforesis, náuseas, disnea."
      },
      riskFactors: [
        "Hipertensión arterial.",
        "Diabetes mellitus.",
        "Dislipidemia.",
        "Tabaquismo previo o activo.",
        "Padre con infarto."
      ],
      paraclinics: {
        ecg: "Elevación del ST en derivaciones inferiores.",
        troponin: "Elevada."
      }
    },
    physicalExam: {
      general: "Paciente ansioso, diaforético, con facies de dolor.",
      vitalSigns: {
        bloodPressure: "154/92 mmHg",
        heartRate: "108 lpm",
        respiratoryRate: "24 rpm",
        temperature: "36.7 °C",
        oxygenSaturation: "95% al aire ambiente"
      },
      cardiovascular:
        "Ruidos cardíacos rítmicos, taquicárdico, sin soplo dominante descrito.",
      respiratory: "Sin crépitos francos, sin sibilancias predominantes.",
      chestWall: "Dolor no reproducible claramente con palpación.",
      extremities: "Sin edema marcado."
    },
    evaluationChecklist: [
      "Caracterizó dolor torácico con ALICIA FREDUSA.",
      "Exploró irradiación a brazo y mandíbula.",
      "Preguntó síntomas vegetativos.",
      "Preguntó disnea.",
      "Exploró factores de riesgo cardiovascular.",
      "Preguntó antecedentes familiares.",
      "Diferenció dolor no musculoesquelético.",
      "Solicitó signos vitales.",
      "Consideró ECG y troponina.",
      "Reconoció síndrome coronario agudo como posibilidad prioritaria."
    ]
  },

  {
    id: "case-8",
    publicLabel: "Paciente 11",
    publicSex: "Femenino",
    publicAge: 43,
    simulatedPerson: {
      fullName: "Claudia Patricia Ramírez Vélez",
      age: 43,
      sex: "Femenino",
      occupation: "Auxiliar administrativa",
      personality:
        "Preocupada, irritable por el dolor, pero colaboradora si el estudiante es claro."
    },
    hiddenAcademicObjective:
      "Evaluar dolor en hipocondrio derecho con ALICIA FREDUSA, relación con comida grasa, náuseas, fiebre, Murphy positivo y diferenciales biliares.",
    mainComplaint:
      "Tengo un dolor muy fuerte debajo de las costillas del lado derecho.",
    conversationBehavior: {
      baseline:
        "Se muestra con dolor y náuseas. Responde mejor a preguntas concretas.",
      ifEmpathic:
        "Describe relación con comida grasosa y episodios previos.",
      ifRudeOrDisorganized:
        "Se irrita porque tiene dolor y náuseas.",
      ifTooManyQuestions:
        "Dice que le duele mucho y que le pregunten una cosa a la vez."
    },
    importantNegatives: [
      "No ictericia franca",
      "No coluria marcada",
      "No acolia",
      "No fiebre alta con escalofríos intensos",
      "No confusión",
      "No hipotensión",
      "No dolor torácico opresivo",
      "No disuria",
      "No hematuria"
    ],
    responseGuide: {
      topicAnswers: {
        motivo:
          "Me duele muy fuerte debajo de las costillas del lado derecho.",
        aparicion:
          "Empezó hace unas 10 o 12 horas.",
        localizacion:
          "Es debajo de las costillas del lado derecho.",
        irradiacion:
          "Se me va hacia la espalda o hacia el omóplato derecho.",
        caracter:
          "Al principio era como cólico, pero ahora es más constante.",
        intensidad:
          "Está como en 8 de 10.",
        agravantesAtenuantes:
          "Empezó después de comer algo grasoso. Me duele más si respiro profundo o me tocan.",
        frecuenciaDuracion:
          "Esta vez no se me ha quitado. Otros cólicos me duraban menos.",
        sintomasAsociados:
          "Tengo náuseas, vomité una vez, no tengo ganas de comer y me he sentido caliente.",
        ictericia:
          "Amarilla como tal no me he visto.",
        urinario:
          "Ardor o sangre en la orina no.",
        examen:
          "Cuando me palpan debajo de las costillas derechas y me piden respirar, me duele mucho."
      }
    },
    hiddenHistory: {
      diagnosis: "Colecistitis aguda litiásica",
      aliciaFredusa: {
        aparicion: "10-12 horas.",
        localizacion: "Hipocondrio derecho.",
        irradiacion: "Espalda o escápula derecha.",
        caracter: "Tipo cólico inicial, luego más constante.",
        intensidad: "8/10.",
        atenuantesAgravantes:
          "Empeora con inspiración profunda, movimiento y palpación. Inicio después de comida grasa.",
        frecuencia: "Continuo con oleadas más fuertes.",
        duracion: "Más prolongado que episodios previos.",
        sintomasAsociados: "Náuseas, vómito, hiporexia, sensación febril."
      },
      presentIllness: [
        "Dolor posterior a comida grasosa.",
        "Episodios previos parecidos más leves y breves.",
        "Esta vez el dolor no cede.",
        "Náuseas, un vómito, hiporexia, sensación febril.",
        "No diarrea importante ni síntomas urinarios."
      ],
      pastHistory: [
        "Sobrepeso leve.",
        "Episodios previos de cólicos después de comidas grasas.",
        "No cirugía abdominal previa.",
        "No embarazo actual.",
        "No alergias conocidas."
      ],
      paraclinics: {
        cbc: "Leucocitosis con neutrofilia.",
        crp: "Elevada.",
        bilirubin: "Normal o discretamente elevada.",
        ultrasound:
          "Cálculos vesiculares, pared vesicular engrosada, dolor con transductor en hipocondrio derecho.",
        bileDuct: "Sin dilatación importante de vía biliar."
      }
    },
    physicalExam: {
      general: "Paciente con facies de dolor y náuseas.",
      vitalSigns: {
        bloodPressure: "124/78 mmHg",
        heartRate: "102 lpm",
        respiratoryRate: "18 rpm",
        temperature: "38.1 °C",
        oxygenSaturation: "98% al aire ambiente"
      },
      abdomen:
        "Dolor a la palpación en hipocondrio derecho, Murphy positivo, defensa localizada leve.",
      peritonitis: "Sin peritonitis generalizada.",
      bowelSounds: "Ruidos intestinales presentes.",
      jaundice: "Sin ictericia marcada.",
      cardiopulmonary: "Sin hallazgos principales."
    },
    evaluationChecklist: [
      "Caracterizó dolor con ALICIA FREDUSA.",
      "Preguntó relación con comida grasa.",
      "Preguntó episodios previos.",
      "Preguntó náuseas y vómito.",
      "Preguntó fiebre.",
      "Preguntó ictericia, coluria y acolia.",
      "Descartó síntomas urinarios.",
      "Solicitó Murphy.",
      "Exploró hipocondrio derecho.",
      "Buscó signos de irritación peritoneal.",
      "Consideró cólico biliar, coledocolitiasis, colangitis, pancreatitis y hepatitis."
    ]
  },

  {
    id: "case-3",
    publicLabel: "Paciente 12",
    publicSex: "Femenino",
    publicAge: 49,
    simulatedPerson: {
      fullName: "Marcela Andrea Ruiz Castaño",
      age: 49,
      sex: "Femenino",
      occupation: "Peluquera",
      personality:
        "Trabajadora, preocupada por no poder usar el brazo. Colaboradora, pero teme que le duela al examen."
    },
    hiddenAcademicObjective:
      "Evaluar dolor de hombro con ALICIA FREDUSA, relación con movimientos sobre la cabeza, movilidad activa/pasiva y maniobras de pinzamiento/manguito rotador.",
    mainComplaint:
      "Me duele mucho el hombro derecho, sobre todo cuando levanto el brazo.",
    conversationBehavior: {
      baseline:
        "Cuida el brazo y evita elevarlo. Describe dolor al peinar, trabajar y alcanzar objetos.",
      ifEmpathic:
        "Permite explorar mejor maniobras y limitación funcional.",
      ifRudeOrDisorganized:
        "Se pone defensiva porque teme que le muevan el hombro con fuerza.",
      ifTooManyQuestions:
        "Dice que mejor le pregunten una cosa a la vez porque le preocupa el dolor."
    },
    importantNegatives: [
      "No trauma mayor",
      "No fiebre",
      "No enrojecimiento articular",
      "No dolor torácico",
      "No déficit neurológico distal",
      "No pérdida completa de fuerza súbita"
    ],
    responseGuide: {
      topicAnswers: {
        motivo:
          "Me duele el hombro derecho cuando levanto el brazo o trabajo peinando.",
        aparicion:
          "Lleva varias semanas, empezó poco a poco.",
        localizacion:
          "Es en el hombro derecho, más por la parte lateral.",
        irradiacion:
          "A veces baja un poco hacia la parte lateral del brazo, pero no hasta la mano.",
        caracter:
          "Es un dolor punzante o como quemante cuando levanto el brazo.",
        intensidad:
          "Al moverlo puede llegar a 7 de 10.",
        agravantesAtenuantes:
          "Empeora al peinar, levantar el brazo, alcanzar cosas arriba o dormir sobre ese lado. Mejora con reposo.",
        frecuenciaDuracion:
          "Lo siento casi todos los días, sobre todo con movimientos.",
        sintomasAsociados:
          "Siento debilidad por dolor y me cuesta trabajar, pero la mano no se me duerme.",
        trabajo:
          "Soy peluquera y mantengo mucho los brazos levantados.",
        examen:
          "Me duele más al levantar el brazo y con unas pruebas que me hacen en el hombro."
      }
    },
    hiddenHistory: {
      diagnosis: "Síndrome de manguito rotador / pinzamiento subacromial",
      identification: {
        document: "43.890.127",
        rh: "B+"
      },
      aliciaFredusa: {
        aparicion: "Semanas de evolución, inicio progresivo.",
        localizacion: "Hombro derecho, región lateral.",
        irradiacion: "Cara lateral del brazo, no hasta la mano.",
        caracter: "Punzante o quemante con elevación.",
        intensidad: "Hasta 7/10 con movimiento.",
        atenuantesAgravantes:
          "Empeora con elevación, peinar, alcanzar objetos y dormir sobre ese lado. Mejora con reposo.",
        frecuencia: "Casi diaria con movimientos.",
        duracion: "Semanas.",
        sintomasAsociados:
          "Limitación funcional, debilidad por dolor, sin parestesias distales."
      },
      presentIllness: [
        "Dolor progresivo de hombro derecho.",
        "Empeora con actividades sobre la cabeza.",
        "Dificultad para trabajar como peluquera.",
        "Dolor nocturno al dormir sobre el lado afectado."
      ],
      pastHistory: [
        "Sin trauma mayor reciente.",
        "Sin enfermedad reumatológica conocida.",
        "No cirugías de hombro.",
        "No alergias conocidas."
      ]
    },
    physicalExam: {
      general: "Buen estado general, protege el hombro derecho.",
      shoulder: {
        inspection: "Sin deformidad evidente.",
        palpation: "Dolor subacromial o lateral.",
        rangeOfMotion:
          "Dolor mayor con movilidad activa que pasiva, especialmente abducción.",
        painfulArc: "Arco doloroso positivo.",
        neer: "Positivo.",
        hawkins: "Positivo.",
        jobe: "Positivo por dolor/debilidad.",
        externalRotation: "Puede doler, fuerza limitada por dolor.",
        neurovascular: "Neurovascular distal conservado."
      },
      cervical: "Sin signos claros de radiculopatía cervical."
    },
    evaluationChecklist: [
      "Caracterizó dolor con ALICIA FREDUSA.",
      "Preguntó ocupación y movimientos repetitivos sobre la cabeza.",
      "Exploró dolor nocturno.",
      "Diferenció irradiación de parestesias.",
      "Evaluó movilidad activa y pasiva.",
      "Solicitó arco doloroso.",
      "Solicitó Neer.",
      "Solicitó Hawkins.",
      "Solicitó Jobe.",
      "Evaluó neurovascular distal.",
      "Consideró diferenciales como capsulitis adhesiva, tendinopatía, ruptura de manguito, radiculopatía cervical."
    ]
  }
];

export function getCaseById(caseId: string | undefined | null): CaseData {
  return CASES.find((item) => item.id === caseId) || CASES[0];
}