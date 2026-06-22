import { useContent } from "@/contexts/ContentContext";
import { Globe, Search, BarChart3, CheckCircle, ExternalLink } from "lucide-react";
import type { SiteContent } from "@/lib/defaultContent";

export default function SeoEditor() {
  const { content, setContent } = useContent();
  const seo = (content as any).seo as {
    title: string; description: string; keywords: string; gaId: string; gscCode: string;
  };

  const set = (field: string, value: string) => {
    const next = structuredClone(content) as any;
    if (!next.seo) next.seo = {};
    next.seo[field] = value;
    setContent(next as SiteContent);
  };

  const inputCls = "w-full bg-[#0a0d14] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-500 transition-colors placeholder-gray-600";
  const labelCls = "block text-xs font-bold tracking-widest uppercase mb-1.5 text-gray-400";

  const tips = [
    { icon: CheckCircle, text: "Palabras clave: auto detailing, car detailing, ceramic coating, Norwalk CT" },
    { icon: CheckCircle, text: "Sitemap XML y robots.txt ya están configurados" },
    { icon: CheckCircle, text: "Open Graph para Facebook y WhatsApp configurado" },
    { icon: CheckCircle, text: "Twitter Cards configurado" },
    { icon: CheckCircle, text: "Schema.org LocalBusiness configurado" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">SEO & Posicionamiento</h1>
        <p className="text-gray-500 text-sm">Optimiza tu visibilidad en Google y redes sociales</p>
      </div>

      {/* Status */}
      <div className="bg-[#111827] border border-green-500/20 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <p className="text-green-400 font-semibold text-sm">SEO Base Activo</p>
        </div>
        <div className="flex flex-col gap-2">
          {tips.map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <t.icon size={13} className="text-green-400 shrink-0" />
              <p className="text-gray-400 text-xs">{t.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meta tags editor */}
      <div className="bg-[#111827] border border-white/10 rounded-xl p-6 mb-5">
        <div className="flex items-center gap-2 mb-5">
          <Search size={15} className="text-red-500" />
          <h2 className="text-white font-semibold">Meta Etiquetas</h2>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelCls}>Meta Title</label>
            <input
              type="text"
              value={seo?.title ?? ""}
              onChange={e => set("title", e.target.value)}
              className={inputCls}
              placeholder="Albert Auto Detailing | Professional Car Detailing in Norwalk CT"
              maxLength={70}
            />
            <p className="text-xs text-gray-600 mt-1">{(seo?.title ?? "").length}/70 caracteres recomendados</p>
          </div>
          <div>
            <label className={labelCls}>Meta Description</label>
            <textarea
              rows={3}
              value={seo?.description ?? ""}
              onChange={e => set("description", e.target.value)}
              className={inputCls}
              style={{ resize: "none" }}
              placeholder="Professional auto detailing in Norwalk, CT. Interior detailing, ceramic coating, paint correction..."
              maxLength={160}
            />
            <p className="text-xs text-gray-600 mt-1">{(seo?.description ?? "").length}/160 caracteres recomendados</p>
          </div>
          <div>
            <label className={labelCls}>Palabras Clave (Keywords)</label>
            <textarea
              rows={3}
              value={seo?.keywords ?? ""}
              onChange={e => set("keywords", e.target.value)}
              className={inputCls}
              style={{ resize: "none" }}
              placeholder="auto detailing Norwalk CT, car detailing, ceramic coating, paint correction..."
            />
            <p className="text-xs text-gray-600 mt-1">Separa las palabras clave con comas</p>
          </div>
        </div>
      </div>

      {/* Google tools */}
      <div className="bg-[#111827] border border-white/10 rounded-xl p-6 mb-5">
        <div className="flex items-center gap-2 mb-5">
          <BarChart3 size={15} className="text-red-500" />
          <h2 className="text-white font-semibold">Google Analytics & Search Console</h2>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelCls}>Google Analytics 4 — Measurement ID</label>
            <input
              type="text"
              value={seo?.gaId ?? ""}
              onChange={e => set("gaId", e.target.value)}
              className={inputCls}
              placeholder="G-XXXXXXXXXX"
            />
            <p className="text-xs text-gray-600 mt-1">Obtén tu ID en analytics.google.com</p>
          </div>
          <div>
            <label className={labelCls}>Google Search Console — Verification Code</label>
            <input
              type="text"
              value={seo?.gscCode ?? ""}
              onChange={e => set("gscCode", e.target.value)}
              className={inputCls}
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            />
            <p className="text-xs text-gray-600 mt-1">Obtén tu código en search.google.com/search-console</p>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
            <ExternalLink size={11} /> Google Analytics
          </a>
          <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
            <ExternalLink size={11} /> Search Console
          </a>
        </div>
      </div>

      {/* URLs info */}
      <div className="bg-[#111827] border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={15} className="text-red-500" />
          <h2 className="text-white font-semibold">Archivos SEO</h2>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { label: "Sitemap XML", url: "/sitemap.xml" },
            { label: "Robots.txt", url: "/robots.txt" },
          ].map(({ label, url }) => (
            <div key={url} className="flex items-center justify-between bg-[#0a0d14] rounded-lg px-4 py-3">
              <div>
                <p className="text-white text-sm font-medium">{label}</p>
                <p className="text-gray-600 text-xs">{url}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-green-400 text-xs">Activo</span>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white ml-2">
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
