import { useState } from "react";
import { useContent } from "@/contexts/ContentContext";
import { Plus, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, Save, AlertCircle } from "lucide-react";
import type { SiteContent } from "@/lib/defaultContent";

interface Pair {
  id: number;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  beforeSrc: string;
  afterSrc: string;
  visible: boolean;
}

let nextId = Date.now();

function PairCard({
  pair, idx, total,
  onChange, onDelete, onMoveUp, onMoveDown,
}: {
  pair: Pair; idx: number; total: number;
  onChange: (p: Pair) => void; onDelete: () => void;
  onMoveUp: () => void; onMoveDown: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const set = (field: keyof Pair) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...pair, [field]: e.target.value });

  const inputCls = "w-full bg-[#0a0d14] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-500 transition-colors placeholder-gray-600";
  const labelCls = "block text-xs font-bold tracking-widest uppercase mb-1.5 text-gray-500";

  const isComplete = pair.beforeSrc.trim() && pair.afterSrc.trim() && pair.title.trim();

  return (
    <div className={`bg-[#111827] border rounded-xl overflow-hidden ${pair.visible ? "border-white/10" : "border-white/5 opacity-60"}`}>
      <div className="flex items-center gap-3 px-5 py-4">
        {/* Visibility */}
        <button onClick={() => onChange({ ...pair, visible: !pair.visible })}
          className={`p-1.5 rounded-lg transition-colors ${pair.visible ? "text-green-400 hover:bg-green-400/10" : "text-gray-600 hover:bg-white/5"}`}
          title={pair.visible ? "Ocultar" : "Mostrar"}>
          {pair.visible ? <Eye size={14} /> : <EyeOff size={14} />}
        </button>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold truncate">{pair.title || "Sin título"}</p>
          {!isComplete && (
            <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "#f59e0b" }}>
              <AlertCircle size={10} /> Requiere título y ambas imágenes
            </p>
          )}
        </div>

        {/* Order buttons */}
        <div className="flex flex-col gap-0.5">
          <button onClick={onMoveUp} disabled={idx === 0}
            className="p-1 rounded text-gray-500 hover:text-white disabled:opacity-20 transition-colors">
            <ChevronUp size={12} />
          </button>
          <button onClick={onMoveDown} disabled={idx === total - 1}
            className="p-1 rounded text-gray-500 hover:text-white disabled:opacity-20 transition-colors">
            <ChevronDown size={12} />
          </button>
        </div>

        {/* Expand */}
        <button onClick={() => setExpanded(e => !e)}
          className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors">
          {expanded ? "Cerrar" : "Editar"}
        </button>

        {/* Delete */}
        <button onClick={onDelete}
          className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-colors">
          <Trash2 size={14} />
        </button>
      </div>

      {expanded && (
        <div className="border-t border-white/5 px-5 py-5 flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Título (EN)</label>
              <input value={pair.title} onChange={set("title")} className={inputCls} placeholder="Paint Correction" />
            </div>
            <div>
              <label className={labelCls}>Título (ES)</label>
              <input value={pair.titleEs} onChange={set("titleEs")} className={inputCls} placeholder="Corrección de Pintura" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Descripción (EN)</label>
              <textarea rows={2} value={pair.description} onChange={set("description")} className={inputCls} style={{ resize: "none" }} placeholder="Short description..." />
            </div>
            <div>
              <label className={labelCls}>Descripción (ES)</label>
              <textarea rows={2} value={pair.descriptionEs} onChange={set("descriptionEs")} className={inputCls} style={{ resize: "none" }} placeholder="Descripción corta..." />
            </div>
          </div>

          {/* Image URLs */}
          <div className="bg-[#0a0d14] rounded-lg p-4 flex flex-col gap-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">URLs de las imágenes</p>
            <div>
              <label className={labelCls}>URL — Imagen ANTES</label>
              <input
                value={pair.beforeSrc}
                onChange={set("beforeSrc")}
                className={inputCls}
                placeholder="https://... (URL de la imagen ANTES)"
              />
              {pair.beforeSrc && (
                <img src={pair.beforeSrc} alt="Before preview" className="mt-2 h-20 w-full object-cover rounded-lg" onError={e => ((e.currentTarget as HTMLImageElement).style.display = "none")} />
              )}
            </div>
            <div>
              <label className={labelCls}>URL — Imagen DESPUÉS</label>
              <input
                value={pair.afterSrc}
                onChange={set("afterSrc")}
                className={inputCls}
                placeholder="https://... (URL de la imagen DESPUÉS)"
              />
              {pair.afterSrc && (
                <img src={pair.afterSrc} alt="After preview" className="mt-2 h-20 w-full object-cover rounded-lg" onError={e => ((e.currentTarget as HTMLImageElement).style.display = "none")} />
              )}
            </div>
            <div className="rounded-lg p-3 text-xs" style={{ background: "rgba(79,126,184,0.08)", border: "1px solid rgba(79,126,184,0.20)", color: "#85CCFF" }}>
              💡 Sube las imágenes a un servicio de imágenes (Google Photos, Imgur, Cloudinary, etc.) y pega la URL aquí.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GalleryEditor() {
  const { content, setContent } = useContent();
  const pairs: Pair[] = ((content as any).beforeAfterPairs ?? []) as Pair[];

  const update = (updated: Pair[]) => {
    setContent({ ...content, beforeAfterPairs: updated } as any as SiteContent);
  };

  const addPair = () => {
    const p: Pair = {
      id: nextId++,
      title: "", titleEs: "",
      description: "", descriptionEs: "",
      beforeSrc: "", afterSrc: "",
      visible: true,
    };
    update([...pairs, p]);
  };

  const changePair = (idx: number, p: Pair) => {
    const next = [...pairs];
    next[idx] = p;
    update(next);
  };

  const deletePair = (idx: number) => update(pairs.filter((_, i) => i !== idx));
  const moveUp   = (idx: number) => { if (idx === 0) return; const a = [...pairs]; [a[idx-1], a[idx]] = [a[idx], a[idx-1]]; update(a); };
  const moveDown = (idx: number) => { if (idx === pairs.length - 1) return; const a = [...pairs]; [a[idx], a[idx+1]] = [a[idx+1], a[idx]]; update(a); };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Galería — Antes & Después</h1>
          <p className="text-gray-500 text-sm">Administra las comparaciones de antes y después</p>
        </div>
        <button onClick={addPair}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors"
          style={{ background: "#FF2534", color: "white" }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#b91c1c")}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#FF2534")}
        >
          <Plus size={14} /> Agregar comparación
        </button>
      </div>

      {/* Info about default pairs */}
      <div className="bg-[#111827] border border-white/10 rounded-xl p-5 mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Comparaciones predeterminadas</p>
        <p className="text-gray-400 text-sm leading-relaxed">
          Las primeras <strong className="text-white">2 comparaciones</strong> ("Paint Correction" e "Interior Detail") usan las imágenes de galería del sitio y siempre se muestran. Aquí puedes agregar comparaciones adicionales con tus propias imágenes.
        </p>
      </div>

      {/* User pairs */}
      {pairs.length === 0 ? (
        <div className="bg-[#111827] border border-dashed border-white/10 rounded-xl p-12 text-center">
          <Plus size={28} className="mx-auto mb-3 text-gray-700" />
          <p className="text-gray-500 text-sm">No has agregado comparaciones adicionales.</p>
          <p className="text-gray-600 text-xs mt-1">Haz clic en "Agregar comparación" para añadir tus propias fotos de antes y después.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {pairs.map((pair, idx) => (
            <PairCard
              key={pair.id}
              pair={pair}
              idx={idx}
              total={pairs.length}
              onChange={p => changePair(idx, p)}
              onDelete={() => deletePair(idx)}
              onMoveUp={() => moveUp(idx)}
              onMoveDown={() => moveDown(idx)}
            />
          ))}
        </div>
      )}

      <div className="mt-6 flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(214,28,35,0.07)", border: "1px solid rgba(214,28,35,0.20)" }}>
        <AlertCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
        <p className="text-gray-400 text-xs leading-relaxed">
          Recuerda hacer clic en <strong className="text-white">"Guardar Cambios"</strong> en la barra lateral para que los cambios se publiquen en el sitio.
          Las comparaciones sin título o sin las dos imágenes no aparecerán en el sitio.
        </p>
      </div>
    </div>
  );
}
