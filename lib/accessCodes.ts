export type AccessCodeRecord = {
  code: string;
  active: boolean;
  label?: string;
};

// MVP sin base de datos: códigos individuales registrados en archivo interno.
// Puedes cambiar estos códigos antes de publicar.
// Recomendación: un código por estudiante, por ejemplo SEM-2026-001.
export const ACCESS_CODES: AccessCodeRecord[] = [
  { code: "SEM-2026-001", active: true, label: "Estudiante 001" },
  { code: "SEM-2026-002", active: true, label: "Estudiante 002" },
  { code: "SEM-2026-003", active: true, label: "Estudiante 003" },
  { code: "SEM-2026-004", active: true, label: "Estudiante 004" },
  { code: "SEM-2026-005", active: true, label: "Estudiante 005" }
];

export function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

export function isValidAccessCode(code: string): boolean {
  const normalized = normalizeCode(code);
  return ACCESS_CODES.some((item) => item.active && item.code === normalized);
}
