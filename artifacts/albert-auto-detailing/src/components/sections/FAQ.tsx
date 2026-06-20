import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FAQ() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);

  const faqData = content.faq;
  const eyebrow = lang === "es" ? t.faq.eyebrow : faqData.eyebrow;
  const heading  = lang === "es" ? t.faq.heading  : faqData.heading;
  const items    = lang === "es" ? t.faq.items    : faqData.items;

  return (
    <section id="faq" className="py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">{eyebrow}</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{heading}</h3>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="border border-border rounded-sm overflow-hidden bg-card"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/5 transition-colors group"
              >
                <span className="text-white font-semibold pr-4 group-hover:text-primary transition-colors">{item.q}</span>
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
                    <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-border pt-4">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm mb-4">
            {lang === "es" ? "¿Más preguntas? Escríbenos directamente." : "More questions? Reach out to us directly."}
          </p>
          <a
            href={`https://wa.me/${(content as any).contact?.whatsapp ?? "14756898301"}?text=${encodeURIComponent((content as any).contact?.whatsappText ?? "Hi! I have a question.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold text-sm tracking-widest uppercase rounded-sm transition-colors"
          >
            {lang === "es" ? "WhatsApp" : "Chat on WhatsApp"}
          </a>
        </div>
      </div>
    </section>
  );
}
