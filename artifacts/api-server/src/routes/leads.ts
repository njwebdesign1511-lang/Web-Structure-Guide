import { Router } from "express";
import { db } from "@workspace/db";
import { leads } from "@workspace/db/schema";
import { count, desc } from "drizzle-orm";

const router = Router();

router.post("/leads", async (req, res) => {
  try {
    const { name, phone, email, vehicle, service, preferredDate, message, lang } = req.body as Record<string, string | undefined>;
    if (!name || !phone) {
      return res.status(400).json({ ok: false, error: "name and phone are required" });
    }
    const [lead] = await db
      .insert(leads)
      .values({ name, phone, email, vehicle, service, preferredDate, message, lang })
      .returning({ id: leads.id });
    return res.json({ ok: true, id: lead.id });
  } catch (err) {
    req.log.error(err, "Failed to save lead");
    return res.status(500).json({ ok: false, error: "Internal error" });
  }
});

router.get("/leads/stats", async (req, res) => {
  const authHeader = req.headers.authorization;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const [{ total }] = await db.select({ total: count() }).from(leads);
    const recent = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt))
      .limit(5);
    return res.json({ total: Number(total), recent });
  } catch (err) {
    req.log.error(err, "Failed to fetch leads stats");
    return res.status(500).json({ error: "Internal error" });
  }
});

export default router;
