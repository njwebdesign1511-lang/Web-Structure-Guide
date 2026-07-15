// Vercel serverless entry point.
//
// Vercel builds every file under /api as its own serverless function. This
// file re-exports the pre-bundled Express app so Vercel receives a single
// self-contained JS file rather than trying to resolve raw TypeScript
// workspace packages at deploy time. The bundle is produced by api/build.mjs
// using esbuild (same config as artifacts/api-server/build.mjs).
//
// @ts-ignore — dist/_entry.mjs is a generated esbuild output; no declaration file.
import app from "./dist/_entry.mjs";

export default app;
