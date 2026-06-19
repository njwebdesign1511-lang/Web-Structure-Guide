import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

export default function WhyUs() {
  const { content } = useContent();
  const w = content.whyUs;

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
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="text-sm font-bold tracking-widest text-primary uppercase mb-3"
            >
              {w.eyebrow}
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold mb-6 text-white uppercase"
            >
              {w.heading}
            </motion.h3>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{ originX: 0 }}
              className="w-20 h-1 bg-primary mb-8"
            />
            <p className="text-gray-400 text-lg leading-relaxed mb-8">{w.body}</p>
            <a href="#contact" className="btn-shine text-primary font-bold tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2">
              {w.cta} <span aria-hidden="true">&rarr;</span>
            </a>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {w.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-start gap-3 bg-card p-4 border border-border rounded-sm"
              >
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <span className="text-gray-200 font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
