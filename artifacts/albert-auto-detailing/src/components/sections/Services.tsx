import { motion } from "framer-motion";
import { Droplets, Sparkles, Shield, Lightbulb, Settings2, ShieldCheck, Wand2, Star, Camera } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

// One unique icon per service (order matches defaultContent services array)
const icons = [
  Droplets,    // Interior & Exterior Wash
  Sparkles,    // Paint Correction
  Shield,      // Ceramic Coating
  Lightbulb,   // Headlight Restoration
  Settings2,   // Engine Cleaning
  ShieldCheck, // Leather Protection
  Wand2,       // Stain Removal
  Star,        // Full Detailing Package
  Camera,      // Dash Cam Installation
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const s = content.services;
  const active = s.items.filter(item => item.active);

  const eyebrow = lang === "es" ? t.services.eyebrow : s.eyebrow;
  const heading  = lang === "es" ? t.services.heading  : s.heading;

  const esItems = t.services.items;

  return (
    <section id="services" className="py-24 md:py-32 relative" style={{ background: "#0152AD" }}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.70)" }}>{eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{heading}</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {active.map((service, index) => {
            const Icon = icons[index % icons.length];
            const esItem = esItems[index];
            const title       = lang === "es" && esItem ? esItem.title       : service.title;
            const description = lang === "es" && esItem ? esItem.description : service.description;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 320, damping: 22 } }}
                className="bg-white p-8 rounded-sm group relative overflow-hidden shadow-sm transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.30)" }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Icon className="w-12 h-12 text-primary mb-6 stroke-[1.5]" />
                <h4 className="text-xl font-bold text-[#020C24] mb-4 uppercase tracking-wide">{title}</h4>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
