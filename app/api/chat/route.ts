import OpenAI from "openai";
import { NextResponse } from "next/server";
import { isValidAccessCode } from "../../../lib/accessCodes";
import { getCaseById } from "../../../lib/cases";
import { buildPatientPrompt } from "../../../lib/prompts";
import {
  cleanText,
  detectNonConversationalPattern,
  getMaxStudentMessages,
  hasTooManyQuestions
} from "../../../lib/validators";
import type { Message } from "../../../lib/validators";

export const runtime = "nodejs";

const SUSPENSION_MESSAGE = `La interacción ha sido suspendida porque se detectó un patrón no conversacional incompatible con el ejercicio académico de semiología interactiva.

Por favor informe esta situación al docente.`;

function normalizeForIntent(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isSimpleGreeting(message: string): boolean {
  const normalized = normalizeForIntent(message);

  const greetings = [
    "hola",
    "buenos dias",
    "buen dia",
    "buenas tardes",
    "buenas noches",
    "hola doctor",
    "hola doctora",
    "buenos dias doctor",
    "buenos dias doctora",
    "buenas tardes doctor",
    "buenas tardes doctora",
    "buenas noches doctor",
    "buenas noches doctora",
    "como esta",
    "como esta usted",
    "hola como esta",
    "buenos dias como esta",
    "buenas tardes como esta",
    "buenas noches como esta"
  ];

  return normalized.length <= 60 && greetings.includes(normalized);
}

function getGreetingReply(message: string): string {
  const normalized = normalizeForIntent(message);

  if (normalized.includes("buenas tardes")) {
    return "Buenas tardes, doctor.";
  }

  if (normalized.includes("buenas noches")) {
    return "Buenas noches, doctor.";
  }

  if (normalized.includes("como esta")) {
    return "Pues aquí, doctor.";
  }

  return "Buenos días, doctor.";
}

function isChiefComplaintQuestion(message: string): boolean {
  const normalized = normalizeForIntent(message);

  const chiefComplaintQuestions = [
    "que le pasa",
    "que le ocurre",
    "que siente",
    "que tiene",
    "que le molesta",
    "que le duele",
    "que lo trae",
    "que la trae",
    "que lo trae hoy",
    "que la trae hoy",
    "cual es el motivo de consulta",
    "cual es su motivo de consulta",
    "cual es la razon de consulta",
    "en que le puedo ayudar",
    "cuenteme que le pasa",
    "cuenteme que siente",
    "cuenteme que le ocurre",
    "cuenteme por que consulta",
    "por que consulta",
    "por que vino",
    "por que viene",
    "a que viene",
    "cual es su problema",
    "cual es el problema"
  ];

  return normalized.length <= 120 && chiefComplaintQuestions.includes(normalized);
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          ok: false,
          error: "Falta configurar OPENAI_API_KEY en el servidor."
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const code = cleanText(body?.student?.code);
    const studentMessage = cleanText(body?.message);
    const rawMessages = Array.isArray(body?.messages) ? body.messages : [];
    const selectedCase = getCaseById(body?.caseId);

    if (!isValidAccessCode(code)) {
      return NextResponse.json(
        { ok: false, error: "Código no válido." },
        { status: 401 }
      );
    }

    if (!studentMessage) {
      return NextResponse.json(
        { ok: false, error: "El mensaje está vacío." },
        { status: 400 }
      );
    }

    const messages: Message[] = rawMessages
      .filter(
        (m: Message) =>
          m &&
          (m.role === "student" || m.role === "patient") &&
          typeof m.content === "string"
      )
      .map((m: Message) => ({
        role: m.role,
        content: cleanText(m.content)
      }))
      .filter((m: Message) => m.content.length > 0);

    const studentMessagesCount = messages.filter(
      (m) => m.role === "student"
    ).length;

    if (studentMessagesCount >= getMaxStudentMessages()) {
      return NextResponse.json({
        ok: true,
        reply:
          "Doctor, ya me siento muy cansada con tantas preguntas. ¿Será que podemos ir cerrando?"
      });
    }

    /*
      Regla dura:
      Si el estudiante solo saluda, la app responde directamente
      sin llamar al modelo. Así evitamos que el paciente revele datos clínicos.
    */
    if (isSimpleGreeting(studentMessage)) {
      return NextResponse.json({
        ok: true,
        reply: getGreetingReply(studentMessage)
      });
    }

    /*
      Regla dura:
      Si el estudiante pregunta de forma abierta por el motivo de consulta,
      la app responde únicamente el motivo principal del caso seleccionado.
      Esto evita que la IA entregue duración, síntomas asociados,
      antecedentes o hallazgos antes de que el estudiante los indague.
    */
    if (isChiefComplaintQuestion(studentMessage)) {
      return NextResponse.json({
        ok: true,
        reply: selectedCase.mainComplaint
      });
    }

    if (detectNonConversationalPattern(studentMessage)) {
      return NextResponse.json({
        ok: true,
        suspended: true,
        reply: SUSPENSION_MESSAGE
      });
    }

    if (hasTooManyQuestions(studentMessage)) {
      return NextResponse.json({
        ok: true,
        reply:
          "Ay doctor, fueron muchas preguntas al tiempo y me confundí. ¿Me las puede hacer más despacio, de a poquitas?"
      });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const prompt = buildPatientPrompt(
      [
        ...messages,
        {
          role: "student",
          content: studentMessage
        }
      ],
      selectedCase
    );

    const model = process.env.OPENAI_MODEL_CHAT || "gpt-5-mini";

    const response = await client.responses.create({
      model,
      input: prompt,
      max_output_tokens: 180
    });

    const reply =
      response.output_text?.trim() ||
      "No entendí bien doctor, ¿me puede repetir?";

    return NextResponse.json({
      ok: true,
      reply
    });
  } catch (error: any) {
    console.error("ERROR OPENAI CHAT:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error?.message || "No se pudo generar la respuesta.",
        code: error?.code || null,
        status: error?.status || null
      },
      { status: 500 }
    );
  }
}