"use client";

import { useEffect, useState } from "react";

export default function ReferralPage() {
  const [clinicalCases, setClinicalCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [toDoctorId, setToDoctorId] = useState("");
  const [reason, setReason] = useState("");
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    // Obtener casos clínicos del doctor actual
    fetch("/api/clinical-cases").then(res => res.json()).then(setClinicalCases);
  }, []);

  const handleLoadReferrals = (caseId: number) => {
    setSelectedCase(caseId);
    fetch(`/api/referrals/${caseId}`)
      .then(res => res.json())
      .then(setReferrals);
  };

  const handleReferral = async () => {
    await fetch("/api/referrals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clinicalCaseId: selectedCase,
        toDoctorId,
        reason
      }),
    });
    setReason("");
    handleLoadReferrals(selectedCase);
  };

  return (
    <div>
      <h1>Interconsultas</h1>

      <h2>Seleccionar Caso Clínico</h2>
      <select onChange={(e) => handleLoadReferrals(Number(e.target.value))}>
        <option value="">-- Seleccionar --</option>
        {clinicalCases.map(c => (
          <option key={c.id} value={c.id}>
            Caso #{c.id} - {c.description}
          </option>
        ))}
      </select>

      {selectedCase && (
        <>
          <h3>Derivar a otro especialista</h3>
          <input
            placeholder="ID del Doctor destino"
            value={toDoctorId}
            onChange={(e) => setToDoctorId(e.target.value)}
          />
          <textarea
            placeholder="Motivo de derivación"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <button onClick={handleReferral}>Derivar</button>

          <h3>Historial de Interconsultas</h3>
          {referrals.map((ref: any) => (
            <div key={ref.id}>
              <p><strong>De:</strong> {ref.fromDoctor?.name}</p>
              <p><strong>Para:</strong> {ref.toDoctor?.name}</p>
              <p><strong>Motivo:</strong> {ref.reason}</p>
              <p><strong>Fecha:</strong> {new Date(ref.createdAt).toLocaleString()}</p>
              <hr />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
