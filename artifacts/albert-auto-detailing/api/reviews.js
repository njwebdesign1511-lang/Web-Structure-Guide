import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    const mapped = (data || []).map(r => ({ ...r, createdAt: r.created_at }));
    return res.json(mapped);
  }
  if (req.method === "POST") {
    const { name, service, comment, rating } = req.body;
    const { data } = await supabase.from("reviews").insert({ name, service, comment, rating }).select();
    return res.json(data?.[0] || {});
  }
}
