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
    <section id="promotions" className="py-16 bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-primary/20 border-y border-blue-700/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">{eyebrow}</span>
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
              className="bg-white/5 border border-blue-500/20 rounded-lg p-5 text-center hover:border-blue-400/40 hover:bg-white/8 transition-all group"
            >
              <Star className="w-5 h-5 text-blue-400 mx-auto mb-3 group-hover:text-yellow-400 transition-colors" />
              <p className="text-white font-semibold text-sm leading-snug">{item}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="#quote"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-widest uppercase text-sm rounded-sm transition-colors"
          >
            <Tag className="w-4 h-4" />
            {lang === "es" ? "Reclamar Oferta" : "Claim This Offer"}
          </a>
        </div>
      </div>
    </section>
  );
}
