import { motion } from "framer-motion";
import { Truck } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

export default function MobileService() {
  const { content } = useContent();
  const m = content.mobileService;

  return (
    <section id="mobile-service" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center mb-8">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0px rgba(192,57,43,0)",
                  "0 0 25px rgba(192,57,43,0.45)",
                  "0 0 0px rgba(192,57,43,0)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 bg-background border border-primary/30 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(192,57,43,0.3)]"
            >
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
              >
                <Truck className="w-8 h-8 text-primary" />
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              style={{ originX: 0 }}
              className="w-16 h-0.5 bg-gradient-to-r from-red-600 to-blue-500 mx-auto mt-3 mb-2 rounded-full"
            />
          </div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6 uppercase"
          >
            {m.heading1} <span className="text-primary">{m.heading2}</span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 font-light"
          >
            {m.body}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#contact"
              className="btn-shine inline-block px-10 py-5 bg-primary text-white font-bold tracking-widest uppercase hover:bg-white hover:text-primary transition-colors rounded-sm shadow-xl"
            >
              {m.cta}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
