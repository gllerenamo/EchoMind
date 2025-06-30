'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';

const patientSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  dateOfBirth: z.string().min(1, 'La fecha de nacimiento es requerida'),
  phoneNumber: z.string().min(1, 'El número de teléfono es requerido'),
  emergencyContact: z.object({
    name: z.string().min(2, 'El nombre del contacto de emergencia es requerido'),
    phoneNumber: z.string().min(1, 'El teléfono del contacto de emergencia es requerido'),
    relationship: z.string().min(1, 'La relación es requerida'),
  }).optional(),
});

const doctorSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  licenseNumber: z.string().min(5, 'El número de licencia debe tener al menos 5 caracteres'),
  specialty: z.string().min(2, 'La especialidad es requerida'),
  hospital: z.string().optional(),
  phoneNumber: z.string().min(1, 'El número de teléfono es requerido'),
  consultationFee: z.number().min(0, 'La tarifa debe ser mayor o igual a 0').optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;
type DoctorFormData = z.infer<typeof doctorSchema>;

export default function RegisterPage() {
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { registerPatient, registerDoctor } = useAuth();

  const patientForm = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });

  const doctorForm = useForm<DoctorFormData>({
    resolver: zodResolver(doctorSchema),
  });

  const onPatientSubmit = async (data: PatientFormData) => {
    try {
      setIsLoading(true);
      setError('');
      await registerPatient(data);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onDoctorSubmit = async (data: DoctorFormData) => {
    try {
      setIsLoading(true);
      setError('');
      await registerDoctor(data);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        {/* Selector de tipo de usuario */}
        <div className="mb-8">
          <div className="flex rounded-lg bg-white dark:bg-slate-800 p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setUserType('patient')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                userType === 'patient'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Paciente
            </button>
            <button
              type="button"
              onClick={() => setUserType('doctor')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                userType === 'doctor'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Médico
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Error
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Paciente */}
        {userType === 'patient' && (
          <form onSubmit={patientForm.handleSubmit(onPatientSubmit)} className="space-y-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Nombre Completo
                </label>
                <input
                  {...patientForm.register('name')}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
                {patientForm.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{patientForm.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <input
                  {...patientForm.register('email')}
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
                {patientForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{patientForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Contraseña
                </label>
                <input
                  {...patientForm.register('password')}
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
                {patientForm.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{patientForm.formState.errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Fecha de Nacimiento
                </label>
                <input
                  {...patientForm.register('dateOfBirth')}
                  type="date"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
                {patientForm.formState.errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{patientForm.formState.errors.dateOfBirth.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Teléfono
                </label>
                <input
                  {...patientForm.register('phoneNumber')}
                  type="tel"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
                {patientForm.formState.errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{patientForm.formState.errors.phoneNumber.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Registrando...' : 'Registrar Paciente'}
            </button>
          </form>
        )}

        {/* Formulario de Médico */}
        {userType === 'doctor' && (
          <form onSubmit={doctorForm.handleSubmit(onDoctorSubmit)} className="space-y-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Nombre Completo
                </label>
                <input
                  {...doctorForm.register('name')}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
                {doctorForm.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{doctorForm.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <input
                  {...doctorForm.register('email')}
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
                {doctorForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{doctorForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Contraseña
                </label>
                <input
                  {...doctorForm.register('password')}
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
                {doctorForm.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{doctorForm.formState.errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Número de Licencia
                </label>
                <input
                  {...doctorForm.register('licenseNumber')}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
                {doctorForm.formState.errors.licenseNumber && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{doctorForm.formState.errors.licenseNumber.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Especialidad
                </label>
                <input
                  {...doctorForm.register('specialty')}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
                {doctorForm.formState.errors.specialty && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{doctorForm.formState.errors.specialty.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="hospital" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Hospital (Opcional)
                </label>
                <input
                  {...doctorForm.register('hospital')}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Teléfono
                </label>
                <input
                  {...doctorForm.register('phoneNumber')}
                  type="tel"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
                {doctorForm.formState.errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{doctorForm.formState.errors.phoneNumber.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="consultationFee" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Tarifa de Consulta (Opcional)
                </label>
                <input
                  {...doctorForm.register('consultationFee', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Registrando...' : 'Registrar Médico'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 