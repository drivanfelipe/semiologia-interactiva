export type AccessStudent = {
  firstName: string;
  lastName: string;
  code: string;
  role: "student" | "professor";
};

export const ACCESS_STUDENTS: AccessStudent[] = [
  {
    firstName: "Profesor",
    lastName: "Docente",
    code: "PROFESOR",
    role: "professor"
  },
  {
    firstName: "Susana",
    lastName: "Arcila Estrada",
    code: "585679",
    role: "student"
  },
  {
    firstName: "Isabela",
    lastName: "Arias Mesa",
    code: "583193",
    role: "student"
  },
  {
    firstName: "Felipe",
    lastName: "Escobar Puyo",
    code: "582758",
    role: "student"
  },
  {
    firstName: "Nathalie",
    lastName: "Franco Murillo",
    code: "583206",
    role: "student"
  },
  {
    firstName: "Isabella",
    lastName: "Galeano Trespalacios",
    code: "580835",
    role: "student"
  },
  {
    firstName: "Maria C.",
    lastName: "Giraldo Tobon",
    code: "538670",
    role: "student"
  },
  {
    firstName: "David",
    lastName: "Martinez Cardona",
    code: "549552",
    role: "student"
  },
  {
    firstName: "Maria C.",
    lastName: "Maussa Peña",
    code: "583214",
    role: "student"
  },
  {
    firstName: "Yosy P.",
    lastName: "Moreno Lozano",
    code: "569883",
    role: "student"
  },
  {
    firstName: "Maria J.",
    lastName: "Santofimio Arevalo",
    code: "586600",
    role: "student"
  },
  {
    firstName: "Maria A.",
    lastName: "Toro Otalvaro",
    code: "209972",
    role: "student"
  },
  {
    firstName: "Sofia",
    lastName: "Torres Mesa",
    code: "484799",
    role: "student"
  }
];

function normalizeCode(value: unknown): string {
  if (typeof value !== "string") return "";

  return value.trim().toUpperCase().replace(/\s+/g, "");
}

export function getStudentByAccessCode(code: unknown): AccessStudent | null {
  const normalizedCode = normalizeCode(code);

  if (!normalizedCode) return null;

  return (
    ACCESS_STUDENTS.find(
      (student) => normalizeCode(student.code) === normalizedCode
    ) || null
  );
}

export function isValidAccessCode(code: unknown): boolean {
  return getStudentByAccessCode(code) !== null;
}

export function isProfessorAccessCode(code: unknown): boolean {
  const student = getStudentByAccessCode(code);

  return student?.role === "professor";
}