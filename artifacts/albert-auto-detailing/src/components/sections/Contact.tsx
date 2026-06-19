import { motion } from "framer-motion";
import { Phone, Mail, Instagram } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

export default function Contact() {
  const { content } = useContent();
  const c = content.contact;

  const methods = [
    {
      icon: Phone,
      title: "Call Us",
      value: c.phone,
      href: `tel:${c.phone.replace(/\D/g, "")}`,
      actionText: c.callLabel,
      show: !!c.phone,
    },
    {
      icon: Mail,
      title: "Email",
      value: c.email,
      href: `mailto:${c.email}`,
      actionText: c.emailLabel,
      show: !!c.email,
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: `@${c.instagram}`,
      href: `https://instagram.com/${c.instagram}`,
      actionText: c.instagramLabel,
      show: !!c.instagram,
    },
  ].filter(m => m.show);

  return (
    <section id="contact" className="py-24 md:py-32 bg-card relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">{c.eyebrow}</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{c.heading}</h3>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto">{c.body}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
              className="bg-background border border-border p-8 rounded-sm hover:border-primary transition-all group text-center flex flex-col items-center justify-center min-h-[240px]"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <method.icon className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{method.title}</h4>
              <p className="text-gray-400 mb-6 text-sm break-all">{method.value}</p>
              <span className="text-primary font-bold text-sm tracking-widest uppercase group-hover:text-white transition-colors mt-auto">
                {method.actionText} &rarr;
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
