import { motion } from "framer-motion";
import { Tag, Star } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Promotions() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const p = content.promotions;

  const eyebrow = lang === "es" ? t.promotions.eyebrow : p.eyebrow;
  const heading  = lang === "es" ? t.promotions.heading  : p.heading;
  const items    = lang === "es" ? t.promotions.items    : p.items.filter(i => i.active).map(i => i.text);
  const activeItems = Array.isArray(items) ? items : [];

  return (
    <section id="promotions" className="py-16 border-y relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0D2D6B 0%, #041535 50%, #0D2D6B 100%)", borderColor: "rgba(79,126,184,0.50)" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top, rgba(214,28,35,0.08) 0%, transparent 70%)" }} />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Tag className="w-4 h-4" style={{ color: "#85CCFF" }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#85CCFF" }}>{eyebrow}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">{heading}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-lg p-5 text-center group transition-all"
              style={{ background: "rgba(79,126,184,0.08)", border: "1px solid rgba(79,126,184,0.25)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(79,126,184,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(79,126,184,0.25)")}
            >
              <Star className="w-5 h-5 mx-auto mb-3 transition-colors" style={{ color: "#85CCFF" }} />
              <p className="text-white font-semibold text-sm leading-snug">{item}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="#quote"
            className="site-btn inline-flex items-center gap-2 px-6 py-3 text-white font-bold tracking-widest uppercase text-sm rounded-sm"
            style={{ background: "#FF2534" }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#C41C27")}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#FF2534")}
          >
            <Tag className="w-4 h-4" />
            {lang === "es" ? "Reclamar Oferta" : "Claim This Offer"}
          </a>
        </div>
      </div>
    </section>
  );
}
