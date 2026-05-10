import OpenAI from "openai";
import { NextResponse } from "next/server";
import { isValidAccessCode } from "../../../lib/accessCodes";
import { buildEvaluationPrompt } from "../../../lib/prompts";
import { cleanText, Message } from "../../../lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ ok: false, error: "Falta configurar OPENAI_API_KEY en el servidor." }, { status: 500 });
    }

    const body = await request.json();
    const code = cleanText(body?.student?.code);
    const firstName = cleanText(body?.student?.firstName);
    const lastName = cleanText(body?.student?.lastName);
    const diagnosticImpression = cleanText(body?.diagnosticImpression);
    const rawMessages = Array.isArray(body?.messages) ? body.messages : [];

    if (!isValidAccessCode(code)) {
      return NextResponse.json({ ok: false, error: "Código no válido." }, { status: 401 });
    }

    if (!diagnosticImpression) {
      return NextResponse.json({ ok: false, error: "Escribe la impresión final antes de evaluar." }, { status: 400 });
    }

    const messages: Message[] = rawMessages
      .filter((m: Message) => m && (m.role === "student" || m.role === "patient") && typeof m.content === "string")
      .map((m: Message) => ({ role: m.role, content: cleanText(m.content) }))
      .filter((m: Message) => m.content.length > 0);

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = buildEvaluationPrompt(messages, diagnosticImpression, `${firstName} ${lastName}`.trim());
    const model = process.env.OPENAI_MODEL_EVALUATION || "gpt-5.4-mini";

    const response = await client.responses.create({
      model,
      input: prompt,
      max_output_tokens: 1400
    });

    const evaluation = response.output_text?.trim() || "No se pudo generar la evaluación.";
    return NextResponse.json({ ok: true, evaluation });
  } catch (error: any) {
    console.error("ERROR OPENAI EVALUATION:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error?.message || "No se pudo generar la evaluación.",
        code: error?.code || null,
        status: error?.status || null
      },
      { status: 500 }
    );
  }
}
