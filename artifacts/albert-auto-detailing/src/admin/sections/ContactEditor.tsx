import { useContent } from "@/contexts/ContentContext";
import type { SiteContent } from "@/lib/defaultContent";

function Field({ label, value, onChange, placeholder = "", type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0a0d14] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
      />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl p-6 mb-4">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <span className="w-1.5 h-4 bg-red-500 rounded-full" /> {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

export default function ContactEditor() {
  const { content, setContent } = useContent();

  const update = (field: keyof SiteContent["contact"], value: string) => {
    const next = structuredClone(content);
    (next.contact as any)[field] = value;
    setContent(next);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Contacto y Redes</h1>
      <p className="text-gray-500 text-sm mb-6">Actualiza la informacion de contacto y redes sociales</p>

      <Section title="Informacion de Contacto">
        <Field label="Telefono" value={content.contact.phone} onChange={v => update("phone", v)} placeholder="475-689-8301" />
        <Field label="WhatsApp (solo numeros)" value={content.contact.whatsapp} onChange={v => update("whatsapp", v)} placeholder="14756898301" />
        <Field label="Correo electronico" value={content.contact.email} onChange={v => update("email", v)} type="email" placeholder="tu@email.com" />
        <Field label="Direccion" value={content.contact.address} onChange={v => update("address", v)} placeholder="Tu direccion" />
        <Field label="Horario de atencion" value={content.contact.hours} onChange={v => update("hours", v)} placeholder="Lun-Sab 8am-6pm" />
      </Section>

      <Section title="Redes Sociales">
        <Field label="Instagram (sin @)" value={content.contact.instagram} onChange={v => update("instagram", v)} placeholder="albert_auto_detailing" />
        <Field label="Facebook (usuario o URL)" value={content.contact.facebook} onChange={v => update("facebook", v)} placeholder="AlbertAutoDetailing" />
        <Field label="TikTok (sin @)" value={content.contact.tiktok} onChange={v => update("tiktok", v)} placeholder="albert_auto_detailing" />
      </Section>

      <div className="bg-[#111827] border border-white/10 rounded-xl p-6 mb-4">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-red-500 rounded-full" /> Textos de Botones
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Boton llamada" value={content.contact.callLabel} onChange={v => update("callLabel", v)} />
          <Field label="Boton email" value={content.contact.emailLabel} onChange={v => update("emailLabel", v)} />
          <Field label="Boton Instagram" value={content.contact.instagramLabel} onChange={v => update("instagramLabel", v)} />
        </div>
      </div>

      <div className="bg-[#111827] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-red-500 rounded-full" /> Textos de la Seccion
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Eyebrow" value={content.contact.eyebrow} onChange={v => update("eyebrow", v)} />
          <Field label="Titulo" value={content.contact.heading} onChange={v => update("heading", v)} />
        </div>
        <div className="mt-4">
          <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-1.5">Descripcion</label>
          <textarea
            value={content.contact.body}
            onChange={(e) => update("body", e.target.value)}
            rows={3}
            className="w-full bg-[#0a0d14] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
