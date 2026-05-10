import OpenAI from "openai";
import { NextResponse } from "next/server";
import { isValidAccessCode } from "../../../lib/accessCodes";
import { buildPatientPrompt } from "../../../lib/prompts";
import { cleanText, detectNonConversationalPattern, getMaxStudentMessages, hasTooManyQuestions, Message } from "../../../lib/validators";

export const runtime = "nodejs";

const SUSPENSION_MESSAGE = `La interacción ha sido suspendida porque se detectó un patrón no conversacional incompatible con el ejercicio académico de semiología interactiva.

Por favor informe esta situación al docente.`;

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ ok: false, error: "Falta configurar OPENAI_API_KEY en el servidor." }, { status: 500 });
    }

    const body = await request.json();
    const code = cleanText(body?.student?.code);
    const studentMessage = cleanText(body?.message);
    const rawMessages = Array.isArray(body?.messages) ? body.messages : [];

    if (!isValidAccessCode(code)) {
      return NextResponse.json({ ok: false, error: "Código no válido." }, { status: 401 });
    }

    if (!studentMessage) {
      return NextResponse.json({ ok: false, error: "El mensaje está vacío." }, { status: 400 });
    }

    if (detectNonConversationalPattern(studentMessage)) {
      return NextResponse.json({ ok: true, suspended: true, reply: SUSPENSION_MESSAGE });
    }

    if (hasTooManyQuestions(studentMessage)) {
      return NextResponse.json({
        ok: true,
        reply: "Ay doctor, fueron muchas preguntas al tiempo y me confundí. ¿Me las puede hacer más despacio, de a poquitas?"
      });
    }

    const messages: Message[] = rawMessages
      .filter((m: Message) => m && (m.role === "student" || m.role === "patient") && typeof m.content === "string")
      .map((m: Message) => ({ role: m.role, content: cleanText(m.content) }))
      .filter((m: Message) => m.content.length > 0);

    const studentMessagesCount = messages.filter((m) => m.role === "student").length;
    if (studentMessagesCount >= getMaxStudentMessages()) {
      return NextResponse.json({
        ok: true,
        reply: "Doctor, ya me siento muy cansada con tantas preguntas. ¿Será que podemos ir cerrando?"
      });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = buildPatientPrompt([...messages, { role: "student", content: studentMessage }]);
    const model = process.env.OPENAI_MODEL_CHAT || "gpt-5.4-mini";

    const response = await client.responses.create({
      model,
      input: prompt,
      max_output_tokens: 450
    });

    const reply = response.output_text?.trim() || "No entendí bien doctor, ¿me puede repetir?";
    return NextResponse.json({ ok: true, reply });
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
