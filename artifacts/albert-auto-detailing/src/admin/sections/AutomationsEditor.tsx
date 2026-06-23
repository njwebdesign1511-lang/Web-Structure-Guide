import { CheckCircle, Clock, MessageSquare, Phone, Mail, AlertCircle, Zap } from "lucide-react";

interface AutoItem {
  label: string;
  desc: string;
  status: "active" | "ready" | "pending";
  icon: any;
}

const autos: AutoItem[] = [
  {
    icon: MessageSquare,
    label: "WhatsApp automático al enviar formulario",
    desc: "Cuando un cliente envía el formulario de cotización, se abre WhatsApp con los datos del cliente pre-cargados.",
    status: "active",
  },
  {
    icon: CheckCircle,
    label: "Registro de leads en base de datos",
    desc: "Cada formulario enviado se guarda automáticamente con nombre, teléfono, email, vehículo, servicio y fecha.",
    status: "active",
  },
  {
    icon: CheckCircle,
    label: "Reseñas de clientes en tiempo real",
    desc: "Las reseñas enviadas por clientes se publican automáticamente en la sección de testimonios.",
    status: "active",
  },
  {
    icon: Mail,
    label: "Email de bienvenida al cliente",
    desc: "Enviar automáticamente un correo al cliente confirmando su solicitud de cotización.",
    status: "pending",
  },
  {
    icon: Clock,
    label: "Recordatorio 48h antes de la cita",
    desc: "Notificar al cliente 2 días antes de su cita programada.",
    status: "pending",
  },
  {
    icon: Clock,
    label: "Recordatorio 24h antes de la cita",
    desc: "Notificar al cliente 1 día antes de su cita programada.",
    status: "pending",
  },
  {
    icon: Clock,
    label: "Recordatorio 2h antes de la cita",
    desc: "Última notificación antes de la cita.",
    status: "pending",
  },
  {
    icon: Mail,
    label: "Seguimiento post-servicio",
    desc: "Enviar agradecimiento y solicitud de reseña después del servicio.",
    status: "pending",
  },
  {
    icon: Mail,
    label: "Recuperación de clientes inactivos",
    desc: "Enviar correos automáticos a clientes que no han visitado en 30, 60 o 90 días.",
    status: "pending",
  },
];

const statusConfig = {
  active: { label: "Activo", color: "#4ade80", bg: "rgba(74,222,128,0.08)", border: "rgba(74,222,128,0.20)" },
  ready:  { label: "Listo", color: "#89abda", bg: "rgba(29,63,117,0.10)", border: "rgba(74,127,193,0.20)" },
  pending:{ label: "Próximamente", color: "#6b7280", bg: "rgba(107,114,128,0.08)", border: "rgba(107,114,128,0.15)" },
};

export default function AutomationsEditor() {
  const active = autos.filter(a => a.status === "active");
  const pending = autos.filter(a => a.status !== "active");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Automatizaciones</h1>
        <p className="text-gray-500 text-sm">Estado de las automatizaciones del sitio web</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#111827] border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: "#4ade80" }}>{active.length}</div>
          <div className="text-xs text-gray-500 mt-1">Activas</div>
        </div>
        <div className="bg-[#111827] border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-500">{pending.length}</div>
          <div className="text-xs text-gray-500 mt-1">Próximamente</div>
        </div>
        <div className="bg-[#111827] border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{autos.length}</div>
          <div className="text-xs text-gray-500 mt-1">Total</div>
        </div>
      </div>

      {/* Active automations */}
      <div className="mb-5">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Automatizaciones Activas</p>
        <div className="flex flex-col gap-3">
          {active.map((a, i) => {
            const s = statusConfig[a.status];
            return (
              <div key={i} className="bg-[#111827] border rounded-xl p-5 flex items-start gap-4" style={{ borderColor: s.border, background: s.bg }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(74,222,128,0.12)" }}>
                  <a.icon size={16} style={{ color: s.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <p className="text-white font-semibold text-sm">{a.label}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                      {s.label}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{a.desc}</p>
                </div>
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 animate-pulse" style={{ background: s.color }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Pending automations */}
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Próximamente</p>
        <div className="flex flex-col gap-2">
          {pending.map((a, i) => {
            const s = statusConfig[a.status];
            return (
              <div key={i} className="bg-[#111827] border border-white/5 rounded-xl p-4 flex items-start gap-4 opacity-60">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <a.icon size={14} className="text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-400 font-medium text-sm">{a.label}</p>
                  <p className="text-gray-600 text-xs leading-relaxed mt-0.5">{a.desc}</p>
                </div>
                <span className="text-xs text-gray-600 shrink-0 mt-0.5">Próx.</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Email setup notice */}
      <div className="bg-[#111827] border border-yellow-500/20 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <AlertCircle size={16} className="text-yellow-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-yellow-400 font-semibold text-sm mb-1">Para activar correos automáticos</p>
            <p className="text-gray-500 text-xs leading-relaxed">
              Las automatizaciones de email requieren configurar un servicio de envío (Resend, SendGrid o SMTP). Contacta al desarrollador del sitio para activar esta funcionalidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
