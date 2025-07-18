# EchoMind - Colaboración Médica Inteligente

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)

Una plataforma segura de comunicación y colaboración entre médicos especialistas y pacientes, con funcionalidades de chat y organización de interconsultas médicas.

## 🎯 Objetivo

Resolver los problemas actuales de comunicación médica:
- **Falta de organización** por caso clínico
- **Ausencia de trazabilidad** y registro formal de interconsultas
- **Riesgo de violaciones** a la privacidad del paciente
- **Demoras en la coordinación** entre especialistas
- **Exclusión del paciente** del proceso de colaboración clínica

## ✨ Características Principales

- 🔐 **Interconsultas Seguras**: Comunicación encriptada entre especialistas
- 👥 **Roles Diferenciados**: Interfaces específicas para médicos y pacientes
- 🛡️ **Seguridad Clínica**: Cumplimiento de estándares médicos
- ⚡ **Coordinación Rápida**: Notificaciones instantáneas y seguimiento en tiempo real
- 📋 **Trazabilidad Completa**: Historial de conversaciones y derivaciones

## 🏗️ Arquitectura

```
echomind/
├── apps/
│   ├── client/          # Frontend (Next.js 15 + TypeScript)
│   └── server/          # Backend (NestJS + TypeORM)
├── packages/
│   └── types/           # Tipos compartidos TypeScript
└── pnpm-workspace.yaml  # Configuración del monorepo
```

## 🚀 Tecnologías

### Frontend
- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Turbopack** - Bundler rápido

### Backend
- **NestJS** - Framework Node.js
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos (Supabase)
- **bcryptjs** - Encriptación de contraseñas
- **class-validator** - Validación de datos

### Infraestructura
- **Supabase** - Base de datos PostgreSQL
- **pnpm** - Gestor de paquetes
- **Monorepo** - Estructura de proyecto

## 📦 Instalación

### Prerrequisitos
- Node.js 18+
- pnpm 9+
- Cuenta en Supabase

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/echomind.git
cd echomind
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Configurar variables de entorno

#### Servidor
Crea `apps/server/.env`:
```env
# Database Configuration (Supabase)
DB_HOST=your-project.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-db-password
DB_DATABASE=postgres

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# App Configuration
PORT=3000
NODE_ENV=development
```

### 4. Ejecutar en desarrollo
```bash
# Ejecutar todo el proyecto
pnpm dev

# O ejecutar por separado
pnpm --filter client dev    # Frontend en http://localhost:3000
pnpm --filter server start:dev  # Backend en http://localhost:3000
```

## 🔧 Configuración de Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ve a **Settings > Database**
3. Copia las credenciales:
   - **Host** → `DB_HOST`
   - **Database password** → `DB_PASSWORD`
4. Las tablas se crearán automáticamente al ejecutar el servidor

## 📡 API Endpoints

### Autenticación
- `POST /auth/register/patient` - Registro de pacientes
- `POST /auth/register/doctor` - Registro de médicos
- `POST /auth/login` - Inicio de sesión

### Ejemplos de uso

#### Registro de Paciente
```json
POST /auth/register/patient
{
  "name": "María González",
  "email": "maria@example.com",
  "password": "123456",
  "dateOfBirth": "1985-05-15",
  "phoneNumber": "+1234567890",
  "emergencyContact": {
    "name": "Juan González",
    "phoneNumber": "+1234567891",
    "relationship": "Esposo"
  }
}
```

#### Registro de Médico
```json
POST /auth/register/doctor
{
  "name": "Dr. Carlos Rodríguez",
  "email": "carlos@example.com",
  "password": "123456",
  "licenseNumber": "MED123456",
  "specialty": "Cardiología",
  "hospital": "Hospital General",
  "phoneNumber": "+1234567890",
  "consultationFee": 150.00
}
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🆘 Soporte

- 📧 Email: gllerenamo@unsa.edu.pe
- 🐛 Issues: [GitHub Issues](https://github.com/gllerenamo/echomind/issues)
- 📖 Documentación: [Wiki](https://github.com/gllerenamo/echomind/wiki)

## 🗺️ Roadmap

- [X] Sistema de JWT y autenticación completa
- [X] Gestión de casos clínicos
- [X] Sistema de interconsultas
- [X] Chat en tiempo real
- [ ] Notificaciones push
- [X] Dashboard de pacientes
- [X] Dashboard de médicos
- [ ] Sistema de archivos médicos
- [ ] Integración con sistemas hospitalarios
- [ ] App móvil

---

**EchoMind** - Potenciando la colaboración médica del futuro 🏥✨ 