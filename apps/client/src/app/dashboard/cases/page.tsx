'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { caseApi } from '../../../services/api';
import Link from 'next/link';

export default function CasesListPage() {
  const { user } = useAuth();
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    caseApi.getCases()
      .then((res) => setCases(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Error al cargar los casos'))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-slate-700 dark:text-slate-200">Debes iniciar sesión para ver los casos clínicos.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-700">Volver al dashboard</Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Casos Clínicos</h1>
        {user.role === 'patient' && (
          <Link href="/dashboard/cases/new" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium">
            Nuevo Caso
          </Link>
        )}
      </div>
      {loading ? (
        <div className="text-slate-600 dark:text-slate-400">Cargando...</div>
      ) : error ? (
        <div className="text-red-600 dark:text-red-400">{error}</div>
      ) : !cases || cases.length === 0 ? (
        <div className="text-slate-600 dark:text-slate-400">No hay casos clínicos para mostrar.</div>
      ) : (
        <div className="space-y-4">
          {cases.map((c) => (
            <Link key={c.id} href={`/dashboard/cases/${c.id}`} className="block bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-all border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{c.title}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{c.description.slice(0, 80)}...</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">Prioridad: {c.priority}</span>
                    <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">Estado: {c.status}</span>
                    {user.role === 'doctor' && (
                      <span className="px-2 py-1 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">Paciente: {c.patient?.name}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 dark:text-slate-400">{new Date(c.createdAt).toLocaleDateString('es-ES')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 