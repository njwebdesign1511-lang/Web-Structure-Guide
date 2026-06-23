import { useContent } from "@/contexts/ContentContext";
import { Settings, Phone, Type, Layers, Star, Palette, ExternalLink, TrendingUp, FileText, Users, Mail } from "lucide-react";
import type { AdminSection } from "../components/AdminNav";
import { useEffect, useState } from "react";

interface Props {
  onNavigate: (s: AdminSection) => void;
}

interface LeadsStats {
  total: number;
  recent: Array<{
    id: number;
    name: string;
    phone: string;
    email: string | null;
    service: string | null;
    vehicle: string | null;
    createdAt: string;
  }>;
}

export default function Dashboard({ onNavigate }: Props) {
  const { content, token, saved } = useContent();
  const [stats, setStats] = useState<LeadsStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch("/api/leads/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setStats(data); })
      .catch(() => {})
      .finally(() => setStatsLoading(false));
  }, [token]);

  const cards = [
    { id: "texts" as AdminSection, icon: Type, label: "Textos", desc: "Hero, About, secciones" },
    { id: "services" as AdminSection, icon: Settings, label: "Servicios", desc: `${content.services.items.length} servicios` },
    { id: "contact" as AdminSection, icon: Phone, label: "Contacto", desc: content.contact.phone || "Sin telefono" },
    { id: "sections" as AdminSection, icon: Layers, label: "Secciones", desc: "Activar / desactivar" },
    { id: "testimonials" as AdminSection, icon: Star, label: "Testimonios", desc: "Agregar y editar" },
    { id: "style" as AdminSection, icon: Palette, label: "Estilo", desc: "Colores y fuentes" },
  ];

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-gray-500 text-sm">Administra tu pagina web desde aqui</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-white/10 hover:border-white/30 text-gray-400 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <ExternalLink size={14} /> Ver Pagina
        </a>
      </div>

      {saved && (
        <div className="mb-6 bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium px-4 py-3 rounded-lg">
          Cambios guardados correctamente
        </div>
      )}

      {/* Leads / Stats Panel */}
      <div className="bg-[#111827] border border-white/10 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={16} className="text-red-500" />
          <h2 className="text-white font-semibold">Estadísticas de Leads</h2>
        </div>
        <p className="text-gray-500 text-xs mb-5">Solicitudes recibidas a través del formulario de cotización</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0a0d14] rounded-lg p-4 text-center border border-white/5">
            <div className="text-2xl font-bold text-white">
              {statsLoading ? "—" : (stats?.total ?? 0)}
            </div>
            <div className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
              <Users size={11} /> Leads totales
            </div>
          </div>
          <div className="bg-[#0a0d14] rounded-lg p-4 text-center border border-white/5">
            <div className="text-2xl font-bold text-white">
              {statsLoading ? "—" : (stats?.recent?.length ?? 0)}
            </div>
            <div className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
              <FileText size={11} /> Recientes
            </div>
          </div>
          <div className="bg-[#0a0d14] rounded-lg p-4 text-center border border-white/5">
            <div className="text-2xl font-bold" style={{ color: "#FF2534" }}>
              {content.contact.phone ? "✓" : "—"}
            </div>
            <div className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
              <Phone size={11} /> WhatsApp activo
            </div>
          </div>
          <div className="bg-[#0a0d14] rounded-lg p-4 text-center border border-white/5">
            <div className="text-2xl font-bold" style={{ color: "#1460a0" }}>
              {content.contact.email ? "✓" : "—"}
            </div>
            <div className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
              <Mail size={11} /> Email configurado
            </div>
          </div>
        </div>

        {/* Recent leads table */}
        {!statsLoading && stats && stats.recent.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Últimas solicitudes</p>
            <div className="flex flex-col gap-2">
              {stats.recent.map(lead => (
                <div
                  key={lead.id}
                  className="flex items-center gap-3 bg-[#0a0d14] rounded-lg px-4 py-3 border border-white/5"
                >
                  <div className="w-8 h-8 rounded-full bg-red-600/15 flex items-center justify-center text-red-400 text-xs font-bold shrink-0">
                    {lead.name[0]?.toUpperCase() ?? "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{lead.name}</p>
                    <p className="text-gray-500 text-xs truncate">{lead.service ?? "Sin servicio especificado"}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-gray-400 text-xs">{lead.phone}</p>
                    <p className="text-gray-600 text-xs">
                      {new Date(lead.createdAt).toLocaleDateString("es-US", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!statsLoading && stats && stats.total === 0 && (
          <p className="text-center text-gray-600 text-sm py-4">
            Aún no hay leads registrados. Las solicitudes del formulario aparecerán aquí.
          </p>
        )}
      </div>

      {/* Nav cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map(({ id, icon: Icon, label, desc }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className="bg-[#111827] border border-white/10 hover:border-red-500/40 p-6 rounded-xl text-left group transition-all"
          >
            <div className="w-10 h-10 bg-red-600/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600/20 transition-colors">
              <Icon size={18} className="text-red-500" />
            </div>
            <h3 className="text-white font-semibold mb-1">{label}</h3>
            <p className="text-gray-500 text-xs">{desc}</p>
          </button>
        ))}
      </div>

      {/* Site quick stats */}
      <div className="bg-[#111827] border border-white/10 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-1">Vista rapida del sitio</h2>
        <p className="text-gray-500 text-xs mb-4">Resumen del contenido actual</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0a0d14] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{content.services.items.filter(s => s.active).length}</div>
            <div className="text-xs text-gray-500 mt-1">Servicios activos</div>
          </div>
          <div className="bg-[#0a0d14] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{Object.values(content.sections).filter(Boolean).length}</div>
            <div className="text-xs text-gray-500 mt-1">Secciones visibles</div>
          </div>
          <div className="bg-[#0a0d14] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{content.contact.phone ? "Si" : "No"}</div>
            <div className="text-xs text-gray-500 mt-1">Telefono configurado</div>
          </div>
          <div className="bg-[#0a0d14] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{content.contact.instagram ? "Si" : "No"}</div>
            <div className="text-xs text-gray-500 mt-1">Instagram conectado</div>
          </div>
        </div>
      </div>
    </div>
  );
}
