import { motion, AnimatePresence } from "framer-motion";
import { usePremium } from "@/contexts/PremiumContext";

export default function PremiumToggle() {
  const { premiumMode, togglePremium } = usePremium();

  return (
    <motion.button
      onClick={togglePremium}
      className="premium-toggle"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      aria-label={premiumMode ? "Desactivar modo premium" : "Activar modo premium"}
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
          key={premiumMode ? "on" : "off"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="premium-toggle-text"
        >
          {premiumMode ? "Premium Activado" : "Experiencia Premium"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
