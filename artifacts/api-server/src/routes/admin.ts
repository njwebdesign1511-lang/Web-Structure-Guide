import path from "path";
import fs from "fs";
import { Router, type IRouter } from "express";
import multer from "multer";

const router: IRouter = Router();

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

function requireAdmin(req: any, res: any, next: any) {
  const auth = req.headers["authorization"] ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || token !== expected) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

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
  res.json({ token: password });
});

router.post(
  "/admin/upload",
  requireAdmin,
  upload.single("file"),
  (req: any, res: any): void => {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    const url = `/api/uploads/${req.file.filename}`;
    res.json({ url });
  },
);

export default router;
