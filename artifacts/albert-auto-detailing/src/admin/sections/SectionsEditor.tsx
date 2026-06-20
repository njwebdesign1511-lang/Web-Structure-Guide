import { useContent } from "@/contexts/ContentContext";
import { ToggleLeft, ToggleRight } from "lucide-react";

const sectionLabels: Record<string, string> = {
  hero: "Hero / Inicio",
  promotions: "Promociones",
  about: "Sobre Nosotros",
  services: "Servicios",
  mobileService: "Servicio Movil",
  whyUs: "Por Que Elegirnos",
  gallery: "Galeria / Antes & Despues",
  testimonials: "Testimonios",
  faq: "Preguntas Frecuentes (FAQ)",
  quoteForm: "Formulario de Cotizacion",
  contact: "Contacto",
  location: "Mapa / Ubicacion",
};

export default function SectionsEditor() {
  const { content, setContent } = useContent();

  const toggle = (key: string) => {
    const next = structuredClone(content);
    (next.sections as any)[key] = !(next.sections as any)[key];
    setContent(next);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Secciones</h1>
      <p className="text-gray-500 text-sm mb-6">Activa o desactiva las secciones de tu pagina</p>

      <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden">
        {Object.entries(sectionLabels).map(([key, label], i) => {
          const isOn = (content.sections as any)[key] ?? true;
          const isHero = key === "hero";
          return (
            <div
              key={key}
              className={`flex items-center justify-between px-6 py-4 ${i !== 0 ? "border-t border-white/5" : ""} ${!isOn ? "opacity-50" : ""}`}
            >
              <div>
                <span className="text-white font-medium text-sm">{label}</span>
                {isHero && <span className="ml-2 text-xs text-gray-500">(siempre visible)</span>}
              </div>
              <button
                onClick={() => !isHero && toggle(key)}
                disabled={isHero}
                className={`transition-colors disabled:cursor-default ${isOn ? "text-green-400" : "text-gray-600"}`}
              >
                {isOn ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 bg-blue-500/5 border border-blue-500/20 text-blue-400 text-xs rounded-xl p-4">
        Los cambios se aplican a la pagina cuando presionas "Guardar Cambios".
      </div>
    </div>
  );
}
