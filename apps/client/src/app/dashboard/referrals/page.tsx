'use client';

import { useEffect, useState } from 'react';
import { referralApi } from '../../../services/api';
import Link from 'next/link';

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    referralApi.getUserReferrals()
      .then(setReferrals)
      .catch(() => setError('Error al cargar interconsultas'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Historial de Interconsultas</h1>
      {loading ? (
        <div className="text-slate-600 dark:text-slate-400">Cargando...</div>
      ) : error ? (
        <div className="text-red-600 dark:text-red-400">{error}</div>
      ) : referrals.length === 0 ? (
        <div className="text-slate-500 dark:text-slate-400">No hay interconsultas registradas.</div>
      ) : (
        <div className="space-y-4">
          {referrals.map((ref: any) => (
            <div key={ref.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-slate-500 dark:text-slate-300">
                  <strong>De:</strong> {ref.fromDoctor?.name} <strong>Para:</strong> {ref.toDoctor?.name}
                </div>
                <div className="text-xs text-slate-400">{new Date(ref.createdAt).toLocaleString()}</div>
              </div>
              <div className="text-sm text-slate-900 dark:text-white mb-1"><strong>Motivo:</strong> {ref.reason}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <Link href={`/dashboard/cases/${ref.clinicalCase?.id}`} className="text-indigo-600 hover:underline">Ver caso clínico</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
