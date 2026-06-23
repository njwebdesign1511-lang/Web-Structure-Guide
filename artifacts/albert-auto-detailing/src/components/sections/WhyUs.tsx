import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhyUs() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const w = content.whyUs;

  const eyebrow  = lang === "es" ? t.whyUs.eyebrow  : w.eyebrow;
  const heading  = lang === "es" ? t.whyUs.heading  : w.heading;
  const body     = lang === "es" ? t.whyUs.body     : w.body;
  const cta      = lang === "es" ? t.whyUs.cta      : w.cta;
  const benefits = lang === "es" ? t.whyUs.benefits : w.benefits;

  return (
    <section id="why-us" className="py-24 md:py-32 relative" style={{ background: "#CCDFF5", borderBottom: "1px solid #AECAE6" }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-bold tracking-widest text-primary uppercase mb-3">{eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-[#020C24] uppercase">{heading}</h2>
            <div className="w-20 h-1 bg-primary mb-8" />
            <p className="text-gray-700 text-lg leading-relaxed mb-8">{body}</p>
            <a href="#contact" className="text-primary font-bold tracking-widest uppercase hover:text-[#020C24] transition-colors flex items-center gap-2">
              {cta} <span aria-hidden="true">&rarr;</span>
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 p-4 border border-blue-100 rounded-sm hover:border-primary/40 transition-colors" style={{ background: "#BBCFF0" }}>
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <span className="text-[#020C24] font-medium">{benefit}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
