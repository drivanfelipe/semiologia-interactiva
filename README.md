# Semiología Interactiva — Paciente Virtual

MVP web para simulación académica de semiología básica con paciente virtual, acceso por código individual y evaluación final automática usando OpenAI API.

## Qué incluye

- Pantalla de ingreso con nombre, apellido y código individual.
- Chat con persona simulada.
- Control de máximo 3 preguntas por mensaje.
- Suspensión si detecta plantillas, prompts o texto no conversacional.
- Botón de finalizar.
- Impresión final del estudiante.
- Retroalimentación académica automática.
- Sin base de datos en esta V1.
- Sin almacenamiento de resultados en servidor.

## Requisitos

- Node.js LTS instalado.
- Cuenta de OpenAI Platform con crédito disponible.
- API key de OpenAI.

## Instalación local

1. Descomprime el proyecto.
2. Abre la carpeta en VS Code o terminal.
3. Instala dependencias:

```bash
npm install
```

4. Copia el archivo `.env.example` como `.env.local`:

```bash
cp .env.example .env.local
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

5. Abre `.env.local` y pega tu API key:

```env
OPENAI_API_KEY=tu_api_key_real
OPENAI_MODEL_CHAT=gpt-5.4-mini
OPENAI_MODEL_EVALUATION=gpt-5.4-mini
MAX_STUDENT_MESSAGES=35
```

No compartas tu API key y no la subas a GitHub.

6. Ejecuta la app:

```bash
npm run dev
```

7. Abre:

```txt
http://localhost:3000
```

## Código de prueba

El proyecto trae códigos internos de ejemplo:

```txt
SEM-2026-001
SEM-2026-002
SEM-2026-003
SEM-2026-004
SEM-2026-005
```

Puedes editarlos en:

```txt
lib/accessCodes.ts
```

## Despliegue en Vercel

1. Sube el proyecto a GitHub.
2. Entra a Vercel y crea un nuevo proyecto desde ese repositorio.
3. Agrega estas variables de entorno en Vercel:

```env
OPENAI_API_KEY=tu_api_key_real
OPENAI_MODEL_CHAT=gpt-5.4-mini
OPENAI_MODEL_EVALUATION=gpt-5.4-mini
MAX_STUDENT_MESSAGES=35
```

4. Despliega.

## Cómo controlar costos

- Mantén `MAX_STUDENT_MESSAGES=35` o menor.
- Usa `gpt-5.4-mini` para chat y evaluación.
- Limita la cantidad de códigos activos.
- No actives recarga automática en OpenAI Platform hasta validar el uso.
- Revisa consumo después de cada prueba grupal.

## Archivos principales

```txt
app/page.tsx                 Interfaz principal
app/api/start/route.ts        Valida nombre, apellido y código
app/api/chat/route.ts         Genera respuesta de la paciente simulada
app/api/evaluate/route.ts     Genera retroalimentación académica
lib/caseData.ts               Datos ocultos del caso
lib/prompts.ts                Prompts modulares
lib/accessCodes.ts            Códigos individuales válidos
lib/validators.ts             Validaciones de seguridad académica
```

## Siguiente mejora recomendada

- Guardar resultados en base de datos.
- Crear panel docente.
- Agregar más casos.
- Crear rúbricas por estación.
- Exportar evaluación en PDF.
