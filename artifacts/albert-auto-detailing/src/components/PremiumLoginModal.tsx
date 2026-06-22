import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, Lock } from "lucide-react";
import { usePremium } from "@/contexts/PremiumContext";

export default function PremiumLoginModal() {
  const { showLoginModal, closeLoginModal, login } = usePremium();
  const [password, setPassword]   = useState("");
  const [showPw, setShowPw]       = useState(false);
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showLoginModal) {
      setPassword(""); setError(""); setShowPw(false);
      const t = setTimeout(() => inputRef.current?.focus(), 140);
      return () => clearTimeout(t);
    }
  }, [showLoginModal]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") closeLoginModal(); };
    if (showLoginModal) window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [showLoginModal, closeLoginModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || loading) return;
    setLoading(true); setError("");
    const ok = await login(password);
    setLoading(false);
    if (!ok) setError("Contraseña incorrecta · Incorrect password");
  };

  return createPortal(
    <AnimatePresence>
      {showLoginModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="premium-login-backdrop"
          onClick={closeLoginModal}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
            className="premium-login-card"
            onClick={e => e.stopPropagation()}
          >
            <button className="premium-login-close" onClick={closeLoginModal} aria-label="Cerrar">
              <X size={15} />
            </button>

            <div className="premium-login-header">
              <div className="premium-login-icon">✨</div>
              <h2 className="premium-login-title">Experiencia Premium</h2>
              <p className="premium-login-subtitle">
                Inicia sesión para activar efectos visuales exclusivos
              </p>
            </div>

            <form onSubmit={handleSubmit} className="premium-login-form">
              <div className="premium-login-input-wrap">
                <Lock size={13} className="premium-login-input-icon" />
                <input
                  ref={inputRef}
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="premium-login-input"
                  placeholder="Contraseña / Password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(s => !s)}
                  className="premium-login-eye"
                  aria-label="Mostrar u ocultar contraseña"
                >
                  {showPw ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="premium-login-error"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading || !password}
                className="premium-login-submit"
              >
                {loading ? "Verificando…" : "✨ Activar Experiencia Premium"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
