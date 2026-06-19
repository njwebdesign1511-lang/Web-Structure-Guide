import { useContent } from "@/contexts/ContentContext";
import { Eye, Settings, Phone, Type, Layers, Star, Palette, ExternalLink } from "lucide-react";
import type { AdminSection } from "../components/AdminNav";

interface Props {
  onNavigate: (s: AdminSection) => void;
}

export default function Dashboard({ onNavigate }: Props) {
  const { content, saveContent, saving, saved } = useContent();

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
