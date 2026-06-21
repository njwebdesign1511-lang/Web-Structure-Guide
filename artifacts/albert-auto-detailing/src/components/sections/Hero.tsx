import { motion } from "framer-motion";
import heroImg from "@/assets/images/hero.jpg";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

const WaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Hero() {
  const { content } = useContent();
  const { lang, t } = useLanguage();

  const h = content.hero;
  const badge   = lang === "es" ? t.hero.badge   : h.badge;
  const line1   = lang === "es" ? t.hero.line1   : h.line1;
  const line2   = lang === "es" ? t.hero.line2   : h.line2;
  const line3_1 = lang === "es" ? t.hero.line3_1 : h.line3_1;
  const line3_2 = lang === "es" ? t.hero.line3_2 : h.line3_2;
  const tagline = lang === "es" ? t.hero.tagline : h.tagline;
  const btn1    = lang === "es" ? t.hero.bookNow      : h.btn1;
  const btn2    = lang === "es" ? t.hero.viewServices : h.btn2;
  const btn3    = lang === "es" ? t.hero.contactUs    : h.btn3;

  const c = content.contact as any;
  const waNumber = c?.whatsapp ?? "14756898301";
  const waText   = c?.whatsappText ?? "Hi! I'd like to book a detailing service.";

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-20" style={{ background: "#020C24" }}>
      <div className="absolute inset-0 z-0">
        <img src={heroImg} alt="Albert Auto Detailing Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(4,21,53,0.92) 0%, rgba(4,21,53,0.70) 50%, rgba(4,21,53,0.15) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "rgba(4,21,53,0.30)" }} />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-block px-4 py-1.5 mb-6 font-bold tracking-widest text-xs uppercase rounded-sm" style={{ border: "1px solid rgba(214,28,35,0.35)", background: "rgba(214,28,35,0.10)", color: "#D61C23" }}>
            {badge}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            {line1}<br />
            <span style={{ color: "#EAEAEA", opacity: 0.7 }}>{line2}</span><br />
            <span style={{ color: "#D61C23" }}>{line3_1}</span> {line3_2}
          </h1>
          <p className="text-lg md:text-2xl mb-10 max-w-2xl font-light" style={{ color: "#EAEAEA" }}>{tagline}</p>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <a
              href="#quote"
              className="px-8 py-4 text-white font-bold tracking-widest uppercase text-center rounded-sm transition-colors"
              style={{ background: "#D61C23" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#8E0D13")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#D61C23")}
            >
              {btn1}
            </a>
            <a
              href="#services"
              className="px-8 py-4 text-white font-bold tracking-widest uppercase text-center rounded-sm transition-colors"
              style={{ background: "transparent", border: "1px solid rgba(79,126,184,0.40)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(79,126,184,0.10)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(79,126,184,0.70)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(79,126,184,0.40)"; }}
            >
              {btn2}
            </a>
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-white font-bold tracking-widest uppercase text-center rounded-sm flex items-center justify-center gap-2 transition-colors"
              style={{ background: "#4F7EB8" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#6FB5FF")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#4F7EB8")}
            >
              <WaIcon /> {btn3}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
