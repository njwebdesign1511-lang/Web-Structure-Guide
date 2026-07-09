import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const config = { api: { bodyParser: { sizeLimit: "10mb" } } };
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { data, folder } = req.body;
    const result = await cloudinary.uploader.upload(data, { folder: folder || "albert-auto-detailing" });
    return res.json({ url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
