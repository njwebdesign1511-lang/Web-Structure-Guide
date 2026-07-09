---
name: Albert Auto Detailing architecture
description: Admin panel access, content storage, auth model, and Replit/Vercel portability notes.
---

- Admin panel via **Ctrl+Alt+Shift+N** — no public URL/route.
- Site content stored as a single JSONB blob in Postgres (key="main").
- Auth is a bearer token equal to `ADMIN_PASSWORD` secret — no JWT.

## Replit ↔ Vercel portability
The project can run unmodified on Replit and also deploy to GitHub → Vercel.

- The OpenAI client (`lib/integrations-openai-ai-server/src/client.ts`) prefers Replit's AI Integration proxy env vars, and falls back to a plain `OPENAI_API_KEY` when those aren't present.
  **Why:** Replit's AI Integration proxy only works inside Replit; a portable app needs a standard OpenAI account.
- The frontend's `vite.config.ts` defaults `PORT`/`BASE_PATH` instead of throwing when unset.
  **Why:** Replit's workflow sets these explicitly, but Vercel's build environment doesn't — throwing broke the Vercel build.
- `api/index.ts` at repo root re-exports the same Express app used by `artifacts/api-server` as a Vercel serverless function (see `vercel.json`, `DEPLOY.md`).
  **Why:** avoids duplicating route/business logic between the Replit long-lived server and the Vercel serverless entry.
- Known gap: admin panel photo uploads write to local disk — doesn't persist on Vercel's serverless filesystem. Would need object storage (Vercel Blob/S3) to fully support uploads there.
