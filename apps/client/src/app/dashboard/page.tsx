'use client';

import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-slate-600 dark:text-slate-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">EchoMind</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Bienvenido, {user.name}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Dashboard
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Bienvenido a tu panel de control de EchoMind
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Información del Usuario
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Nombre</p>
              <p className="text-slate-900 dark:text-white font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
              <p className="text-slate-900 dark:text-white font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Rol</p>
              <p className="text-slate-900 dark:text-white font-medium capitalize">{user.role}</p>
            </div>
            {user.role === 'doctor' && (
              <>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Especialidad</p>
                  <p className="text-slate-900 dark:text-white font-medium">{user.specialty}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Número de Licencia</p>
                  <p className="text-slate-900 dark:text-white font-medium">{user.licenseNumber}</p>
                </div>
                {user.hospital && (
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Hospital</p>
                    <p className="text-slate-900 dark:text-white font-medium">{user.hospital}</p>
                  </div>
                )}
              </>
            )}
            {user.role === 'patient' && (
              <>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Fecha de Nacimiento</p>
                  <p className="text-slate-900 dark:text-white font-medium">
                    {new Date(user.dateOfBirth).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Teléfono</p>
                  <p className="text-slate-900 dark:text-white font-medium">{user.phoneNumber}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Interconsultas
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {user.role === 'doctor' 
                ? 'Gestiona tus interconsultas y colabora con otros especialistas'
                : 'Solicita interconsultas y mantén comunicación con tus médicos'
              }
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Casos Clínicos
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {user.role === 'doctor' 
                ? 'Revisa y gestiona los casos clínicos de tus pacientes'
                : 'Accede a tu historial médico y casos clínicos'
              }
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h6v-2H4v2zM4 11h6V9H4v2zM4 7h6V5H4v2zM10 7h10V5H10v2zM10 11h10V9H10v2zM10 15h10v-2H10v2zM10 19h10v-2H10v2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Historial
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {user.role === 'doctor' 
                ? 'Consulta el historial completo de tus pacientes'
                : 'Revisa tu historial médico y tratamientos'
              }
            </p>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200">
                Funcionalidades Próximas
              </h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <p>Estamos trabajando en nuevas funcionalidades como chat en tiempo real, notificaciones push, y más. ¡Mantente atento!</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 