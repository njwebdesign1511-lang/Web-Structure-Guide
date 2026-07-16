import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "PATCH") {
    const { visible } = req.body;
    const { error } = await supabase.from("reviews").update({ approved: visible }).eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ success: true });
  }
  return res.status(405).json({ error: "Method not allowed" });
}
