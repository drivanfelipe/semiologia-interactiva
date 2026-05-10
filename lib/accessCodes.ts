export type AccessCodeRecord = {
  code: string;
  active: boolean;
  firstName: string;
  lastName: string;
  label?: string;
};

// IMPORTANTE:
// Cambia NOMBRE y APELLIDO por los datos reales de tus 9 estudiantes.
// El sistema no distingue mayúsculas/minúsculas ni tildes.

export const ACCESS_CODES: AccessCodeRecord[] = [
{
    code: "SEM-2026-000",
    active: true,
    firstName: "00",
    lastName: "00",
    label: "Estudiante 000"
  },
  {
    code: "SEM-2026-001",
    active: true,
    firstName: "MARIA JOSE",
    lastName: "BUSTOS",
    label: "Estudiante 001"
  },
  {
    code: "SEM-2026-002",
    active: true,
    firstName: "LUCIA",
    lastName: "CABALLERO",
    label: "Estudiante 002"
  },
  {
    code: "SEM-2026-003",
    active: true,
    firstName: "ESTEFANIA",
    lastName: "CANO",
    label: "Estudiante 003"
  },
  {
    code: "SEM-2026-004",
    active: true,
    firstName: "KAROL",
    lastName: "CHAVERRA",
    label: "Estudiante 004"
  },
  {
    code: "SEM-2026-005",
    active: true,
    firstName: "CAROLINA",
    lastName: "CORREA",
    label: "Estudiante 005"
  },
  {
    code: "SEM-2026-006",
    active: true,
    firstName: "KATHALINA",
    lastName: "CRIOLLO",
    label: "Estudiante 006"
  },
  {
    code: "SEM-2026-007",
    active: true,
    firstName: "CAMILO",
    lastName: "LONDOÑO",
    label: "Estudiante 007"
  },
  {
    code: "SEM-2026-008",
    active: true,
    firstName: "VALENTINA",
    lastName: "RODRIGUEZ",
    label: "Estudiante 008"
  },
  {
    code: "SEM-2026-009",
    active: true,
    firstName: "LAURA",
    lastName: "RUA",
    label: "Estudiante 009"
  }
];

export function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

export function normalizePersonName(value: string): string {
  return value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .toUpperCase();
}

export function getAccessRecord(code: string): AccessCodeRecord | undefined {
  const normalized = normalizeCode(code);

  return ACCESS_CODES.find(
    (item) => item.active && item.code === normalized
  );
}

export function validateRegisteredStudent(firstName: string, lastName: string, code: string) {
  const record = getAccessRecord(code);

  if (!record) {
    return {
      valid: false,
      error: "El código no es válido o no está activo.",
      record: null
    };
  }

  const firstNameMatches =
    normalizePersonName(firstName) === normalizePersonName(record.firstName);

  const lastNameMatches =
    normalizePersonName(lastName) === normalizePersonName(record.lastName);

  if (!firstNameMatches || !lastNameMatches) {
    return {
      valid: false,
      error: "El nombre, apellido o código no coinciden con el registro asignado.",
      record: null
    };
  }

  return {
    valid: true,
    error: null,
    record
  };
}