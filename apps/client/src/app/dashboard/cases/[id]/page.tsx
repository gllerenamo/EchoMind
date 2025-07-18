'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { caseApi } from '../../../../services/api';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Chat from './Chat';
import AssignDoctor from './AssignDoctor';

export default function CaseDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [caseData, setCaseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editFields, setEditFields] = useState({ diagnosis: '', treatment: '' });
  const [editError, setEditError] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    caseApi.getCase(params.id as string)
      .then((res) => {
        setCaseData(res);
        setEditFields({
          diagnosis: res.diagnosis || '',
          treatment: res.treatment || '',
        });
      })
      .catch((err) => setError(err.response?.data?.message || 'Error al cargar el caso clínico'))
      .finally(() => setLoading(false));
  }, [user, params.id]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-slate-700 dark:text-slate-200">Debes iniciar sesión para ver el caso clínico.</p>
        <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-700">Volver al dashboard</Link>
      </div>
    );
  }

  if (loading) {
    return <div className="text-slate-600 dark:text-slate-400 p-8">Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-600 dark:text-red-400 p-8">{error}</div>;
  }

  if (!caseData) {
    return null;
  }

  // Solo médicos asignados pueden editar diagnóstico y tratamiento
  const isDoctorAssigned = user?.role === 'doctor' && caseData?.assignedDoctors?.some((d: any) => d.id === user.id);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError('');
    setEditLoading(true);
    try {
      await caseApi.updateCase(caseData.id, {
        diagnosis: editFields.diagnosis,
        treatment: editFields.treatment,
      });
      setCaseData({ ...caseData, diagnosis: editFields.diagnosis, treatment: editFields.treatment });
    } catch (err: any) {
      setEditError(err.response?.data?.message || 'Error al actualizar el caso');
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Link href="/dashboard/cases" className="text-indigo-600 hover:underline mb-4 inline-block">← Volver a Casos Clínicos</Link>
      <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{caseData.title}</h1>
      <div className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Creado el {new Date(caseData.createdAt).toLocaleDateString('es-ES')} | Prioridad: <span className="font-semibold capitalize">{caseData.priority}</span> | Estado: <span className="font-semibold capitalize">{caseData.status}</span>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Descripción</h2>
        <p className="text-slate-700 dark:text-slate-200">{caseData.description}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Síntomas</h2>
        <ul className="list-disc pl-5 text-slate-700 dark:text-slate-200">
          {caseData.symptoms.map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
      {caseData.diagnosis && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Diagnóstico</h2>
          <p className="text-slate-700 dark:text-slate-200">{caseData.diagnosis}</p>
        </div>
      )}
      {caseData.treatment && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Tratamiento</h2>
          <p className="text-slate-700 dark:text-slate-200">{caseData.treatment}</p>
        </div>
      )}
      {isDoctorAssigned && (
        <form onSubmit={handleEditSubmit} className="mb-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Editar Diagnóstico y Tratamiento</h2>
          <div className="mb-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Diagnóstico</label>
            <input
              type="text"
              value={editFields.diagnosis}
              onChange={e => setEditFields(f => ({ ...f, diagnosis: e.target.value }))}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Tratamiento</label>
            <input
              type="text"
              value={editFields.treatment}
              onChange={e => setEditFields(f => ({ ...f, treatment: e.target.value }))}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          {editError && <div className="text-red-600 dark:text-red-400 text-sm mb-2">{editError}</div>}
          <button type="submit" disabled={editLoading} className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
            {editLoading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>
      )}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Participantes</h2>
        <ul className="list-disc pl-5 text-slate-700 dark:text-slate-200">
          <li>Paciente: {caseData.patient?.name}</li>
          {caseData.assignedDoctors && caseData.assignedDoctors.length > 0 && (
            <li>Médicos asignados: {caseData.assignedDoctors.map((d: any) => d.name).join(', ')}</li>
          )}
        </ul>
      </div>
      {user.role === 'admin' && (
        <AssignDoctor caseId={caseData.id} onAssigned={() => router.refresh()} />
      )}
      {/* Aquí se pueden agregar acciones futuras: asignar médico, chat, etc. */}
      <Chat caseId={caseData.id} />
    </div>
  );
} 