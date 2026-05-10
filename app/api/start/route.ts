import { NextResponse } from "next/server";
import { isValidAccessCode, normalizeCode } from "../../../lib/accessCodes";
import { cleanText } from "../../../lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const firstName = cleanText(body.firstName);
    const lastName = cleanText(body.lastName);
    const code = normalizeCode(cleanText(body.code));

    if (!firstName || !lastName || !code) {
      return NextResponse.json({ ok: false, error: "Completa nombre, apellido y código." }, { status: 400 });
    }

    if (!isValidAccessCode(code)) {
      return NextResponse.json({ ok: false, error: "El código no es válido o no está activo." }, { status: 401 });
    }

    return NextResponse.json({
      ok: true,
      student: {
        firstName,
        lastName,
        code
      }
    });
  } catch {
    return NextResponse.json({ ok: false, error: "No se pudo iniciar la sesión." }, { status: 500 });
  }
}
