import { motion } from "framer-motion";
import { Phone, Mail, Instagram } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

const WaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Contact() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const c = content.contact as any;

  const eyebrow = lang === "es" ? t.contact.eyebrow : c.eyebrow;
  const heading  = lang === "es" ? t.contact.heading  : c.heading;
  const body     = lang === "es" ? t.contact.body     : c.body;
  const esMethods = t.contact.methods;
  const waText = c?.whatsappText ?? "Hi! I'd like to book a detailing service.";

  const methods = [
    {
      Icon: WaIcon,
      title: lang === "es" ? esMethods[0].title : "WhatsApp",
      value: c.phone,
      href: `https://wa.me/${c.whatsapp ?? "14756898301"}?text=${encodeURIComponent(waText)}`,
      actionText: lang === "es" ? esMethods[0].actionText : "Message Us",
      show: !!c.whatsapp,
      cardStyle: { background: "rgba(214,28,35,0.08)", border: "1px solid rgba(214,28,35,0.25)" } as React.CSSProperties,
      cardHoverBorder: "rgba(214,28,35,0.55)",
      iconStyle: { background: "rgba(214,28,35,0.15)" } as React.CSSProperties,
    },
    {
      Icon: () => <Phone className="w-8 h-8" style={{ color: "#6FB5FF" }} />,
      title: lang === "es" ? esMethods[1].title : "Call Us",
      value: c.phone,
      href: `tel:${String(c.phone).replace(/\D/g, "")}`,
      actionText: lang === "es" ? esMethods[1].actionText : c.callLabel,
      show: !!c.phone,
      cardStyle: { background: "#071B45", border: "1px solid rgba(79,126,184,0.22)" } as React.CSSProperties,
      cardHoverBorder: "rgba(79,126,184,0.55)",
      iconStyle: { background: "rgba(79,126,184,0.12)" } as React.CSSProperties,
    },
    {
      Icon: () => <Mail className="w-8 h-8" style={{ color: "#6FB5FF" }} />,
      title: lang === "es" ? esMethods[2].title : "Email",
      value: c.email,
      href: `mailto:${c.email}`,
      actionText: lang === "es" ? esMethods[2].actionText : c.emailLabel,
      show: !!c.email,
      cardStyle: { background: "#071B45", border: "1px solid rgba(79,126,184,0.22)" } as React.CSSProperties,
      cardHoverBorder: "rgba(79,126,184,0.55)",
      iconStyle: { background: "rgba(79,126,184,0.12)" } as React.CSSProperties,
    },
    {
      Icon: () => <Instagram className="w-8 h-8" style={{ color: "#6FB5FF" }} />,
      title: lang === "es" ? esMethods[3].title : "Instagram",
      value: `@${c.instagram}`,
      href: `https://instagram.com/${c.instagram}`,
      actionText: lang === "es" ? esMethods[3].actionText : c.instagramLabel,
      show: !!c.instagram,
      cardStyle: { background: "#071B45", border: "1px solid rgba(79,126,184,0.22)" } as React.CSSProperties,
      cardHoverBorder: "rgba(79,126,184,0.55)",
      iconStyle: { background: "rgba(79,126,184,0.12)" } as React.CSSProperties,
    },
  ].filter(m => m.show);

  return (
    <section id="contact" className="py-24 md:py-32 relative" style={{ background: "#0D2D6B" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at bottom, rgba(214,28,35,0.08) 0%, transparent 60%)" }} />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">{eyebrow}</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{heading}</h3>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="max-w-2xl mx-auto" style={{ color: "#EAEAEA" }}>{body}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {methods.map((method, index) => (
            <motion.a
              key={index}
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-sm p-7 transition-all group text-center flex flex-col items-center justify-center min-h-[220px]"
              style={method.cardStyle}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = method.cardHoverBorder)}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = (method.cardStyle.border as string).replace("1px solid ", ""))}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-colors" style={method.iconStyle}>
                <method.Icon />
              </div>
              <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">{method.title}</h4>
              <p className="mb-5 text-xs break-all" style={{ color: "#4F7EB8" }}>{method.value}</p>
              <span className="text-primary font-bold text-xs tracking-widest uppercase group-hover:text-white transition-colors mt-auto">
                {method.actionText} →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
