export const createReferral = async (data) => {
  const res = await fetch("/api/referrals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const getReferrals = async (clinicalCaseId) => {
  const res = await fetch(`/api/referrals/${clinicalCaseId}`);
  return await res.json();
};
