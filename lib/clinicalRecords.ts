export type ClinicalRecord = {
  caseId: string;
};

export function getClinicalRecordByCaseId(
  caseId: string | undefined | null
): ClinicalRecord | null {
  if (!caseId) return null;

  return {
    caseId
  };
}

export function getClinicalRecordReply(
  _message: string,
  _caseId: string | undefined | null
): string | null {
  return null;
}