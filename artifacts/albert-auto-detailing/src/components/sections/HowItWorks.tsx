import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const stepsEN = [
  { n: "01", title: "Request Info", desc: "Contact us via WhatsApp, phone, or the quote form." },
  { n: "02", title: "Vehicle Details", desc: "Share your vehicle's make, model, year, and current condition." },
  { n: "03", title: "Choose a Service", desc: "Select the detailing package or service that best fits your needs." },
  { n: "04", title: "Get Your Quote", desc: "We'll send you a personalized quote — no hidden fees." },
  { n: "05", title: "Confirm Your Appointment", desc: "Pick a date and time that works for you." },
  { n: "06", title: "We Do the Work", desc: "Our team performs the service with premium products and attention to every detail." },
  { n: "07", title: "Pick Up Your Vehicle", desc: "Enjoy a spotless, professionally detailed vehicle, ready to impress." },
];

const stepsES = [
  { n: "01", title: "Solicita Información", desc: "Contáctanos por WhatsApp, teléfono o el formulario de cotización." },
  { n: "02", title: "Datos del Vehículo", desc: "Comparte la marca, modelo, año y estado actual de tu vehículo." },
  { n: "03", title: "Elige un Servicio", desc: "Selecciona el paquete o servicio de detailing que mejor se adapte a tus necesidades." },
  { n: "04", title: "Recibe tu Cotización", desc: "Te enviamos una cotización personalizada — sin costos ocultos." },
  { n: "05", title: "Confirma tu Cita", desc: "Elige la fecha y hora que más te convenga." },
  { n: "06", title: "Realizamos el Trabajo", desc: "Nuestro equipo realiza el servicio con productos premium y atención a cada detalle." },
  { n: "07", title: "Recoge tu Vehículo", desc: "Disfruta tu vehículo impecable, con acabado profesional y listo para brillar." },
];

export default function HowItWorks() {
  const { lang } = useLanguage();
  const steps = lang === "es" ? stepsES : stepsEN;
  const eyebrow = lang === "es" ? "El Proceso" : "The Process";
  const heading = lang === "es" ? "¿Cómo Funciona?" : "How It Works";
  const sub = lang === "es"
    ? "De la solicitud al resultado — un proceso simple, claro y transparente."
    : "From request to result — a simple, clear, and transparent process.";

  return (
    <section id="process" className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#BBCFF0" }}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", top: "30%", right: "-10%", width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(29,63,117,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#FF2534" }}>{eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#020C24] mb-6">{heading}</h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{ background: "#FF2534" }} />
          <p className="text-gray-600 max-w-xl mx-auto">{sub}</p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line (desktop) */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(74,127,193,0.25) 10%, rgba(74,127,193,0.25) 90%, transparent)", transform: "translateX(-50%)" }}
          />

          <div className="flex flex-col gap-6 md:gap-8">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.06, ease: "easeOut" }}
                  className={`flex items-center gap-4 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Card */}
                  <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                    <div
                      className="inline-block rounded-sm p-5 md:p-6 max-w-sm w-full"
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #AABDE0",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                      }}
                    >
                      <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#FF2534" }}>{step.n}</p>
                      <h3 className="text-[#020C24] font-bold text-lg mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center circle */}
                  <div
                    className="relative z-10 hidden md:flex w-10 h-10 rounded-full items-center justify-center shrink-0"
                    style={{ background: "#FF2534", border: "3px solid #0d1e38", boxShadow: "0 0 0 2px rgba(214,28,35,0.30)" }}
                  >
                    <span className="text-white text-xs font-bold">{i + 1}</span>
                  </div>

                  {/* Mobile number bubble */}
                  <div
                    className="md:hidden w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "rgba(214,28,35,0.15)", border: "1px solid rgba(214,28,35,0.35)", color: "#FF2534" }}
                  >
                    <span className="text-sm font-bold">{i + 1}</span>
                  </div>

                  {/* Empty opposite side spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <a
            href="#quote"
            className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-sm transition-all"
            style={{ background: "#FF2534", color: "white" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#b91c1c"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#FF2534"; }}
          >
            {lang === "es" ? "Solicitar Cotización" : "Request a Quote"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
