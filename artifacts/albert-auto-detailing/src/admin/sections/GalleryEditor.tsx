import { useState, useRef } from "react";
import { useContent } from "@/contexts/ContentContext";
import { Plus, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, AlertCircle, Upload, Link } from "lucide-react";
import type { SiteContent } from "@/lib/defaultContent";

export interface GalleryPair {
  id: string | number;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  beforeSrc: string;
  afterSrc: string;
  visible: boolean;
}

const DEFAULT_PAIRS: GalleryPair[] = [
  {
    id: "d1",
    title: "Engine Detail — Lexus",
    titleEs: "Detailing de Motor — Lexus",
    description: "Full engine bay degreasing and detail on a Lexus — restored to factory-clean condition.",
    descriptionEs: "Desengrase y detailing completo del compartimento del motor de un Lexus.",
    beforeSrc: "/gallery/gallery-lexus-before.png",
    afterSrc: "/gallery/gallery-lexus-after.png",
    visible: true,
  },
  {
    id: "d2",
    title: "Engine Detail — Honda",
    titleEs: "Detailing de Motor — Honda",
    description: "Honda CR-V engine bay deep cleaned — grease, grime, and buildup removed completely.",
    descriptionEs: "Limpieza profunda del motor de un Honda CR-V — grasa, suciedad y depósitos eliminados.",
    beforeSrc: "/gallery/gallery-honda-before.png",
    afterSrc: "/gallery/gallery-honda-after.png",
    visible: true,
  },
  {
    id: "d3",
    title: "Headlight Restoration",
    titleEs: "Restauración de Faros",
    description: "Foggy, oxidized headlights professionally restored to crystal-clear clarity.",
    descriptionEs: "Faros opacos y oxidados restaurados profesionalmente a una claridad de cristal.",
    beforeSrc: "/gallery/gallery-headlight-before.png",
    afterSrc: "/gallery/gallery-headlight-after.png",
    visible: true,
  },
];

let nextId = Date.now();

// ─── Image uploader ───────────────────────────────────────────────────────────
function ImageUploader({
  label,
  value,
  onChange,
  token,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  token: string | null;
}) {
  const [mode, setMode] = useState<"url" | "upload">("url");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const inputCls =
    "w-full bg-[#0a0d14] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-500 transition-colors placeholder-gray-600";

  const handleFile = async (file: File) => {
    if (!token) { setError("No has iniciado sesión"); return; }
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Error al subir");
      const { url } = await res.json();
      onChange(url);
    } catch (e: any) {
      setError(e.message ?? "Error al subir imagen");
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{label}</span>
        <div className="flex gap-1">
          <button
            onClick={() => setMode("url")}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold transition-colors ${mode === "url" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "text-gray-500 hover:text-white"}`}
          >
            <Link size={10} /> URL
          </button>
          <button
            onClick={() => setMode("upload")}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold transition-colors ${mode === "upload" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "text-gray-500 hover:text-white"}`}
          >
            <Upload size={10} /> Subir
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          className={inputCls}
          placeholder="https://..."
        />
      ) : (
        <div
          className="relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-white/15 p-5 text-center cursor-pointer hover:border-red-500/40 transition-colors"
          style={{ background: "rgba(10,13,20,0.6)" }}
          onDrop={onDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
          {uploading ? (
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              Subiendo...
            </div>
          ) : (
            <>
              <Upload size={20} className="text-gray-600" />
              <p className="text-gray-500 text-xs">Arrastra una imagen aquí o haz clic para seleccionar</p>
              <p className="text-gray-700 text-xs">JPG, PNG, WEBP · máx 12 MB</p>
            </>
          )}
        </div>
      )}

      {error && <p className="text-red-400 text-xs">{error}</p>}

      {value && (
        <img
          src={value}
          alt="Preview"
          className="h-20 w-full object-cover rounded-lg"
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      )}
    </div>
  );
}

// ─── Pair card ────────────────────────────────────────────────────────────────
function PairCard({
  pair, idx, total, token,
  onChange, onDelete, onMoveUp, onMoveDown,
}: {
  pair: GalleryPair; idx: number; total: number; token: string | null;
  onChange: (p: GalleryPair) => void; onDelete: () => void;
  onMoveUp: () => void; onMoveDown: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const set = (field: keyof GalleryPair) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...pair, [field]: e.target.value });

  const inputCls =
    "w-full bg-[#0a0d14] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-500 transition-colors placeholder-gray-600";
  const labelCls = "block text-xs font-bold tracking-widest uppercase mb-1.5 text-gray-500";

  const isComplete = pair.beforeSrc.trim() && pair.afterSrc.trim() && pair.title.trim();

  return (
    <div
      className={`bg-[#111827] border rounded-xl overflow-hidden transition-opacity ${
        pair.visible ? "border-white/10" : "border-white/5 opacity-60"
      }`}
    >
      {/* Header row */}
      <div className="flex items-center gap-3 px-5 py-4">
        <button
          onClick={() => onChange({ ...pair, visible: !pair.visible })}
          className={`p-1.5 rounded-lg transition-colors ${pair.visible ? "text-green-400 hover:bg-green-400/10" : "text-gray-600 hover:bg-white/5"}`}
          title={pair.visible ? "Ocultar" : "Mostrar"}
        >
          {pair.visible ? <Eye size={14} /> : <EyeOff size={14} />}
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold truncate">{pair.title || "Sin título"}</p>
          {!isComplete && (
            <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "#f59e0b" }}>
              <AlertCircle size={10} /> Requiere título y ambas imágenes
            </p>
          )}
        </div>

        <div className="flex flex-col gap-0.5">
          <button
            onClick={onMoveUp}
            disabled={idx === 0}
            className="p-1 rounded text-gray-500 hover:text-white disabled:opacity-20 transition-colors"
          >
            <ChevronUp size={12} />
          </button>
          <button
            onClick={onMoveDown}
            disabled={idx === total - 1}
            className="p-1 rounded text-gray-500 hover:text-white disabled:opacity-20 transition-colors"
          >
            <ChevronDown size={12} />
          </button>
        </div>

        <button
          onClick={() => setExpanded(e => !e)}
          className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors"
        >
          {expanded ? "Cerrar" : "Editar"}
        </button>

        <button
          onClick={onDelete}
          className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Expanded editor */}
      {expanded && (
        <div className="border-t border-white/5 px-5 py-5 flex flex-col gap-5">
          {/* Titles */}
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

          {/* Descriptions */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Descripción (EN)</label>
              <textarea
                rows={2}
                value={pair.description}
                onChange={set("description")}
                className={inputCls}
                style={{ resize: "none" }}
                placeholder="Short description..."
              />
            </div>
            <div>
              <label className={labelCls}>Descripción (ES)</label>
              <textarea
                rows={2}
                value={pair.descriptionEs}
                onChange={set("descriptionEs")}
                className={inputCls}
                style={{ resize: "none" }}
                placeholder="Descripción corta..."
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-[#0a0d14] rounded-xl p-4 flex flex-col gap-5">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Imágenes</p>
            <ImageUploader
              label="Foto — ANTES"
              value={pair.beforeSrc}
              onChange={url => onChange({ ...pair, beforeSrc: url })}
              token={token}
            />
            <div className="h-px bg-white/5" />
            <ImageUploader
              label="Foto — DESPUÉS"
              value={pair.afterSrc}
              onChange={url => onChange({ ...pair, afterSrc: url })}
              token={token}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main editor ─────────────────────────────────────────────────────────────
export default function GalleryEditor() {
  const { content, setContent, token } = useContent();

  const rawPairs: GalleryPair[] | undefined = (content as any).beforeAfterPairs;
  const pairs: GalleryPair[] = rawPairs ?? DEFAULT_PAIRS;

  const update = (updated: GalleryPair[]) => {
    setContent({ ...content, beforeAfterPairs: updated } as any as SiteContent);
  };

  const addPair = () => {
    const p: GalleryPair = {
      id: nextId++,
      title: "",
      titleEs: "",
      description: "",
      descriptionEs: "",
      beforeSrc: "",
      afterSrc: "",
      visible: true,
    };
    update([...pairs, p]);
  };

  const changePair = (idx: number, p: GalleryPair) => {
    const next = [...pairs];
    next[idx] = p;
    update(next);
  };

  const deletePair = (idx: number) => update(pairs.filter((_, i) => i !== idx));

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const a = [...pairs];
    [a[idx - 1], a[idx]] = [a[idx], a[idx - 1]];
    update(a);
  };

  const moveDown = (idx: number) => {
    if (idx === pairs.length - 1) return;
    const a = [...pairs];
    [a[idx], a[idx + 1]] = [a[idx + 1], a[idx]];
    update(a);
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Galería — Antes & Después</h1>
          <p className="text-gray-500 text-sm">Edita, agrega o elimina comparaciones de antes y después</p>
        </div>
        <button
          onClick={addPair}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors"
          style={{ background: "#FF2534", color: "white" }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#b91c1c")}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#FF2534")}
        >
          <Plus size={14} /> Agregar comparación
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {pairs.map((pair, idx) => (
          <PairCard
            key={String(pair.id)}
            pair={pair}
            idx={idx}
            total={pairs.length}
            token={token}
            onChange={p => changePair(idx, p)}
            onDelete={() => deletePair(idx)}
            onMoveUp={() => moveUp(idx)}
            onMoveDown={() => moveDown(idx)}
          />
        ))}
      </div>

      <div
        className="mt-6 flex items-start gap-3 p-4 rounded-xl"
        style={{ background: "rgba(214,28,35,0.07)", border: "1px solid rgba(214,28,35,0.20)" }}
      >
        <AlertCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
        <p className="text-gray-400 text-xs leading-relaxed">
          Recuerda hacer clic en <strong className="text-white">"Guardar Cambios"</strong> en la barra lateral para
          que los cambios se publiquen en el sitio. Las comparaciones sin título o sin las dos imágenes no aparecerán.
        </p>
      </div>
    </div>
  );
}
