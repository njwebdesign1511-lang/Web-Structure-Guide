import { motion } from "framer-motion";
import aboutImg from "@/assets/images/about.png";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const a = content.about;

  const eyebrow    = lang === "es" ? t.about.eyebrow    : a.eyebrow;
  const heading    = lang === "es" ? t.about.heading    : a.heading;
  const p1         = lang === "es" ? t.about.p1         : a.p1;
  const p2         = lang === "es" ? t.about.p2         : a.p2;
  const stat1Label = lang === "es" ? t.about.stat1Label : a.stat1Label;
  const stat2Label = lang === "es" ? t.about.stat2Label : a.stat2Label;

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#001830" }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] md:aspect-square rounded-sm overflow-hidden relative" style={{ border: "1px solid rgba(255,255,255,0.20)" }}>
              <img src={aboutImg} alt="Professional Auto Detailing Service in Norwalk CT - Albert Auto Detailing" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 -z-10 rounded-sm" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.70)" }}>{eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">{heading}</h2>
            <div className="w-20 h-1 mb-8 bg-primary" />
            <p className="text-lg leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.88)" }}>{p1}</p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>{p2}</p>
            <div className="grid grid-cols-2 gap-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.20)" }}>
              <div>
                <div className="text-3xl font-display font-bold text-white mb-2">{a.stat1Value}</div>
                <div className="text-sm uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.65)" }}>{stat1Label}</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-white mb-2">{a.stat2Value}</div>
                <div className="text-sm uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.65)" }}>{stat2Label}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
