cat > lib/clinicalRecords.ts <<'TS'
export type ClinicalRecord = {
  caseId: string;
  identification: {
    fullName: string;
    documentId: string;
    bloodTypeRh: string;
    age: number;
    sex: string;
    genderIdentity: string;
    ethnicity: string;
    birthDate: string;
    placeOfBirth: string;
    address: string;
    phone: string;
    insurance: string;
    socioeconomicStratum: string;
    educationLevel: string;
    residenceArea: string;
    maritalStatus: string;
    occupation: string;
    dominantHand: string;
    mainLanguage: string;
    disability: string;
    emergencyContact: string;
    companion: string;
    informantReliability: string;
  };
  encounter: {
    dateTime: string;
    setting: string;
  };
  chiefComplaint: string;
  presentIllness: string;
  history: {
    pathological: string[];
    surgical: string[];
    traumatic: string[];
    pharmacological: string[];
    allergies: string[];
    toxicological: string[];
    gynecoObstetric?: string[];
    family: string[];
    occupational: string[];
    epidemiological: string[];
  };
  reviewOfSystems: Record<string, string>;
  diagnostic: {
    presumptive: string;
    definitive: string;
    cie10: string[];
  };
  plan: {
    diagnostic: string[];
    therapeutic: string[];
    medications: string[];
    procedures: string[];
    interconsultations: string[];
    recommendations: string[];
  };
  results: {
    labs: string[];
    imaging: string[];
    complementaryStudies: string[];
  };
  evolution: {
    medicalEvolution: string;
    responseToTreatment: string;
    dischargeSummary: string;
    finalDiagnoses: string[];
  };
};

export const CLINICAL_RECORDS: ClinicalRecord[] = [
  {
    caseId: "case-1",
    identification: {
      fullName: "Gloria Cecilia Restrepo Álvarez",
      documentId: "43.568.291",
      bloodTypeRh: "O positivo (O+)",
      age: 68,
      sex: "Femenino",
      genderIdentity: "Mujer cisgénero",
      ethnicity: "Se autorreconoce como mestiza",
      birthDate: "1958-02-14",
      placeOfBirth: "Medellín, Antioquia",
      address: "Envigado, Antioquia",
      phone: "300 000 0001",
      insurance: "EPS simulada Sura",
      socioeconomicStratum: "Estrato 3",
      educationLevel: "Bachillerato completo",
      residenceArea: "Residencia urbana",
      maritalStatus: "Viuda",
      occupation: "Ama de casa",
      dominantHand: "Diestra",
      mainLanguage: "Español",
      disability: "No refiere discapacidad conocida",
      emergencyContact: "Hija: Carolina Restrepo, 300 000 0101",
      companion: "Consulta sola, aunque su hija está pendiente de ella",
      informantReliability: "Información confiable, aunque la paciente no recuerda con precisión algunos nombres de medicamentos"
    },
    encounter: {
      dateTime: "2026-05-20 08:15",
      setting: "Consulta externa simulada"
    },
    chiefComplaint: "Ay doctor, me falta mucho el aire.",
    presentIllness:
      "Paciente femenina de 68 años con disnea de aproximadamente un año de evolución, progresiva, inicialmente con esfuerzos moderados y actualmente con esfuerzos menores. Refiere empeoramiento al caminar rápido y subir escaleras, sensación de ahogo al acostarse completamente, despertares nocturnos con sensación de falta de aire, tos seca nocturna y edema bilateral de tobillos de predominio vespertino. Niega fiebre, dolor torácico actual, hemoptisis, síncope o inicio súbito.",
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
      traumatic: [
        "Niega traumas recientes relevantes"
      ],
      pharmacological: [
        "Losartán",
        "Hidroclorotiazida de uso irregular",
        "Atorvastatina",
        "Ácido acetilsalicílico",
        "Salbutamol a necesidad"
      ],
      allergies: [
        "Niega alergias medicamentosas conocidas"
      ],
      toxicological: [
        "Exfumadora",
        "Niega consumo actual de alcohol en exceso",
        "Niega consumo de sustancias psicoactivas"
      ],
      gynecoObstetric: [
        "Menopausia desde hace varios años",
        "Gestas y partos sin complicaciones mayores referidas",
        "Niega sangrado genital actual"
      ],
      family: [
        "Padre con antecedente de hipertensión arterial",
        "Madre con diabetes mellitus tipo 2",
        "No recuerda antecedentes familiares claros de muerte súbita"
      ],
      occupational: [
        "Ama de casa",
        "Realiza oficios domésticos, actualmente limitados por disnea"
      ],
      epidemiological: [
        "Niega viajes recientes",
        "Niega contacto reciente con personas con infección respiratoria aguda",
        "Vive en zona urbana"
      ]
    },
    reviewOfSystems: {
      general:
        "Cansancio progresivo. Niega fiebre. Refiere sensación de aumento de peso, sin dato exacto.",
      cardiovascular:
        "Disnea de esfuerzo, ortopnea, despertares nocturnos con ahogo y edema bilateral de tobillos. Niega dolor torácico actual.",
      respiratory:
        "Tos seca nocturna. Disnea progresiva. Niega expectoración purulenta y hemoptisis.",
      gastrointestinal:
        "Niega dolor abdominal, vómito, diarrea o sangrado digestivo.",
      genitourinary:
        "Refiere aumento de la diuresis cuando toma el medicamento que la hace orinar. Niega disuria.",
      neurologic:
        "Niega pérdida de fuerza focal, alteración del habla, convulsiones o pérdida de conciencia.",
      musculoskeletal:
        "Niega dolor articular agudo relevante. Refiere cansancio al esfuerzo.",
      skin:
        "Niega lesiones cutáneas agudas. Refiere hinchazón en tobillos.",
      endocrine:
        "Antecedente de diabetes. No refiere síntomas claros de hipoglicemia.",
      psychiatric:
        "Se nota ansiosa por la sensación de falta de aire."
    },
    diagnostic: {
      presumptive: "Insuficiencia cardíaca descompensada",
      definitive:
        "Síndrome compatible con insuficiencia cardíaca crónica descompensada en contexto de antecedente coronario",
      cie10: [
        "I50.0 Insuficiencia cardíaca congestiva",
        "I10 Hipertensión esencial",
        "E11.9 Diabetes mellitus tipo 2 sin complicaciones especificadas",
        "I25.2 Infarto antiguo del miocardio"
      ]
    },
    plan: {
      diagnostic: [
        "Electrocardiograma",
        "Radiografía de tórax",
        "BNP o NT-proBNP",
        "Hemograma",
        "Función renal y electrolitos",
        "Ecocardiograma transtorácico"
      ],
      therapeutic: [
        "Optimización del manejo de congestión según valoración médica",
        "Revisión de adherencia farmacológica",
        "Educación sobre signos de alarma"
      ],
      medications: [
        "No formular en la simulación sin criterio médico docente",
        "Revisar adherencia a antihipertensivos y diurético"
      ],
      procedures: [
        "No requiere procedimiento inmediato en esta simulación"
      ],
      interconsultations: [
        "Cardiología según disponibilidad y evolución clínica"
      ],
      recommendations: [
        "Consultar por empeoramiento de disnea, dolor torácico, síncope o edema progresivo",
        "No suspender medicamentos sin indicación médica"
      ]
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
        "Electrocardiograma: ritmo sinusal, signos de antecedente isquémico antiguo",
        "Ecocardiograma simulado: fracción de eyección disminuida de forma moderada"
      ]
    },
    evolution: {
      medicalEvolution:
        "Durante la simulación se mantiene estable, con disnea leve al hablar mucho y ansiedad por el ahogo nocturno.",
      responseToTreatment:
        "No se administra tratamiento real dentro de la simulación. La respuesta terapéutica queda para discusión académica.",
      dischargeSummary:
        "Caso simulado de paciente con síndrome congestivo compatible con insuficiencia cardíaca.",
      finalDiagnoses: [
        "Insuficiencia cardíaca descompensada",
        "Hipertensión arterial",
        "Diabetes mellitus tipo 2",
        "Antecedente de enfermedad coronaria"
      ]
    }
  },
  {
    caseId: "case-2",
    identification: {
      fullName: "Álvaro Hernán Gómez Ramírez",
      documentId: "70.123.456",
      bloodTypeRh: "A positivo (A+)",
      age: 72,
      sex: "Masculino",
      genderIdentity: "Hombre cisgénero",
      ethnicity: "Se autorreconoce como mestizo",
      birthDate: "1954-04-10",
      placeOfBirth: "Medellín, Antioquia",
      address: "Medellín, Antioquia",
      phone: "300 000 0002",
      insurance: "Nueva EPS simulada",
      socioeconomicStratum: "Estrato 3",
      educationLevel: "Bachillerato incompleto",
      residenceArea: "Residencia urbana",
      maritalStatus: "Casado",
      occupation: "Jubilado",
      dominantHand: "Diestro",
      mainLanguage: "Español",
      disability: "No refiere discapacidad previa conocida",
      emergencyContact: "Esposa: Marta Ramírez, 300 000 0102",
      companion: "Acude acompañado por su esposa",
      informantReliability: "Información parcialmente confiable; la esposa complementa por la dificultad del habla"
    },
    encounter: {
      dateTime: "2026-05-20 09:00",
      setting: "Evaluación inicial simulada"
    },
    chiefComplaint: "Doctor, se me durmió este lado y hablo raro.",
    presentIllness:
      "Paciente masculino de 72 años con inicio súbito de debilidad en hemicuerpo derecho y alteración del habla hace aproximadamente 2 horas. La familia refiere que estaba normal previamente. Presenta mayor compromiso en brazo derecho, sensación de adormecimiento en cara y brazo derechos, asimetría facial y disartria leve. Niega trauma, pérdida de conciencia, convulsiones, fiebre, dolor torácico o cefalea intensa tipo trueno.",
    history: {
      pathological: [
        "Hipertensión arterial",
        "Diabetes mellitus tipo 2",
        "Fibrilación auricular referida",
        "Dislipidemia probable"
      ],
      surgical: [
        "Niega cirugías mayores recientes"
      ],
      traumatic: [
        "Niega trauma craneoencefálico reciente",
        "Niega caídas previas al inicio del cuadro"
      ],
      pharmacological: [
        "Losartán",
        "Metformina",
        "Anticoagulante de nombre no recordado, con adherencia irregular"
      ],
      allergies: [
        "Niega alergias medicamentosas conocidas"
      ],
      toxicological: [
        "Exfumador",
        "Niega alcohol en exceso",
        "Niega sustancias psicoactivas"
      ],
      family: [
        "Padre con antecedente de evento cerebrovascular según refiere",
        "Familia con hipertensión arterial"
      ],
      occupational: [
        "Jubilado",
        "Actividad física limitada"
      ],
      epidemiological: [
        "Niega viajes recientes",
        "Niega síntomas infecciosos recientes",
        "Vive con familia"
      ]
    },
    reviewOfSystems: {
      general:
        "Niega fiebre, pérdida de peso o malestar general previo importante.",
      cardiovascular:
        "Antecedente de ritmo cardíaco irregular. Niega dolor torácico actual.",
      respiratory:
        "Niega disnea, tos o expectoración.",
      gastrointestinal:
        "Niega vómito, dolor abdominal o sangrado digestivo.",
      genitourinary:
        "Niega disuria o síntomas urinarios agudos.",
      neurologic:
        "Debilidad derecha, habla enredada, asimetría facial y sensación de adormecimiento derecho. Niega convulsión o pérdida de conciencia.",
      musculoskeletal:
        "Niega dolor articular o trauma. La limitación actual es por debilidad neurológica.",
      skin:
        "Sin lesiones cutáneas agudas.",
      endocrine:
        "Antecedente de diabetes. No refiere síntomas claros de hipoglicemia.",
      psychiatric:
        "Ansioso y frustrado por dificultad para hablar."
    },
    diagnostic: {
      presumptive: "Accidente cerebrovascular agudo",
      definitive:
        "Síndrome compatible con accidente cerebrovascular isquémico agudo en territorio de circulación anterior",
      cie10: [
        "I63.9 Infarto cerebral no especificado",
        "I48 Fibrilación auricular y aleteo auricular",
        "I10 Hipertensión esencial",
        "E11.9 Diabetes mellitus tipo 2 sin complicaciones especificadas"
      ]
    },
    plan: {
      diagnostic: [
        "Glucometría inmediata",
        "TAC simple de cráneo",
        "Electrocardiograma",
        "Hemograma",
        "TP/INR y tiempos de coagulación",
        "Función renal y electrolitos"
      ],
      therapeutic: [
        "Activación de protocolo institucional de ACV según contexto académico",
        "Definir ventana terapéutica y contraindicaciones",
        "Monitoreo neurológico y hemodinámico"
      ],
      medications: [
        "No formular dentro de la simulación sin valoración médica docente",
        "Verificar uso y adherencia de anticoagulante"
      ],
      procedures: [
        "No procedimiento invasivo dentro de esta fase de simulación"
      ],
      interconsultations: [
        "Neurología",
        "Urgencias / medicina interna según escenario"
      ],
      recommendations: [
        "Reconocer signos de alarma neurológicos",
        "Consultar inmediatamente ante inicio súbito de déficit neurológico"
      ]
    },
    results: {
      labs: [
        "Glucometría 128 mg/dL",
        "Hemograma sin leucocitosis marcada",
        "Creatinina 1.0 mg/dL",
        "INR no terapéutico para anticoagulación efectiva"
      ],
      imaging: [
        "TAC simple de cráneo: sin hemorragia intracraneal evidente en la simulación inicial"
      ],
      complementaryStudies: [
        "Electrocardiograma: fibrilación auricular con respuesta ventricular rápida moderada"
      ]
    },
    evolution: {
      medicalEvolution:
        "Durante la simulación persiste disartria y debilidad derecha, sin pérdida de conciencia.",
      responseToTreatment:
        "No se administra tratamiento real dentro de la simulación. Se plantea discusión académica sobre ventana terapéutica y protocolo de ACV.",
      dischargeSummary:
        "Caso simulado de déficit neurológico focal de inicio súbito compatible con ACV agudo.",
      finalDiagnoses: [
        "Accidente cerebrovascular agudo probable",
        "Fibrilación auricular",
        "Hipertensión arterial",
        "Diabetes mellitus tipo 2"
      ]
    }
  },
  {
    caseId: "case-3",
    identification: {
      fullName: "Marcela Andrea Ruiz Castaño",
      documentId: "43.890.127",
      bloodTypeRh: "B positivo (B+)",
      age: 49,
      sex: "Femenino",
      genderIdentity: "Mujer cisgénero",
      ethnicity: "Se autorreconoce como mestiza",
      birthDate: "1977-09-02",
      placeOfBirth: "Itagüí, Antioquia",
      address: "Medellín, Antioquia",
      phone: "300 000 0003",
      insurance: "EPS simulada Sanitas",
      socioeconomicStratum: "Estrato 3",
      educationLevel: "Técnico laboral",
      residenceArea: "Residencia urbana",
      maritalStatus: "Unión libre",
      occupation: "Auxiliar administrativa",
      dominantHand: "Diestra",
      mainLanguage: "Español",
      disability: "No refiere discapacidad conocida",
      emergencyContact: "Pareja: Andrés Castaño, 300 000 0103",
      companion: "Consulta sola",
      informantReliability: "Información confiable"
    },
    encounter: {
      dateTime: "2026-05-20 10:00",
      setting: "Consulta externa simulada"
    },
    chiefComplaint: "Doctor, me duele mucho el hombro.",
    presentIllness:
      "Paciente femenina de 49 años con dolor de hombro derecho de 3 meses de evolución, de inicio progresivo, localizado principalmente en cara lateral del hombro. Empeora al levantar el brazo por encima de la cabeza, peinarse, vestirse, cargar bolsas y dormir sobre ese lado. Refiere sensación de debilidad por dolor. Niega trauma fuerte, fiebre, pérdida de peso, deformidad, dolor torácico, adormecimiento, hormigueo o pérdida de fuerza distal en la mano.",
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
        "Refiere posible sobrecarga al cargar bolsas y hacer oficios"
      ],
      pharmacological: [
        "Acetaminofén ocasional",
        "Ibuprofeno ocasional cuando el dolor es más fuerte"
      ],
      allergies: [
        "Niega alergias medicamentosas conocidas"
      ],
      toxicological: [
        "Niega tabaquismo",
        "Alcohol social ocasional",
        "Niega sustancias psicoactivas"
      ],
      gynecoObstetric: [
        "Ciclos menstruales irregulares ocasionales por edad",
        "Niega embarazo actual",
        "Niega sangrado genital anormal"
      ],
      family: [
        "Madre con artrosis",
        "Niega antecedentes familiares relevantes de enfermedades inflamatorias articulares"
      ],
      occupational: [
        "Auxiliar administrativa",
        "Trabajo prolongado en escritorio",
        "Realiza oficios domésticos y carga bolsas"
      ],
      epidemiological: [
        "Niega viajes recientes",
        "Niega exposición infecciosa relevante",
        "No refiere picaduras ni síntomas sistémicos"
      ]
    },
    reviewOfSystems: {
      general:
        "Niega fiebre, pérdida de peso o sudoración nocturna.",
      cardiovascular:
        "Niega dolor torácico, palpitaciones o síncope.",
      respiratory:
        "Niega tos, disnea o expectoración.",
      gastrointestinal:
        "Niega dolor abdominal, vómito o diarrea.",
      genitourinary:
        "Niega síntomas urinarios.",
      neurologic:
        "Niega adormecimiento, hormigueo o pérdida de fuerza distal en mano.",
      musculoskeletal:
        "Dolor de hombro derecho, limitación para elevar el brazo, peinarse, vestirse y dormir sobre ese lado.",
      skin:
        "Niega enrojecimiento, calor local marcado o lesiones cutáneas.",
      endocrine:
        "Niega diabetes y enfermedad tiroidea conocida.",
      psychiatric:
        "Preocupada por persistencia del dolor y limitación funcional."
    },
    diagnostic: {
      presumptive: "Síndrome del manguito rotador",
      definitive:
        "Síndrome doloroso de hombro derecho compatible con lesión o tendinopatía del manguito rotador",
      cie10: [
        "M75.1 Síndrome del manguito rotador",
        "M75.4 Síndrome de pinzamiento del hombro"
      ]
    },
    plan: {
      diagnostic: [
        "Radiografía de hombro si se considera necesario",
        "Ecografía musculoesquelética de hombro",
        "Resonancia magnética si hay sospecha de ruptura significativa o mala evolución"
      ],
      therapeutic: [
        "Educación sobre modificación de actividades",
        "Rehabilitación y fisioterapia según valoración médica",
        "Manejo analgésico según criterio médico"
      ],
      medications: [
        "No formular dentro de la simulación sin valoración médica docente",
        "Evitar automedicación prolongada con antiinflamatorios"
      ],
      procedures: [
        "No procedimiento inmediato dentro de esta simulación"
      ],
      interconsultations: [
        "Fisioterapia",
        "Ortopedia si hay limitación severa, sospecha de ruptura o mala evolución"
      ],
      recommendations: [
        "Evitar cargas por encima de la cabeza",
        "Consultar si aparece debilidad progresiva, fiebre, deformidad o dolor incapacitante"
      ]
    },
    results: {
      labs: [
        "No se solicitan laboratorios de rutina en esta simulación inicial"
      ],
      imaging: [
        "Radiografía de hombro: sin fractura ni luxación",
        "Ecografía de hombro: tendinopatía del supraespinoso, sin ruptura completa evidente"
      ],
      complementaryStudies: [
        "Evaluación funcional de hombro compatible con compromiso del manguito rotador"
      ]
    },
    evolution: {
      medicalEvolution:
        "Durante la simulación presenta dolor con elevación y maniobras de pinzamiento, sin compromiso neurovascular distal.",
      responseToTreatment:
        "No se administra tratamiento real dentro de la simulación. Se plantea manejo académico conservador inicial.",
      dischargeSummary:
        "Caso simulado de dolor crónico de hombro compatible con síndrome del manguito rotador.",
      finalDiagnoses: [
        "Síndrome del manguito rotador derecho",
        "Dolor crónico de hombro derecho"
      ]
    }
  }
];

export function getClinicalRecordByCaseId(caseId: string | undefined | null): ClinicalRecord | null {
  return CLINICAL_RECORDS.find((record) => record.caseId === caseId) || null;
}

function normalizeText(value: string): string {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(text: string, words: string[]): boolean {
  return words.some((word) => text.includes(word));
}

function list(items: string[]): string {
  return items.length > 0 ? items.join(". ") + "." : "No refiere.";
}

export function getClinicalRecordReply(
  message: string,
  caseId: string | undefined | null
): string | null {
  const record = getClinicalRecordByCaseId(caseId);
  if (!record) return null;

  const text = normalizeText(message);

  if (includesAny(text, ["nombre completo", "como se llama", "nombre del paciente"])) {
    return `Nombre completo: ${record.identification.fullName}.`;
  }

  if (includesAny(text, ["documento", "cedula", "identificacion", "numero de identificacion", "numero de documento"])) {
    return `Número de identificación: ${record.identification.documentId}.`;
  }

  if (includesAny(text, ["tipo de sangre", "grupo sanguineo", "rh", "hemoclasificacion"])) {
    return `Tipo de sangre / RH: ${record.identification.bloodTypeRh}.`;
  }

  if (includesAny(text, ["edad", "cuantos anos", "cuantos años"])) {
    return `Edad: ${record.identification.age} años.`;
  }

  if (includesAny(text, ["sexo", "sexo del paciente", "sexo biologico"])) {
    return `Sexo del paciente: ${record.identification.sex}.`;
  }

  if (includesAny(text, ["genero", "identidad de genero", "genero con el que se identifica"])) {
    return `Identidad de género: ${record.identification.genderIdentity}.`;
  }

  if (includesAny(text, ["raza", "etnia", "grupo etnico", "autorreconoce", "autorreconocimiento"])) {
    return `Raza / etnia: ${record.identification.ethnicity}.`;
  }

  if (includesAny(text, ["fecha de nacimiento", "cuando nacio", "nacimiento"])) {
    return `Fecha de nacimiento: ${record.identification.birthDate}.`;
  }

  if (includesAny(text, ["lugar de nacimiento", "donde nacio", "procedencia", "origen"])) {
    return `Lugar de nacimiento / procedencia: ${record.identification.placeOfBirth}.`;
  }

  if (includesAny(text, ["direccion", "direccion de residencia", "donde vive", "residencia"])) {
    return `Dirección de residencia: ${record.identification.address}.`;
  }

  if (includesAny(text, ["telefono", "numero de telefono", "contacto", "celular"])) {
    return `Número de teléfono: ${record.identification.phone}.`;
  }

  if (includesAny(text, ["eps", "aseguradora", "seguro", "entidad de salud"])) {
    return `Aseguradora / EPS: ${record.identification.insurance}.`;
  }

  if (includesAny(text, ["estrato", "estrato socioeconomico", "nivel socioeconomico"])) {
    return `Estrato socioeconómico: ${record.identification.socioeconomicStratum}.`;
  }

  if (includesAny(text, ["nivel educativo", "escolaridad", "educacion", "grado de escolaridad"])) {
    return `Nivel educativo: ${record.identification.educationLevel}.`;
  }

  if (includesAny(text, ["residencia urbana", "residencia rural", "urbana o rural", "zona de residencia", "area de residencia"])) {
    return `Residencia urbana o rural: ${record.identification.residenceArea}.`;
  }

  if (includesAny(text, ["estado civil"])) {
    return `Estado civil: ${record.identification.maritalStatus}.`;
  }

  if (includesAny(text, ["ocupacion", "trabajo", "profesion", "laboral"])) {
    return `Ocupación: ${record.identification.occupation}.`;
  }

  if (includesAny(text, ["mano dominante", "diestro", "zurdo"])) {
    return `Mano dominante: ${record.identification.dominantHand}.`;
  }

  if (includesAny(text, ["idioma", "lengua", "lenguaje principal"])) {
    return `Idioma principal: ${record.identification.mainLanguage}.`;
  }

  if (includesAny(text, ["discapacidad"])) {
    return `Discapacidad conocida: ${record.identification.disability}.`;
  }

  if (includesAny(text, ["contacto de emergencia", "acudiente", "responsable", "acompanante", "acompañante", "familiar responsable"])) {
    return `Contacto de emergencia: ${record.identification.emergencyContact}. Acompañante/informante: ${record.identification.companion}.`;
  }

  if (includesAny(text, ["confiabilidad", "confiable", "informante"])) {
    return `Confiabilidad de la información: ${record.identification.informantReliability}.`;
  }

  if (includesAny(text, ["fecha de atencion", "hora de atencion", "fecha y hora", "cuando fue atendido"])) {
    return `Fecha y hora de atención: ${record.encounter.dateTime}. Lugar: ${record.encounter.setting}.`;
  }

  if (includesAny(text, ["motivo de consulta", "por que consulta", "que lo trae", "que la trae"])) {
    return `Motivo de consulta: ${record.chiefComplaint}`;
  }

  if (includesAny(text, ["enfermedad actual", "historia de la enfermedad", "problema actual", "descripcion cronologica", "cronologia"])) {
    return `Enfermedad actual: ${record.presentIllness}`;
  }

  if (includesAny(text, ["antecedentes patologicos", "patologicos"])) {
    return `Antecedentes personales patológicos: ${list(record.history.pathological)}`;
  }

  if (includesAny(text, ["antecedentes quirurgicos", "quirurgicos", "cirugias"])) {
    return `Antecedentes quirúrgicos: ${list(record.history.surgical)}`;
  }

  if (includesAny(text, ["antecedentes traumaticos", "traumaticos", "traumas"])) {
    return `Antecedentes traumáticos: ${list(record.history.traumatic)}`;
  }

  if (includesAny(text, ["antecedentes farmacologicos", "farmacologicos", "medicamentos actuales", "que medicamentos toma"])) {
    return `Antecedentes farmacológicos: ${list(record.history.pharmacological)}`;
  }

  if (includesAny(text, ["alergias", "alergicos", "antecedentes alergicos"])) {
    return `Antecedentes alérgicos: ${list(record.history.allergies)}`;
  }

  if (includesAny(text, ["toxicos", "toxicologicos", "tabaco", "cigarrillo", "alcohol", "sustancias"])) {
    return `Antecedentes toxicológicos: ${list(record.history.toxicological)}`;
  }

  if (includesAny(text, ["gineco", "obstetricos", "ginecoobstetricos", "menarquia", "menopausia", "gestas", "embarazos"])) {
    return `Antecedentes gineco-obstétricos: ${list(record.history.gynecoObstetric || ["No aplica o no refiere datos relevantes."])}`;
  }

  if (includesAny(text, ["familiares", "antecedentes familiares"])) {
    return `Antecedentes familiares: ${list(record.history.family)}`;
  }

  if (includesAny(text, ["ocupacionales", "antecedentes ocupacionales"])) {
    return `Antecedentes ocupacionales: ${list(record.history.occupational)}`;
  }

  if (includesAny(text, ["epidemiologicos", "viajes", "contactos", "exposicion", "epidemiologia"])) {
    return `Antecedentes epidemiológicos: ${list(record.history.epidemiological)}`;
  }

  if (includesAny(text, ["antecedentes"])) {
    return `Antecedentes: patológicos: ${list(record.history.pathological)} Quirúrgicos: ${list(record.history.surgical)} Farmacológicos: ${list(record.history.pharmacological)} Alérgicos: ${list(record.history.allergies)}`;
  }

  if (includesAny(text, ["revision por sistemas", "revision de sistemas"])) {
    return "¿Qué sistema quiere revisar: general, cardiovascular, respiratorio, gastrointestinal, genitourinario, neurológico, osteomuscular, piel, endocrino o psiquiátrico?";
  }

  if (includesAny(text, ["sistema general", "revision general"])) {
    return `Revisión general: ${record.reviewOfSystems.general}`;
  }

  if (includesAny(text, ["cardiovascular", "cardiaco", "corazon"])) {
    return `Revisión cardiovascular: ${record.reviewOfSystems.cardiovascular}`;
  }

  if (includesAny(text, ["respiratorio", "pulmonar", "pulmones"])) {
    return `Revisión respiratoria: ${record.reviewOfSystems.respiratory}`;
  }

  if (includesAny(text, ["gastrointestinal", "digestivo", "abdominal"])) {
    return `Revisión gastrointestinal: ${record.reviewOfSystems.gastrointestinal}`;
  }

  if (includesAny(text, ["genitourinario", "urinario", "orina"])) {
    return `Revisión genitourinaria: ${record.reviewOfSystems.genitourinary}`;
  }

  if (includesAny(text, ["neurologico", "neurologica", "nervioso"])) {
    return `Revisión neurológica: ${record.reviewOfSystems.neurologic}`;
  }

  if (includesAny(text, ["osteomuscular", "musculoesqueletico", "musculo esqueletico", "articular"])) {
    return `Revisión osteomuscular: ${record.reviewOfSystems.musculoskeletal}`;
  }

  if (includesAny(text, ["piel", "dermatologico"])) {
    return `Revisión de piel: ${record.reviewOfSystems.skin}`;
  }

  if (includesAny(text, ["endocrino", "diabetes", "tiroides"])) {
    return `Revisión endocrina: ${record.reviewOfSystems.endocrine}`;
  }

  if (includesAny(text, ["psiquiatrico", "ansiedad", "animo", "estado de animo"])) {
    return `Revisión psiquiátrica: ${record.reviewOfSystems.psychiatric}`;
  }

  if (includesAny(text, ["laboratorios", "laboratorio", "hemograma", "creatinina", "glicemia", "inr", "electrolitos", "bnp"])) {
    return `Laboratorios disponibles: ${list(record.results.labs)}`;
  }

  if (includesAny(text, ["imagenes", "imagen", "radiografia", "tac", "tomografia", "ecografia", "resonancia"])) {
    return `Imágenes disponibles: ${list(record.results.imaging)}`;
  }

  if (includesAny(text, ["electrocardiograma", "ecg", "estudios complementarios", "paraclinicos", "ayudas diagnosticas"])) {
    return `Estudios complementarios disponibles: ${list(record.results.complementaryStudies)}`;
  }

  if (includesAny(text, ["diagnostico", "cie10", "cie 10", "plan", "tratamiento", "conducta", "interconsulta", "ordenes medicas", "epicrisis", "diagnosticos finales"])) {
    return "Esa parte debe construirla usted al finalizar la entrevista y será revisada en la retroalimentación académica.";
  }

  return null;
}
TS