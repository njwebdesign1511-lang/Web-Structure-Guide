import { useState } from "react";
import { useContent } from "@/contexts/ContentContext";
import {
  LayoutDashboard, Type, Image, Phone, Settings, Layers,
  Star, Palette, LogOut, Menu, X, ExternalLink,
  ChevronRight,
} from "lucide-react";

export type AdminSection =
  | "dashboard"
  | "texts"
  | "services"
  | "contact"
  | "sections"
  | "testimonials"
  | "style";

interface Props {
  active: AdminSection;
  onChange: (s: AdminSection) => void;
}

const nav: { id: AdminSection; label: string; icon: any }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "texts", label: "Textos", icon: Type },
  { id: "services", label: "Servicios", icon: Settings },
  { id: "contact", label: "Contacto", icon: Phone },
  { id: "sections", label: "Secciones", icon: Layers },
  { id: "testimonials", label: "Testimonios", icon: Star },
  { id: "style", label: "Estilo", icon: Palette },
];

export default function AdminNav({ active, onChange }: Props) {
  const { logout, saving, saved, saveContent, content } = useContent();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSave = async () => {
    await saveContent(content);
  };

  const NavItems = () => (
    <>
      {nav.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => { onChange(id); setMobileOpen(false); }}
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
            active === id
              ? "bg-red-600/20 text-red-400 border border-red-600/30"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Icon size={16} />
          {label}
          {active === id && <ChevronRight size={14} className="ml-auto" />}
        </button>
      ))}
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-[#111827] border-r border-white/10 p-4 shrink-0">
        <div className="mb-8 px-2">
          <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-1">Admin Panel</p>
          <h2 className="text-white font-bold text-lg leading-tight">Albert Auto<span className="text-red-500"> Detailing</span></h2>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          <NavItems />
        </nav>

        <div className="mt-8 flex flex-col gap-2 pt-4 border-t border-white/10">
          {saved && (
            <div className="text-center text-xs text-green-400 font-medium py-1 bg-green-400/10 rounded-lg">
              Guardado correctamente
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs tracking-widest uppercase py-3 rounded-lg transition-colors"
          >
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full border border-white/10 hover:border-white/30 text-gray-400 hover:text-white font-medium text-xs tracking-widest uppercase py-2.5 rounded-lg transition-colors"
          >
            <ExternalLink size={13} /> Ver Pagina
          </a>
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full text-gray-500 hover:text-red-400 text-xs font-medium py-2 transition-colors"
          >
            <LogOut size={13} /> Cerrar Sesion
          </button>
        </div>
      </aside>

      {/* Mobile topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#111827] border-b border-white/10 flex items-center justify-between px-4 h-14">
        <h2 className="text-white font-bold text-sm">Albert <span className="text-red-500">Admin</span></h2>
        <div className="flex items-center gap-2">
          {saved && <span className="text-green-400 text-xs">Guardado</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
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
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="relative bg-[#111827] w-72 h-full p-4 flex flex-col">
            <nav className="flex flex-col gap-1 flex-1 mt-4">
              <NavItems />
            </nav>
            <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
              <a href="/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 text-sm py-2 px-2">
                <ExternalLink size={14} /> Ver Pagina
              </a>
              <button onClick={logout} className="flex items-center gap-2 text-red-400 text-sm py-2 px-2">
                <LogOut size={14} /> Cerrar Sesion
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
