import { useContent } from "@/contexts/ContentContext";
import type { SiteContent } from "@/lib/defaultContent";

const fontOptions = [
  { label: "Inter (default)", value: "Inter, sans-serif" },
  { label: "Montserrat", value: "Montserrat, sans-serif" },
  { label: "Poppins", value: "Poppins, sans-serif" },
  { label: "Raleway", value: "Raleway, sans-serif" },
  { label: "Oswald", value: "Oswald, sans-serif" },
];

const displayFontOptions = [
  { label: "Syncopate (default)", value: "Syncopate, sans-serif" },
  { label: "Bebas Neue", value: "Bebas Neue, sans-serif" },
  { label: "Russo One", value: "Russo One, sans-serif" },
  { label: "Barlow Condensed", value: "Barlow Condensed, sans-serif" },
];

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3 bg-[#0a0d14] border border-white/10 rounded-lg px-4 py-3">
      <input
        type="color"
        value={value || "#ffffff"}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
      />
      <div className="flex-1">
        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-0.5">{label}</div>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent text-white text-sm font-mono focus:outline-none w-full"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

export default function StyleEditor() {
  const { content, setContent } = useContent();
  const style = (content as any).style ?? {};

  const updateStyle = (field: string, value: string) => {
    const next = structuredClone(content) as any;
    if (!next.style) next.style = {};
    next.style[field] = value;
    setContent(next as SiteContent);
  };

  const applyToPage = () => {
    const root = document.documentElement;
    if (style.colorPrimary) root.style.setProperty("--color-primary", style.colorPrimary);
    if (style.colorBg) root.style.setProperty("--color-background", style.colorBg);
    if (style.colorCard) root.style.setProperty("--color-card", style.colorCard);
    if (style.colorSecondary) root.style.setProperty("--color-secondary", style.colorSecondary);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Estilo y Colores</h1>
      <p className="text-gray-500 text-sm mb-6">Personaliza los colores y fuentes de tu pagina</p>

      <div className="bg-[#111827] border border-white/10 rounded-xl p-6 mb-4">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-red-500 rounded-full" /> Colores Principales
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ColorField label="Color Primario (rojo)" value={style.colorPrimary || "#c0392b"} onChange={v => updateStyle("colorPrimary", v)} />
          <ColorField label="Color Secundario (azul)" value={style.colorSecondary || "#1a2742"} onChange={v => updateStyle("colorSecondary", v)} />
          <ColorField label="Fondo principal" value={style.colorBg || "#0a0d14"} onChange={v => updateStyle("colorBg", v)} />
          <ColorField label="Fondo tarjetas" value={style.colorCard || "#111827"} onChange={v => updateStyle("colorCard", v)} />
        </div>
        <button
          onClick={applyToPage}
          className="mt-4 text-sm text-red-400 hover:text-red-300 font-medium"
        >
          Aplicar preview (requiere Guardar para ser permanente)
        </button>
      </div>

      <div className="bg-[#111827] border border-white/10 rounded-xl p-6 mb-4">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-red-500 rounded-full" /> Tipografia
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-1.5">Fuente de Texto</label>
            <select
              value={style.fontBody || "Inter, sans-serif"}
              onChange={(e) => updateStyle("fontBody", e.target.value)}
              className="w-full bg-[#0a0d14] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500"
            >
              {fontOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-1.5">Fuente de Titulos</label>
            <select
              value={style.fontDisplay || "Syncopate, sans-serif"}
              onChange={(e) => updateStyle("fontDisplay", e.target.value)}
              className="w-full bg-[#0a0d14] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500"
            >
              {displayFontOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-yellow-500/5 border border-yellow-500/20 text-yellow-400 text-xs rounded-xl p-4">
        Nota: Los cambios de color se aplican al guardar y recargar la pagina. El soporte completo de temas dinamicos estara disponible en una proxima version.
      </div>
    </div>
  );
}
