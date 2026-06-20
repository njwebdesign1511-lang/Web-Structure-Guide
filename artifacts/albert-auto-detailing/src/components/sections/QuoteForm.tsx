import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormData {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service: string;
  date: string;
  message: string;
}

const empty: FormData = { name: "", phone: "", email: "", vehicle: "", service: "", date: "", message: "" };

export default function QuoteForm() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const [form, setForm] = useState<FormData>(empty);
  const [sent, setSent] = useState(false);

  const q = content.quoteForm;
  const eyebrow = lang === "es" ? t.quoteForm.eyebrow : q.eyebrow;
  const heading  = lang === "es" ? t.quoteForm.heading  : q.heading;
  const body     = lang === "es" ? t.quoteForm.body     : q.body;
  const labels   = lang === "es" ? t.quoteForm : { name: "Full Name", phone: "Phone Number", email: "Email Address", vehicle: "Vehicle Make & Model", service: "Service Needed", date: "Preferred Date", message: "Additional Message", submit: "Send Request via WhatsApp" };
  const serviceOptions = lang === "es" ? [...t.quoteForm.serviceOptions] : [
    "Interior & Exterior Wash",
    "Paint Correction",
    "Ceramic Coating",
    "Headlight Restoration",
    "Engine Cleaning",
    "Leather Protection",
    "Stain Removal",
    "Full Detailing Package",
    "Other / Not sure",
  ];

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contact = content.contact as any;
    const waNumber = contact?.whatsapp ?? "14756898301";
    const msg = [
      `🚗 *Auto Detailing Quote Request*`,
      ``,
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      `*Email:* ${form.email}`,
      `*Vehicle:* ${form.vehicle}`,
      `*Service:* ${form.service}`,
      `*Preferred Date:* ${form.date}`,
      form.message ? `*Message:* ${form.message}` : "",
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputCls = "w-full bg-background border border-border rounded-sm px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary transition-colors";
  const labelCls = "block text-xs font-bold tracking-widest text-gray-500 uppercase mb-1.5";

  return (
    <section id="quote" className="py-24 md:py-32 bg-card border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/15 via-transparent to-transparent" />
      <div className="container mx-auto px-4 md:px-6 max-w-3xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-3">{eyebrow}</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{heading}</h3>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6" />
          <p className="text-gray-400 max-w-xl mx-auto">{body}</p>
        </div>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-background border border-border rounded-sm p-8 flex flex-col gap-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>{labels.name}</label>
              <input type="text" required value={form.name} onChange={set("name")} className={inputCls} placeholder="John Smith" />
            </div>
            <div>
              <label className={labelCls}>{labels.phone}</label>
              <input type="tel" required value={form.phone} onChange={set("phone")} className={inputCls} placeholder="(475) 000-0000" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>{labels.email}</label>
              <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="you@email.com" />
            </div>
            <div>
              <label className={labelCls}>{labels.vehicle}</label>
              <input type="text" required value={form.vehicle} onChange={set("vehicle")} className={inputCls} placeholder="2020 Toyota Camry" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>{labels.service}</label>
              <select required value={form.service} onChange={set("service")} className={inputCls}>
                <option value="">{lang === "es" ? "Selecciona un servicio" : "Select a service"}</option>
                {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>{labels.date}</label>
              <input type="date" value={form.date} onChange={set("date")} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>{labels.message}</label>
            <textarea value={form.message} onChange={set("message")} rows={4} className={`${inputCls} resize-none`} placeholder={lang === "es" ? "Información adicional sobre tu vehículo o servicio..." : "Any additional details about your vehicle or service needed..."} />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold tracking-widest uppercase transition-colors rounded-sm text-sm disabled:opacity-60"
          >
            {sent
              ? (lang === "es" ? "✓ Enviado — Redirigiendo a WhatsApp…" : "✓ Sent — Opening WhatsApp…")
              : (<><Send className="w-4 h-4" /> {labels.submit}</>)}
          </button>
          <p className="text-center text-xs text-gray-600">
            {lang === "es"
              ? "Al enviar, se abrirá WhatsApp con tu solicitud pre-escrita."
              : "Submitting will open WhatsApp with your request pre-filled for easy sending."}
          </p>
        </motion.form>
      </div>
    </section>
  );
}
