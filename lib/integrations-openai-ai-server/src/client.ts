import OpenAI from "openai";

// Prefer Replit's managed AI Integration proxy when available (Replit-only).
// Outside Replit (e.g. deployed on Vercel), fall back to a plain OPENAI_API_KEY
// against the standard OpenAI API so the same code works in both environments.
const replitBaseUrl = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
const replitApiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
const portableApiKey = process.env.OPENAI_API_KEY;

const apiKey = replitApiKey ?? portableApiKey;

if (!apiKey) {
  throw new Error(
    "No OpenAI credentials found. Set AI_INTEGRATIONS_OPENAI_API_KEY (Replit AI Integration) or OPENAI_API_KEY (standard OpenAI account) before starting the server.",
  );
}

export const openai = new OpenAI({
  apiKey,
  // Only set baseURL when using the Replit proxy; omitting it makes the SDK
  // default to https://api.openai.com/v1, which is what we want for a
  // standard OPENAI_API_KEY.
  ...(replitApiKey && replitBaseUrl ? { baseURL: replitBaseUrl } : {}),
});
