import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=85",
    brand: "Porsche",
    accent: "#D61C23",
  },
  {
    url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1920&q=85",
    brand: "BMW",
    accent: "#6FB5FF",
  },
  {
    url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=85",
    brand: "Ferrari",
    accent: "#D61C23",
  },
  {
    url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1920&q=85",
    brand: "Lamborghini",
    accent: "#6FB5FF",
  },
  {
    url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=85",
    brand: "Mercedes-AMG",
    accent: "#EAEAEA",
  },
];

export default function Hero() {
  const { content } = useContent();
  const { lang, t } = useLanguage();

  const h = content.hero;
  const badge   = lang === "es" ? t.hero.badge   : h.badge;
  const line1   = lang === "es" ? t.hero.line1   : h.line1;
  const line2   = lang === "es" ? t.hero.line2   : h.line2;
  const line3_1 = lang === "es" ? t.hero.line3_1 : h.line3_1;
  const line3_2 = lang === "es" ? t.hero.line3_2 : h.line3_2;
  const tagline = lang === "es" ? t.hero.tagline : h.tagline;
  const btn1    = lang === "es" ? t.hero.bookNow      : h.btn1;
  const btn2    = lang === "es" ? t.hero.viewServices : h.btn2;
  const btn3    = lang === "es" ? t.hero.contactUs    : h.btn3;

  const c = content.contact as any;
  const waNumber = c?.whatsapp ?? "14756898301";
  const waText   = c?.whatsappText ?? "Hi! I'd like to book a detailing service.";

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(p => (p + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(p => (p - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden" style={{ background: "#020C24" }}>

      {/* ── Carousel background ── */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={{
            enter: (d: number) => ({ opacity: 0, scale: 1.04, x: d > 0 ? 60 : -60 }),
            center: { opacity: 1, scale: 1, x: 0 },
            exit:  (d: number) => ({ opacity: 0, scale: 0.98, x: d > 0 ? -60 : 60 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.url}
            alt={slide.brand}
            className="w-full h-full object-cover object-center"
          />
          {/* Multi-layer elegant overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(2,12,36,0.97) 0%, rgba(2,12,36,0.80) 40%, rgba(2,12,36,0.35) 70%, rgba(2,12,36,0.10) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(2,12,36,0.80) 0%, transparent 40%)" }} />
        </motion.div>
      </AnimatePresence>

      {/* ── Elegant decorative line ── */}
      <div className="absolute left-0 top-0 bottom-0 w-px z-10" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(214,28,35,0.60) 30%, rgba(214,28,35,0.60) 70%, transparent 100%)" }} />

      {/* ── Main content ── */}
      <div className="container mx-auto px-6 md:px-10 relative z-10 w-full">
        <div className="max-w-2xl">

          {/* Brand badge — changes with slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${current}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8" style={{ background: slide.accent }} />
              <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: slide.accent }}>
                {slide.brand}
              </span>
              <div className="h-px w-8" style={{ background: slide.accent }} />
            </motion.div>
          </AnimatePresence>

          <div className="inline-block px-4 py-1.5 mb-6 font-bold tracking-widest text-xs uppercase" style={{ border: "1px solid rgba(214,28,35,0.40)", background: "rgba(214,28,35,0.08)", color: "#D61C23", letterSpacing: "0.18em" }}>
            {badge}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="font-bold text-white mb-6 leading-[1.05]"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            {line1}<br />
            <span style={{ color: "rgba(234,234,234,0.55)" }}>{line2}</span><br />
            <span style={{ color: "#D61C23" }}>{line3_1}</span>{" "}{line3_2}
          </motion.h1>

          {/* Elegant thin separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="origin-left mb-6"
            style={{ height: "1px", background: "linear-gradient(to right, rgba(214,28,35,0.70), rgba(79,126,184,0.30), transparent)", width: "80%" }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl mb-10 max-w-xl font-light italic"
            style={{ color: "rgba(234,234,234,0.80)", fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "0.02em" }}
          >
            {tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 flex-wrap"
          >
            <a
              href="#quote"
              className="group relative px-8 py-3.5 text-white font-bold tracking-[0.15em] uppercase text-sm text-center overflow-hidden transition-all"
              style={{ background: "#D61C23" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#8E0D13")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#D61C23")}
            >
              {btn1}
            </a>
            <a
              href="#services"
              className="px-8 py-3.5 text-white font-bold tracking-[0.15em] uppercase text-sm text-center transition-all"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.20)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.40)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.20)"; }}
            >
              {btn2}
            </a>
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 text-white font-bold tracking-[0.15em] uppercase text-sm text-center flex items-center justify-center gap-2 transition-all"
              style={{ background: "rgba(79,126,184,0.25)", border: "1px solid rgba(79,126,184,0.45)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(79,126,184,0.45)")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(79,126,184,0.25)")}
            >
              <WaIcon /> {btn3}
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Slide controls ── */}
      <div className="absolute bottom-10 right-8 md:right-12 z-20 flex flex-col items-end gap-5">
        {/* Dot indicators */}
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all"
              style={{
                width: i === current ? "28px" : "6px",
                height: "3px",
                background: i === current ? "#D61C23" : "rgba(255,255,255,0.30)",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
        {/* Arrow controls */}
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="w-9 h-9 flex items-center justify-center transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.20)", background: "rgba(2,12,36,0.50)", color: "rgba(255,255,255,0.60)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(214,28,35,0.30)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(214,28,35,0.60)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(2,12,36,0.50)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.20)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.60)"; }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="w-9 h-9 flex items-center justify-center transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.20)", background: "rgba(2,12,36,0.50)", color: "rgba(255,255,255,0.60)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(214,28,35,0.30)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(214,28,35,0.60)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(2,12,36,0.50)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.20)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.60)"; }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.30)" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, rgba(214,28,35,0.70), transparent)" }}
        />
      </div>
    </section>
  );
}
