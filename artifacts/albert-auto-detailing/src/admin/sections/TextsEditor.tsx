import { useContent } from "@/contexts/ContentContext";
import type { SiteContent } from "@/lib/defaultContent";

function Field({ label, value, onChange, multiline = false }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-1.5">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full bg-[#0a0d14] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#0a0d14] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
        />
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl p-6 mb-4">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <span className="w-1.5 h-4 bg-red-500 rounded-full inline-block" /> {title}
      </h3>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

export default function TextsEditor() {
  const { content, setContent } = useContent();

  const update = (path: string[], value: string) => {
    const next = structuredClone(content) as any;
    let cur = next;
    for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
    cur[path[path.length - 1]] = value;
    setContent(next as SiteContent);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Editor de Textos</h1>
      <p className="text-gray-500 text-sm mb-6">Edita todos los textos visibles de la pagina</p>

      <Section title="Hero / Inicio">
        <Field label="Badge" value={content.hero.badge} onChange={v => update(["hero","badge"], v)} />
        <Field label="Linea 1" value={content.hero.line1} onChange={v => update(["hero","line1"], v)} />
        <Field label="Linea 2" value={content.hero.line2} onChange={v => update(["hero","line2"], v)} />
        <Field label="Linea 3 (parte 1)" value={content.hero.line3_1} onChange={v => update(["hero","line3_1"], v)} />
        <Field label="Linea 3 (parte 2)" value={content.hero.line3_2} onChange={v => update(["hero","line3_2"], v)} />
        <Field label="Descripcion" value={content.hero.tagline} onChange={v => update(["hero","tagline"], v)} multiline />
        <div className="grid grid-cols-3 gap-3">
          <Field label="Boton 1" value={content.hero.btn1} onChange={v => update(["hero","btn1"], v)} />
          <Field label="Boton 2" value={content.hero.btn2} onChange={v => update(["hero","btn2"], v)} />
          <Field label="Boton 3" value={content.hero.btn3} onChange={v => update(["hero","btn3"], v)} />
        </div>
      </Section>

      <Section title="Sobre Nosotros">
        <Field label="Eyebrow" value={content.about.eyebrow} onChange={v => update(["about","eyebrow"], v)} />
        <Field label="Titulo" value={content.about.heading} onChange={v => update(["about","heading"], v)} />
        <Field label="Parrafo 1" value={content.about.p1} onChange={v => update(["about","p1"], v)} multiline />
        <Field label="Parrafo 2" value={content.about.p2} onChange={v => update(["about","p2"], v)} multiline />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Stat 1 Valor" value={content.about.stat1Value} onChange={v => update(["about","stat1Value"], v)} />
          <Field label="Stat 1 Etiqueta" value={content.about.stat1Label} onChange={v => update(["about","stat1Label"], v)} />
          <Field label="Stat 2 Valor" value={content.about.stat2Value} onChange={v => update(["about","stat2Value"], v)} />
          <Field label="Stat 2 Etiqueta" value={content.about.stat2Label} onChange={v => update(["about","stat2Label"], v)} />
        </div>
      </Section>

      <Section title="Servicio Movil">
        <Field label="Titulo parte 1" value={content.mobileService.heading1} onChange={v => update(["mobileService","heading1"], v)} />
        <Field label="Titulo parte 2 (acento rojo)" value={content.mobileService.heading2} onChange={v => update(["mobileService","heading2"], v)} />
        <Field label="Descripcion" value={content.mobileService.body} onChange={v => update(["mobileService","body"], v)} multiline />
        <Field label="Texto boton" value={content.mobileService.cta} onChange={v => update(["mobileService","cta"], v)} />
      </Section>

      <Section title="Por Que Elegirnos">
        <Field label="Eyebrow" value={content.whyUs.eyebrow} onChange={v => update(["whyUs","eyebrow"], v)} />
        <Field label="Titulo" value={content.whyUs.heading} onChange={v => update(["whyUs","heading"], v)} />
        <Field label="Descripcion" value={content.whyUs.body} onChange={v => update(["whyUs","body"], v)} multiline />
        <Field label="Texto enlace" value={content.whyUs.cta} onChange={v => update(["whyUs","cta"], v)} />
        <div>
          <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Beneficios</label>
          <div className="flex flex-col gap-2">
            {content.whyUs.benefits.map((b, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={b}
                  onChange={(e) => {
                    const next = structuredClone(content);
                    next.whyUs.benefits[i] = e.target.value;
                    setContent(next);
                  }}
                  className="flex-1 bg-[#0a0d14] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                />
                <button
                  onClick={() => {
                    const next = structuredClone(content);
                    next.whyUs.benefits.splice(i, 1);
                    setContent(next);
                  }}
                  className="px-3 py-2 text-red-400 hover:text-red-300 border border-white/10 rounded-lg text-sm"
                >
                  X
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const next = structuredClone(content);
                next.whyUs.benefits.push("Nuevo beneficio");
                setContent(next);
              }}
              className="text-red-500 hover:text-red-400 text-xs font-bold tracking-widest uppercase py-2 border border-dashed border-red-500/30 rounded-lg"
            >
              + Agregar beneficio
            </button>
          </div>
        </div>
      </Section>

      <Section title="Galeria">
        <Field label="Eyebrow" value={content.gallery.eyebrow} onChange={v => update(["gallery","eyebrow"], v)} />
        <Field label="Titulo" value={content.gallery.heading} onChange={v => update(["gallery","heading"], v)} />
        <Field label="Descripcion" value={content.gallery.body} onChange={v => update(["gallery","body"], v)} multiline />
      </Section>

      <Section title="Footer">
        <Field label="Eslogan" value={content.footer.tagline} onChange={v => update(["footer","tagline"], v)} />
        <Field label="Sub-eslogan" value={content.footer.sub} onChange={v => update(["footer","sub"], v)} />
        <Field label="Derechos" value={content.footer.rights} onChange={v => update(["footer","rights"], v)} />
      </Section>
    </div>
  );
}
