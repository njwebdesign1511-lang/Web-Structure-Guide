import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect, useCallback } from "react";

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4" style={{ fill: "#D61C23", color: "#D61C23" }} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const eyebrow = lang === "es" ? t.testimonials.eyebrow : "Client Reviews";
  const heading  = lang === "es" ? t.testimonials.heading  : "What Our Customers Say";

  const items = (content as any).testimonials as Array<{
    name: string; comment: string; service?: string; active: boolean;
  }> ?? [];
  const active = items.filter(i => i.active);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent(c => (c + dir + active.length) % active.length);
  }, [active.length]);

  useEffect(() => {
    setCurrent(0);
  }, [active.length]);

  useEffect(() => {
    if (active.length <= 1 || paused) return;
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [go, active.length, paused]);

  if (active.length === 0) return null;

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? "60%" : "-60%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? "-60%" : "60%", opacity: 0 }),
  };

  const item = active[current];

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 border-b border-border relative overflow-hidden"
      style={{ background: "#041535" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top right, rgba(79,126,184,0.10) 0%, transparent 60%)" }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#6FB5FF" }}>{eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{heading}</h2>
          <div className="w-20 h-1 mx-auto" style={{ background: "#4F7EB8" }} />
          {active.length > 0 && (
            <p className="mt-4 text-sm" style={{ color: "rgba(111,181,255,0.55)" }}>
              {active.length}+ {lang === "es" ? "clientes satisfechos" : "satisfied customers"}
            </p>
          )}
        </motion.div>

        {/* Slider */}
        <div
          className="relative max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Prev arrow */}
          {active.length > 1 && (
            <button
              onClick={() => go(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 md:-translate-x-14 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{ background: "rgba(79,126,184,0.15)", border: "1px solid rgba(79,126,184,0.30)", color: "#6FB5FF" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(79,126,184,0.30)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(79,126,184,0.15)")}
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
          )}

          {/* Card */}
          <div className="overflow-hidden rounded-sm" style={{ minHeight: "230px" }}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: "easeInOut" }}
                className="p-8 relative"
                style={{ background: "#071B45", border: "1px solid rgba(79,126,184,0.20)" }}
              >
                <Quote
                  className="w-8 h-8 absolute top-6 right-6"
                  style={{ color: "rgba(79,126,184,0.25)" }}
                />
                <StarRating />
                <p className="mt-4 mb-6 leading-relaxed italic text-base md:text-lg" style={{ color: "#EAEAEA" }}>
                  "{item.comment}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                    style={{
                      background: "rgba(79,126,184,0.15)",
                      border: "1px solid rgba(79,126,184,0.30)",
                      color: "#6FB5FF",
                    }}
                  >
                    {item.name[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.name}</p>
                    <p className="text-xs" style={{ color: "#4F7EB8" }}>
                      {item.service
                        ? item.service
                        : lang === "es" ? "Cliente verificado" : "Verified Customer"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next arrow */}
          {active.length > 1 && (
            <button
              onClick={() => go(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 md:translate-x-14 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{ background: "rgba(79,126,184,0.15)", border: "1px solid rgba(79,126,184,0.30)", color: "#6FB5FF" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(79,126,184,0.30)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(79,126,184,0.15)")}
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          )}
        </div>

        {/* Dots */}
        {active.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {active.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "28px" : "8px",
                  height: "8px",
                  background: i === current ? "#D61C23" : "rgba(79,126,184,0.35)",
                }}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Counter */}
        {active.length > 1 && (
          <p className="text-center mt-3 text-xs" style={{ color: "rgba(111,181,255,0.40)" }}>
            {current + 1} / {active.length}
          </p>
        )}
      </div>
    </section>
  );
}
