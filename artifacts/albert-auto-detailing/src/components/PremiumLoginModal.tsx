import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { usePremium } from "@/contexts/PremiumContext";

type Tab = "login" | "register";

export default function PremiumLoginModal() {
  const { showLoginModal, closeLoginModal, login, register } = usePremium();

  const [tab, setTab]             = useState<Tab>("login");
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPw, setShowPw]       = useState(false);
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showLoginModal) {
      setName(""); setEmail(""); setPassword("");
      setError(""); setShowPw(false); setTab("login");
      const t = setTimeout(() => emailRef.current?.focus(), 140);
      return () => clearTimeout(t);
    }
  }, [showLoginModal]);

  // Reset form when switching tabs
  useEffect(() => {
    setError(""); setName(""); setEmail(""); setPassword(""); setShowPw(false);
    setTimeout(() => emailRef.current?.focus(), 80);
  }, [tab]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") closeLoginModal(); };
    if (showLoginModal) window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [showLoginModal, closeLoginModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    let result: { ok: boolean; error?: string };

    if (tab === "login") {
      if (!email || !password) { setError("Completa todos los campos"); setLoading(false); return; }
      result = await login(email, password);
    } else {
      if (!name || !email || !password) { setError("Completa todos los campos"); setLoading(false); return; }
      if (password.length < 6) { setError("La contraseña debe tener al menos 6 caracteres"); setLoading(false); return; }
      result = await register(name, email, password);
    }

    setLoading(false);
    if (!result.ok) setError(result.error ?? "Error desconocido");
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

            {/* Header */}
            <div className="premium-login-header">
              <div className="premium-login-icon">✨</div>
              <h2 className="premium-login-title">Experiencia Premium</h2>
              <p className="premium-login-subtitle">
                {tab === "login"
                  ? "Inicia sesión para activar efectos visuales exclusivos"
                  : "Crea tu cuenta para acceder a la experiencia premium"}
              </p>
            </div>

            {/* Tabs */}
            <div className="premium-login-tabs">
              <button
                className={`premium-login-tab${tab === "login" ? " active" : ""}`}
                onClick={() => setTab("login")}
                type="button"
              >
                Iniciar Sesión
              </button>
              <button
                className={`premium-login-tab${tab === "register" ? " active" : ""}`}
                onClick={() => setTab("register")}
                type="button"
              >
                Crear Cuenta
              </button>
            </div>

            <form onSubmit={handleSubmit} className="premium-login-form">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, x: tab === "login" ? -12 : 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: tab === "login" ? 12 : -12 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}
                >
                  {/* Name field — register only */}
                  {tab === "register" && (
                    <div className="premium-login-input-wrap">
                      <User size={13} className="premium-login-input-icon" />
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="premium-login-input"
                        placeholder="Tu nombre"
                        autoComplete="name"
                      />
                    </div>
                  )}

                  {/* Email */}
                  <div className="premium-login-input-wrap">
                    <Mail size={13} className="premium-login-input-icon" />
                    <input
                      ref={emailRef}
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="premium-login-input"
                      placeholder="Tu email"
                      autoComplete="email"
                    />
                  </div>

                  {/* Password */}
                  <div className="premium-login-input-wrap">
                    <Lock size={13} className="premium-login-input-icon" />
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="premium-login-input"
                      placeholder={tab === "register" ? "Contraseña (mín. 6 caracteres)" : "Contraseña"}
                      autoComplete={tab === "login" ? "current-password" : "new-password"}
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
                </motion.div>
              </AnimatePresence>

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
                disabled={loading}
                className="premium-login-submit"
              >
                {loading
                  ? "Procesando…"
                  : tab === "login"
                    ? "✨ Iniciar Sesión"
                    : "✨ Crear Cuenta"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
