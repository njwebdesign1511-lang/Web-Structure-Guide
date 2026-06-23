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
    <section id="why-us" className="py-24 md:py-32 relative" style={{ background: "#001830", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.70)" }}>{eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white uppercase">{heading}</h2>
            <div className="w-20 h-1 bg-primary mb-8" />
            <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.85)" }}>{body}</p>
            <a href="#contact" className="font-bold tracking-widest uppercase flex items-center gap-2 transition-colors" style={{ color: "rgba(255,255,255,0.90)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.90)")}
            >
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
              <div key={i} className="flex items-start gap-3 p-4 rounded-sm transition-all"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.20)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.20)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
              >
                <CheckCircle2 className="w-6 h-6 shrink-0 text-white" />
                <span className="text-white font-medium">{benefit}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
