import { Router, type IRouter } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@workspace/db";
import { users } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

function getSecret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET not set");
  return s;
}

function signToken(payload: { id: number; email: string; name: string }): string {
  return jwt.sign(payload, getSecret(), { expiresIn: "30d" });
}

export function verifyToken(token: string): { id: number; email: string; name: string } | null {
  try {
    return jwt.verify(token, getSecret()) as { id: number; email: string; name: string };
  } catch {
    return null;
  }
}

router.post("/auth/register", async (req, res): Promise<void> => {
  const { name, email, password } = req.body ?? {};

  if (!name || !email || !password ||
      typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
    res.status(400).json({ error: "name, email y password son requeridos" });
    return;
  }

  const emailLower = email.toLowerCase().trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLower)) {
    res.status(400).json({ error: "Email inválido" });
    return;
  }
  if (password.length < 6) {
    res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
    return;
  }

  const existing = await db.select().from(users).where(eq(users.email, emailLower)).limit(1);
  if (existing.length > 0) {
    res.status(409).json({ error: "Ya existe una cuenta con ese email" });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const [user] = await db.insert(users).values({
    name: name.trim(),
    email: emailLower,
    passwordHash,
  }).returning({ id: users.id, name: users.name, email: users.email });

  const token = signToken({ id: user.id, email: user.email, name: user.name });
  res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

router.post("/auth/login", async (req, res): Promise<void> => {
  const { email, password } = req.body ?? {};

  if (!email || !password || typeof email !== "string" || typeof password !== "string") {
    res.status(400).json({ error: "email y password son requeridos" });
    return;
  }

  const emailLower = email.toLowerCase().trim();
  const [user] = await db.select().from(users).where(eq(users.email, emailLower)).limit(1);

  if (!user) {
    res.status(401).json({ error: "Email o contraseña incorrectos" });
    return;
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    res.status(401).json({ error: "Email o contraseña incorrectos" });
    return;
  }

  const token = signToken({ id: user.id, email: user.email, name: user.name });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

router.get("/auth/me", async (req, res): Promise<void> => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }
  const payload = verifyToken(auth.slice(7));
  if (!payload) {
    res.status(401).json({ error: "Token inválido o expirado" });
    return;
  }

  const [user] = await db.select({
    id: users.id,
    name: users.name,
    email: users.email,
  }).from(users).where(eq(users.id, payload.id)).limit(1);

  if (!user) {
    res.status(401).json({ error: "Usuario no encontrado" });
    return;
  }

  res.json({ user });
});

export default router;
