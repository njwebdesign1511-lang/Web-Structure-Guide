import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function MobileService() {
  return (
    <section id="mobile-service" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-background border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(192,57,43,0.3)]"
          >
            <MapPin className="w-8 h-8 text-primary" />
          </motion.div>
          
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6 uppercase"
          >
            Mobile Service <span className="text-primary">Available</span>
          </motion.h2>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 font-light"
          >
            We come to you! Enjoy professional auto detailing at your home, workplace, or preferred location. We bring our own premium supplies and equipment.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#contact"
              className="inline-block px-10 py-5 bg-primary text-white font-bold tracking-widest uppercase hover:bg-white hover:text-primary transition-colors rounded-sm shadow-xl"
            >
              Schedule Mobile Service
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
