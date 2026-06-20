import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
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
    <section id="testimonials" className="py-24 md:py-32 bg-card border-b border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-3">{eyebrow}</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{heading}</h3>
          <div className="w-20 h-1 bg-blue-500 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {active.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-background border border-border rounded-sm p-8 hover:border-blue-500/30 transition-colors group relative"
            >
              <Quote className="w-8 h-8 text-blue-500/30 absolute top-6 right-6 group-hover:text-blue-500/50 transition-colors" />
              <StarRating />
              <p className="text-gray-300 mt-4 mb-6 leading-relaxed italic">"{item.comment}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
                  {item.name[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{item.name}</p>
                  <p className="text-gray-500 text-xs">Verified Customer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
