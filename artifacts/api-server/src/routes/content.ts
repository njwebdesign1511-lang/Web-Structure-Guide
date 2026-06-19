import { Router, type IRouter } from "express";
import { db, siteContentTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const CONTENT_KEY = "main";

function requireAdmin(req: any, res: any, next: any) {
  const auth = req.headers["authorization"] as string | undefined;
  if (!auth || !auth.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = auth.slice(7);
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || token !== expected) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

router.get("/content", async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(siteContentTable)
    .where(eq(siteContentTable.key, CONTENT_KEY));

  if (rows.length === 0) {
    res.json({});
    return;
  }
  res.json(rows[0].value);
});

router.put("/content", requireAdmin, async (req, res): Promise<void> => {
  const body = req.body;
  if (!body || typeof body !== "object") {
    res.status(400).json({ error: "Invalid body" });
    return;
  }

  const existing = await db
    .select()
    .from(siteContentTable)
    .where(eq(siteContentTable.key, CONTENT_KEY));

  if (existing.length === 0) {
    await db.insert(siteContentTable).values({ key: CONTENT_KEY, value: body });
  } else {
    await db
      .update(siteContentTable)
      .set({ value: body })
      .where(eq(siteContentTable.key, CONTENT_KEY));
  }

  req.log.info("Site content updated");
  res.json(body);
});

export default router;
