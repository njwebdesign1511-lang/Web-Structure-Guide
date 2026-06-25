import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Send, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect, useCallback } from "react";

interface Review {
  id: number;
  name: string;
  rating: number;
  service: string | null;
  comment: string;
  createdAt: string;
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-5 h-5"
          style={{
            fill: i < count ? "#F5C842" : "transparent",
            color: i < count ? "#F5C842" : "rgba(245,200,66,0.25)",
            filter: i < count ? "drop-shadow(0 0 4px rgba(245,200,66,0.55))" : "none",
          }}
        />
      ))}
    </div>
  );
}

function StarInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1;
        const active = n <= (hovered || value);
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            className="transition-all duration-150 hover:scale-125"
            style={{ transform: active ? "scale(1.08)" : "scale(1)" }}
          >
            <Star
              className="w-8 h-8"
              style={{
                fill: active ? "#F5C842" : "transparent",
                color: active ? "#F5C842" : "rgba(245,200,66,0.25)",
                filter: active ? "drop-shadow(0 0 6px rgba(245,200,66,0.65))" : "none",
                transition: "all 0.15s ease",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function Testimonials() {
  const { lang } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const [form, setForm] = useState({ name: "", service: "", comment: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const eyebrow  = lang === "es" ? "Reseñas de Clientes" : "Client Reviews";
  const heading  = lang === "es" ? "Lo Que Dicen Nuestros Clientes" : "What Our Customers Say";
  const L = lang === "es" ? {
    noReviews: "Sé el primero en dejar una reseña.",
    writeReview: "Escribir Reseña",
    cancel: "Cancelar",
    nameLabel: "Tu Nombre",
    serviceLabel: "Servicio Recibido (opcional)",
    commentLabel: "Tu Comentario",
    ratingLabel: "Calificación",
    submit: "Enviar Reseña",
    submitting: "Enviando...",
    thanks: "¡Gracias por tu reseña!",
    thanksBody: "Tu opinión ya está publicada.",
    namePlaceholder: "John Smith",
    servicePlaceholder: "Ceramic Coating, Paint Correction...",
    commentPlaceholder: "Comparte tu experiencia con nosotros...",
    customers: "clientes satisfechos",
  } : {
    noReviews: "Be the first to leave a review.",
    writeReview: "Write a Review",
    cancel: "Cancel",
    nameLabel: "Your Name",
    serviceLabel: "Service Received (optional)",
    commentLabel: "Your Comment",
    ratingLabel: "Rating",
    submit: "Submit Review",
    submitting: "Sending...",
    thanks: "Thank you for your review!",
    thanksBody: "Your review is now live.",
    namePlaceholder: "John Smith",
    servicePlaceholder: "Ceramic Coating, Paint Correction...",
    commentPlaceholder: "Share your experience with us...",
    customers: "satisfied customers",
  };

  const fetchReviews = useCallback(() => {
    fetch("/api/reviews")
      .then(r => r.json())
      .then((data: Review[]) => { setReviews(data); setCurrent(0); })
      .catch(() => {});
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent(c => (c + dir + reviews.length) % reviews.length);
  }, [reviews.length]);

  useEffect(() => {
    if (reviews.length <= 1 || paused || formOpen) return;
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [go, reviews.length, paused, formOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", service: "", comment: "", rating: 5 });
        setFormOpen(false);
        setTimeout(() => { setSubmitted(false); fetchReviews(); }, 3000);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = "w-full border rounded-sm px-4 py-3 text-[#020C24] text-sm placeholder-gray-400 focus:outline-none transition-colors";
  const inputStyle = { background: "#ffffff", borderColor: "rgba(20,96,160,0.25)" };
  const focusIn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderColor = "#FF2534");
  const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderColor = "rgba(20,96,160,0.25)");

  const sliderVariants = {
    enter:  (d: number) => ({ x: d > 0 ? "60%" : "-60%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? "-60%" : "60%", opacity: 0 }),
  };

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 border-b border-border relative overflow-hidden"
      style={{ background: "#001e55" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgba(0,59,122,0.18) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(255,37,52,0.06) 0%, transparent 55%)" }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#4d8fd4" }}>{eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{heading}</h2>
          <div className="w-20 h-1 mx-auto" style={{ background: "#1460a0" }} />
          {reviews.length > 0 && (
            <p className="mt-4 text-sm" style={{ color: "rgba(137,171,218,0.60)" }}>
              {reviews.length}+ {L.customers}
            </p>
          )}
        </motion.div>

        {/* Slider or empty state */}
        {reviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 mb-10"
          >
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6" style={{ fill: "rgba(214,28,35,0.25)", color: "#FF2534" }} />
              ))}
            </div>
            <p className="text-sm" style={{ color: "rgba(137,171,218,0.60)" }}>{L.noReviews}</p>
          </motion.div>
        ) : (
          <div
            className="relative max-w-2xl mx-auto mb-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {reviews.length > 1 && (
              <button
                onClick={() => go(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 md:-translate-x-14 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ background: "rgba(0,59,122,0.20)", border: "1px solid rgba(20,96,160,0.35)", color: "#4d8fd4" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,59,122,0.40)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,59,122,0.20)")}
              >
                <ChevronLeft size={16} />
              </button>
            )}

            <div className="overflow-hidden rounded-sm" style={{ minHeight: "230px" }}>
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={sliderVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, ease: "easeInOut" }}
                  className="p-8 relative"
                  style={{ background: "#002d6b", border: "1px solid rgba(20,96,160,0.28)" }}
                >
                  <Quote className="w-8 h-8 absolute top-6 right-6" style={{ color: "rgba(20,96,160,0.28)" }} />
                  <StarRating count={reviews[current].rating} />
                  <p className="mt-4 mb-6 leading-relaxed italic text-base md:text-lg" style={{ color: "#EAEAEA" }}>
                    "{reviews[current].comment}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                      style={{ background: "rgba(0,59,122,0.25)", border: "1px solid rgba(20,96,160,0.35)", color: "#4d8fd4" }}
                    >
                      {reviews[current].name[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{reviews[current].name}</p>
                      <p className="text-xs" style={{ color: "#1460a0" }}>
                        {reviews[current].service ?? (lang === "es" ? "Cliente verificado" : "Verified Customer")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {reviews.length > 1 && (
              <button
                onClick={() => go(1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 md:translate-x-14 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ background: "rgba(0,59,122,0.20)", border: "1px solid rgba(20,96,160,0.35)", color: "#4d8fd4" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,59,122,0.40)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,59,122,0.20)")}
              >
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        )}

        {/* Dots */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-2 mb-10">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "28px" : "8px",
                  height: "8px",
                  background: i === current ? "#FF2534" : "rgba(20,96,160,0.35)",
                }}
              />
            ))}
          </div>
        )}

        {/* Thank you banner */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto mb-6 flex items-center gap-3 px-5 py-4 rounded-xl border"
              style={{ background: "rgba(34,197,94,0.08)", borderColor: "rgba(34,197,94,0.25)", color: "#4ade80" }}
            >
              <CheckCircle size={18} />
              <div>
                <p className="font-semibold text-sm">{L.thanks}</p>
                <p className="text-xs opacity-70">{L.thanksBody}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Write a review toggle button */}
        {!formOpen && (
          <div className="flex justify-center">
            <button
              onClick={() => setFormOpen(true)}
              className="flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-sm transition-all"
              style={{ background: "rgba(214,28,35,0.12)", border: "1px solid rgba(214,28,35,0.35)", color: "#FF2534" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(214,28,35,0.22)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(214,28,35,0.12)"; }}
            >
              <Star size={15} /> {L.writeReview}
            </button>
          </div>
        )}

        {/* Review form */}
        <AnimatePresence>
          {formOpen && (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35 }}
              className="max-w-2xl mx-auto mt-6 rounded-sm p-8 flex flex-col gap-5"
              style={{ background: "#ffffff", border: "1px solid #e5e7eb" }}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-lg" style={{ color: "#020C24" }}>{L.writeReview}</h3>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="text-xs transition-colors"
                  style={{ color: "#6b7280" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#020C24")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#6b7280")}
                >
                  {L.cancel}
                </button>
              </div>

              {/* Star rating input */}
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#020C24" }}>
                  {L.ratingLabel}
                </label>
                <StarInput value={form.rating} onChange={n => setForm(f => ({ ...f, rating: n }))} />
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: "#020C24" }}>
                  {L.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className={inputCls}
                  style={inputStyle}
                  placeholder={L.namePlaceholder}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>

              {/* Service */}
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: "#020C24" }}>
                  {L.serviceLabel}
                </label>
                <input
                  type="text"
                  value={form.service}
                  onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                  className={inputCls}
                  style={inputStyle}
                  placeholder={L.servicePlaceholder}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: "#020C24" }}>
                  {L.commentLabel}
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.comment}
                  onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                  className={inputCls}
                  style={{ ...inputStyle, resize: "none" }}
                  placeholder={L.commentPlaceholder}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>

              <button
                type="submit"
                disabled={submitting || !form.name.trim() || !form.comment.trim()}
                className="flex items-center justify-center gap-2 font-bold text-sm py-3 rounded-sm transition-all disabled:opacity-50"
                style={{ background: "#FF2534", color: "white" }}
                onMouseEnter={e => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = "#b91c1c"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#FF2534"; }}
              >
                <Send size={14} />
                {submitting ? L.submitting : L.submit}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
