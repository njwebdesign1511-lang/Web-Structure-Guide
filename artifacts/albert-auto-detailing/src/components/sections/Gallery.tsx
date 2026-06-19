import { motion } from "framer-motion";
import gallery1 from "@/assets/images/gallery-1.png";
import gallery2 from "@/assets/images/gallery-2.png";
import gallery3 from "@/assets/images/gallery-3.png";
import gallery4 from "@/assets/images/gallery-4.png";
import { useContent } from "@/contexts/ContentContext";

const imageSrcs = [gallery1, gallery2, gallery3, gallery4];
const overlayLabels = ["Premium Detail", "Expert Finish", "Pristine Results", "Showroom Shine"];

export default function Gallery() {
  const { content } = useContent();
  const g = content.gallery;

  return (
    <section id="gallery" className="py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold tracking-widest text-primary uppercase mb-3"
          >
            {g.eyebrow}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            {g.heading}
          </motion.h3>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{ originX: 0 }}
            className="w-20 h-1 bg-primary mx-auto mb-6"
          />
          <p className="text-gray-400 max-w-2xl mx-auto">{g.body}</p>
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
              <img
                src={src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-300 text-center">
                  <span className="text-white font-bold tracking-widest uppercase text-sm block">
                    {overlayLabels[index]}
                  </span>
                  <div className="w-8 h-0.5 bg-primary mx-auto mt-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
