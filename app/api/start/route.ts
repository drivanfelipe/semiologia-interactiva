import { NextResponse } from "next/server";
import { getStudentByAccessCode } from "../../../lib/accessCodes";
import { cleanText } from "../../../lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const code = cleanText(body?.code);

    if (!code) {
      return NextResponse.json(
        {
          ok: false,
          error: "Debes ingresar tu ID de identificación."
        },
        { status: 400 }
      );
    }

    const student = getStudentByAccessCode(code);

    if (!student) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "ID no autorizado. Verifica el número ingresado o informa al docente."
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      ok: true,
      student: {
        firstName: student.firstName,
        lastName: student.lastName,
        code: student.code,
        role: student.role
      }
    });
  } catch (error: any) {
    console.error("ERROR START:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "No se pudo iniciar la práctica."
      },
      { status: 500 }
    );
  }
}