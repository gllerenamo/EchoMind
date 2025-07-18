'use client';

import { useEffect, useState } from 'react';
import { doctorApi } from '../../../../services/api';
import { caseApi } from '../../../../services/api';

interface AssignDoctorProps {
  caseId: string;
  onAssigned?: () => void;
}

export default function AssignDoctor({ caseId, onAssigned }: AssignDoctorProps) {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    doctorApi.getDoctors()
      .then(setDoctors)
      .catch(() => setError('Error al cargar médicos'))
      .finally(() => setLoading(false));
  }, []);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;
    setAssigning(true);
    setError('');
    setSuccess('');
    try {
      await caseApi.assignDoctorToCase(caseId, selectedDoctor);
      setSuccess('Doctor asignado correctamente');
      setSelectedDoctor('');
      if (onAssigned) onAssigned();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al asignar doctor');
    } finally {
      setAssigning(false);
    }
  };

  if (loading) return <div className="text-slate-600 dark:text-slate-400">Cargando médicos...</div>;
  if (doctors.length === 0) return <div className="text-slate-600 dark:text-slate-400">No hay médicos disponibles.</div>;

  return (
    <form onSubmit={handleAssign} className="mb-6 bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
      <h2 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">Asignar Doctor al Caso</h2>
      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Seleccionar Doctor</label>
        <select
          value={selectedDoctor}
          onChange={e => setSelectedDoctor(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
        >
          <option value="">-- Seleccionar --</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name} ({doc.specialty}) - {doc.licenseNumber}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="text-red-600 dark:text-red-400 text-sm mb-2">{error}</div>}
      {success && <div className="text-green-600 dark:text-green-400 text-sm mb-2">{success}</div>}
      <button type="submit" disabled={assigning || !selectedDoctor} className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
        {assigning ? 'Asignando...' : 'Asignar Doctor'}
      </button>
    </form>
  );
} 