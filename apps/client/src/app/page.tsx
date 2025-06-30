import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Header */}
      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  EchoMind
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">Colaboración Médica Inteligente</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Características
              </a>
              <a href="#about" className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Acerca de
              </a>
              <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Potenciando la
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Colaboración Médica
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Conecta especialistas, coordina interconsultas y mejora la atención del paciente 
              con nuestra plataforma segura de comunicación médica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
                Registrarse como Médico
              </Link>
              <Link href="/register" className="bg-white hover:bg-slate-50 text-indigo-600 border-2 border-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-indigo-400 dark:border-indigo-400">
                Registrarse como Paciente
              </Link>
            </div>
          </div>

          {/* Hero Image/Preview */}
          <div className="relative max-w-4xl mx-auto mt-16">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">EchoMind - Interconsulta #1234</div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chat Preview */}
                <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-900 rounded-xl p-4 h-64">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        Dr. A
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-3 max-w-xs">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          Paciente presenta síntomas compatibles con...
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 justify-end">
                      <div className="bg-indigo-600 rounded-lg p-3 max-w-xs">
                        <p className="text-sm text-white">
                          Considero necesario evaluar función renal
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        Dr. B
                      </div>
                    </div>
                  </div>
                </div>
                {/* Patient Info */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Información del Paciente</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">Nombre:</span>
                      <span className="text-slate-700 dark:text-slate-300 ml-2">María González</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">Edad:</span>
                      <span className="text-slate-700 dark:text-slate-300 ml-2">45 años</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">Especialistas:</span>
                      <span className="text-slate-700 dark:text-slate-300 ml-2">2 activos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Características Principales
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Todo lo que necesitas para una colaboración médica efectiva
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Interconsultas Seguras
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Comunicación encriptada entre especialistas con historial completo de conversaciones y derivaciones.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Roles Diferenciados
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Interfaces específicas para médicos y pacientes con permisos y flujos adaptados a cada rol.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Seguridad Clínica
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Cumplimiento de estándares médicos con trazabilidad completa y protección de datos del paciente.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Coordinación Rápida
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Agiliza la toma de decisiones clínicas con notificaciones instantáneas y seguimiento en tiempo real.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Trazabilidad Completa
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Registro detallado de todas las interacciones médicas para seguimiento y auditoría clínica.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Tiempo Real
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Comunicación instantánea entre especialistas para casos urgentes y seguimiento continuo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para mejorar la colaboración médica?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Únete a EchoMind y transforma la forma en que los médicos colaboran y los pacientes reciben atención.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
              Comenzar Ahora
            </Link>
            <Link href="/login" className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105">
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">EchoMind</span>
              </div>
              <p className="text-slate-400">
                Potenciando la colaboración médica del futuro.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Seguridad</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentación</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Licencia</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 EchoMind. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
