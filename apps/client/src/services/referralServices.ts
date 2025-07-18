export const createReferral = async (data: { clinicalCaseId: string; toDoctorId: string; reason: string }) => {
  const res = await fetch("/api/referrals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const getReferrals = async (clinicalCaseId: number) => {
  const res = await fetch(`/api/referrals/${clinicalCaseId}`);
  return await res.json();
};
