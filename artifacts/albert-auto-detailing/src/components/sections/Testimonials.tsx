import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4" style={{ fill: "#D61C23", color: "#D61C23" }} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { content } = useContent();
  const { lang, t } = useLanguage();

  const eyebrow = lang === "es" ? t.testimonials.eyebrow : "Client Reviews";
  const heading  = lang === "es" ? t.testimonials.heading  : "What Our Customers Say";

  const items = (content as any).testimonials as Array<{ name: string; comment: string; active: boolean }> ?? [];
  const active = items.filter(i => i.active);

  if (active.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 md:py-32 border-b border-border relative overflow-hidden" style={{ background: "#041535" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgba(79,126,184,0.10) 0%, transparent 60%)" }} />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#6FB5FF" }}>{eyebrow}</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{heading}</h3>
          <div className="w-20 h-1 mx-auto" style={{ background: "#4F7EB8" }} />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {active.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="rounded-sm p-8 relative group transition-colors"
              style={{ background: "#071B45", border: "1px solid rgba(79,126,184,0.20)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(79,126,184,0.45)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(79,126,184,0.20)")}
            >
              <Quote className="w-8 h-8 absolute top-6 right-6 transition-colors" style={{ color: "rgba(79,126,184,0.25)" }} />
              <StarRating />
              <p className="mt-4 mb-6 leading-relaxed italic" style={{ color: "#EAEAEA" }}>"{item.comment}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: "rgba(79,126,184,0.15)", border: "1px solid rgba(79,126,184,0.30)", color: "#6FB5FF" }}>
                  {item.name[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{item.name}</p>
                  <p className="text-xs" style={{ color: "#4F7EB8" }}>Verified Customer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
