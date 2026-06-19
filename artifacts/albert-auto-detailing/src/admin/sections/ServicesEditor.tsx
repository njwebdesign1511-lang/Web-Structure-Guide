import { useContent } from "@/contexts/ContentContext";
import { GripVertical, Trash2, Plus, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

export default function ServicesEditor() {
  const { content, setContent } = useContent();
  const [confirm, setConfirm] = useState<number | null>(null);

  const update = (i: number, field: string, value: any) => {
    const next = structuredClone(content);
    (next.services.items[i] as any)[field] = value;
    setContent(next);
  };

  const addService = () => {
    const next = structuredClone(content);
    next.services.items.push({ title: "Nuevo Servicio", description: "Descripcion del servicio.", active: true });
    setContent(next);
  };

  const deleteService = (i: number) => {
    const next = structuredClone(content);
    next.services.items.splice(i, 1);
    setContent(next);
    setConfirm(null);
  };

  const moveUp = (i: number) => {
    if (i === 0) return;
    const next = structuredClone(content);
    [next.services.items[i - 1], next.services.items[i]] = [next.services.items[i], next.services.items[i - 1]];
    setContent(next);
  };

  const moveDown = (i: number) => {
    if (i === content.services.items.length - 1) return;
    const next = structuredClone(content);
    [next.services.items[i + 1], next.services.items[i]] = [next.services.items[i], next.services.items[i + 1]];
    setContent(next);
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Servicios</h1>
          <p className="text-gray-500 text-sm">Administra los servicios que aparecen en tu pagina</p>
        </div>
        <button
          onClick={addService}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={14} /> Agregar
        </button>
      </div>

      <div className="bg-[#111827] border border-white/10 rounded-xl p-4 mb-4">
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Titulo de la seccion</label>
          <input
            type="text"
            value={content.services.heading}
            onChange={(e) => {
              const next = structuredClone(content);
              next.services.heading = e.target.value;
              setContent(next);
            }}
            className="bg-[#0a0d14] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {content.services.items.map((item, i) => (
          <div key={i} className={`bg-[#111827] border rounded-xl p-5 transition-colors ${item.active ? "border-white/10" : "border-white/5 opacity-60"}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex flex-col gap-1">
                <button onClick={() => moveUp(i)} disabled={i === 0} className="text-gray-500 hover:text-white disabled:opacity-20 text-xs leading-none">▲</button>
                <button onClick={() => moveDown(i)} disabled={i === content.services.items.length - 1} className="text-gray-500 hover:text-white disabled:opacity-20 text-xs leading-none">▼</button>
              </div>
              <div className="w-7 h-7 bg-red-600/20 rounded-full flex items-center justify-center text-red-400 text-xs font-bold shrink-0">{i + 1}</div>
              <div className="flex-1">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => update(i, "title", e.target.value)}
                  className="w-full bg-transparent text-white font-semibold text-sm focus:outline-none border-b border-transparent focus:border-red-500 pb-0.5 transition-colors"
                />
              </div>
              <button
                onClick={() => update(i, "active", !item.active)}
                className={`shrink-0 ${item.active ? "text-green-400" : "text-gray-600"}`}
                title={item.active ? "Desactivar" : "Activar"}
              >
                {item.active ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
              </button>
              {confirm === i ? (
                <div className="flex gap-1">
                  <button onClick={() => deleteService(i)} className="text-xs bg-red-600 text-white px-2 py-1 rounded">Eliminar</button>
                  <button onClick={() => setConfirm(null)} className="text-xs text-gray-400 px-2 py-1">Cancelar</button>
                </div>
              ) : (
                <button onClick={() => setConfirm(i)} className="text-gray-500 hover:text-red-400 shrink-0">
                  <Trash2 size={15} />
                </button>
              )}
            </div>
            <textarea
              value={item.description}
              onChange={(e) => update(i, "description", e.target.value)}
              rows={2}
              className="w-full bg-[#0a0d14] border border-white/10 rounded-lg px-3 py-2 text-gray-400 text-sm focus:outline-none focus:border-red-500 resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
