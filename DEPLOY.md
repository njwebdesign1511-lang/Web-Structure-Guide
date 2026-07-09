# Deploying to GitHub + Vercel

This project runs on Replit today, but it is also set up to deploy on Vercel
once you push the repo to GitHub. This guide covers the two things that don't
travel automatically when you move platforms: the **database** and the
**secrets** (env vars).

## 1. Push the code to GitHub

Download the project (or use Replit's "push to GitHub" feature) and push it
to a new GitHub repository. Everything in the repo — the frontend, the admin
panel, the API server, and the database schema — comes along. Secrets never
get committed to git, so you'll re-add them in Vercel in step 3.

## 2. Create a free Postgres database on Neon

The site's admin panel and content are stored in Postgres. Replit's database
only works inside Replit, so you need an external one for Vercel.

1. Go to https://neon.tech and sign up for a free account.
2. Create a new project (any name and region is fine).
3. On the project dashboard, copy the **connection string** — it looks like
   `postgresql://user:password@ep-xxxx.neon.tech/dbname?sslmode=require`.
   Keep this handy for step 3.
4. From your local machine (with the repo cloned and `DATABASE_URL` set to
   the Neon connection string in a `.env` file or your shell), run:
   ```
   pnpm install
   DATABASE_URL="<your Neon connection string>" pnpm --filter @workspace/db run push
   ```
   This creates all the tables the site needs (site content, leads, reviews,
   etc.) in your new Neon database.

## 3. Import the project into Vercel

1. Go to https://vercel.com, sign in, and click "Add New Project".
2. Import the GitHub repository you pushed in step 1.
3. Vercel auto-detects the build via `vercel.json` at the repo root — you
   don't need to change the build/output settings.
4. Before deploying, add these Environment Variables in the Vercel project
   settings:

   | Variable | Value | Notes |
   |---|---|---|
   | `DATABASE_URL` | Your Neon connection string from step 2 | Required — powers the admin panel and content storage |
   | `ADMIN_PASSWORD` | Your chosen admin panel password | Required — same password used to log into the admin panel |
   | `OPENAI_API_KEY` | Your own OpenAI API key (from platform.openai.com) | Required for the AI chat assistant to work outside Replit |

5. Click Deploy. Vercel builds the frontend as a static site and runs the API
   as a serverless function — both are served from the same domain, so no
   extra configuration is needed for the frontend to talk to the API.

## 4. Verify after deploying

- Visit your Vercel URL and confirm the site loads in English and Spanish.
- Press **Ctrl+Alt+Shift+N** to open the admin panel, log in with
  `ADMIN_PASSWORD`, and confirm you can edit and save content.
- Open the AI chat widget and send a message to confirm it responds (this
  uses your `OPENAI_API_KEY`, so it will incur normal OpenAI usage costs).

## Known limitation: photo uploads on Vercel

The admin panel's image upload feature currently saves files to local disk
(`uploads/`), which works on Replit but does **not** persist on Vercel —
serverless functions there have an ephemeral filesystem. If you need to
upload new photos through the admin panel after moving to Vercel, ask to add
proper file storage (e.g. Vercel Blob or an S3-compatible bucket) as a
follow-up. Everything else in the admin panel (text, services, contact info,
testimonials, style) saves to the database normally and is unaffected.

## Staying on Replit

None of the above changes anything about how the site runs on Replit today —
the workflows still start the API server and frontend exactly as before, using
`DATABASE_URL` and `ADMIN_PASSWORD` from Replit secrets, and the AI assistant
still prefers Replit's built-in AI Integration when it's available.
