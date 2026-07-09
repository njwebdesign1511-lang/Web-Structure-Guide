import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    return res.json(data || []);
  }
  if (req.method === "POST") {
    const { data } = await supabase.from("leads").insert(req.body).select();
    return res.json(data?.[0] || {});
  }
}
