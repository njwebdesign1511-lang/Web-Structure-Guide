import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";
import logoImg from "@assets/logo-transparent.png";

const WaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

export default function Hero() {
  const { content } = useContent();
  const { lang, t } = useLanguage();

  const h = content.hero;
  const badge    = lang === "es" ? t.hero.badge   : h.badge;
  const line1    = lang === "es" ? t.hero.line1   : h.line1;
  const line2    = lang === "es" ? t.hero.line2   : h.line2;
  const line3_1  = lang === "es" ? t.hero.line3_1 : h.line3_1;
  const line3_2  = lang === "es" ? t.hero.line3_2 : h.line3_2;
  const tagline  = lang === "es" ? t.hero.tagline : h.tagline;
  const btn1     = lang === "es" ? t.hero.bookNow      : h.btn1;
  const btn3     = lang === "es" ? t.hero.contactUs    : h.btn3;
  const callNow  = lang === "es" ? "Llamar Ahora"      : "Call Now";
  const bookAppt = lang === "es" ? "Reservar Cita"     : "Book Appointment";

  const c        = content.contact as any;
  const waNumber = c?.whatsapp ?? "14756898301";
  const waText   = c?.whatsappText ?? "Hi! I'd like to book a detailing service.";
  const phone    = String(c?.phone ?? "4756898301").replace(/\D/g, "");

  // ── Video + logo splash logic ──
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showLogo, setShowLogo] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleVideoEnded = useCallback(() => {
    setShowLogo(true);
    timerRef.current = setTimeout(() => {
      setShowLogo(false);
      videoRef.current?.play();
    }, 2000);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* ── Full-screen background video (no loop — we handle it manually) ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        disablePictureInPicture
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* ── Logo splash shown for 2 s at end of each video loop ── */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            key="logo-splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6"
            style={{ zIndex: 5, background: "#020C24" }}
          >
            <motion.img
              src={logoImg}
              alt="Albert Auto Detailing"
              initial={{ scale: 0.80, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="object-contain"
              style={{
                width: "clamp(180px, 28vw, 340px)",
                filter: "drop-shadow(0 0 24px rgba(255,255,255,0.25))",
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
              className="flex flex-col items-center gap-1"
            >
              <span
                className="font-display font-bold uppercase tracking-[0.22em] text-white"
                style={{ fontSize: "clamp(1.1rem, 3vw, 2rem)", letterSpacing: "0.22em" }}
              >
                Albert Auto Detailing
              </span>
              <span
                className="text-xs md:text-sm uppercase tracking-[0.18em]"
                style={{ color: "#D61C23", letterSpacing: "0.18em" }}
              >
                Norwalk, Connecticut
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Subtle gradient only on the left for text readability ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: "linear-gradient(105deg, rgba(2,12,36,0.62) 0%, rgba(2,12,36,0.30) 45%, rgba(2,12,36,0.04) 100%)",
        }}
      />

      {/* ── Bottom fade for scroll indicator ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ zIndex: 2, background: "linear-gradient(to top, rgba(2,12,36,0.80), transparent)" }}
      />

      {/* ── Left accent line ── */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
        style={{ zIndex: 2, background: "linear-gradient(to bottom, transparent, rgba(214,28,35,0.55) 30%, rgba(214,28,35,0.55) 70%, transparent)" }}
      />

      {/* ── Content ── */}
      <div className="container mx-auto px-6 md:px-14 relative pt-24 pb-20" style={{ zIndex: 3 }}>
        <div className="max-w-2xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8" style={{ background: "#D61C23" }} />
            <span className="text-xs font-bold tracking-[0.28em] uppercase" style={{ color: "#D61C23" }}>{badge}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-bold text-white leading-[1.04] mb-6"
            style={{
              fontSize: "clamp(3rem, 7.5vw, 6rem)",
              textShadow: "0 2px 24px rgba(0,0,0,0.65)",
            }}
          >
            {line1}<br />
            <span style={{ color: "rgba(234,234,234,0.45)" }}>{line2}</span><br />
            <span style={{ color: "#D61C23" }}>{line3_1}</span>{" "}{line3_2}
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="origin-left mb-6"
            style={{
              height: "1px",
              width: "65%",
              background: "linear-gradient(to right, rgba(214,28,35,0.70), rgba(79,126,184,0.30), transparent)",
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-lg md:text-xl mb-10 max-w-lg italic font-light"
            style={{
              color: "rgba(255,255,255,0.88)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              textShadow: "0 1px 12px rgba(0,0,0,0.55)",
            }}
          >
            {tagline}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.58 }}
            className="flex flex-wrap gap-3"
          >
            {/* Request a Quote — solid red */}
            <a
              href="#quote"
              className="px-7 py-3 text-white font-bold tracking-[0.13em] uppercase text-sm text-center transition-colors"
              style={{ background: "#D61C23" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#8E0D13")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#D61C23")}
            >{btn1}</a>

            {/* Book Appointment — white outline */}
            <a
              href="#quote"
              className="px-7 py-3 text-white font-bold tracking-[0.13em] uppercase text-sm text-center transition-all"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.30)", backdropFilter: "blur(4px)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.55)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.30)"; }}
            >{bookAppt}</a>

            {/* Call Now — red outline */}
            <a
              href={`tel:${phone}`}
              className="px-7 py-3 text-white font-bold tracking-[0.13em] uppercase text-sm flex items-center justify-center gap-2 transition-all"
              style={{ background: "rgba(214,28,35,0.12)", border: "1px solid rgba(214,28,35,0.50)", backdropFilter: "blur(4px)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(214,28,35,0.30)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(214,28,35,0.80)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(214,28,35,0.12)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(214,28,35,0.50)"; }}
            ><PhoneIcon /> {callNow}</a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 text-white font-bold tracking-[0.13em] uppercase text-sm flex items-center justify-center gap-2 transition-all"
              style={{ background: "rgba(79,126,184,0.20)", border: "1px solid rgba(79,126,184,0.45)", backdropFilter: "blur(4px)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(79,126,184,0.45)")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(79,126,184,0.20)")}
            ><WaIcon /> {btn3}</a>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ zIndex: 3 }}>
        <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.30)" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ width: "1px", height: "28px", background: "linear-gradient(to bottom, rgba(214,28,35,0.70), transparent)" }}
        />
      </div>
    </section>
  );
}
