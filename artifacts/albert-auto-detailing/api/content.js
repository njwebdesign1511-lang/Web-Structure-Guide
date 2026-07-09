import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data } = await supabase.from("site_content").select("*").order("updated_at", { ascending: false }).limit(1);
    return res.json(data?.[0]?.content || {});
  }
  if (req.method === "PUT" || req.method === "POST") {
    const { data: existing } = await supabase.from("site_content").select("id").limit(1);
    if (existing?.length) {
      await supabase.from("site_content").update({ content: req.body, updated_at: new Date() }).eq("id", existing[0].id);
    } else {
      await supabase.from("site_content").insert({ content: req.body });
    }
    return res.json({ success: true });
  }
}
