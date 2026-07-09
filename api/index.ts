// Vercel serverless entry point.
//
// Vercel builds every file under /api as its own serverless function. This
// file re-exports the same Express app used by artifacts/api-server so the
// exact same routes, middleware, and business logic run in both Replit (as a
// long-lived process via artifacts/api-server/src/index.ts) and on Vercel (as
// an on-demand function). Do not duplicate route logic here.
import app from "../artifacts/api-server/src/app";

export default app;
