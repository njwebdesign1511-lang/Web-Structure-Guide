import { useState } from "react";
import { useContent } from "@/contexts/ContentContext";
import {
  LayoutDashboard, Type, Settings, Phone, Layers,
  Star, Palette, LogOut, Menu, X, ExternalLink,
  ChevronRight, Globe, Zap, MessageSquare, FileText,
} from "lucide-react";

export type AdminSection =
  | "dashboard"
  | "texts"
  | "services"
  | "contact"
  | "sections"
  | "testimonials"
  | "gallery"
  | "reviews"
  | "leads"
  | "seo"
  | "automations"
  | "style";

interface NavItem { id: AdminSection; label: string; icon: any; badge?: string }

const groups: { label: string; items: NavItem[] }[] = [
  {
    label: "Principal",
    items: [
      { id: "dashboard",    label: "Dashboard",        icon: LayoutDashboard },
    ],
  },
  {
    label: "Contenido",
    items: [
      { id: "texts",        label: "Página Principal", icon: Type },
      { id: "services",     label: "Servicios",        icon: Settings },
      { id: "gallery",      label: "Galería",          icon: MessageSquare },
      { id: "testimonials", label: "Testimonios",      icon: Star },
      { id: "sections",     label: "Secciones",        icon: Layers },
      { id: "style",        label: "Estilo",           icon: Palette },
    ],
  },
  {
    label: "Clientes",
    items: [
      { id: "reviews",      label: "Reseñas",          icon: Star },
      { id: "leads",        label: "Formularios",      icon: FileText },
    ],
  },
  {
    label: "Marketing",
    items: [
      { id: "seo",          label: "SEO",              icon: Globe },
      { id: "automations",  label: "Automatizaciones", icon: Zap },
    ],
  },
  {
    label: "Ajustes",
    items: [
      { id: "contact",      label: "Contacto",         icon: Phone },
    ],
  },
];

interface Props { active: AdminSection; onChange: (s: AdminSection) => void }

export default function AdminNav({ active, onChange }: Props) {
  const { logout, saving, saved, saveContent, content } = useContent();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSave = async () => { await saveContent(content); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-5 mb-2" style={{ borderBottom: "1px solid rgba(74,127,193,0.12)" }}>
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(137,171,218,0.55)" }}>Admin Panel</p>
        </div>
        <h2 className="text-white font-bold text-base leading-tight">
          Albert <span style={{ color: "#FF2534" }}>Auto</span> Detailing
        </h2>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {groups.map(group => (
          <div key={group.label} className="mb-4">
            <p className="text-xs font-bold tracking-widest uppercase px-2 mb-1.5" style={{ color: "rgba(74,127,193,0.55)" }}>
              {group.label}
            </p>
            {group.items.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => { onChange(id); setMobileOpen(false); }}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-0.5"
                  style={isActive ? {
                    background: "rgba(214,28,35,0.12)",
                    color: "#ff6b6e",
                    border: "1px solid rgba(214,28,35,0.25)",
                  } : {
                    color: "rgba(156,163,175,1)",
                    border: "1px solid transparent",
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)"; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                  <Icon size={15} />
                  <span className="flex-1 text-left">{label}</span>
                  {isActive && <ChevronRight size={13} style={{ color: "#FF2534" }} />}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer actions */}
      <div className="px-3 py-4" style={{ borderTop: "1px solid rgba(74,127,193,0.12)" }}>
        {saved && (
          <div className="text-center text-xs font-medium py-1.5 rounded-lg mb-2" style={{ color: "#4ade80", background: "rgba(74,222,128,0.08)" }}>
            ✓ Guardado correctamente
          </div>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 w-full font-bold text-xs tracking-widest uppercase py-3 rounded-lg transition-all mb-2 disabled:opacity-50"
          style={{ background: "#FF2534", color: "white" }}
          onMouseEnter={e => { if (!saving) (e.currentTarget as HTMLButtonElement).style.background = "#b91c1c"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#FF2534"; }}
        >
          {saving ? "Guardando..." : "Guardar Cambios"}
        </button>
        <div className="flex gap-2">
          <a
            href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 flex-1 border text-xs font-medium py-2 rounded-lg transition-colors"
            style={{ borderColor: "rgba(74,127,193,0.25)", color: "rgba(137,171,218,0.75)" }}
          >
            <ExternalLink size={11} /> Ver Sitio
          </a>
          <button
            onClick={logout}
            className="flex items-center justify-center gap-1.5 flex-1 border text-xs font-medium py-2 rounded-lg transition-colors"
            style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(156,163,175,0.7)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#f87171"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(156,163,175,0.7)"; }}
          >
            <LogOut size={11} /> Salir
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col w-60 min-h-screen shrink-0"
        style={{ background: "#0d1117", borderRight: "1px solid rgba(74,127,193,0.12)" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile topbar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14"
        style={{ background: "#0d1117", borderBottom: "1px solid rgba(74,127,193,0.12)" }}
      >
        <h2 className="text-white font-bold text-sm">Albert <span style={{ color: "#FF2534" }}>Admin</span></h2>
        <div className="flex items-center gap-2">
          {saved && <span className="text-xs font-medium" style={{ color: "#4ade80" }}>✓ Guardado</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-white text-xs font-bold px-3 py-1.5 rounded-lg disabled:opacity-50"
            style={{ background: "#FF2534" }}
          >
            {saving ? "..." : "Guardar"}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-1">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 pt-14">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 h-full" style={{ background: "#0d1117" }}>
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
