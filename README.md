# Proyecto Astro + React + Tailwind
Landing estática (Astro SSG) con islands React, tema claro/oscuro, i18n EN/ES, interactividad ligera y tests con Vitest.

## Requisitos previos
- Node >= 20.10.0
- pnpm >= 9

## Configuración rápida
```bash
pnpm install
```

## Comandos principales (workspace root)
- `pnpm --dir frontend dev` servidor local.
- `pnpm --dir frontend lint` ESLint.
- `pnpm --dir frontend type-check` tipos con `astro check`.
- `pnpm --dir frontend test` Vitest (jsdom).
- `pnpm --dir frontend build` genera output para Vercel (static + serverless).
- `pnpm audit --prod` auditoría de dependencias.

## Variables de entorno (correo)
Crea `frontend/.env` o configura en Vercel:
```
RESEND_API_KEY=your_resend_api_key
RESEND_FROM=Portfolio <onboarding@resend.dev>
RESEND_TO=you@gmail.com
```
`RESEND_FROM` debe estar verificado en Resend.

## Notas y riesgos
- Si tu ruta tiene espacios en Windows, usa siempre `pnpm --dir frontend <comando>` para asegurar la carpeta correcta.

## Estructura relevante
- `frontend/src/pages/index.astro` monta la isla `Portfolio`.
- `frontend/src/components/portfolio/*` slices UI (NavBar, Hero, Projects, Tech, Contact, Footer).
- `frontend/src/lib/portfolio-data.ts` textos y catálogos EN/ES.
- `frontend/src/styles/global.css` estilos base mobile-first.

## Metas de rendimiento y accesibilidad
- Mobile-first, scroll suave y `overflow-x: hidden` global.
- Aria-live/role en formulario, toggles con `aria-label`, color-scheme sincronizado con tema.

## Próximos pasos sugeridos
- Conectar enlaces reales de redes y métricas diferidas.
- Añadir más tests si amplías el contenido o la data.

