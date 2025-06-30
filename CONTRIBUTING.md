# Guía de Contribución - EchoMind

¡Gracias por tu interés en contribuir a EchoMind! 🏥

## 🚀 Cómo Contribuir

### 1. Configuración del Entorno

1. **Fork el repositorio**
2. **Clona tu fork localmente**
   ```bash
   git clone https://github.com/gllerenamo/echomind.git
   cd echomind
   ```

3. **Instala dependencias**
   ```bash
   pnpm install
   ```

4. **Configura las variables de entorno**
   - Copia `apps/server/env.example` a `apps/server/.env`
   - Configura tu base de datos de Supabase

5. **Ejecuta el proyecto**
   ```bash
   pnpm dev
   ```

### 2. Flujo de Trabajo

1. **Crea una rama para tu feature**
   ```bash
   git checkout -b feature/nombre-de-tu-feature
   ```

2. **Haz tus cambios**
   - Sigue las convenciones de código
   - Escribe tests cuando sea posible
   - Actualiza la documentación si es necesario

3. **Commit tus cambios**
   ```bash
   git commit -m "feat: agregar nueva funcionalidad"
   ```

4. **Push a tu fork**
   ```bash
   git push origin feature/nombre-de-tu-feature
   ```

5. **Crea un Pull Request**
   - Describe claramente los cambios
   - Incluye screenshots si es relevante
   - Menciona issues relacionados

## 📋 Convenciones de Código

### TypeScript
- Usa tipos estrictos
- Evita `any`
- Documenta funciones complejas
- Usa interfaces para objetos

### NestJS (Backend)
- Sigue la arquitectura de módulos
- Usa DTOs para validación
- Implementa manejo de errores
- Escribe tests unitarios

### Next.js (Frontend)
- Usa componentes funcionales
- Implementa TypeScript
- Sigue las convenciones de Next.js 15
- Usa Tailwind CSS para estilos

### Commits
Usa [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `docs:` documentación
- `style:` formato de código
- `refactor:` refactorización
- `test:` tests
- `chore:` tareas de mantenimiento

## 🧪 Testing

### Backend
```bash
# Tests unitarios
pnpm --filter server test

# Tests e2e
pnpm --filter server test:e2e

# Coverage
pnpm --filter server test:cov
```

### Frontend
```bash
# Tests
pnpm --filter client test

# Linting
pnpm --filter client lint
```

## 📝 Reportar Bugs

1. **Busca si ya existe un issue**
2. **Crea un nuevo issue** con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots si es relevante
   - Información del sistema

## 💡 Solicitar Features

1. **Describe la funcionalidad**
2. **Explica el caso de uso**
3. **Menciona alternativas consideradas**
4. **Incluye mockups si es posible**

## 🔧 Configuración de Desarrollo

### Estructura del Proyecto
```
echomind/
├── apps/
│   ├── client/          # Frontend (Next.js)
│   └── server/          # Backend (NestJS)
├── packages/
│   └── types/           # Tipos compartidos
└── docs/                # Documentación
```

### Scripts Útiles
```bash
# Desarrollo
pnpm dev                 # Ejecutar todo
pnpm --filter client dev # Solo frontend
pnpm --filter server start:dev # Solo backend

# Build
pnpm build              # Build de todo
pnpm --filter client build # Build frontend
pnpm --filter server build # Build backend

# Testing
pnpm test               # Tests de todo
pnpm --filter client test # Tests frontend
pnpm --filter server test # Tests backend
```

## 🤝 Código de Conducta

- Sé respetuoso y inclusivo
- Ayuda a otros contribuidores
- Mantén un ambiente positivo
- Reporta comportamiento inapropiado

## 📞 Contacto

- **Issues**: [GitHub Issues](https://github.com/gllerenamo/echomind/issues)
- **Discusiones**: [GitHub Discussions](https://github.com/gllerenamo/echomind/discussions)
- **Email**: contribuciones@echomind.com

## 🎉 Reconocimientos

- Los contribuidores serán mencionados en el README
- Los commits significativos aparecerán en el changelog
- Agradecimientos especiales para contribuciones mayores

---

¡Gracias por hacer EchoMind mejor! 🏥✨ 