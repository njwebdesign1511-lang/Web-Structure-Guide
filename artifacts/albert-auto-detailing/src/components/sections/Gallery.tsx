import { motion } from "framer-motion";
import gallery1 from "@/assets/images/gallery-1.png";
import gallery2 from "@/assets/images/gallery-2.png";
import gallery3 from "@/assets/images/gallery-3.png";
import gallery4 from "@/assets/images/gallery-4.png";

const images = [
  { src: gallery1, alt: "Pristine red paint" },
  { src: gallery2, alt: "Luxury car interior" },
  { src: gallery3, alt: "Water beading macro" },
  { src: gallery4, alt: "Spinning polisher machine" }
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Our Work</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">See The Difference</h3>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our results speak for themselves. Browse through some of our recent premium auto detailing projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group aspect-square md:aspect-[4/3] overflow-hidden rounded-sm bg-card border border-border"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-white font-bold tracking-wider uppercase text-sm">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
