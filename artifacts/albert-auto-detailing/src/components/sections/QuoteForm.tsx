import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormData {
  name: string;
  phone: string;
  email: string;
  make: string;
  model: string;
  year: string;
  service: string;
  date: string;
  message: string;
}

const empty: FormData = { name: "", phone: "", email: "", make: "", model: "", year: "", service: "", date: "", message: "" };

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 35 }, (_, i) => String(CURRENT_YEAR - i));

export default function QuoteForm() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const [form, setForm] = useState<FormData>(empty);
  const [sent, setSent] = useState(false);

  const q = content.quoteForm;
  const eyebrow = lang === "es" ? t.quoteForm.eyebrow : q.eyebrow;
  const heading  = lang === "es" ? t.quoteForm.heading  : q.heading;
  const body     = lang === "es" ? t.quoteForm.body     : q.body;

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

  const L = lang === "es" ? {
    name: "Nombre Completo", phone: "Teléfono", email: "Correo Electrónico",
    make: "Marca del Vehículo", model: "Modelo", year: "Año",
    service: "Servicio que Necesita", date: "Fecha Preferida",
    message: "Mensaje Adicional", submit: "Enviar Solicitud por WhatsApp",
    selectService: "Selecciona un servicio", selectYear: "Año",
  } : {
    name: "Full Name", phone: "Phone Number", email: "Email Address",
    make: "Vehicle Make", model: "Model", year: "Year",
    service: "Service Needed", date: "Preferred Date",
    message: "Additional Message", submit: "Send Request via WhatsApp",
    selectService: "Select a service", selectYear: "Year",
  };

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const c = content.contact as any;
    const waNumber = c?.whatsapp ?? "14756898301";
    const vehicleInfo = [form.year, form.make, form.model].filter(Boolean).join(" ");
    const msg = [
      `🚗 *Auto Detailing Quote Request*`,
      ``,
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      form.email ? `*Email:* ${form.email}` : "",
      vehicleInfo ? `*Vehicle:* ${vehicleInfo}` : "",
      form.service ? `*Service:* ${form.service}` : "",
      form.date ? `*Preferred Date:* ${form.date}` : "",
      form.message ? `*Message:* ${form.message}` : "",
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputCls = "w-full border rounded-sm px-4 py-3 text-white text-sm placeholder-[#4F7EB8] focus:outline-none transition-colors";
  const inputStyle = { background: "#020C24", borderColor: "rgba(79,126,184,0.30)" };
  const focusIn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => (e.currentTarget.style.borderColor = "#D61C23");
  const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => (e.currentTarget.style.borderColor = "rgba(79,126,184,0.30)");
  const labelCls = "block text-xs font-bold tracking-widest uppercase mb-1.5";
  const labelStyle = { color: "#6FB5FF" };

  return (
    <section id="quote" className="py-24 md:py-32 border-t border-border relative overflow-hidden" style={{ background: "#0D2D6B" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at bottom left, rgba(214,28,35,0.07) 0%, transparent 60%)" }} />
      <div className="container mx-auto px-4 md:px-6 max-w-3xl relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#6FB5FF" }}>{eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{heading}</h2>
          <div className="w-20 h-px mx-auto mb-6" style={{ background: "linear-gradient(to right, transparent, #4F7EB8, transparent)" }} />
          <p className="max-w-xl mx-auto italic" style={{ color: "#EAEAEA", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05rem" }}>{body}</p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-sm p-8 flex flex-col gap-5"
          style={{ background: "#020C24", border: "1px solid rgba(79,126,184,0.25)" }}
        >
          {/* Name + Phone */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls} style={labelStyle}>{L.name}</label>
              <input type="text" required value={form.name} onChange={set("name")} className={inputCls} style={inputStyle}
                placeholder="John Smith" onFocus={focusIn} onBlur={focusOut} />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>{L.phone}</label>
              <input type="tel" required value={form.phone} onChange={set("phone")} className={inputCls} style={inputStyle}
                placeholder="(475) 689-8301" onFocus={focusIn} onBlur={focusOut} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={labelCls} style={labelStyle}>{L.email}</label>
            <input type="email" value={form.email} onChange={set("email")} className={inputCls} style={inputStyle}
              placeholder="you@email.com" onFocus={focusIn} onBlur={focusOut} />
          </div>

          {/* Vehicle: Make / Model / Year */}
          <div>
            <label className={labelCls} style={labelStyle}>
              {lang === "es" ? "Información del Vehículo" : "Vehicle Information"}
            </label>
            <div className="grid grid-cols-3 gap-3">
              <input type="text" value={form.make} onChange={set("make")} required className={inputCls} style={inputStyle}
                placeholder={L.make} onFocus={focusIn} onBlur={focusOut} />
              <input type="text" value={form.model} onChange={set("model")} required className={inputCls} style={inputStyle}
                placeholder={L.model} onFocus={focusIn} onBlur={focusOut} />
              <select value={form.year} onChange={set("year")} className={inputCls}
                style={{ ...inputStyle, color: form.year ? "#FFFFFF" : "#4F7EB8" }}
                onFocus={focusIn} onBlur={focusOut}>
                <option value="">{L.selectYear}</option>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Service + Date */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls} style={labelStyle}>{L.service}</label>
              <select required value={form.service} onChange={set("service")} className={inputCls}
                style={{ ...inputStyle, color: form.service ? "#FFFFFF" : "#4F7EB8" }}
                onFocus={focusIn} onBlur={focusOut}>
                <option value="">{L.selectService}</option>
                {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>{L.date}</label>
              <input type="date" value={form.date} onChange={set("date")} className={inputCls} style={inputStyle}
                onFocus={focusIn} onBlur={focusOut} />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className={labelCls} style={labelStyle}>{L.message}</label>
            <textarea value={form.message} onChange={set("message")} rows={4}
              className={`${inputCls} resize-none`} style={inputStyle}
              placeholder={lang === "es" ? "Información adicional sobre tu vehículo o servicio..." : "Any additional details about your vehicle or service..."}
              onFocus={focusIn} onBlur={focusOut} />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-3 px-8 py-4 text-white font-bold tracking-widest uppercase transition-colors rounded-sm text-sm"
            style={{ background: "#D61C23" }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#8E0D13")}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#D61C23")}
          >
            {sent
              ? (lang === "es" ? "✓ Enviado — Abriendo WhatsApp…" : "✓ Sent — Opening WhatsApp…")
              : (<><Send className="w-4 h-4" /> {L.submit}</>)}
          </button>

          <p className="text-center text-xs" style={{ color: "#4F7EB8" }}>
            {lang === "es"
              ? "Al enviar, se abrirá WhatsApp con tu solicitud pre-escrita. Sin compromiso."
              : "Submitting opens WhatsApp with your request pre-filled. No obligation."}
          </p>
        </motion.form>
      </div>
    </section>
  );
}
