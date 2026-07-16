import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
export default async function handler(req, res) {
  const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
  const mapped = (data || []).map(r => ({ ...r, name: r.author, createdAt: r.created_at, visible: r.approved ?? true }));
  return res.json(mapped);
}
