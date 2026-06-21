import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail, Instagram } from "lucide-react";
import logoImg from "@/assets/images/logo.png";

const WaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className ?? "w-4 h-4 fill-current"} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Footer() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const f = content.footer;
  const c = content.contact as any;

  const tagline = lang === "es" ? t.footer.tagline : f.tagline;
  const sub     = lang === "es" ? t.footer.sub     : f.sub;
  const rights  = lang === "es" ? t.footer.rights  : f.rights;
  const waText = c?.whatsappText ?? "Hi! I'd like to book a detailing service.";

  return (
    <footer className="pt-16 pb-8" style={{ background: "#020C24", borderTop: "1px solid rgba(79,126,184,0.20)" }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <a href="#home" className="flex items-center mb-3">
              <img src={logoImg} alt="Albert Auto Detailing" className="h-20 w-auto object-contain" />
            </a>
            <p className="text-sm tracking-widest uppercase mb-4" style={{ color: "#4F7EB8" }}>Est. 2023 · Norwalk, CT</p>
            <p className="text-sm leading-relaxed mb-1" style={{ color: "#EAEAEA" }}>{tagline}</p>
            <p className="text-sm" style={{ color: "#4F7EB8" }}>{sub}</p>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4" style={{ color: "#6FB5FF" }}>
              {lang === "es" ? "Contacto" : "Contact"}
            </h4>
            <div className="flex flex-col gap-3">
              {c?.whatsapp && (
                <a
                  href={`https://wa.me/${c.whatsapp}?text=${encodeURIComponent(waText)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors"
                  style={{ color: "#4F7EB8" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#D61C23")}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#4F7EB8")}
                >
                  <WaIcon className="w-4 h-4 fill-current" />
                  <span>WhatsApp: {c.phone}</span>
                </a>
              )}
              {c?.phone && (
                <a href={`tel:${String(c.phone).replace(/\D/g,"")}`} className="flex items-center gap-3 text-sm transition-colors"
                  style={{ color: "#4F7EB8" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF")}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#4F7EB8")}
                >
                  <Phone className="w-4 h-4" />
                  <span>{c.phone}</span>
                </a>
              )}
              {c?.email && (
                <a href={`mailto:${c.email}`} className="flex items-center gap-3 text-sm transition-colors"
                  style={{ color: "#4F7EB8" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF")}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#4F7EB8")}
                >
                  <Mail className="w-4 h-4" />
                  <span>{c.email}</span>
                </a>
              )}
              {c?.instagram && (
                <a href={`https://instagram.com/${c.instagram}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors"
                  style={{ color: "#4F7EB8" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF")}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#4F7EB8")}
                >
                  <Instagram className="w-4 h-4" />
                  <span>@{c.instagram}</span>
                </a>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-4" style={{ color: "#6FB5FF" }}>
              {lang === "es" ? "Servicios" : "Services"}
            </h4>
            <div className="flex flex-col gap-2">
              {["Interior & Exterior Wash","Paint Correction","Ceramic Coating","Headlight Restoration","Engine Cleaning","Leather Protection","Stain Removal"].map(s => (
                <a key={s} href="#services" className="text-sm transition-colors"
                  style={{ color: "#4F7EB8" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#EAEAEA")}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#4F7EB8")}
                >{s}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 text-center" style={{ borderTop: "1px solid rgba(79,126,184,0.15)" }}>
          <p className="text-xs" style={{ color: "#4F7EB8" }}>
            &copy; {new Date().getFullYear()} Albert Auto Detailing. {rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
