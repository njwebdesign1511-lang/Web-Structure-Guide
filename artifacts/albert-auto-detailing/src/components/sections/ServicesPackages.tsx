import { motion, type Variants } from "framer-motion";
import { Check, MessageCircle, CalendarCheck, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WA_NUMBER = "14756898301";
const WA_TEXT   = "Hi! I'd like to get a quote for a detailing service.";
const waHref    = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`;

interface Package {
  name: string;
  nameEs: string;
  price: string | null;   // null = "Contact for pricing"
  features: string[];
  featuresEs: string[];
  highlight?: boolean;    // red accent border
}

const PACKAGES: Package[] = [
  {
    name: "Diamond Plate Ceramic Coating",
    nameEs: "Recubrimiento Cerámico Diamond Plate",
    price: "$450",
    highlight: true,
    features: [
      "Superior Scratch Resistance",
      "Up to 3 Years of Durability",
      "UV Protection",
      "Environmental Contaminant Resistance",
      "Extreme Hydrophobic Protection",
    ],
    featuresEs: [
      "Resistencia superior a los rayones",
      "Hasta 3 años de durabilidad",
      "Protección UV",
      "Resistencia a contaminantes ambientales",
      "Protección hidrofóbica extrema",
    ],
  },
  {
    name: "Dash Cam Sales & Installation",
    nameEs: "Venta e Instalación de Dashcam",
    price: null,
    features: [
      "Continuous Recording",
      "Impact Sensor Technology",
      "Night Vision",
      "Professional Installation",
      "Wi-Fi & Cloud Options Available",
    ],
    featuresEs: [
      "Grabación continua",
      "Sensor de impacto",
      "Visión nocturna",
      "Instalación profesional",
      "Opciones Wi-Fi y nube disponibles",
    ],
  },
  {
    name: "Engine Bay Cleaning",
    nameEs: "Limpieza del Compartimento del Motor",
    price: "$200",
    features: [
      "Component Protection",
      "Professional Degreaser Application",
      "Controlled Pressure Rinse",
      "Plastic & Rubber Conditioning",
      "Deep Clean Finish with Enhanced Shine",
    ],
    featuresEs: [
      "Protección de componentes",
      "Aplicación de desengrasante profesional",
      "Enjuague a presión controlada",
      "Acondicionamiento de plásticos y gomas",
      "Limpieza profunda con brillo mejorado",
    ],
  },
  {
    name: "VIP Interior Clean",
    nameEs: "Limpieza Interior VIP",
    price: "$120",
    features: [
      "Detailed Carpet & Upholstery Vacuuming",
      "Windows Cleaned Inside & Out",
      "Dashboard, Door Panels, Air Vents & Crevices Cleaned",
      "Trash Removal",
      "Door Jambs Cleaned",
      "Tire Shine",
    ],
    featuresEs: [
      "Aspirado detallado de alfombras y tapicería",
      "Ventanas limpias por dentro y por fuera",
      "Tablero, paneles, rejillas y grietas limpias",
      "Eliminación de basura",
      "Jambas de puerta limpias",
      "Brillo de neumáticos",
    ],
  },
  {
    name: "Express Wax",
    nameEs: "Cera Express",
    price: "$100",
    features: [
      "Hand-Applied Wax",
      "Orbital Polishing",
      "Interior Vacuum",
      "Windows Cleaned Inside & Out",
      "Pressure Wheel Cleaning + Tire Shine",
    ],
    featuresEs: [
      "Cera aplicada a mano",
      "Pulido orbital",
      "Aspirado interior",
      "Ventanas limpias por dentro y por fuera",
      "Limpieza de rines a presión + brillo de neumáticos",
    ],
  },
  {
    name: "Headlight Restoration",
    nameEs: "Restauración de Faros",
    price: "$100",
    features: [
      "Ultimate Wash",
      "Headlight Restoration",
      "New UV Protective Coating",
      "Completed in About 45 Minutes",
      "1-Year Written Warranty",
    ],
    featuresEs: [
      "Lavado completo",
      "Restauración de faros",
      "Nueva capa protectora UV",
      "Completado en aproximadamente 45 minutos",
      "Garantía escrita de 1 año",
    ],
  },
  {
    name: "Bumper to Bumper",
    nameEs: "De Parachoques a Parachoques",
    price: "$350",
    highlight: true,
    features: [
      "Exterior Paint Preparation",
      "Advanced 2-Step Wax",
      "Carpet & Upholstery Vacuum and Shampoo",
      "Leather Cleaning & Conditioning",
      "Windows Cleaned Inside & Out",
      "Door Jambs Cleaned",
      "Dashboard & Center Console Cleaned",
      "Pressure Wheel Cleaning + Tire Shine",
      "Black Plastic Trim Restoration",
    ],
    featuresEs: [
      "Preparación de pintura exterior",
      "Cera avanzada en 2 pasos",
      "Aspirado y champú de alfombras y tapicería",
      "Limpieza y acondicionamiento de cuero",
      "Ventanas limpias por dentro y por fuera",
      "Jambas de puerta limpias",
      "Tablero y consola central limpios",
      "Limpieza de rines a presión + brillo de neumáticos",
      "Restauración de molduras de plástico negro",
    ],
  },
  {
    name: "Luxury Interior Detail",
    nameEs: "Detailing Interior de Lujo",
    price: "$250",
    features: [
      "Carpet & Upholstery Vacuum and Shampoo",
      "Leather Cleaning & Conditioning",
      "Door Panels Cleaned",
      "Windows Cleaned Inside & Out",
      "Door Jambs Cleaned",
      "Dashboard & Center Console Cleaned",
      "Tire Shine",
    ],
    featuresEs: [
      "Aspirado y champú de alfombras y tapicería",
      "Limpieza y acondicionamiento de cuero",
      "Paneles de puerta limpios",
      "Ventanas limpias por dentro y por fuera",
      "Jambas de puerta limpias",
      "Tablero y consola central limpios",
      "Brillo de neumáticos",
    ],
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function ServicesPackages() {
  const { lang } = useLanguage();

  const heading  = lang === "es" ? "Servicios y Paquetes"       : "Our Services & Packages";
  const eyebrow  = lang === "es" ? "Paquetes Disponibles"       : "Available Packages";
  const subtitle = lang === "es"
    ? "Elige el servicio ideal para tu vehículo. Contáctanos para una cotización personalizada."
    : "Choose the right service for your vehicle. Contact us for a personalized quote.";
  const bookLabel    = lang === "es" ? "Reservar Ahora"       : "Book Now";
  const quoteLabel   = lang === "es" ? "Solicitar Cotización" : "Request Quote";
  const contactPrice = lang === "es" ? "Consultar precio"     : "Contact for pricing";
  const startingFrom = lang === "es" ? "Desde"                : "Starting at";

  return (
    <section
      id="packages"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#020C24" }}
    >
      {/* Subtle radial glows */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(214,28,35,0.06) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 80% 80%, rgba(79,126,184,0.06) 0%, transparent 60%)" }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs font-bold tracking-[0.28em] uppercase mb-3" style={{ color: "#D61C23" }}>{eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-5">{heading}</h2>
          <div className="w-20 h-px mx-auto mb-6" style={{ background: "linear-gradient(to right, transparent, #D61C23, transparent)" }} />
          <p className="max-w-xl mx-auto text-base" style={{ color: "rgba(234,234,234,0.65)" }}>{subtitle}</p>
        </div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          transition={{ staggerChildren: 0.08 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {PACKAGES.map((pkg, i) => {
            const name     = lang === "es" ? pkg.nameEs     : pkg.name;
            const features = lang === "es" ? pkg.featuresEs : pkg.features;
            const isHighlight = pkg.highlight;

            return (
              <motion.div
                key={i}
                variants={cardVariants}
                className="flex flex-col rounded-sm overflow-hidden group"
                style={{
                  background: "#041535",
                  border: isHighlight
                    ? "1px solid rgba(214,28,35,0.45)"
                    : "1px solid rgba(79,126,184,0.18)",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = isHighlight ? "rgba(214,28,35,0.75)" : "rgba(79,126,184,0.45)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = isHighlight
                    ? "0 8px 32px rgba(214,28,35,0.18)"
                    : "0 8px 32px rgba(79,126,184,0.14)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = isHighlight ? "rgba(214,28,35,0.45)" : "rgba(79,126,184,0.18)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Top accent bar */}
                <div className="h-0.5 w-full" style={{ background: isHighlight ? "#D61C23" : "rgba(79,126,184,0.40)" }} />

                <div className="flex flex-col flex-1 p-6 gap-4">
                  {/* Name + Price */}
                  <div>
                    <h3
                      className="font-bold text-white uppercase tracking-wide leading-tight mb-3"
                      style={{ fontSize: "0.95rem" }}
                    >
                      {name}
                    </h3>
                    {pkg.price ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>{startingFrom}</span>
                        <span
                          className="text-3xl font-bold"
                          style={{ color: isHighlight ? "#D61C23" : "#6FB5FF" }}
                        >
                          {pkg.price}
                        </span>
                      </div>
                    ) : (
                      <span
                        className="text-sm font-semibold italic"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                      >
                        {contactPrice}
                      </span>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full" style={{ background: "rgba(79,126,184,0.15)" }} />

                  {/* Features */}
                  <ul className="flex flex-col gap-2 flex-1">
                    {features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2">
                        <Check
                          className="shrink-0 mt-0.5"
                          style={{ width: "13px", height: "13px", color: isHighlight ? "#D61C23" : "#4F7EB8", strokeWidth: 2.5 }}
                        />
                        <span className="text-xs leading-relaxed" style={{ color: "rgba(234,234,234,0.70)" }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Buttons */}
                  <div className="flex flex-col gap-2 pt-2">
                    {/* Book Now */}
                    <a
                      href="#quote"
                      className="flex items-center justify-center gap-2 py-2.5 px-4 text-white font-bold text-xs tracking-widest uppercase transition-colors"
                      style={{ background: "#D61C23" }}
                      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#8E0D13")}
                      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#D61C23")}
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      {bookLabel}
                    </a>

                    {/* Request Quote */}
                    <a
                      href="#quote"
                      className="flex items-center justify-center gap-2 py-2.5 px-4 text-white font-bold text-xs tracking-widest uppercase transition-all"
                      style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.18)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.38)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.18)"; }}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      {quoteLabel}
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2.5 px-4 text-white font-bold text-xs tracking-widest uppercase transition-all"
                      style={{ background: "rgba(79,126,184,0.15)", border: "1px solid rgba(79,126,184,0.30)" }}
                      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(79,126,184,0.35)")}
                      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(79,126,184,0.15)")}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <p className="text-center mt-12 text-sm italic" style={{ color: "rgba(234,234,234,0.40)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          {lang === "es"
            ? "* Los precios pueden variar según el tamaño y condición del vehículo. Contáctenos para una cotización exacta."
            : "* Prices may vary based on vehicle size and condition. Contact us for an exact quote."}
        </p>
      </div>
    </section>
  );
}
