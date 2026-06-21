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
  { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=85", brand: "Porsche" },
  { url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=85", brand: "BMW" },
  { url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=85", brand: "Ferrari" },
  { url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=85", brand: "Lamborghini" },
  { url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=85", brand: "Mercedes-AMG" },
  { url: "https://images.unsplash.com/photo-1583267746897-2cf415887172?auto=format&fit=crop&w=800&q=85", brand: "Acura" },
  { url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=85", brand: "Honda CRV" },
  { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=85", brand: "Pickup Truck" },
  { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=85", brand: "Truck" },
  { url: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=85", brand: "Nissan" },
  { url: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=85", brand: "Toyota" },
  { url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=85", brand: "Chevrolet" },
];

const N = SLIDES.length;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

// Returns the position data for each visible card based on its offset from center
function getCardProps(offset: number) {
  const abs = Math.abs(offset);
  if (abs > 2) return null; // don't render cards farther than 2 positions

  const rotateY  = offset * 48;                 // degrees: -96, -48, 0, 48, 96
  const translateZ = abs === 0 ? 120 : abs === 1 ? -30 : -120; // push center forward
  const translateX = offset * 52;               // % horizontal spread
  const scale    = abs === 0 ? 1 : abs === 1 ? 0.78 : 0.58;
  const opacity  = abs === 0 ? 1 : abs === 1 ? 0.65 : 0.30;
  const zIndex   = 20 - abs * 8;
  const brightness = abs === 0 ? 1 : abs === 1 ? 0.6 : 0.35;

  return { rotateY, translateZ, translateX, scale, opacity, zIndex, brightness };
}

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

  const c        = content.contact as any;
  const waNumber = c?.whatsapp ?? "14756898301";
  const waText   = c?.whatsappText ?? "Hi! I'd like to book a detailing service.";

  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent(p => mod(p + 1, N)), []);
  const prev = useCallback(() => setCurrent(p => mod(p - 1, N)), []);

  useEffect(() => {
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [next]);

  // Build the 5 visible card indices: [-2, -1, 0, +1, +2]
  const visibleOffsets = [-2, -1, 0, 1, 2];

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #020C24 0%, #041535 50%, #071B45 100%)" }}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(79,126,184,0.08) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 40% 40% at 30% 50%, rgba(214,28,35,0.05) 0%, transparent 70%)" }} />

      {/* Elegant left border line */}
      <div className="absolute left-0 top-0 bottom-0 w-px pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(214,28,35,0.50) 35%, rgba(214,28,35,0.50) 65%, transparent)" }} />

      <div className="container mx-auto px-6 md:px-10 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-8 md:gap-4 items-center min-h-[calc(100dvh-5rem)]">

          {/* ── Left: Text ── */}
          <div className="flex flex-col justify-center py-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6" style={{ background: "#D61C23" }} />
              <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: "#D61C23" }}>{badge}</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-bold text-white leading-[1.05] mb-5"
              style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
            >
              {line1}<br />
              <span style={{ color: "rgba(234,234,234,0.50)" }}>{line2}</span><br />
              <span style={{ color: "#D61C23" }}>{line3_1}</span>{" "}{line3_2}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="origin-left mb-5"
              style={{ height: "1px", background: "linear-gradient(to right, rgba(214,28,35,0.65), rgba(79,126,184,0.25), transparent)", width: "75%" }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg mb-8 max-w-md italic font-light"
              style={{ color: "rgba(234,234,234,0.75)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-3 flex-wrap"
            >
              <a
                href="#quote"
                className="px-7 py-3 text-white font-bold tracking-[0.14em] uppercase text-sm text-center transition-colors"
                style={{ background: "#D61C23" }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#8E0D13")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#D61C23")}
              >{btn1}</a>
              <a
                href="#services"
                className="px-7 py-3 text-white font-bold tracking-[0.14em] uppercase text-sm text-center transition-all"
                style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.18)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.38)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.18)"; }}
              >{btn2}</a>
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`}
                target="_blank" rel="noopener noreferrer"
                className="px-7 py-3 text-white font-bold tracking-[0.14em] uppercase text-sm flex items-center justify-center gap-2 transition-all"
                style={{ background: "rgba(79,126,184,0.20)", border: "1px solid rgba(79,126,184,0.40)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(79,126,184,0.40)")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(79,126,184,0.20)")}
              ><WaIcon /> {btn3}</a>
            </motion.div>
          </div>

          {/* ── Right: 3D Spinning Carousel ── */}
          <div className="flex flex-col items-center justify-center py-12">
            {/* Brand label */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`brand-${current}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-8" style={{ background: "#D61C23" }} />
                <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: "#D61C23" }}>
                  {SLIDES[current].brand}
                </span>
                <div className="h-px w-8" style={{ background: "#D61C23" }} />
              </motion.div>
            </AnimatePresence>

            {/* 3D Coverflow stage */}
            <div
              className="relative w-full flex items-center justify-center"
              style={{ height: "300px", perspective: "1200px", perspectiveOrigin: "50% 50%" }}
            >
              {visibleOffsets.map(offset => {
                const idx = mod(current + offset, N);
                const props = getCardProps(offset);
                if (!props) return null;

                return (
                  <motion.div
                    key={`card-${idx}`}
                    animate={{
                      rotateY: props.rotateY,
                      translateZ: props.translateZ,
                      x: `${props.translateX}%`,
                      scale: props.scale,
                      opacity: props.opacity,
                    }}
                    transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute cursor-pointer"
                    style={{
                      width: "200px",
                      height: "260px",
                      zIndex: props.zIndex,
                      transformStyle: "preserve-3d",
                    }}
                    onClick={() => setCurrent(idx)}
                  >
                    <div
                      className="w-full h-full overflow-hidden"
                      style={{
                        borderRadius: "4px",
                        border: offset === 0 ? "1px solid rgba(214,28,35,0.55)" : "1px solid rgba(79,126,184,0.20)",
                        boxShadow: offset === 0
                          ? "0 20px 60px rgba(0,0,0,0.70), 0 0 30px rgba(214,28,35,0.20)"
                          : "0 8px 24px rgba(0,0,0,0.50)",
                        filter: `brightness(${props.brightness})`,
                      }}
                    >
                      <img
                        src={SLIDES[idx].url}
                        alt={SLIDES[idx].brand}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                      {/* Reflection gradient at bottom */}
                      <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: "linear-gradient(to top, rgba(2,12,36,0.80), transparent)" }} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-8 h-8 flex items-center justify-center transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(2,12,36,0.50)", color: "rgba(255,255,255,0.55)", borderRadius: "2px" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(214,28,35,0.25)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(214,28,35,0.55)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(2,12,36,0.50)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)"; }}
              ><ChevronLeft size={15} /></button>

              {/* Dot indicators */}
              <div className="flex gap-1.5">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      width: i === current ? "20px" : "5px",
                      height: "3px",
                      background: i === current ? "#D61C23" : "rgba(255,255,255,0.22)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      borderRadius: "2px",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-8 h-8 flex items-center justify-center transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(2,12,36,0.50)", color: "rgba(255,255,255,0.55)", borderRadius: "2px" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(214,28,35,0.25)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(214,28,35,0.55)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(2,12,36,0.50)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)"; }}
              ><ChevronRight size={15} /></button>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ width: "1px", height: "28px", background: "linear-gradient(to bottom, rgba(214,28,35,0.65), transparent)" }}
        />
      </div>
    </section>
  );
}
