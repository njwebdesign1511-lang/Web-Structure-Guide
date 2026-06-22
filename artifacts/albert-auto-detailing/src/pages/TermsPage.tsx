import { useLanguage } from "@/contexts/LanguageContext";
import logoImg from "@assets/logo-transparent.png";

export default function TermsPage() {
  const { lang } = useLanguage();
  const isEs = lang === "es";

  return (
    <div className="min-h-screen font-sans" style={{ background: "#020C24", color: "#EAEAEA" }}>
      {/* Nav */}
      <header className="border-b py-4 px-6 flex items-center justify-between" style={{ borderColor: "rgba(79,126,184,0.20)" }}>
        <a href="/" className="flex items-center">
          <img src={logoImg} alt="Albert Auto Detailing" className="h-14 w-auto object-contain" />
        </a>
        <a href="/" className="text-sm transition-colors" style={{ color: "#4F7EB8" }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#EAEAEA")}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#4F7EB8")}
        >
          ← {isEs ? "Volver al inicio" : "Back to home"}
        </a>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-16 max-w-3xl">
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#D61C23" }}>Legal</p>
          <h1 className="text-4xl font-bold text-white mb-4">
            {isEs ? "Términos y Condiciones" : "Terms & Conditions"}
          </h1>
          <p className="text-sm" style={{ color: "#4F7EB8" }}>
            Albert Auto Detailing — Norwalk, CT &nbsp;·&nbsp; {isEs ? "Última actualización" : "Last updated"}: {new Date().getFullYear()}
          </p>
        </div>

        <div className="prose prose-invert max-w-none" style={{ color: "#EAEAEA" }}>
          <div className="rounded-sm p-5 mb-8" style={{ background: "rgba(214,28,35,0.07)", border: "1px solid rgba(214,28,35,0.20)" }}>
            <p className="text-sm" style={{ color: "#EAEAEA" }}>
              {isEs
                ? "⚠️ Estos términos y condiciones son una plantilla preliminar. El propietario del negocio debe revisarlos, personalizar los detalles y aprobarlos antes de publicarlos como política oficial."
                : "⚠️ These terms and conditions are a preliminary template. The business owner should review, customize the details, and approve them before publishing as an official policy."}
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3">{isEs ? "1. Uso del sitio web" : "1. Use of Website"}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isEs
                ? "Al acceder y utilizar este sitio web, aceptas estos términos y condiciones. Si no estás de acuerdo con alguna parte de los mismos, te pedimos que no utilices el sitio."
                : "By accessing and using this website, you agree to these terms and conditions. If you do not agree with any part of them, we ask that you do not use the site."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3">{isEs ? "2. Servicios" : "2. Services"}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isEs
                ? "Albert Auto Detailing ofrece servicios de detailing profesional para vehículos. Los precios y disponibilidad pueden variar según el vehículo, el servicio solicitado y la fecha. Todas las cotizaciones son personalizadas y deben ser confirmadas antes de realizar el trabajo."
                : "Albert Auto Detailing provides professional vehicle detailing services. Prices and availability may vary depending on the vehicle, requested service, and date. All quotes are personalized and must be confirmed before work is performed."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3">{isEs ? "3. Política de cancelación" : "3. Cancellation Policy"}</h2>
            <div className="rounded-sm p-4 mb-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(79,126,184,0.15)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#6FB5FF" }}>
                {isEs ? "Pendiente de aprobación del propietario" : "Pending owner approval"}
              </p>
              <p className="text-gray-500 text-sm">
                {isEs
                  ? "El propietario debe definir y aprobar la política de cancelación específica del negocio."
                  : "The owner must define and approve the specific cancellation policy for the business."}
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3">{isEs ? "4. Responsabilidad" : "4. Liability"}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isEs
                ? "Albert Auto Detailing tomará las precauciones necesarias para el cuidado de tu vehículo durante el servicio. Para reclamaciones, contáctanos directamente."
                : "Albert Auto Detailing will take necessary precautions for the care of your vehicle during service. For claims, please contact us directly."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3">{isEs ? "5. Contacto" : "5. Contact"}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isEs ? "Para preguntas sobre estos términos:" : "For questions about these terms:"}
            </p>
            <p className="text-sm mt-2" style={{ color: "#6FB5FF" }}>Albert Auto Detailing — Norwalk, CT</p>
          </section>
        </div>
      </main>

      <footer className="border-t py-6 text-center text-xs" style={{ borderColor: "rgba(79,126,184,0.15)", color: "#4F7EB8" }}>
        &copy; {new Date().getFullYear()} Albert Auto Detailing. {isEs ? "Todos los derechos reservados." : "All rights reserved."}
      </footer>
    </div>
  );
}
