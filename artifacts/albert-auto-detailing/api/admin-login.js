
const ADMIN_PASSWORD = "Adalbertoauto96$";
const JWT_SECRET = "albert-auto-detailing-secret-2024";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = Buffer.from(JWT_SECRET + ":" + Date.now()).toString("base64");
    return res.status(200).json({ token });
  }
  return res.status(401).json({ error: "Invalid password" });
}

