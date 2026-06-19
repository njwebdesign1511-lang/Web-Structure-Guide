import { motion } from "framer-motion";
import heroImg from "@/assets/images/hero.png";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { content } = useContent();
  const { lang, t } = useLanguage();

  const h = content.hero;
  const badge    = lang === "es" ? t.hero.badge    : h.badge;
  const line1    = lang === "es" ? t.hero.line1    : h.line1;
  const line2    = lang === "es" ? t.hero.line2    : h.line2;
  const line3_1  = lang === "es" ? t.hero.line3_1  : h.line3_1;
  const line3_2  = lang === "es" ? t.hero.line3_2  : h.line3_2;
  const tagline  = lang === "es" ? t.hero.tagline  : h.tagline;
  const btn1     = lang === "es" ? t.hero.bookNow     : h.btn1;
  const btn2     = lang === "es" ? t.hero.viewServices : h.btn2;
  const btn3     = lang === "es" ? t.hero.contactUs   : h.btn3;

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-20">
      <div className="absolute inset-0 z-0">
        <img src={heroImg} alt="Albert Auto Detailing Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-block px-4 py-1.5 mb-6 border border-primary/30 bg-primary/10 text-primary font-bold tracking-widest text-xs uppercase rounded-sm">
            {badge}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            {line1}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{line2}</span><br />
            <span className="text-primary">{line3_1}</span> {line3_2}
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl font-light">{tagline}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="px-8 py-4 bg-primary text-white font-bold tracking-widest uppercase hover:bg-primary/90 transition-colors text-center rounded-sm">{btn1}</a>
            <a href="#services" className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold tracking-widest uppercase hover:bg-white/5 transition-colors text-center rounded-sm">{btn2}</a>
            <a href="#contact" className="px-8 py-4 bg-secondary text-white font-bold tracking-widest uppercase hover:bg-secondary/90 transition-colors text-center rounded-sm">{btn3}</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
