import { CASES, type CaseData } from "./cases";
import type { Message } from "./validators";
import { formatTranscript } from "./validators";

function compactPatientCase(selectedCase: CaseData) {
  return {
    id: selectedCase.id,
    objetivoOculto: selectedCase.hiddenAcademicObjective,
    persona: selectedCase.simulatedPerson,
    conducta: selectedCase.conversationBehavior,
    motivoPrincipal: selectedCase.mainComplaint,
    negativosImportantes: selectedCase.importantNegatives,
    guiaDeRespuesta: selectedCase.responseGuide,
    historiaOculta: selectedCase.hiddenHistory
  };
}

function compactEvaluationCase(selectedCase: CaseData) {
  return {
    id: selectedCase.id,
    objetivoEsperado: selectedCase.hiddenAcademicObjective,
    motivoPrincipal: selectedCase.mainComplaint,
    datosEsperados: {
      historia: selectedCase.hiddenHistory,
      examenFisico: selectedCase.physicalExam,
      negativosImportantes: selectedCase.importantNegatives
    },
    listaDeChequeo: selectedCase.evaluationChecklist
  };
}

function compactTranscript(messages: Message[], limit = 12): string {
  return formatTranscript(messages.slice(-limit));
}

export function buildPatientPrompt(
  messages: Message[],
  selectedCase: CaseData = CASES[0]
): string {
  const transcript = compactTranscript(messages, 12);

  return `
Eres una persona simulada dentro de una actividad académica universitaria de semiología básica.

REGLAS:
- Responde SIEMPRE como la persona simulada.
- No respondas como sistema, docente, evaluador ni médico.
- No reveles diagnósticos ni el objetivo académico oculto.
- No inventes datos.
- No entregues información que el estudiante no haya preguntado.
- Si el estudiante usa tecnicismos, responde que no entiendes y pide que lo diga más sencillo.
- Responde en español colombiano natural.
- Responde breve: máximo 2 frases cortas.
- No uses viñetas.
- No menciones maniobras ni resultados del examen físico como paciente.
- Si el estudiante pregunta varias cosas, responde solo lo más importante y de forma natural.

CASO:
${JSON.stringify(compactPatientCase(selectedCase))}

CONVERSACIÓN RECIENTE:
${transcript || "Aún no hay conversación."}

Responde ahora SOLO como la persona simulada.
`.trim();
}

export function buildEvaluationPrompt(
  messages: Message[],
  diagnosticImpression: string,
  studentName: string,
  selectedCase: CaseData = CASES[0]
): string {
  const transcript = compactTranscript(messages, 40);

  return `
Eres un evaluador académico universitario de semiología básica.
Evalúas una simulación ficticia, no atención médica real.

ESTUDIANTE:
${studentName || "No informado"}

CASO EVALUADO:
${JSON.stringify(compactEvaluationCase(selectedCase))}

TRANSCRIPCIÓN:
${transcript}

IMPRESIÓN FINAL DEL ESTUDIANTE:
${diagnosticImpression}

Evalúa con criterio docente para estudiantes de 3er semestre.
Sé justo: premia comunicación, orden, preguntas relevantes, examen físico dirigido y razonamiento clínico inicial.

Entrega el resultado en español con este formato:

# Evaluación académica

## Calificación global
Puntaje: X/100

## Rúbrica
- Organización de la entrevista: X/10
- Secuencia lógica: X/10
- Profundidad del interrogatorio: X/15
- Preguntas clave del caso: X/20
- Comunicación y empatía: X/15
- Lenguaje claro/no técnico: X/10
- Observación dirigida/examen físico: X/10
- Impresión final: X/10

## Fortalezas

## Aspectos omitidos o incompletos

## Preguntas repetidas o innecesarias

## Comentario sobre comunicación y empatía

## Recomendaciones concretas para mejorar

## Objetivo académico esperado
Indica el objetivo académico esperado, aclarando que corresponde a una simulación ficticia.
`.trim();
}