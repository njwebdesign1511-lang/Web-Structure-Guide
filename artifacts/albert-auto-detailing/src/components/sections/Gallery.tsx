import {
  useRef, useState, useEffect, useCallback, type RefObject,
} from "react";
import { motion } from "framer-motion";
import gallery1 from "@/assets/images/gallery-1.png";
import gallery2 from "@/assets/images/gallery-2.png";
import gallery3 from "@/assets/images/gallery-3.png";
import gallery4 from "@/assets/images/gallery-4.png";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────────
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

// ─── Default pairs using existing gallery images ───────────────────────────────
const DEFAULT_PAIRS: Pair[] = [
  {
    id: "d1",
    title: "Paint Correction",
    titleEs: "Corrección de Pintura",
    description: "Professional paint correction restoring the vehicle to showroom condition.",
    descriptionEs: "Corrección de pintura profesional, restaurando cada panel a condición de showroom.",
    beforeSrc: gallery1,
    afterSrc: gallery2,
    beforeAlt: "Vehicle before paint correction - Albert Auto Detailing Norwalk CT",
    afterAlt: "Vehicle after paint correction - Albert Auto Detailing Norwalk CT",
    visible: true,
  },
  {
    id: "d2",
    title: "Interior Detail",
    titleEs: "Detailing Interior",
    description: "Deep interior cleaning — every surface, crevice, and fabric restored to spotless condition.",
    descriptionEs: "Limpieza interior profunda — cada superficie, grieta y tela restaurada a condición impecable.",
    beforeSrc: gallery3,
    afterSrc: gallery4,
    beforeAlt: "Car interior before deep cleaning - Albert Auto Detailing",
    afterAlt: "Car interior after deep cleaning - Albert Auto Detailing",
    visible: true,
  },
];

// ─── Before/After Card ────────────────────────────────────────────────────────
interface CardProps {
  pair: Pair;
  lang: string;
  isAnimating: boolean;
  onAnimationEnd: () => void;
  loading?: "eager" | "lazy";
}

function BeforeAfterCard({ pair, lang, isAnimating, onAnimationEnd, loading }: CardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);               // 0-100 percent
  const [animating, setAnimating] = useState(false); // CSS transition active
  const userInteracted = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isDraggingRef = useRef(false);
  const touchDir = useRef<"h" | "v" | null>(null);
  const touchStart = useRef({ x: 0, y: 0 });

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  // ── Sequential auto-animation ────────────────────────────────────────────────
  useEffect(() => {
    if (!isAnimating) return;

    if (userInteracted.current) {
      onAnimationEnd();
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { onAnimationEnd(); return; }

    setAnimating(true);
    setPos(50);

    // 50 → 20 (show before)
    const t1 = setTimeout(() => {
      if (userInteracted.current) { setAnimating(false); onAnimationEnd(); return; }
      setPos(20);

      // 20 → 80 (show after)
      const t2 = setTimeout(() => {
        if (userInteracted.current) { setAnimating(false); onAnimationEnd(); return; }
        setPos(80);

        // 80 → 50 (center)
        const t3 = setTimeout(() => {
          if (userInteracted.current) { setAnimating(false); onAnimationEnd(); return; }
          setPos(50);

          // done
          const t4 = setTimeout(() => {
            setAnimating(false);
            onAnimationEnd();
          }, 1800);
          timers.current.push(t4);
        }, 1800);
        timers.current.push(t3);
      }, 1800);
      timers.current.push(t2);
    }, 80); // tiny delay so transition kicks in
    timers.current.push(t1);

    return clearTimers;
  }, [isAnimating]);

  // ── Position helpers ─────────────────────────────────────────────────────────
  const posFromClient = (clientX: number) => {
    if (!containerRef.current) return 50;
    const r = containerRef.current.getBoundingClientRect();
    return Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
  };

  const stopAnim = useCallback((clientX: number) => {
    userInteracted.current = true;
    isDraggingRef.current = true;
    clearTimers();
    setAnimating(false);
    setPos(posFromClient(clientX));
  }, []);

  // ── Mouse events ─────────────────────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    stopAnim(e.clientX);

    const onMove = (ev: MouseEvent) => setPos(posFromClient(ev.clientX));
    const onUp   = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  // ── Touch events ─────────────────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    touchDir.current = null;
    stopAnim(t.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (touchDir.current === null) {
      const dx = Math.abs(t.clientX - touchStart.current.x);
      const dy = Math.abs(t.clientY - touchStart.current.y);
      touchDir.current = dx >= dy ? "h" : "v";
    }
    if (touchDir.current === "h") {
      e.preventDefault();
      setPos(posFromClient(t.clientX));
    } else {
      isDraggingRef.current = false;
    }
  };

  const onTouchEnd = () => { isDraggingRef.current = false; };

  // ── Keyboard support ─────────────────────────────────────────────────────────
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    userInteracted.current = true;
    clearTimers();
    setAnimating(false);
    setPos(p => Math.max(0, Math.min(100, p + (e.key === "ArrowLeft" ? -5 : 5))));
  };

  const easing = "1.8s cubic-bezier(0.22, 1, 0.36, 1)";
  const tr = animating ? easing : "none";
  const clipBefore = `inset(0 ${100 - pos}% 0 0)`;

  const beforeLabel = lang === "es" ? "ANTES"   : "BEFORE";
  const afterLabel  = lang === "es" ? "DESPUÉS"  : "AFTER";
  const title       = (lang === "es" && pair.titleEs) ? pair.titleEs : pair.title;
  const desc        = (lang === "es" && pair.descriptionEs) ? pair.descriptionEs : pair.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="flex flex-col gap-3"
    >
      {/* Title */}
      <h3 className="text-white font-bold text-base tracking-wide">{title}</h3>

      {/* Slider */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg select-none"
        style={{
          aspectRatio: "4/3",
          cursor: "col-resize",
          border: "1px solid rgba(79,126,184,0.20)",
          touchAction: "pan-y", // allow vertical scroll by default; we override for horizontal drags
        }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="slider"
        aria-label={`${title} — before and after comparison. Use arrow keys or drag to compare.`}
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* AFTER image — base layer, full width */}
        <img
          src={pair.afterSrc}
          alt={pair.afterAlt ?? `${title} — after`}
          loading={loading}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* BEFORE image — clipped to show only left portion */}
        <img
          src={pair.beforeSrc}
          alt={pair.beforeAlt ?? `${title} — before`}
          loading={loading}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            clipPath: clipBefore,
            transition: animating ? `clip-path ${tr}` : "none",
          }}
          draggable={false}
        />

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: `${pos}%`,
            transform: "translateX(-50%)",
            width: "2px",
            background: "rgba(255,255,255,0.90)",
            boxShadow: "0 0 8px rgba(0,0,0,0.50)",
            transition: animating ? `left ${tr}` : "none",
            zIndex: 10,
          }}
        />

        {/* Handle circle */}
        <div
          className="absolute top-1/2 pointer-events-none flex items-center justify-center"
          style={{
            left: `${pos}%`,
            transform: "translate(-50%, -50%)",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "white",
            boxShadow: "0 2px 16px rgba(0,0,0,0.45)",
            border: "2px solid rgba(214,28,35,0.40)",
            transition: animating ? `left ${tr}` : "none",
            zIndex: 11,
          }}
        >
          <svg viewBox="0 0 20 20" width="18" height="18" fill="none">
            <path d="M7 10l-4 0M7 10l-2-2M7 10l-2 2M13 10l4 0M13 10l2-2M13 10l2 2" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* BEFORE label */}
        <div
          className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-bold tracking-widest uppercase pointer-events-none"
          style={{
            background: "rgba(2,12,36,0.75)",
            color: "#EAEAEA",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.15)",
            zIndex: 9,
          }}
        >
          {beforeLabel}
        </div>

        {/* AFTER label */}
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-bold tracking-widest uppercase pointer-events-none"
          style={{
            background: "rgba(214,28,35,0.80)",
            color: "white",
            backdropFilter: "blur(4px)",
            zIndex: 9,
          }}
        >
          {afterLabel}
        </div>
      </div>

      {/* Optional description */}
      {desc && (
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      )}
    </motion.div>
  );
}

// ─── Gallery section ──────────────────────────────────────────────────────────
export default function Gallery() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const g = content.gallery;
  const sectionRef = useRef<HTMLElement>(null);
  const [animatingCard, setAnimatingCard] = useState<number | null>(null);
  const hasAnimated = useRef(false);

  const eyebrow = lang === "es" ? t.gallery.eyebrow : g.eyebrow;
  const heading  = lang === "es" ? t.gallery.heading  : g.heading;
  const body     = lang === "es" ? t.gallery.body     : g.body;

  // Merge default pairs with any user-added content pairs
  const contentPairs: Pair[] = ((content as any).beforeAfterPairs ?? []) as Pair[];
  const allPairs: Pair[] = [
    ...DEFAULT_PAIRS,
    ...contentPairs.filter(p => p.beforeSrc && p.afterSrc),
  ].filter(p => p.visible !== false);

  // ── Intersection observer triggers sequential animation ──────────────────────
  useEffect(() => {
    if (allPairs.length === 0) return;
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setAnimatingCard(0);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [allPairs.length]);

  const onCardAnimationEnd = useCallback((idx: number) => {
    setAnimatingCard(prev => (prev === idx ? idx + 1 : prev));
  }, []);

  const hint = lang === "es"
    ? "Arrastra el control para comparar el antes y el después"
    : "Drag the handle to compare before & after";

  return (
    <section id="gallery" ref={sectionRef} className="py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {allPairs.map((pair, idx) => (
            <BeforeAfterCard
              key={pair.id}
              pair={pair}
              lang={lang}
              isAnimating={animatingCard === idx}
              onAnimationEnd={() => onCardAnimationEnd(idx)}
              loading={idx === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>

        {/* Hint */}
        <p className="text-center text-xs mt-8" style={{ color: "rgba(79,126,184,0.50)" }}>
          {hint}
        </p>
      </div>
    </section>
  );
}
