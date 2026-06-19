import { motion } from "framer-motion";
import gallery1 from "@/assets/images/gallery-1.png";
import gallery2 from "@/assets/images/gallery-2.png";
import gallery3 from "@/assets/images/gallery-3.png";
import gallery4 from "@/assets/images/gallery-4.png";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

const imageSrcs = [gallery1, gallery2, gallery3, gallery4];

export default function Gallery() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const g = content.gallery;

  const eyebrow = lang === "es" ? t.gallery.eyebrow : g.eyebrow;
  const heading  = lang === "es" ? t.gallery.heading  : g.heading;
  const body     = lang === "es" ? t.gallery.body     : g.body;
  const alts     = lang === "es" ? t.gallery.alts     : ["Gallery 1", "Gallery 2", "Gallery 3", "Gallery 4"];

  return (
    <section id="gallery" className="py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">{eyebrow}</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{heading}</h3>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto">{body}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {imageSrcs.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group aspect-square md:aspect-[4/3] overflow-hidden rounded-sm bg-card border border-border"
            >
              <img src={src} alt={alts[index] ?? `Gallery ${index + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
