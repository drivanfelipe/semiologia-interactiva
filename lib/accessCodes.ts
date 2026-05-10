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
    code: "SEM-2026-001",
    active: true,
    firstName: "IVAN FELIPE",
    lastName: "MONTOYA",
    label: "Estudiante 001"
  },
  {
    code: "SEM-2026-002",
    active: true,
    firstName: "NOMBRE2",
    lastName: "APELLIDO2",
    label: "Estudiante 002"
  },
  {
    code: "SEM-2026-003",
    active: true,
    firstName: "NOMBRE3",
    lastName: "APELLIDO3",
    label: "Estudiante 003"
  },
  {
    code: "SEM-2026-004",
    active: true,
    firstName: "NOMBRE4",
    lastName: "APELLIDO4",
    label: "Estudiante 004"
  },
  {
    code: "SEM-2026-005",
    active: true,
    firstName: "NOMBRE5",
    lastName: "APELLIDO5",
    label: "Estudiante 005"
  },
  {
    code: "SEM-2026-006",
    active: true,
    firstName: "NOMBRE6",
    lastName: "APELLIDO6",
    label: "Estudiante 006"
  },
  {
    code: "SEM-2026-007",
    active: true,
    firstName: "NOMBRE7",
    lastName: "APELLIDO7",
    label: "Estudiante 007"
  },
  {
    code: "SEM-2026-008",
    active: true,
    firstName: "NOMBRE8",
    lastName: "APELLIDO8",
    label: "Estudiante 008"
  },
  {
    code: "SEM-2026-009",
    active: true,
    firstName: "NOMBRE9",
    lastName: "APELLIDO9",
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