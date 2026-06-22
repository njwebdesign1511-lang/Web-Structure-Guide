import { useEffect, useState } from "react";
import { useContent } from "@/contexts/ContentContext";
import { Star, Trash2, Eye, EyeOff, RefreshCw } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  service: string | null;
  comment: string;
  visible: boolean;
  createdAt: string;
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} style={{ fill: i < n ? "#D61C23" : "transparent", color: "#D61C23" }} />
      ))}
    </div>
  );
}

export default function ReviewsManager() {
  const { token } = useContent();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/reviews/all", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setReviews)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const toggleVisible = async (id: number, visible: boolean) => {
    await fetch(`/api/reviews/${id}/visibility`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ visible }),
    });
    setReviews(r => r.map(x => x.id === id ? { ...x, visible } : x));
  };

  const remove = async (id: number) => {
    await fetch(`/api/reviews/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    setReviews(r => r.filter(x => x.id !== id));
    setConfirm(null);
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Reseñas de Clientes</h1>
          <p className="text-gray-500 text-sm">Administra las reseñas enviadas por los visitantes</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 border border-white/10 hover:border-white/30 text-gray-400 hover:text-white text-sm px-3 py-2 rounded-lg transition-colors">
          <RefreshCw size={13} /> Actualizar
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total", val: reviews.length },
          { label: "Visibles", val: reviews.filter(r => r.visible).length },
          { label: "Ocultas", val: reviews.filter(r => !r.visible).length },
        ].map(s => (
          <div key={s.label} className="bg-[#111827] border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{s.val}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500 text-sm">Cargando...</div>
      ) : reviews.length === 0 ? (
        <div className="bg-[#111827] border border-dashed border-white/10 rounded-xl p-12 text-center">
          <Star size={32} className="mx-auto mb-3 text-gray-700" />
          <p className="text-gray-500 text-sm">No hay reseñas todavía.</p>
          <p className="text-gray-600 text-xs mt-1">Las reseñas enviadas por clientes aparecerán aquí.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {reviews.map(r => (
            <div key={r.id} className={`bg-[#111827] border rounded-xl p-5 transition-all ${r.visible ? "border-white/10" : "border-white/5 opacity-60"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <div className="w-7 h-7 rounded-full bg-red-600/15 flex items-center justify-center text-red-400 text-xs font-bold shrink-0">
                      {r.name[0]?.toUpperCase()}
                    </div>
                    <span className="text-white font-semibold text-sm">{r.name}</span>
                    <Stars n={r.rating} />
                    {r.service && (
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(79,126,184,0.15)", color: "#6FB5FF" }}>
                        {r.service}
                      </span>
                    )}
                    {!r.visible && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-400">Oculta</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm italic leading-relaxed">"{r.comment}"</p>
                  <p className="text-gray-600 text-xs mt-2">
                    {new Date(r.createdAt).toLocaleDateString("es-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleVisible(r.id, !r.visible)}
                    title={r.visible ? "Ocultar" : "Mostrar"}
                    className={`p-2 rounded-lg transition-colors ${r.visible ? "text-green-400 hover:bg-green-400/10" : "text-gray-500 hover:bg-white/5"}`}
                  >
                    {r.visible ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                  {confirm === r.id ? (
                    <div className="flex gap-1">
                      <button onClick={() => remove(r.id)} className="text-xs bg-red-600 text-white px-2 py-1 rounded">Eliminar</button>
                      <button onClick={() => setConfirm(null)} className="text-xs text-gray-400 px-2 py-1">Cancelar</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirm(r.id)} className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
