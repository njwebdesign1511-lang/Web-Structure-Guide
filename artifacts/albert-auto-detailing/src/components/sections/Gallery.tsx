import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { createPortal } from "react-dom";
import gallery1 from "@/assets/images/gallery-1.png";
import gallery2 from "@/assets/images/gallery-2.png";
import gallery3 from "@/assets/images/gallery-3.png";
import gallery4 from "@/assets/images/gallery-4.png";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

const imageSrcs = [gallery1, gallery2, gallery3, gallery4];

function Lightbox({ images, alts, index, onClose }: {
  images: string[]; alts: string[]; index: number; onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
  const next = () => setCurrent(i => (i + 1) % images.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: "rgba(2,12,36,0.96)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Gallery image viewer"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
          aria-label="Close gallery"
        >
          <X size={20} />
        </button>

        {/* Counter */}
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
          style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.60)" }}
        >
          {current + 1} / {images.length}
        </div>

        {/* Prev button */}
        {images.length > 1 && (
          <button
            onClick={e => { e.stopPropagation(); prev(); }}
            className="absolute left-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="max-w-5xl w-full max-h-[85vh] mx-16 flex items-center justify-center"
          onClick={e => e.stopPropagation()}
        >
          <img
            src={images[current]}
            alt={alts[current] ?? `Gallery ${current + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-sm"
            style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.60)" }}
          />
        </motion.div>

        {/* Next button */}
        {images.length > 1 && (
          <button
            onClick={e => { e.stopPropagation(); next(); }}
            className="absolute right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* Dots */}
        <div className="absolute bottom-6 flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setCurrent(i); }}
              className="rounded-full transition-all"
              style={{
                width: i === current ? "20px" : "8px",
                height: "8px",
                background: i === current ? "#D61C23" : "rgba(255,255,255,0.25)",
              }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

export default function Gallery() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const g = content.gallery;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const eyebrow = lang === "es" ? t.gallery.eyebrow : g.eyebrow;
  const heading  = lang === "es" ? t.gallery.heading  : g.heading;
  const body     = lang === "es" ? t.gallery.body     : g.body;
  const alts: string[] = lang === "es" ? [...t.gallery.alts] : [
    "Professional Ceramic Coating in Norwalk CT - Albert Auto Detailing",
    "Auto Detailing Before and After - Norwalk Connecticut",
    "Interior Car Detailing Service - Fairfield County CT",
    "Exterior Car Detailing and Paint Correction Norwalk CT",
  ];

  return (
    <section id="gallery" className="py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-sm font-bold tracking-widest text-primary uppercase mb-3">{eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{heading}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto">{body}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {imageSrcs.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group aspect-square md:aspect-[4/3] overflow-hidden rounded-sm bg-card border border-border cursor-pointer"
              onClick={() => setLightboxIndex(index)}
              role="button"
              tabIndex={0}
              aria-label={`View ${alts[index] ?? `gallery image ${index + 1}`} in full size`}
              onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightboxIndex(index); } }}
            >
              <img
                src={src}
                alt={alts[index] ?? `Gallery ${index + 1}`}
                loading={index < 2 ? "eager" : "lazy"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Zoom indicator */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                style={{ background: "rgba(214,28,35,0.80)", backdropFilter: "blur(4px)" }}>
                <ZoomIn size={14} className="text-white" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs font-medium truncate" aria-hidden="true">{alts[index]}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hint text */}
        <p className="text-center text-xs mt-6" style={{ color: "rgba(79,126,184,0.50)" }}>
          {lang === "es" ? "Haz clic en cualquier imagen para verla en tamaño completo" : "Click any image to view full size"}
        </p>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={imageSrcs}
          alts={alts}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
