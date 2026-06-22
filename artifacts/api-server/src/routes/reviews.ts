import { Router } from "express";
import { db } from "@workspace/db";
import { reviews } from "@workspace/db/schema";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/reviews", async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(reviews)
      .where(eq(reviews.visible, true))
      .orderBy(desc(reviews.createdAt));
    res.json(rows);
  } catch (err) {
    req.log.error(err, "Failed to fetch reviews");
    res.status(500).json({ error: "Internal error" });
  }
});

router.post("/reviews", async (req, res) => {
  try {
    const { name, rating, service, comment } = req.body as Record<string, string | number | undefined>;
    if (!name || !comment) {
      return res.status(400).json({ ok: false, error: "name and comment are required" });
    }
    const parsedRating = Math.min(5, Math.max(1, Number(rating) || 5));
    const [row] = await db
      .insert(reviews)
      .values({ name: String(name), rating: parsedRating, service: service ? String(service) : undefined, comment: String(comment) })
      .returning({ id: reviews.id });
    res.json({ ok: true, id: row.id });
  } catch (err) {
    req.log.error(err, "Failed to save review");
    res.status(500).json({ ok: false, error: "Internal error" });
  }
});

router.get("/reviews/all", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const rows = await db.select().from(reviews).orderBy(desc(reviews.createdAt));
    res.json(rows);
  } catch (err) {
    req.log.error(err, "Failed to fetch all reviews");
    res.status(500).json({ error: "Internal error" });
  }
});

router.patch("/reviews/:id/visibility", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const id = Number(req.params.id);
    const { visible } = req.body as { visible: boolean };
    await db.update(reviews).set({ visible }).where(eq(reviews.id, id));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err, "Failed to update review visibility");
    res.status(500).json({ ok: false, error: "Internal error" });
  }
});

router.delete("/reviews/:id", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    await db.delete(reviews).where(eq(reviews.id, Number(req.params.id)));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err, "Failed to delete review");
    res.status(500).json({ ok: false, error: "Internal error" });
  }
});

export default router;
