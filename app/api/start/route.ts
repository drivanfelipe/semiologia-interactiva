import { NextResponse } from "next/server";
import { normalizeCode, validateRegisteredStudent } from "../../../lib/accessCodes";
import { cleanText } from "../../../lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const firstName = cleanText(body.firstName);
    const lastName = cleanText(body.lastName);
    const code = normalizeCode(cleanText(body.code));

    if (!firstName || !lastName || !code) {
      return NextResponse.json(
        { ok: false, error: "Completa nombre, apellido y código." },
        { status: 400 }
      );
    }

    const validation = validateRegisteredStudent(firstName, lastName, code);

    if (!validation.valid || !validation.record) {
      return NextResponse.json(
        { ok: false, error: validation.error || "Datos de acceso inválidos." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      ok: true,
      student: {
        firstName: validation.record.firstName,
        lastName: validation.record.lastName,
        code: validation.record.code
      }
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se pudo iniciar la sesión." },
      { status: 500 }
    );
  }
}