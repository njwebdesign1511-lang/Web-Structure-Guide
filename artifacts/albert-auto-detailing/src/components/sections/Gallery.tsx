import { useRef, useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import galleryLexusBefore    from "@/assets/images/gallery-lexus-before.png";
import galleryLexusAfter     from "@/assets/images/gallery-lexus-after.png";
import galleryHondaBefore    from "@/assets/images/gallery-honda-before.png";
import galleryHondaAfter     from "@/assets/images/gallery-honda-after.png";
import galleryHeadlightBefore from "@assets/gallery-headlight-before.png";
import galleryHeadlightAfter  from "@assets/gallery-headlight-after.png";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Pair {
  id: number | string;
  title: string;
  titleEs?: string;
  description?: string;
  descriptionEs?: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  visible?: boolean;
}

const DEFAULT_PAIRS: Pair[] = [
  {
    id: "d1",
    title: "Engine Detail — Lexus",
    titleEs: "Detailing de Motor — Lexus",
    description: "Full engine bay degreasing and detail on a Lexus — restored to factory-clean condition.",
    descriptionEs: "Desengrase y detailing completo del compartimento del motor de un Lexus.",
    beforeSrc: galleryLexusBefore,
    afterSrc: galleryLexusAfter,
    beforeAlt: "Lexus engine bay before engine cleaning — Albert Auto Detailing Norwalk CT",
    afterAlt: "Lexus engine bay after engine cleaning — Albert Auto Detailing Norwalk CT",
    visible: true,
  },
  {
    id: "d2",
    title: "Engine Detail — Honda",
    titleEs: "Detailing de Motor — Honda",
    description: "Honda CR-V engine bay deep cleaned — grease, grime, and buildup removed completely.",
    descriptionEs: "Limpieza profunda del motor de un Honda CR-V — grasa, suciedad y depósitos eliminados.",
    beforeSrc: galleryHondaBefore,
    afterSrc: galleryHondaAfter,
    beforeAlt: "Honda engine bay before engine cleaning — Albert Auto Detailing",
    afterAlt: "Honda engine bay after engine cleaning — Albert Auto Detailing",
    visible: true,
  },
  {
    id: "d3",
    title: "Headlight Restoration",
    titleEs: "Restauración de Faros",
    description: "Foggy, oxidized headlights professionally restored to crystal-clear clarity.",
    descriptionEs: "Faros opacos y oxidados restaurados profesionalmente a una claridad de cristal.",
    beforeSrc: galleryHeadlightBefore,
    afterSrc: galleryHeadlightAfter,
    beforeAlt: "Cloudy headlight before restoration — Albert Auto Detailing Norwalk CT",
    afterAlt: "Crystal-clear headlight after restoration — Albert Auto Detailing Norwalk CT",
    visible: true,
  },
];

// ─── Lightbox ──────────────────────────────────────────────────────────────────
interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const Lightbox = memo(function Lightbox({ src, alt, onClose }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 flex items-center justify-center"
        style={{ zIndex: 9999, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="relative flex items-center justify-center"
          style={{ maxWidth: "min(92vw, 900px)", maxHeight: "90vh" }}
          onClick={e => e.stopPropagation()}
        >
          <img
            src={src}
            alt={alt}
            className="rounded-xl object-contain"
            style={{
              maxWidth: "100%",
              maxHeight: "88vh",
              boxShadow: "0 8px 64px rgba(0,0,0,0.8)",
              display: "block",
            }}
          />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute -top-4 -right-4 flex items-center justify-center rounded-full text-white font-bold"
            style={{
              width: "36px",
              height: "36px",
              background: "#FF2534",
              boxShadow: "0 2px 12px rgba(0,0,0,0.6)",
              fontSize: "1.1rem",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

// ─── Before/After Card ──────────────────────────────────────────────────────────
interface CardProps {
  pair: Pair;
  lang: string;
  isAnimating: boolean;
  onAnimationEnd: () => void;
  loading?: "eager" | "lazy";
  onOpenImage: (src: string, alt: string) => void;
}

const STEP_MS = 1800;

const BeforeAfterCard = memo(function BeforeAfterCard({
  pair, lang, isAnimating, onAnimationEnd, loading, onOpenImage,
}: CardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeImgRef = useRef<HTMLImageElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);
  const handleRef    = useRef<HTMLDivElement>(null);
  const beforeLblRef = useRef<HTMLDivElement>(null);
  const afterLblRef  = useRef<HTMLDivElement>(null);

  const posRef     = useRef(50);
  const animRef    = useRef(false);
  const interacted = useRef(false);
  const timers     = useRef<ReturnType<typeof setTimeout>[]>([]);
  const touchDir   = useRef<"h" | "v" | null>(null);
  const touchOrigin = useRef({ x: 0, y: 0 });
  const onEndRef   = useRef(onAnimationEnd);
  onEndRef.current = onAnimationEnd;

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const applyPos = useCallback((p: number, withTransition: boolean) => {
    posRef.current = p;
    const tr = withTransition ? `1.8s cubic-bezier(0.22, 1, 0.36, 1)` : "none";
    if (beforeImgRef.current) {
      beforeImgRef.current.style.transition = withTransition ? `clip-path ${tr}` : "none";
      beforeImgRef.current.style.clipPath   = `inset(0 ${100 - p}% 0 0)`;
    }
    if (dividerRef.current) {
      dividerRef.current.style.transition = withTransition ? `left ${tr}` : "none";
      dividerRef.current.style.left       = `${p}%`;
    }
    if (handleRef.current) {
      handleRef.current.style.transition = withTransition ? `left ${tr}` : "none";
      handleRef.current.style.left       = `${p}%`;
    }
    if (beforeLblRef.current) beforeLblRef.current.style.opacity = String(Math.min(1, p / 25));
    if (afterLblRef.current)  afterLblRef.current.style.opacity  = String(Math.min(1, (100 - p) / 25));
  }, []);

  const stopAnim = useCallback(() => {
    interacted.current = true;
    animRef.current    = false;
    clearTimers();
    applyPos(posRef.current, false);
  }, [applyPos]);

  const posFrom = (clientX: number) => {
    if (!containerRef.current) return posRef.current;
    const r = containerRef.current.getBoundingClientRect();
    return Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
  };

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    stopAnim();
    applyPos(posFrom(e.clientX), false);
    const onMove = (ev: MouseEvent) => applyPos(posFrom(ev.clientX), false);
    const onUp   = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseup",   onUp,   { passive: true });
  }, [stopAnim, applyPos]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchOrigin.current = { x: t.clientX, y: t.clientY };
      touchDir.current    = null;
      stopAnim();
    };
    const handleMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (touchDir.current === null) {
        const dx = Math.abs(t.clientX - touchOrigin.current.x);
        const dy = Math.abs(t.clientY - touchOrigin.current.y);
        if (dx < 4 && dy < 4) return;
        touchDir.current = dx >= dy ? "h" : "v";
      }
      if (touchDir.current === "h") {
        e.preventDefault();
        applyPos(posFrom(t.clientX), false);
      }
    };
    const handleEnd = () => { touchDir.current = null; };
    el.addEventListener("touchstart", handleStart, { passive: true  });
    el.addEventListener("touchmove",  handleMove,  { passive: false });
    el.addEventListener("touchend",   handleEnd,   { passive: true  });
    return () => {
      el.removeEventListener("touchstart", handleStart);
      el.removeEventListener("touchmove",  handleMove);
      el.removeEventListener("touchend",   handleEnd);
    };
  }, [stopAnim, applyPos]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    stopAnim();
    applyPos(Math.max(0, Math.min(100, posRef.current + (e.key === "ArrowLeft" ? -5 : 5))), false);
  }, [stopAnim, applyPos]);

  useEffect(() => {
    if (!isAnimating) return;
    if (interacted.current) { onEndRef.current(); return; }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { onEndRef.current(); return; }
    animRef.current = true;
    const ts: ReturnType<typeof setTimeout>[] = [];
    timers.current = ts;
    ts.push(setTimeout(() => { if (!animRef.current) return; applyPos(20, true); }, 60));
    ts.push(setTimeout(() => { if (!animRef.current) return; applyPos(80, true); }, 60 + STEP_MS));
    ts.push(setTimeout(() => { if (!animRef.current) return; applyPos(50, true); }, 60 + STEP_MS * 2));
    ts.push(setTimeout(() => { animRef.current = false; onEndRef.current(); }, 60 + STEP_MS * 3));
    return () => { ts.forEach(clearTimeout); animRef.current = false; };
  }, [isAnimating, applyPos]);

  const beforeLabel = lang === "es" ? "ANTES"   : "BEFORE";
  const afterLabel  = lang === "es" ? "DESPUÉS" : "AFTER";
  const title = (lang === "es" && pair.titleEs)       ? pair.titleEs       : pair.title;
  const desc  = (lang === "es" && pair.descriptionEs) ? pair.descriptionEs : pair.description;

  const expandIcon = (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden="true">
      <path d="M2 2h4M2 2v4M14 2h-4M14 2v4M2 14h4M2 14v-4M14 14h-4M14 14v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="flex flex-col gap-3"
    >
      <h3 className="text-white font-bold text-base tracking-wide">{title}</h3>

      {/* Slider */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg select-none"
        style={{
          aspectRatio: "4/3",
          cursor: "col-resize",
          border: "1px solid rgba(20,96,160,0.18)",
          touchAction: "pan-y",
          willChange: "transform",
        }}
        onMouseDown={onMouseDown}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="slider"
        aria-label={`${title} — before and after comparison. Drag or use arrow keys.`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
      >
        {/* AFTER — base layer */}
        <img
          src={pair.afterSrc}
          alt={pair.afterAlt ?? `${title} — after`}
          loading={loading}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* BEFORE — clipped */}
        <img
          ref={beforeImgRef}
          src={pair.beforeSrc}
          alt={pair.beforeAlt ?? `${title} — before`}
          loading={loading}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ clipPath: "inset(0 50% 0 0)" }}
          draggable={false}
        />

        {/* Divider line */}
        <div
          ref={dividerRef}
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ left: "50%", transform: "translateX(-50%)", width: "2px", background: "rgba(255,255,255,0.92)", boxShadow: "0 0 8px rgba(0,0,0,0.40)", zIndex: 10 }}
        />

        {/* Handle */}
        <div
          ref={handleRef}
          className="absolute top-1/2 pointer-events-none flex items-center justify-center"
          style={{ left: "50%", transform: "translate(-50%, -50%)", width: "40px", height: "40px", borderRadius: "50%", background: "white", boxShadow: "0 2px 16px rgba(0,0,0,0.38)", border: "2px solid rgba(214,28,35,0.35)", zIndex: 11 }}
        >
          <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true">
            <path d="M7 10l-4 0M7 10l-2-2M7 10l-2 2M13 10l4 0M13 10l2-2M13 10l2 2" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* BEFORE label */}
        <div
          ref={beforeLblRef}
          className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-bold tracking-widest uppercase pointer-events-none"
          style={{ background: "rgba(2,12,36,0.75)", color: "#EAEAEA", border: "1px solid rgba(255,255,255,0.13)", zIndex: 9, transition: "opacity 0.25s ease" }}
          aria-hidden="true"
        >
          {beforeLabel}
        </div>

        {/* AFTER label */}
        <div
          ref={afterLblRef}
          className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-bold tracking-widest uppercase pointer-events-none"
          style={{ background: "rgba(214,28,35,0.80)", color: "white", zIndex: 9, transition: "opacity 0.25s ease" }}
          aria-hidden="true"
        >
          {afterLabel}
        </div>
      </div>

      {/* Expand buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onOpenImage(pair.beforeSrc, pair.beforeAlt ?? `${title} — before`)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all"
          style={{ background: "rgba(2,12,36,0.08)", border: "1px solid rgba(2,12,36,0.15)", color: "#374151" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(2,12,36,0.15)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(2,12,36,0.08)"; }}
          aria-label={`View before image for ${title}`}
        >
          {expandIcon}
          {lang === "es" ? "Ver Antes" : "View Before"}
        </button>
        <button
          onClick={() => onOpenImage(pair.afterSrc, pair.afterAlt ?? `${title} — after`)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all"
          style={{ background: "rgba(214,28,35,0.06)", border: "1px solid rgba(214,28,35,0.20)", color: "#C41C27" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(214,28,35,0.14)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(214,28,35,0.06)"; }}
          aria-label={`View after image for ${title}`}
        >
          {expandIcon}
          {lang === "es" ? "Ver Después" : "View After"}
        </button>
      </div>

      {desc && <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>}
    </motion.div>
  );
});

// ─── Gallery section ─────────────────────────────────────────────────────────────
export default memo(function Gallery() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const g = content.gallery;

  const sectionRef  = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const [currentAnim, setCurrentAnim] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const eyebrow = lang === "es" ? t.gallery.eyebrow : g.eyebrow;
  const heading  = lang === "es" ? t.gallery.heading  : g.heading;
  const body     = lang === "es" ? t.gallery.body     : g.body;

  const contentPairs: Pair[] = ((content as any).beforeAfterPairs ?? []) as Pair[];
  const allPairs: Pair[] = [
    ...DEFAULT_PAIRS,
    ...contentPairs.filter(p => p.beforeSrc && p.afterSrc),
  ].filter(p => p.visible !== false);

  useEffect(() => {
    if (allPairs.length === 0) return;
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        setCurrentAnim(0);
        obs.disconnect();
      }
    }, { threshold: 0.20 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [allPairs.length]);

  const onCardEnd = useCallback((idx: number) => {
    setCurrentAnim(prev => (prev === idx ? idx + 1 : prev));
  }, []);

  const openImage = useCallback((src: string, alt: string) => {
    setLightbox({ src, alt });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const hint = lang === "es"
    ? "Arrastra el control para comparar el antes y el después"
    : "Drag the handle to compare before & after";

  return (
    <>
      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />
      )}

      <section id="gallery" ref={sectionRef} className="py-24 md:py-32 relative" style={{ background: "#FFFFFF" }}>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16 md:mb-24"
          >
            <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#1460a0" }}>{eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#020C24] mb-6">{heading}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="max-w-2xl mx-auto text-gray-600">{body}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allPairs.map((pair, idx) => (
              <BeforeAfterCard
                key={pair.id}
                pair={pair}
                lang={lang}
                isAnimating={currentAnim === idx}
                onAnimationEnd={() => onCardEnd(idx)}
                loading={idx === 0 ? "eager" : "lazy"}
                onOpenImage={openImage}
              />
            ))}
          </div>

          <p className="text-center text-xs mt-8 text-gray-400">{hint}</p>
        </div>
      </section>
    </>
  );
});
