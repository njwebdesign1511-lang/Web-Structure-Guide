import { useLanguage } from "@/contexts/LanguageContext";
import logoImg from "@assets/logo-transparent.png";

export default function PrivacyPage() {
  const { lang } = useLanguage();
  const isEs = lang === "es";

  return (
    <div className="min-h-screen font-sans" style={{ background: "#020C24", color: "#EAEAEA" }}>
      {/* Nav */}
      <header className="border-b py-4 px-6 flex items-center justify-between" style={{ borderColor: "rgba(79,126,184,0.20)" }}>
        <a href="/" className="flex items-center">
          <img src={logoImg} alt="Albert Auto Detailing" className="h-14 w-auto object-contain" />
        </a>
        <a href="/" className="text-sm transition-colors" style={{ color: "#3D94FF" }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#EAEAEA")}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#3D94FF")}
        >
          ← {isEs ? "Volver al inicio" : "Back to home"}
        </a>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-16 max-w-3xl">
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#FF2534" }}>Legal</p>
          <h1 className="text-4xl font-bold text-white mb-4">
            {isEs ? "Política de Privacidad" : "Privacy Policy"}
          </h1>
          <p className="text-sm" style={{ color: "#3D94FF" }}>
            Albert Auto Detailing — Norwalk, CT &nbsp;·&nbsp; {isEs ? "Última actualización" : "Last updated"}: {new Date().getFullYear()}
          </p>
        </div>

        <div className="prose prose-invert max-w-none" style={{ color: "#EAEAEA" }}>
          <div className="rounded-sm p-5 mb-8" style={{ background: "rgba(214,28,35,0.07)", border: "1px solid rgba(214,28,35,0.20)" }}>
            <p className="text-sm" style={{ color: "#EAEAEA" }}>
              {isEs
                ? "⚠️ Esta política de privacidad es una plantilla preliminar. El propietario del negocio debe revisarla, personalizar los detalles específicos y aprobarla antes de publicarla como política oficial."
                : "⚠️ This privacy policy is a preliminary template. The business owner should review, customize the specific details, and approve it before publishing as an official policy."}
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3">{isEs ? "1. Información que recopilamos" : "1. Information We Collect"}</h2>
            <p className="text-gray-400 mb-3 leading-relaxed">
              {isEs
                ? "Cuando utilizas nuestro sitio web o formulario de cotización, podemos recopilar la siguiente información:"
                : "When you use our website or quote form, we may collect the following information:"}
            </p>
            <ul className="list-disc pl-6 text-gray-400 flex flex-col gap-1 text-sm">
              <li>{isEs ? "Nombre completo" : "Full name"}</li>
              <li>{isEs ? "Número de teléfono" : "Phone number"}</li>
              <li>{isEs ? "Correo electrónico" : "Email address"}</li>
              <li>{isEs ? "Información del vehículo (marca, modelo, año)" : "Vehicle information (make, model, year)"}</li>
              <li>{isEs ? "Servicio solicitado" : "Requested service"}</li>
              <li>{isEs ? "Mensajes y comunicaciones" : "Messages and communications"}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3">{isEs ? "2. Cómo usamos tu información" : "2. How We Use Your Information"}</h2>
            <ul className="list-disc pl-6 text-gray-400 flex flex-col gap-1 text-sm">
              <li>{isEs ? "Para preparar y enviar cotizaciones" : "To prepare and send quotes"}</li>
              <li>{isEs ? "Para confirmar y gestionar citas" : "To confirm and manage appointments"}</li>
              <li>{isEs ? "Para comunicarnos contigo sobre tus servicios" : "To communicate with you about your services"}</li>
              <li>{isEs ? "Para mejorar nuestros servicios" : "To improve our services"}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3">{isEs ? "3. Compartir información" : "3. Sharing Information"}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isEs
                ? "No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto cuando sea necesario para proporcionar los servicios solicitados o cuando la ley lo requiera."
                : "We do not sell, rent, or share your personal information with third parties, except as necessary to provide the requested services or as required by law."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3">{isEs ? "4. Seguridad de la información" : "4. Information Security"}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isEs
                ? "Tomamos medidas razonables para proteger tu información personal contra acceso no autorizado, uso indebido o divulgación."
                : "We take reasonable measures to protect your personal information against unauthorized access, misuse, or disclosure."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3">{isEs ? "5. Tus derechos" : "5. Your Rights"}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isEs
                ? "Puedes solicitar acceso, corrección o eliminación de tu información personal contactándonos directamente."
                : "You may request access, correction, or deletion of your personal information by contacting us directly."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3">{isEs ? "6. Contacto" : "6. Contact"}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isEs
                ? "Para preguntas sobre esta política, contáctanos en:"
                : "For questions about this policy, contact us at:"}
            </p>
            <p className="text-sm mt-2" style={{ color: "#85CCFF" }}>Albert Auto Detailing — Norwalk, CT</p>
          </section>
        </div>
      </main>

      <footer className="border-t py-6 text-center text-xs" style={{ borderColor: "rgba(79,126,184,0.15)", color: "#3D94FF" }}>
        &copy; {new Date().getFullYear()} Albert Auto Detailing. {isEs ? "Todos los derechos reservados." : "All rights reserved."}
      </footer>
    </div>
  );
}
