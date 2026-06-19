import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, t, toggle } = useLanguage();

  const links = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.services, href: "#services" },
    { name: t.nav.mobile, href: "#mobile-service" },
    { name: t.nav.gallery, href: "#gallery" },
    { name: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#home" className="text-xl md:text-2xl font-display font-bold text-white tracking-wider flex items-center gap-2">
          ALBERT<span className="text-primary">AUTO</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link-animated text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={toggle}
            className="text-sm font-bold tracking-widest uppercase text-gray-300 hover:text-white transition-colors border border-white/20 px-3 py-1 rounded-sm hover:border-white/50"
            aria-label="Switch language"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
          <a
            href="#contact"
            className="btn-shine px-6 py-2 bg-primary text-white text-sm font-bold tracking-wider uppercase hover:bg-primary/90 transition-colors rounded-sm"
          >
            {t.nav.bookNow}
          </a>
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggle}
            className="text-xs font-bold tracking-widest uppercase text-gray-300 border border-white/20 px-2 py-1 rounded-sm"
            aria-label="Switch language"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
          <button className="text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b border-border shadow-2xl md:hidden"
          >
            <nav className="flex flex-col py-6 px-6 gap-6">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="nav-link-animated text-lg font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-shine px-6 py-3 bg-primary text-white text-center text-sm font-bold tracking-wider uppercase hover:bg-primary/90 transition-colors rounded-sm mt-4"
              >
                {t.nav.bookNow}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
