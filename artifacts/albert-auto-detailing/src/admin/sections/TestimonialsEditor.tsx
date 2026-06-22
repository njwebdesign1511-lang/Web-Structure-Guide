import { useContent } from "@/contexts/ContentContext";
import { Plus, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import type { SiteContent } from "@/lib/defaultContent";

type Testimonial = { name: string; comment: string; service?: string; active: boolean };

export default function TestimonialsEditor() {
  const { content, setContent } = useContent();
  const [confirm, setConfirm] = useState<number | null>(null);

  const testimonials = ((content as any).testimonials as Testimonial[]) ?? [];

  const save = (items: Testimonial[]) => {
    const next = structuredClone(content) as any;
    next.testimonials = items;
    setContent(next as SiteContent);
  };

  const add = () => {
    save([...testimonials, { name: "Nombre del Cliente", comment: "Excelente servicio, muy profesional.", service: "", active: true }]);
  };

  const update = (i: number, field: string, value: any) => {
    const next = [...testimonials];
    (next[i] as any)[field] = value;
    save(next);
  };

  const remove = (i: number) => {
    const next = [...testimonials];
    next.splice(i, 1);
    save(next);
    setConfirm(null);
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Testimonios</h1>
          <p className="text-gray-500 text-sm">Agrega comentarios de clientes satisfechos</p>
        </div>
        <button
          onClick={add}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg"
        >
          <Plus size={14} /> Agregar
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-[#111827] border border-dashed border-white/10 rounded-xl p-12 text-center">
          <p className="text-gray-500 text-sm mb-4">No hay testimonios todavia</p>
          <button onClick={add} className="text-red-500 hover:text-red-400 text-sm font-bold">
            + Agregar primer testimonio
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {testimonials.map((t, i) => (
            <div key={i} className={`bg-[#111827] border rounded-xl p-5 transition-colors ${t.active ? "border-white/10" : "border-white/5 opacity-60"}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-red-600/20 rounded-full flex items-center justify-center text-red-400 text-xs font-bold shrink-0">
                  {t.name[0]?.toUpperCase() || "?"}
                </div>
                <input
                  type="text"
                  value={t.name}
                  onChange={(e) => update(i, "name", e.target.value)}
                  className="flex-1 bg-transparent text-white font-semibold text-sm focus:outline-none border-b border-transparent focus:border-red-500 pb-0.5"
                  placeholder="Nombre del cliente"
                />
                <button
                  onClick={() => update(i, "active", !t.active)}
                  className={t.active ? "text-green-400" : "text-gray-600"}
                >
                  {t.active ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                </button>
                {confirm === i ? (
                  <div className="flex gap-1">
                    <button onClick={() => remove(i)} className="text-xs bg-red-600 text-white px-2 py-1 rounded">Eliminar</button>
                    <button onClick={() => setConfirm(null)} className="text-xs text-gray-400 px-2 py-1">Cancelar</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirm(i)} className="text-gray-500 hover:text-red-400">
                    <Trash2 size={15} />
                  </button>
                )}
              </div>

              {/* Service performed */}
              <input
                type="text"
                value={t.service ?? ""}
                onChange={(e) => update(i, "service", e.target.value)}
                className="w-full bg-[#0a0d14] border border-white/10 rounded-lg px-3 py-2 text-gray-400 text-sm focus:outline-none focus:border-red-500 mb-2"
                placeholder="Servicio realizado (ej: Ceramic Coating, Paint Correction...)"
              />

              <textarea
                value={t.comment}
                onChange={(e) => update(i, "comment", e.target.value)}
                rows={2}
                className="w-full bg-[#0a0d14] border border-white/10 rounded-lg px-3 py-2 text-gray-400 text-sm focus:outline-none focus:border-red-500 resize-none"
                placeholder="Comentario del cliente..."
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
