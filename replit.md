# Albert Auto Detailing

A professional bilingual (EN/ES) auto detailing business website with a private admin panel for editing all site content.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string, `ADMIN_PASSWORD` — admin panel password

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite (artifacts/albert-auto-detailing)
- API: Express 5 (artifacts/api-server)
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Animations: Framer Motion

## Where things live

- `artifacts/albert-auto-detailing/src/` — React frontend
  - `src/pages/Landing.tsx` — main page composition
  - `src/components/sections/` — Hero, About, Services, etc.
  - `src/contexts/ContentContext.tsx` — dynamic site content state + API sync
  - `src/contexts/LanguageContext.tsx` — EN/ES toggle
  - `src/lib/defaultContent.ts` — default content values (source of truth shape)
  - `src/admin/` — admin panel (AdminPanel, AdminLogin, sections editors)
- `artifacts/api-server/src/routes/` — content.ts, admin.ts, health.ts
- `lib/db/src/schema/siteContent.ts` — `site_content` table (key/value JSONB)
- `lib/api-spec/openapi.yaml` — API contract source of truth

## Architecture decisions

- Admin panel is accessed via keyboard shortcut **Ctrl+Alt+Shift+N** — no public URL, no route.
- Site content is stored as a single JSONB blob in Postgres (key="main") for simplicity — no per-field rows.
- Auth is a simple bearer token equal to `ADMIN_PASSWORD` secret — no JWT. Suitable for single-owner site.
- Frontend merges remote content with `defaultContent` on load, so missing fields always fall back gracefully.
- Language (EN/ES) is handled client-side via `LanguageContext` — not persisted, resets on reload.

## Product

- Public landing page: Hero, About, Services, Mobile Service, Why Us, Gallery, Contact, Footer
- Bilingual toggle (EN/ES) in the navbar
- Private admin panel (Ctrl+Alt+Shift+N): edit all texts, services, contact info, sections, testimonials, style

## User preferences

- Admin panel accessed via Ctrl+Alt+Shift+N keyboard shortcut.

## Gotchas

- After changing `lib/api-spec/openapi.yaml`, run `pnpm --filter @workspace/api-spec run codegen` before typechecking.
- After changing `lib/db/src/schema/`, run `pnpm --filter @workspace/db run push` to migrate.
- The API server must be restarted after code changes (it pre-bundles with esbuild).

## Deploying outside Replit (GitHub + Vercel)

- The repo is portable: `vercel.json` builds the frontend as a static site and runs `api/index.ts` (a thin re-export of the same Express app used on Replit) as a serverless function.
- On Vercel, you need your own Postgres (e.g. Neon) via `DATABASE_URL`, plus `ADMIN_PASSWORD` and `OPENAI_API_KEY`. See `DEPLOY.md` for full steps.
- The OpenAI client (`lib/integrations-openai-ai-server/src/client.ts`) prefers Replit's AI Integration proxy when present, and falls back to a plain `OPENAI_API_KEY` otherwise — same code works on both platforms.
- `vite.config.ts` no longer throws if `PORT`/`BASE_PATH` are unset (needed for Vercel's build, which doesn't set them) — Replit's workflow still sets them explicitly for dev.
- Known limitation: admin panel photo uploads write to local disk, which doesn't persist on Vercel's serverless filesystem. See `DEPLOY.md` for details.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
