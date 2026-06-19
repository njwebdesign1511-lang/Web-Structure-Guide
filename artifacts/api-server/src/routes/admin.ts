import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.post("/admin/login", async (req, res): Promise<void> => {
  const { password } = req.body ?? {};
  if (!password || typeof password !== "string") {
    res.status(400).json({ error: "Password required" });
    return;
  }
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || password !== expected) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  // The token IS the password (simple bearer scheme — no JWT needed)
  res.json({ token: password });
});

export default router;
