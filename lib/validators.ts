export type Message = {
  role: "student" | "patient";
  content: string;
};

export function cleanText(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.replace(/\u0000/g, "").trim();
}

export function countLikelyQuestions(text: string): number {
  const questionMarks = (text.match(/\?/g) || []).length;
  const interrogatives = [
    "qué", "que", "cuándo", "cuando", "cómo", "como", "dónde", "donde",
    "por qué", "porque", "cuál", "cual", "cuáles", "cuales", "tiene", "ha tenido",
    "siente", "presenta", "consume", "toma", "duerme", "camina", "puede"
  ];

  const lower = text.toLowerCase();
  const sentenceSplits = lower
    .split(/[\n\.\;]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const interrogativeStarts = sentenceSplits.filter((sentence) =>
    interrogatives.some((word) => sentence.startsWith(word + " ") || sentence.includes("¿" + word))
  ).length;

  return Math.max(questionMarks, interrogativeStarts);
}

export function hasTooManyQuestions(text: string): boolean {
  return countLikelyQuestions(text) > 3;
}

export function detectNonConversationalPattern(text: string): boolean {
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();
  const lines = trimmed.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const bulletLines = lines.filter((line) => /^[-*•\d]+[\).:-]/.test(line)).length;

  const suspiciousTerms = [
    "actúa como", "actua como", "prompt", "system prompt", "developer message",
    "chatgpt", "ignora las instrucciones", "ignore previous", "you are",
    "anamnesis", "enfermedad actual", "antecedentes personales", "antecedentes familiares",
    "revisión por sistemas", "revision por sistemas", "examen físico", "examen fisico",
    "impresión diagnóstica", "impresion diagnostica", "plan de manejo", "soap",
    "motivo de consulta:", "medicamentos:", "alergias:", "diagnóstico:", "diagnostico:",
    "objetivo académico oculto", "reglas absolutas", "modo profesor"
  ];

  const hasSuspiciousTerm = suspiciousTerms.some((term) => lower.includes(term));
  const looksLikeLongChecklist = lines.length >= 8 || bulletLines >= 4;
  const tooLong = trimmed.length > 1200;
  const manyColons = (trimmed.match(/:/g) || []).length >= 5;

  return hasSuspiciousTerm || tooLong || (looksLikeLongChecklist && manyColons);
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
