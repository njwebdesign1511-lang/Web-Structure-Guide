import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhyUs() {
  const { t } = useLanguage();

  return (
    <section id="why-us" className="py-24 md:py-32 bg-background border-b border-border relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">{t.whyUs.eyebrow}</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white uppercase">{t.whyUs.heading}</h3>
            <div className="w-20 h-1 bg-primary mb-8" />
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {t.whyUs.body}
            </p>
            <a href="#contact" className="text-primary font-bold tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2">
              {t.whyUs.cta} <span aria-hidden="true">&rarr;</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {t.whyUs.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 bg-card p-4 border border-border rounded-sm">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <span className="text-gray-200 font-medium">{benefit}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
