import { useEffect, useState } from "react";
import { useContent } from "@/contexts/ContentContext";
import { Users, Phone, Mail, Car, Calendar, RefreshCw, Download } from "lucide-react";

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  vehicle: string | null;
  service: string | null;
  preferredDate: string | null;
  message: string | null;
  lang: string | null;
  createdAt: string;
}

interface Stats {
  total: number;
  recent: Lead[];
}

export default function LeadsManager() {
  const { token } = useContent();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/leads/stats", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("es-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Formularios Recibidos</h1>
          <p className="text-gray-500 text-sm">Solicitudes enviadas a través del formulario de cotización</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 border border-white/10 hover:border-white/30 text-gray-400 hover:text-white text-sm px-3 py-2 rounded-lg transition-colors">
          <RefreshCw size={13} /> Actualizar
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: Users, label: "Leads totales", val: stats?.total ?? "—", color: "#FF2534" },
          { icon: Phone, label: "Recientes", val: stats?.recent?.length ?? "—", color: "#4a7fc1" },
          { icon: Car, label: "Con vehículo", val: stats?.recent?.filter(l => l.vehicle)?.length ?? "—", color: "#89abda" },
          { icon: Mail, label: "Con email", val: stats?.recent?.filter(l => l.email)?.length ?? "—", color: "#4a7fc1" },
        ].map(({ icon: Icon, label, val, color }) => (
          <div key={label} className="bg-[#111827] border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon size={14} style={{ color }} />
              <span className="text-xs text-gray-500">{label}</span>
            </div>
            <div className="text-2xl font-bold text-white">{loading ? "—" : val}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500 text-sm">Cargando...</div>
      ) : !stats || stats.recent.length === 0 ? (
        <div className="bg-[#111827] border border-dashed border-white/10 rounded-xl p-12 text-center">
          <Users size={32} className="mx-auto mb-3 text-gray-700" />
          <p className="text-gray-500 text-sm">No hay leads registrados todavía.</p>
          <p className="text-gray-600 text-xs mt-1">Las solicitudes del formulario aparecerán aquí.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Últimas solicitudes</p>
            <p className="text-xs text-gray-600">Mostrando {stats.recent.length} de {stats.total}</p>
          </div>
          {stats.recent.map(lead => (
            <div
              key={lead.id}
              className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden transition-all"
            >
              <button
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/3 transition-colors"
                onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
              >
                <div className="w-9 h-9 rounded-full bg-red-600/15 flex items-center justify-center text-red-400 font-bold text-sm shrink-0">
                  {lead.name[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm">{lead.name}</p>
                  <p className="text-gray-500 text-xs truncate">{lead.service ?? "Sin servicio especificado"}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-gray-400 text-xs">{lead.phone}</p>
                  <p className="text-gray-600 text-xs">{fmt(lead.createdAt)}</p>
                </div>
              </button>

              {expanded === lead.id && (
                <div className="border-t border-white/5 p-4 grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Teléfono", val: lead.phone, href: `tel:${lead.phone.replace(/\D/g, "")}` },
                    { label: "Email", val: lead.email, href: lead.email ? `mailto:${lead.email}` : undefined },
                    { label: "Vehículo", val: lead.vehicle },
                    { label: "Servicio", val: lead.service },
                    { label: "Fecha preferida", val: lead.preferredDate },
                    { label: "Idioma", val: lead.lang === "es" ? "Español" : "English" },
                  ].map(({ label, val, href }) => val ? (
                    <div key={label} className="bg-[#0a0d14] rounded-lg p-3">
                      <p className="text-gray-600 text-xs mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-medium" style={{ color: "#89abda" }}>{val}</a>
                      ) : (
                        <p className="text-white text-sm font-medium">{val}</p>
                      )}
                    </div>
                  ) : null)}
                  {lead.message && (
                    <div className="sm:col-span-2 bg-[#0a0d14] rounded-lg p-3">
                      <p className="text-gray-600 text-xs mb-0.5">Mensaje</p>
                      <p className="text-gray-300 text-sm">{lead.message}</p>
                    </div>
                  )}
                  <div className="sm:col-span-2 flex gap-2 mt-1">
                    <a
                      href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=Hola ${encodeURIComponent(lead.name)}, gracias por tu solicitud en Albert Auto Detailing.`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                      style={{ background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.25)", color: "#25D366" }}
                    >
                      <Phone size={12} /> Responder por WhatsApp
                    </a>
                    {lead.email && (
                      <a
                        href={`mailto:${lead.email}?subject=Albert Auto Detailing - Tu solicitud`}
                        className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-colors border border-white/10 text-gray-400 hover:text-white"
                      >
                        <Mail size={12} /> Email
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
