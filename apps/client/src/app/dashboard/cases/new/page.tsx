'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../../../contexts/AuthContext';
import { caseApi } from '../../../../services/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const caseSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  symptoms: z.string().min(1, 'Debes ingresar al menos un síntoma'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  // TODO: Feature futuro: permitir adjuntar antecedentes médicos (archivos, texto, etc.)
});

type CaseFormData = z.infer<typeof caseSchema>;

export default function NewCasePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CaseFormData>({
    resolver: zodResolver(caseSchema),
    defaultValues: { priority: 'medium' },
  });

  if (!user || user.role !== 'patient') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-slate-700 dark:text-slate-200">Solo los pacientes pueden crear casos clínicos.</p>
      </div>
    );
  }

  const onSubmit = async (data: CaseFormData) => {
    setError('');
    setIsLoading(true);
    try {
      // Convertir síntomas a array
      const symptomsArray = data.symptoms.split(',').map((s) => s.trim()).filter(Boolean);
      await caseApi.createCase({ ...data, symptoms: symptomsArray });
      reset();
      router.push('/dashboard/cases');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear el caso clínico');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Crear Caso Clínico</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Título</label>
          <span className="text-xs text-slate-400">Escribe un título claro que resuma el principal síntoma o motivo de consulta.</span>
          <input 
            {...register('title')}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            placeholder="Dolor abdominal persistente desde hace 3 días"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Descripción</label>
          <span className="text-xs text-slate-400">
            Describe cuándo comenzaron los síntomas, cómo han evolucionado y cualquier otra información que creas relevante.
          </span>
          <textarea
            {...register('description')}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            placeholder="Empecé con molestias estomacales el lunes, al principio solo era ardor pero ahora siento dolor constante.
            No he tomado medicamentos, y el dolor empeora después de comer."
          />
          {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Síntomas <span className="text-xs text-slate-400">(separados por coma)</span>
          </label>
          <span className="text-xs text-slate-400">
            Enumera los síntomas más importantes que estás experimentando.
          </span>
          <input
            {...register('symptoms')}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            placeholder="dolor abdominal, náuseas, fatiga"
          />
          {errors.symptoms && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.symptoms.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Prioridad</label>
          <select {...register('priority')} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
            <option value="urgent">Urgente</option>
          </select>
        </div>
        {/*
          TODO: Feature futuro: permitir adjuntar antecedentes médicos (archivos, texto, etc.)
        */}
        {error && <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>}
        <button type="submit" disabled={isLoading} className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? 'Creando...' : 'Crear Caso Clínico'}
        </button>
        <Link href="/dashboard/cases" className="text-indigo-600 hover:text-indigo-700">Volver a la lista de casos</Link>
      </form>
    </div>
  );
} 