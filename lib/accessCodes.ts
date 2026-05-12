export type AccessCodeRecord = {
  code: string;
  active: boolean;
  firstName: string;
  lastName: string;
  label?: string;
  role?: "student" | "professor";
};

export type AccessValidationResult = {
  valid: boolean;
  error: string | null;
  record: AccessCodeRecord | null;
};

const STUDENT_IDS = [
  "572698",
  "568089",
  "244285",
  "462861",
  "540640",
  "234773",
  "569869",
  "557233",
  "482179",
  "254047",

  "340409",
  "296735",
  "232332",
  "472364",
  "234394",
  "540559",
  "563495",
  "490694",
  "557553",
  "556705",

  "567581",
  "436305",
  "559028",
  "564834",
  "572564",
  "559029",
  "497858",
  "561849",
  "568729",
  "570082",

  "567975",
  "562566",
  "540170",
  "508790",
  "567585",
  "572559",
  "541495",
  "556911",
  "569406",

  "221286",
  "556310",
  "287883",
  "558594",
  "557543",
  "564101",
  "540217",
  "564504",
  "512374",

  "556864",
  "229663",
  "567825",
  "525096",
  "563623",
  "540926",
  "368923",
  "338448",
  "540838",

  "567198",
  "568662",
  "571616",
  "567201",
  "543311",
  "563568",
  "567480",
  "506253",
  "571862"
];

const PROFESSOR_RECORD: AccessCodeRecord = {
  code: "PROFESOR",
  active: true,
  firstName: "PROFESOR",
  lastName: "PROFESOR",
  label: "Profesor",
  role: "professor"
};

// Lista pública interna para compatibilidad con el resto del proyecto.
export const ACCESS_CODES: AccessCodeRecord[] = [
  PROFESSOR_RECORD,
  ...STUDENT_IDS.map((id, index) => ({
    code: id,
    active: true,
    firstName: "ESTUDIANTE",
    lastName: "SIN REGISTRO",
    label: `Estudiante ${String(index + 1).padStart(3, "0")}`,
    role: "student" as const
  }))
];

export function normalizeCode(code: string): string {
  return String(code || "")
    .trim()
    .replace(/\s+/g, "")
    .toUpperCase();
}

export function normalizePersonName(value: string): string {
  return String(value || "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .toUpperCase();
}

function isProfessorAccess(firstName: string, lastName: string, code: string): boolean {
  return (
    normalizePersonName(firstName) === "PROFESOR" &&
    normalizePersonName(lastName) === "PROFESOR" &&
    normalizeCode(code) === "PROFESOR"
  );
}

function getDuplicatedStudentIds(): string[] {
  const counts = new Map<string, number>();

  for (const id of STUDENT_IDS) {
    const normalizedId = normalizeCode(id);
    counts.set(normalizedId, (counts.get(normalizedId) || 0) + 1);
  }

  return Array.from(counts.entries())
    .filter(([, count]) => count > 1)
    .map(([id]) => id);
}

function isValidStudentIdFormat(code: string): boolean {
  return /^[0-9]{6}$/.test(normalizeCode(code));
}

function studentIdExists(code: string): boolean {
  const normalizedCode = normalizeCode(code);
  return STUDENT_IDS.some((id) => normalizeCode(id) === normalizedCode);
}

function isValidHumanName(value: string): boolean {
  const normalized = normalizePersonName(value);

  if (normalized.length < 2) return false;
  if (/[0-9]/.test(normalized)) return false;

  return true;
}

export function getAccessRecord(code: string): AccessCodeRecord | undefined {
  const normalizedCode = normalizeCode(code);

  if (normalizedCode === "PROFESOR") {
    return PROFESSOR_RECORD;
  }

  if (!isValidStudentIdFormat(normalizedCode)) {
    return undefined;
  }

  if (!studentIdExists(normalizedCode)) {
    return undefined;
  }

  const index = STUDENT_IDS.findIndex((id) => normalizeCode(id) === normalizedCode);

  return {
    code: normalizedCode,
    active: true,
    firstName: "ESTUDIANTE",
    lastName: "SIN REGISTRO",
    label: `Estudiante ${String(index + 1).padStart(3, "0")}`,
    role: "student"
  };
}

export function isValidAccessCode(code: string): boolean {
  const normalizedCode = normalizeCode(code);

  if (normalizedCode === "PROFESOR") {
    return true;
  }

  const duplicatedIds = getDuplicatedStudentIds();

  if (duplicatedIds.length > 0) {
    return false;
  }

  return isValidStudentIdFormat(normalizedCode) && studentIdExists(normalizedCode);
}

export function validateRegisteredStudent(
  firstName: string,
  lastName: string,
  code: string
): AccessValidationResult {
  const cleanFirstName = String(firstName || "").trim();
  const cleanLastName = String(lastName || "").trim();
  const normalizedCode = normalizeCode(code);

  if (!cleanFirstName || !cleanLastName || !normalizedCode) {
    return {
      valid: false,
      error: "Completa nombre, apellido e ID de identificación.",
      record: null
    };
  }

  if (isProfessorAccess(cleanFirstName, cleanLastName, normalizedCode)) {
    return {
      valid: true,
      error: null,
      record: PROFESSOR_RECORD
    };
  }

  if (!isValidHumanName(cleanFirstName) || !isValidHumanName(cleanLastName)) {
    return {
      valid: false,
      error: "Ingresa un nombre y apellido válidos.",
      record: null
    };
  }

  const duplicatedIds = getDuplicatedStudentIds();

  if (duplicatedIds.length > 0) {
    return {
      valid: false,
      error: `Hay ID duplicados en la lista de acceso: ${duplicatedIds.join(", ")}. Corrige la lista antes de continuar.`,
      record: null
    };
  }

  if (!isValidStudentIdFormat(normalizedCode)) {
    return {
      valid: false,
      error: "El ID debe tener exactamente 6 números.",
      record: null
    };
  }

  if (!studentIdExists(normalizedCode)) {
    return {
      valid: false,
      error: "El ID ingresado no está autorizado para esta actividad.",
      record: null
    };
  }

  const index = STUDENT_IDS.findIndex((id) => normalizeCode(id) === normalizedCode);

  return {
    valid: true,
    error: null,
    record: {
      code: normalizedCode,
      active: true,
      firstName: cleanFirstName,
      lastName: cleanLastName,
      label: `Estudiante ${String(index + 1).padStart(3, "0")}`,
      role: "student"
    }
  };
}