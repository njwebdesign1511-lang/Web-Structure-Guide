import { motion } from "framer-motion";
import { MapPin, Clock, Car } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

const WaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Location() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const loc = content.location;
  const c = content.contact as any;

  const eyebrow  = lang === "es" ? t.location.eyebrow  : loc.eyebrow;
  const heading  = lang === "es" ? t.location.heading  : loc.heading;
  const areaNote = lang === "es" ? t.location.areaNote : loc.areaNote;

  const mapQuery = encodeURIComponent(c.address || "Norwalk, Connecticut 06851");
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <section id="location" className="py-24 md:py-32 border-t border-border relative" style={{ background: "#002050" }}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold tracking-widest text-primary uppercase mb-3">{eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{heading}</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-sm overflow-hidden aspect-video"
            style={{ border: "1px solid rgba(20,96,160,0.30)", background: "#002660" }}
          >
            <iframe
              title="Albert Auto Detailing Location"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            {c.address && (
              <div className="flex items-start gap-4 rounded-sm p-5" style={{ background: "#002660", border: "1px solid rgba(20,96,160,0.25)" }}>
                <MapPin className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#1460a0" }}>
                    {lang === "es" ? "Dirección" : "Address"}
                  </p>
                  <p className="text-white font-medium">{c.address}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm font-bold hover:text-white transition-colors mt-1 inline-block"
                  >
                    {lang === "es" ? "Ver en Google Maps →" : "Open in Google Maps →"}
                  </a>
                </div>
              </div>
            )}
            {c.hours && (
              <div className="flex items-start gap-4 rounded-sm p-5" style={{ background: "#002660", border: "1px solid rgba(20,96,160,0.25)" }}>
                <Clock className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#1460a0" }}>
                    {lang === "es" ? "Horario" : "Hours"}
                  </p>
                  <p className="text-white font-medium">{c.hours}</p>
                </div>
              </div>
            )}
            {areaNote && (
              <div className="flex items-start gap-4 rounded-sm p-5" style={{ background: "rgba(0,59,122,0.18)", border: "1px solid rgba(20,96,160,0.30)" }}>
                <Car className="w-6 h-6 shrink-0 mt-0.5" style={{ color: "#4d8fd4" }} />
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#4d8fd4" }}>
                    {lang === "es" ? "Área de Servicio" : "Service Area"}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#EAEAEA" }}>{areaNote}</p>
                </div>
              </div>
            )}
            <a
              href={`https://wa.me/${c?.whatsapp ?? "14756898301"}?text=${encodeURIComponent(c?.whatsappText ?? "Hi! I'd like to book.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="site-btn flex items-center justify-center gap-3 px-8 py-4 text-white font-bold tracking-widest uppercase text-sm rounded-sm"
              style={{ background: "#FF2534" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#C41C27")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#FF2534")}
            >
              <WaIcon />
              {lang === "es" ? "Reservar por WhatsApp" : "Book via WhatsApp"}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
