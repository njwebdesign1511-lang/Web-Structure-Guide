import { motion } from "framer-motion";
import heroImg from "@/assets/images/hero.png";
import { useContent } from "@/contexts/ContentContext";
import WaterParticles from "@/components/ui/WaterParticles";

export default function Hero() {
  const { content } = useContent();
  const h = content.hero;

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-20">
      <div className="absolute inset-0 z-0 relative hero-shine overflow-hidden">
        <img
          src={heroImg}
          alt="Albert Auto Detailing Hero"
          className="w-full h-full object-cover hero-bg-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-black/40" />
        <WaterParticles />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-1.5 mb-6 border border-primary/30 bg-primary/10 text-primary font-bold tracking-widest text-xs uppercase rounded-sm"
          >
            {h.badge}
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="block"
            >
              {h.line1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500"
            >
              {h.line2}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="block"
            >
              <span className="text-primary">{h.line3_1}</span> {h.line3_2}
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl font-light"
          >
            {h.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#contact" className="btn-shine px-8 py-4 bg-primary text-white font-bold tracking-widest uppercase hover:bg-primary/90 transition-colors text-center rounded-sm">
              {h.btn1}
            </a>
            <a href="#services" className="btn-shine px-8 py-4 bg-transparent border border-white/20 text-white font-bold tracking-widest uppercase hover:bg-white/5 transition-colors text-center rounded-sm">
              {h.btn2}
            </a>
            <a href="#contact" className="btn-shine px-8 py-4 bg-secondary text-white font-bold tracking-widest uppercase hover:bg-secondary/90 transition-colors text-center rounded-sm">
              {h.btn3}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
