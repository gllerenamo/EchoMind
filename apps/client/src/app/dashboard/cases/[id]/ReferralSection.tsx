'use client';

import { useEffect, useState } from 'react';
import { referralApi } from '../../../../services/api';
import { doctorApi } from '../../../../services/api';
import { useAuth } from '../../../../contexts/AuthContext';

interface ReferralSectionProps {
  caseId: string;
  patientId: string;
}

export default function ReferralSection({ caseId, patientId }: ReferralSectionProps) {
  const { user } = useAuth();
  const [referrals, setReferrals] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [toDoctorId, setToDoctorId] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isDoctor = user?.role === 'doctor';
  const isPatient = user?.role === 'patient';

  useEffect(() => {
    referralApi.getReferralsByCase(caseId)
      .then(setReferrals)
      .catch(() => setError('Error al cargar interconsultas'));
    setLoading(false);
  }, [caseId, success]);

  useEffect(() => {
    if (isDoctor) {
      doctorApi.getDoctors()
        .then(setDoctors)
        .catch(() => setError('Error al cargar médicos'));
    }
  }, [isDoctor]);

  const handleReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    setSuccess('');
    try {
      await referralApi.createReferral({ clinicalCaseId: caseId, toDoctorId, reason });
      setSuccess('Interconsulta enviada correctamente');
      setReason('');
      setToDoctorId('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al enviar interconsulta');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 mt-8">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Interconsultas (Derivaciones)</h2>
      <div className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        <strong>Privacidad:</strong> Los datos de este caso pueden ser compartidos con otros especialistas únicamente para fines de atención médica. Toda derivación queda registrada y es visible para el paciente.
      </div>
      {isDoctor && (
        <form onSubmit={handleReferral} className="mb-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 className="text-base font-semibold text-blue-800 dark:text-blue-200 mb-2">Solicitar Interconsulta</h3>
          <div className="mb-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Especialista</label>
            <select
              value={toDoctorId}
              onChange={e => setToDoctorId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              required
            >
              <option value="">-- Seleccionar --</option>
              {doctors.filter((doc) => doc.id !== user.id).map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} ({doc.specialty}) - {doc.licenseNumber}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Motivo de la interconsulta</label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              required
            />
          </div>
          {error && <div className="text-red-600 dark:text-red-400 text-sm mb-2">{error}</div>}
          {success && <div className="text-green-600 dark:text-green-400 text-sm mb-2">{success}</div>}
          <button type="submit" disabled={sending || !toDoctorId || !reason.trim()} className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
            {sending ? 'Enviando...' : 'Solicitar Interconsulta'}
          </button>
        </form>
      )}
      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">Historial de Interconsultas</h3>
      {loading ? (
        <div className="text-slate-600 dark:text-slate-400">Cargando historial...</div>
      ) : referrals.length === 0 ? (
        <div className="text-slate-500 dark:text-slate-400 text-sm">No hay interconsultas registradas para este caso.</div>
      ) : (
        <div className="space-y-2">
          {referrals.map((ref: any) => (
            <div key={ref.id} className="bg-slate-100 dark:bg-slate-700 rounded p-2">
              <div className="text-xs text-slate-500 dark:text-slate-300 mb-1">
                <strong>De:</strong> {ref.fromDoctor?.name} <strong>Para:</strong> {ref.toDoctor?.name}
              </div>
              <div className="text-sm text-slate-900 dark:text-white mb-1"><strong>Motivo:</strong> {ref.reason}</div>
              <div className="text-xs text-slate-400">{new Date(ref.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 