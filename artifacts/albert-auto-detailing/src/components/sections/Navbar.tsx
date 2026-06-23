import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/contexts/ContentContext";
import logoImg from "@assets/logo-transparent.png";

const WaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, t, toggle } = useLanguage();
  const { content } = useContent();

  const links = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.services, href: "#services" },
    { name: t.nav.gallery, href: "#gallery" },
    { name: t.nav.faq, href: "#faq" },
    { name: t.nav.contact, href: "#contact" },
  ];

  const c = content.contact as any;
  const waNumber = c?.whatsapp ?? "14756898301";
  const waText   = c?.whatsappText ?? "Hi! I'd like to book a detailing service.";
  const waHref   = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "py-4" : "py-6"}`}
      style={scrolled ? { background: "rgba(0,24,48,0.94)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(20,96,160,0.20)" } : { background: "transparent" }}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center">
          <img src={logoImg} alt="Albert Auto Detailing" className="h-14 md:h-16 w-auto object-contain" />
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="nav-link text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-widest">
              {link.name}
            </a>
          ))}
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 transition-colors rounded-sm px-3 py-1.5 text-xs font-bold tracking-widest uppercase"
            style={{ border: "1px solid rgba(20,96,160,0.40)", background: "rgba(0,59,122,0.40)" }}
            aria-label="Switch language"
          >
            <Globe size={14} style={{ color: "#4d8fd4" }} />
            <span style={{ color: lang === "en" ? "#FFFFFF" : "rgba(137,171,218,0.55)" }}>EN</span>
            <span style={{ color: "rgba(137,171,218,0.35)", fontSize: "0.65rem" }}>|</span>
            <span style={{ color: lang === "es" ? "#FFFFFF" : "rgba(137,171,218,0.55)" }}>ES</span>
          </button>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="site-btn px-5 py-2 text-white text-sm font-bold tracking-wider uppercase rounded-sm flex items-center gap-2"
            style={{ background: "#FF2534" }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#C41C27")}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#FF2534")}
          >
            <WaIcon /> {t.nav.bookNow}
          </a>
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggle}
            className="flex items-center gap-1 text-xs font-bold tracking-widest uppercase rounded-sm px-2 py-1.5"
            style={{ border: "1px solid rgba(20,96,160,0.40)", background: "rgba(0,59,122,0.40)" }}
            aria-label="Switch language"
          >
            <Globe size={12} style={{ color: "#4d8fd4" }} />
            <span style={{ color: lang === "en" ? "#FFFFFF" : "rgba(137,171,218,0.55)" }}>EN</span>
            <span style={{ color: "rgba(137,171,218,0.35)", fontSize: "0.6rem" }}>|</span>
            <span style={{ color: lang === "es" ? "#FFFFFF" : "rgba(137,171,218,0.55)" }}>ES</span>
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
            className="absolute top-full left-0 w-full shadow-2xl md:hidden"
            style={{ background: "#001830", borderBottom: "1px solid rgba(20,96,160,0.20)" }}
          >
            <nav className="flex flex-col py-6 px-6 gap-5">
              {links.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/70 hover:text-white transition-colors uppercase tracking-widest">
                  {link.name}
                </a>
              ))}
              <a
                href="#quote"
                onClick={() => setMobileMenuOpen(false)}
                className="site-btn px-6 py-3 text-white text-center text-sm font-bold tracking-wider uppercase rounded-sm"
                style={{ background: "#1460a0" }}
              >
                {lang === "es" ? "Solicitar Cotización" : "Get Free Quote"}
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="site-btn px-6 py-3 text-white text-center text-sm font-bold tracking-wider uppercase rounded-sm"
                style={{ background: "#FF2534" }}
              >
                WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
