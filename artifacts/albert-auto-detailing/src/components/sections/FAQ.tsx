import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

const WaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function FAQ() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);

  const faqData = content.faq;
  const eyebrow = lang === "es" ? t.faq.eyebrow : faqData.eyebrow;
  const heading  = lang === "es" ? t.faq.heading  : faqData.heading;
  const items    = lang === "es" ? t.faq.items    : faqData.items;
  const c = content.contact as any;

  return (
    <section id="faq" className="py-24 md:py-32 relative" style={{ background: "#D8EAF8" }}>
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold tracking-widest text-primary uppercase mb-3">{eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#020C24] mb-6">{heading}</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
              className="rounded-sm overflow-hidden"
              style={{ border: "1px solid #CBD8F0", background: "#FFFFFF" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group transition-colors"
                style={{ background: "transparent" }}
                onMouseEnter={e => ((e.currentTarget).style.background = "rgba(29,63,117,0.06)")}
                onMouseLeave={e => ((e.currentTarget).style.background = "transparent")}
              >
                <span className="text-[#020C24] font-semibold pr-4 group-hover:text-primary transition-colors">{item.q}</span>
                <span className="shrink-0 text-primary">
                  {open === i ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 text-sm leading-relaxed border-t border-gray-200 pt-4" style={{ color: "#374151" }}>
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-sm mb-4" style={{ color: "#4a7fc1" }}>
            {lang === "es" ? "¿Más preguntas? Escríbenos directamente." : "More questions? Reach out to us directly."}
          </p>
          <a
            href={`https://wa.me/${c?.whatsapp ?? "14756898301"}?text=${encodeURIComponent(c?.whatsappText ?? "Hi! I have a question.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="site-btn inline-flex items-center gap-2 px-6 py-3 text-white font-bold text-sm tracking-widest uppercase rounded-sm"
            style={{ background: "#FF2534" }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#C41C27")}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#FF2534")}
          >
            <WaIcon />
            {lang === "es" ? "WhatsApp" : "Chat on WhatsApp"}
          </a>
        </div>
      </div>
    </section>
  );
}
