import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";
import { usePremium } from "@/contexts/PremiumContext";
import { useLanguage } from "@/contexts/LanguageContext";
import PremiumLoginModal from "@/components/PremiumLoginModal";

export default function PremiumToggle() {
  const { user, isLoggedIn, premiumMode, togglePremium, logout, openLoginModal } = usePremium();
  const { lang } = useLanguage();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const buttonLabel = !isLoggedIn
    ? (lang === "es" ? "Iniciar sesión para Premium" : "Sign In for Premium")
    : premiumMode
    ? `✦ ${user?.name ?? "Premium"}`
    : (lang === "es" ? "Activar Premium" : "Enable Premium");

  return (
    <>
      <div className="premium-toggle-group">
        {/* Main toggle / login button */}
        <motion.button
          onClick={isLoggedIn ? togglePremium : openLoginModal}
          className={`premium-toggle${!isLoggedIn ? " premium-toggle-login" : ""}`}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          aria-label={buttonLabel}
        >
          <motion.span
            className="premium-toggle-icon"
            animate={premiumMode ? { rotate: [0, 15, -10, 0] } : { rotate: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            ✨
          </motion.span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={!isLoggedIn ? "login" : premiumMode ? "on" : "off"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="premium-toggle-text"
            >
              {buttonLabel}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        {/* Logout button — visible only when logged in */}
        <AnimatePresence>
          {isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              style={{ position: "relative" }}
            >
              <motion.button
                onClick={() => setConfirmLogout(s => !s)}
                className="premium-logout-btn"
                whileHover={{ scale: 1.18 }}
                whileTap={{ scale: 0.88 }}
                aria-label={lang === "es" ? "Cerrar sesión" : "Sign out"}
                title={lang === "es" ? "Cerrar sesión" : "Sign out"}
              >
                <LogOut size={11} />
              </motion.button>

              <AnimatePresence>
                {confirmLogout && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.93 }}
                    transition={{ duration: 0.18 }}
                    className="premium-logout-confirm"
                  >
                    <p>{lang === "es" ? "¿Cerrar sesión?" : "Sign out?"}</p>
                    <div className="premium-logout-confirm-btns">
                      <button
                        onClick={() => { logout(); setConfirmLogout(false); }}
                      >
                        {lang === "es" ? "Sí" : "Yes"}
                      </button>
                      <button onClick={() => setConfirmLogout(false)}>
                        {lang === "es" ? "No" : "No"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Login modal — rendered as portal at document.body */}
      <PremiumLoginModal />
    </>
  );
}
