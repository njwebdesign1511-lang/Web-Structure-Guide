import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "DELETE") {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ success: true });
  }
  return res.status(405).json({ error: "Method not allowed" });
}
