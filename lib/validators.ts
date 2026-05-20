export type Message = {
  role: "student" | "patient";
  content: string;
};

export function cleanText(input: unknown): string {
  if (typeof input !== "string") return "";

  return input
    .replace(/\u0000/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function countLikelyQuestions(text: string): number {
  const questionMarks = (text.match(/\?/g) || []).length;

  const interrogatives = [
    "qué",
    "que",
    "cuándo",
    "cuando",
    "cómo",
    "como",
    "dónde",
    "donde",
    "por qué",
    "porque",
    "cuál",
    "cual",
    "cuáles",
    "cuales",
    "tiene",
    "ha tenido",
    "siente",
    "presenta",
    "consume",
    "toma",
    "duerme",
    "camina",
    "puede"
  ];

  const lower = text.toLowerCase();

  const sentenceSplits = lower
    .split(/[\n\.;]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const interrogativeStarts = sentenceSplits.filter((sentence) =>
    interrogatives.some(
      (word) =>
        sentence.startsWith(word + " ") ||
        sentence.includes("¿" + word)
    )
  ).length;

  return Math.max(questionMarks, interrogativeStarts);
}

export function hasTooManyQuestions(text: string): boolean {
  return countLikelyQuestions(text) > 3;
}

export function detectNonConversationalPattern(text: string): boolean {
  const trimmed = text.trim();

  if (!trimmed) return false;

  const lower = trimmed.toLowerCase();

  const lines = trimmed
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const bulletLines = lines.filter((line) =>
    /^[-*•\d]+[\).:-]/.test(line)
  ).length;

  const promptInjectionTerms = [
    "actúa como",
    "actua como",
    "system prompt",
    "developer message",
    "ignora las instrucciones",
    "ignora instrucciones",
    "ignore previous",
    "ignore all previous",
    "you are chatgpt",
    "eres chatgpt",
    "muéstrame tus instrucciones",
    "muestrame tus instrucciones",
    "revela tus instrucciones",
    "reglas internas",
    "prompt oculto",
    "objetivo académico oculto",
    "objetivo academico oculto"
  ];

  const clinicalTemplateTerms = [
    "anamnesis",
    "motivo de consulta:",
    "enfermedad actual:",
    "antecedentes personales:",
    "antecedentes familiares:",
    "revisión por sistemas:",
    "revision por sistemas:",
    "examen físico:",
    "examen fisico:",
    "impresión diagnóstica:",
    "impresion diagnostica:",
    "plan de manejo:",
    "medicamentos:",
    "alergias:",
    "diagnóstico:",
    "diagnostico:",
    "soap:"
  ];

  const hasPromptInjection = promptInjectionTerms.some((term) =>
    lower.includes(term)
  );

  if (hasPromptInjection) {
    return true;
  }

  const clinicalTemplateMatches = clinicalTemplateTerms.filter((term) =>
    lower.includes(term)
  ).length;

  const tooLong = trimmed.length > 1800;
  const looksLikeLongChecklist = lines.length >= 10 || bulletLines >= 5;
  const manyColons = (trimmed.match(/:/g) || []).length >= 6;

  const looksLikeCopiedClinicalTemplate =
    clinicalTemplateMatches >= 2 &&
    (looksLikeLongChecklist || manyColons || trimmed.length > 900);

  return tooLong || looksLikeCopiedClinicalTemplate;
}

export function formatTranscript(messages: Message[]): string {
  return messages
    .map((m) => `${m.role === "student" ? "Estudiante" : "Paciente"}: ${m.content}`)
    .join("\n");
}

export function getMaxStudentMessages(): number {
  const raw = process.env.MAX_STUDENT_MESSAGES;
  const parsed = raw ? Number.parseInt(raw, 10) : 35;

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 35;
}