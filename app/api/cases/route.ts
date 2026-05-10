import { NextResponse } from "next/server";
import { CASES } from "../../../lib/cases";

export async function GET() {
  return NextResponse.json({
    ok: true,
    cases: CASES.map((item) => ({
      id: item.id,
      publicLabel: item.publicLabel,
      publicSex: item.publicSex,
      publicAge: item.publicAge
    }))
  });
}