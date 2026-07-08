import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Policy {
  titleEs: string;
  titleEn: string;
  textEs: string;
  textEn: string;
}

const POLICIES: Policy[] = [
  {
    titleEs: "Citas y Reservaciones",
    titleEn: "Appointments & Reservations",
    textEs: "Todos los servicios se realizan únicamente con cita previa. Algunos servicios pueden requerir un depósito para asegurar la reservación. Los tiempos de servicio son estimados y pueden variar según las condiciones del vehículo.",
    textEn: "All services are by appointment only. Some services may require a deposit to secure the reservation. Service times are estimated and may vary depending on the condition of the vehicle.",
  },
  {
    titleEs: "Cancelaciones y Reprogramaciones",
    titleEn: "Cancellations & Rescheduling",
    textEs: "Las cancelaciones o cambios de cita deben realizarse con al menos 24 horas de anticipación. Las cancelaciones tardías o la ausencia a la cita pueden resultar en la pérdida del depósito.",
    textEn: "Cancellations or appointment changes must be made at least 24 hours in advance. Late cancellations or no-shows may result in forfeiture of the deposit.",
  },
  {
    titleEs: "Estado del Vehículo",
    titleEn: "Vehicle Condition",
    textEs: "El cliente debe informar cualquier daño preexistente, problemas mecánicos, eléctricos o condiciones especiales antes de iniciar el servicio. Albert Auto Detailing no se hace responsable por daños preexistentes, pintura deteriorada, piezas sueltas, accesorios defectuosos o fallas ocultas.",
    textEn: "The client must disclose any pre-existing damage, mechanical or electrical issues, or special conditions before the service begins. Albert Auto Detailing is not responsible for pre-existing damage, deteriorated paint, loose parts, defective accessories, or hidden flaws.",
  },
  {
    titleEs: "Objetos Personales",
    titleEn: "Personal Belongings",
    textEs: "Se recomienda retirar todos los objetos de valor antes del servicio. Albert Auto Detailing no se responsabiliza por artículos perdidos, dañados u olvidados dentro del vehículo.",
    textEn: "It is recommended to remove all valuables before the service. Albert Auto Detailing is not responsible for items that are lost, damaged, or left inside the vehicle.",
  },
  {
    titleEs: "Cargos Adicionales",
    titleEn: "Additional Charges",
    textEs: "Vehículos con exceso de suciedad, pelo de mascotas, manchas severas, derrames, olores fuertes o condiciones especiales pueden estar sujetos a cargos adicionales. Cualquier cargo extra será informado y aprobado por el cliente antes de comenzar el trabajo.",
    textEn: "Vehicles with excessive dirt, pet hair, severe stains, spills, strong odors, or special conditions may be subject to additional charges. Any extra charge will be communicated and approved by the client before work begins.",
  },
  {
    titleEs: "Pago",
    titleEn: "Payment",
    textEs: "El pago total debe realizarse al finalizar el servicio. Aceptamos efectivo, tarjetas de crédito y débito, Zelle y otros métodos de pago autorizados.",
    textEn: "Full payment is due upon completion of the service. We accept cash, credit and debit cards, Zelle, and other authorized payment methods.",
  },
  {
    titleEs: "Garantía de Satisfacción",
    titleEn: "Satisfaction Guarantee",
    textEs: "Si el cliente no está completamente satisfecho con el servicio recibido, deberá notificarnos dentro de las 48 horas posteriores para evaluar y ofrecer una solución adecuada.",
    textEn: "If the client is not fully satisfied with the service, they must notify us within 48 hours so we can evaluate and offer an appropriate solution.",
  },
  {
    titleEs: "Derecho de Rechazar Servicio",
    titleEn: "Right to Refuse Service",
    textEs: "Albert Auto Detailing se reserva el derecho de rechazar o cancelar cualquier servicio por razones de seguridad, condiciones extremas del vehículo o comportamiento inapropiado.",
    textEn: "Albert Auto Detailing reserves the right to refuse or cancel any service for reasons of safety, extreme vehicle conditions, or inappropriate behavior.",
  },
  {
    titleEs: "Protección del Vehículo",
    titleEn: "Vehicle Protection",
    textEs: "Utilizamos productos, equipos y técnicas profesionales para brindar el mejor cuidado posible. Sin embargo, no nos hacemos responsables por daños derivados de defectos preexistentes, desgaste normal o reparaciones anteriores de baja calidad.",
    textEn: "We use professional products, equipment, and techniques to provide the best possible care. However, we are not responsible for damage resulting from pre-existing defects, normal wear, or previous low-quality repairs.",
  },
  {
    titleEs: "Responsabilidad Limitada",
    titleEn: "Limited Liability",
    textEs: "Albert Auto Detailing no será responsable por daños ocasionados por fallas mecánicas, eléctricas, piezas sueltas, accesorios mal instalados o condiciones preexistentes que puedan verse afectadas durante el proceso de detallado.",
    textEn: "Albert Auto Detailing will not be liable for damage caused by mechanical or electrical failures, loose parts, improperly installed accessories, or pre-existing conditions that may be affected during the detailing process.",
  },
  {
    titleEs: "Fotografías y Promoción",
    titleEn: "Photography & Promotion",
    textEs: "Nos reservamos el derecho de tomar fotografías del vehículo antes, durante y después del servicio para fines de control de calidad, capacitación y promoción, salvo que el cliente solicite lo contrario por escrito.",
    textEn: "We reserve the right to photograph the vehicle before, during, and after the service for quality control, training, and promotional purposes, unless the client requests otherwise in writing.",
  },
  {
    titleEs: "Aceptación de Políticas",
    titleEn: "Policy Acceptance",
    textEs: "Al contratar cualquiera de nuestros servicios, el cliente reconoce haber leído, comprendido y aceptado estas políticas en su totalidad.",
    textEn: "By hiring any of our services, the client acknowledges having read, understood, and fully accepted these policies.",
  },
];

export default function Policies() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  const btnLabel   = lang === "es" ? (open ? "Ocultar políticas" : "Ver políticas") : (open ? "Hide policies" : "View policies");
  const heading    = lang === "es" ? "Políticas de Servicio" : "Service Policies";
  const disclaimer = lang === "es"
    ? "Al utilizar nuestros servicios, usted acepta los siguientes términos."
    : "By using our services, you agree to the following terms.";

  return (
    <section id="policies" className="py-10 md:py-14 relative" style={{ background: "#020C24" }}>
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">

        {/* Toggle button */}
        <div className="flex items-center justify-center">
          <button
            onClick={() => setOpen(v => !v)}
            className="flex items-center gap-2 px-6 py-3 font-bold text-sm tracking-widest uppercase transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#ffffff",
              borderRadius: "2px",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,37,52,0.15)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,37,52,0.4)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
            }}
          >
            {btnLabel}
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </button>
        </div>

        {/* Collapsible content */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="policies-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className="pt-10">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-center mb-10"
                >
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">{heading}</h2>
                  <div className="w-16 h-1 mx-auto mb-4" style={{ background: "#FF2534" }} />
                  <p className="text-white/50 text-sm max-w-xl mx-auto">{disclaimer}</p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {POLICIES.map((policy, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.12 + i * 0.04, ease: "easeOut" }}
                      className="rounded-sm p-4 flex gap-3"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <span
                        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                        style={{ background: "rgba(255,37,52,0.18)", color: "#FF2534", minWidth: "1.5rem" }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-white mb-1">
                          {lang === "es" ? policy.titleEs : policy.titleEn}
                        </h3>
                        <p className="text-white/55 text-sm leading-relaxed">
                          {lang === "es" ? policy.textEs : policy.textEn}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
