type ClinicalPatientInfo = {
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
  reviewOfSystems: {
    general: string;
    cardiovascular: string;
    respiratory: string;
    gastrointestinal: string;
    genitourinary: string;
    neurologic: string;
    musculoskeletal: string;
    skin: string;
    endocrine: string;
    psychiatric: string;
  };
  results: {
    labs: string[];
    imaging: string[];
    complementaryStudies: string[];
  };
};

const CLINICAL_PATIENT_INFO: Record<string, ClinicalPatientInfo> = {
  "case-1": {
    presentIllness:
      "La dificultad para respirar empezó hace aproximadamente un año y ha empeorado progresivamente. Al principio aparecía con esfuerzos moderados, pero ahora aparece al caminar rápido, subir escaleras o hacer oficios de la casa. Empeora al acostarse completamente, se despierta a veces ahogada en la madrugada, tiene tos seca nocturna y se le hinchan ambos tobillos, sobre todo en la noche. Niega fiebre, dolor en el pecho actual, sangre al toser, desmayos o inicio súbito.",
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
        "Hidroclorotiazida de uso irregular porque la hace orinar mucho",
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
        "Realiza oficios domésticos",
        "Actualmente se limita por la dificultad para respirar"
      ],
      epidemiological: [
        "Niega viajes recientes",
        "Niega contacto reciente con personas con infección respiratoria",
        "Vive en zona urbana"
      ]
    },
    reviewOfSystems: {
      general:
        "Cansancio progresivo. Niega fiebre. Refiere sensación de aumento de peso, aunque no sabe cuánto.",
      cardiovascular:
        "Disnea de esfuerzo, ortopnea, despertares nocturnos con ahogo y edema bilateral de tobillos. Niega dolor torácico actual.",
      respiratory:
        "Tos seca nocturna y disnea progresiva. Niega expectoración purulenta y hemoptisis.",
      gastrointestinal:
        "Niega dolor abdominal, vómito, diarrea o sangrado digestivo.",
      genitourinary:
        "Refiere aumento de la diuresis cuando toma el medicamento que la hace orinar. Niega disuria.",
      neurologic:
        "Niega pérdida de fuerza focal, alteración del habla, convulsiones o pérdida de conciencia.",
      musculoskeletal:
        "Niega dolor articular agudo relevante. Refiere cansancio al esfuerzo.",
      skin:
        "Niega lesiones cutáneas agudas. Refiere hinchazón en ambos tobillos.",
      endocrine:
        "Antecedente de diabetes. No refiere síntomas claros de hipoglicemia.",
      psychiatric:
        "Se nota ansiosa por la sensación de falta de aire, especialmente en las noches."
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
    }
  },

  "case-2": {
    presentIllness:
      "El cuadro empezó de forma súbita hace aproximadamente dos horas. El paciente estaba previamente normal y presentó debilidad del lado derecho, principalmente en brazo y cara, habla enredada, sensación de adormecimiento en cara y brazo derechos, y asimetría facial. Niega trauma, pérdida de conciencia, convulsiones, fiebre, dolor torácico o dolor de cabeza intenso tipo trueno.",
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
        "Niega consumo actual de alcohol en exceso",
        "Niega consumo de sustancias psicoactivas"
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
        "Ansioso y frustrado por la dificultad para hablar."
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
    }
  },

  "case-3": {
    presentIllness:
      "El dolor de hombro derecho empezó hace aproximadamente tres meses, de forma progresiva. Se localiza principalmente en la cara lateral del hombro. Empeora al levantar el brazo por encima de la cabeza, peinarse, vestirse, cargar bolsas y dormir sobre ese lado. Refiere sensación de debilidad por dolor. Niega trauma fuerte, fiebre, pérdida de peso, deformidad, dolor torácico, hormigueo, adormecimiento o pérdida de fuerza distal en la mano.",
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
        "Preocupada por la persistencia del dolor y la limitación funcional."
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
    }
  }
};

function normalizeClinicalText(value: string): string {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(text: string, words: string[]): boolean {
  return words.some((word) => text.includes(normalizeClinicalText(word)));
}

function list(items: string[]): string {
  return items.length > 0 ? items.join(". ") + "." : "No refiere.";
}

export function getClinicalPatientReply(message: string, caseId: string): string | null {
  const text = normalizeClinicalText(message);
  const data = CLINICAL_PATIENT_INFO[caseId];

  if (!data) return null;

  if (
    includesAny(text, [
      "enfermedad actual",
      "historia de la enfermedad",
      "problema actual",
      "descripcion cronologica",
      "descripcion detallada",
      "cronologia"
    ])
  ) {
    return `Enfermedad actual: ${data.presentIllness}`;
  }

  if (includesAny(text, ["antecedentes patologicos", "patologicos"])) {
    return `Antecedentes personales patológicos: ${list(data.history.pathological)}`;
  }

  if (includesAny(text, ["antecedentes quirurgicos", "quirurgicos", "cirugias"])) {
    return `Antecedentes quirúrgicos: ${list(data.history.surgical)}`;
  }

  if (includesAny(text, ["antecedentes traumaticos", "traumaticos", "traumas"])) {
    return `Antecedentes traumáticos: ${list(data.history.traumatic)}`;
  }

  if (
    includesAny(text, [
      "antecedentes farmacologicos",
      "farmacologicos",
      "medicamentos actuales",
      "que medicamentos toma",
      "medicamentos"
    ])
  ) {
    return `Antecedentes farmacológicos: ${list(data.history.pharmacological)}`;
  }

  if (includesAny(text, ["alergias", "alergicos", "antecedentes alergicos"])) {
    return `Antecedentes alérgicos: ${list(data.history.allergies)}`;
  }

  if (
    includesAny(text, [
      "toxicos",
      "toxicologicos",
      "tabaco",
      "cigarrillo",
      "alcohol",
      "sustancias",
      "drogas"
    ])
  ) {
    return `Antecedentes toxicológicos: ${list(data.history.toxicological)}`;
  }

  if (
    includesAny(text, [
      "gineco",
      "obstetricos",
      "ginecoobstetricos",
      "menarquia",
      "menopausia",
      "gestas",
      "embarazos",
      "partos"
    ])
  ) {
    return `Antecedentes gineco-obstétricos: ${list(
      data.history.gynecoObstetric || ["No aplica o no refiere datos relevantes"]
    )}`;
  }

  if (includesAny(text, ["familiares", "antecedentes familiares"])) {
    return `Antecedentes familiares: ${list(data.history.family)}`;
  }

  if (
    includesAny(text, [
      "ocupacionales",
      "antecedentes ocupacionales",
      "ocupacion",
      "trabajo",
      "laboral"
    ])
  ) {
    return `Antecedentes ocupacionales: ${list(data.history.occupational)}`;
  }

  if (
    includesAny(text, [
      "epidemiologicos",
      "viajes",
      "contactos",
      "exposicion",
      "epidemiologia"
    ])
  ) {
    return `Antecedentes epidemiológicos: ${list(data.history.epidemiological)}`;
  }

  if (includesAny(text, ["antecedentes"])) {
    return `Antecedentes: patológicos: ${list(data.history.pathological)} Quirúrgicos: ${list(
      data.history.surgical
    )} Traumáticos: ${list(data.history.traumatic)} Farmacológicos: ${list(
      data.history.pharmacological
    )} Alérgicos: ${list(data.history.allergies)}`;
  }

  if (includesAny(text, ["revision por sistemas", "revision de sistemas"])) {
    return "¿Qué sistema desea revisar: general, cardiovascular, respiratorio, gastrointestinal, genitourinario, neurológico, osteomuscular, piel, endocrino o psiquiátrico?";
  }

  if (includesAny(text, ["sistema general", "revision general", "general"])) {
    return `Revisión general: ${data.reviewOfSystems.general}`;
  }

  if (includesAny(text, ["cardiovascular", "cardiaco", "corazon"])) {
    return `Revisión cardiovascular: ${data.reviewOfSystems.cardiovascular}`;
  }

  if (includesAny(text, ["respiratorio", "pulmonar", "pulmones"])) {
    return `Revisión respiratoria: ${data.reviewOfSystems.respiratory}`;
  }

  if (includesAny(text, ["gastrointestinal", "digestivo", "abdominal"])) {
    return `Revisión gastrointestinal: ${data.reviewOfSystems.gastrointestinal}`;
  }

  if (includesAny(text, ["genitourinario", "urinario", "orina"])) {
    return `Revisión genitourinaria: ${data.reviewOfSystems.genitourinary}`;
  }

  if (includesAny(text, ["neurologico", "neurologica", "nervioso"])) {
    return `Revisión neurológica: ${data.reviewOfSystems.neurologic}`;
  }

  if (
    includesAny(text, [
      "osteomuscular",
      "musculoesqueletico",
      "musculo esqueletico",
      "articular"
    ])
  ) {
    return `Revisión osteomuscular: ${data.reviewOfSystems.musculoskeletal}`;
  }

  if (includesAny(text, ["piel", "dermatologico"])) {
    return `Revisión de piel: ${data.reviewOfSystems.skin}`;
  }

  if (includesAny(text, ["endocrino", "diabetes", "tiroides"])) {
    return `Revisión endocrina: ${data.reviewOfSystems.endocrine}`;
  }

  if (includesAny(text, ["psiquiatrico", "ansiedad", "animo", "estado de animo"])) {
    return `Revisión psiquiátrica: ${data.reviewOfSystems.psychiatric}`;
  }

  if (
    includesAny(text, [
      "laboratorios",
      "laboratorio",
      "hemograma",
      "creatinina",
      "glicemia",
      "inr",
      "electrolitos",
      "bnp"
    ])
  ) {
    return `Laboratorios disponibles: ${list(data.results.labs)}`;
  }

  if (
    includesAny(text, [
      "imagenes",
      "imagen",
      "radiografia",
      "tac",
      "tomografia",
      "ecografia",
      "resonancia"
    ])
  ) {
    return `Imágenes disponibles: ${list(data.results.imaging)}`;
  }

  if (
    includesAny(text, [
      "electrocardiograma",
      "ecg",
      "estudios complementarios",
      "paraclinicos",
      "ayudas diagnosticas"
    ])
  ) {
    return `Estudios complementarios disponibles: ${list(data.results.complementaryStudies)}`;
  }

  if (
    includesAny(text, [
      "diagnostico",
      "cie10",
      "cie 10",
      "diagnostico definitivo",
      "diagnostico presuntivo",
      "plan",
      "tratamiento",
      "conducta",
      "interconsulta",
      "ordenes medicas",
      "epicrisis",
      "diagnosticos finales"
    ])
  ) {
    return "Esa parte debe construirla usted al finalizar la entrevista y será revisada en la retroalimentación académica.";
  }

  return null;
}
