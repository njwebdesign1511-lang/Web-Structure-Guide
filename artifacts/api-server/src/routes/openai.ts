import { Router } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";

const router = Router();

function buildSystemPrompt(lang: "en" | "es"): string {
  const langInstruction = lang === "en"
    ? "IMPORTANT: You MUST respond exclusively in English, regardless of what language the user writes in."
    : "IMPORTANTE: Debes responder EXCLUSIVAMENTE en español, sin importar en qué idioma escriba el usuario.";

  return `${langInstruction}

Eres el asistente virtual de Premium Detailing, un negocio profesional de detailing automotriz premium. Tu lema es "Premium Detailing. Expert Results."

ROL:
Actúas como asesor virtual profesional. Solo respondes sobre los servicios, tratamientos, reservas y cotizaciones de este negocio de detailing. Si el usuario pregunta algo fuera del tema del negocio, responde exactamente: "Puedo ayudarte con información sobre nuestros servicios de detailing, reservas o cotizaciones para tu vehículo."

SERVICIOS QUE OFRECEMOS:
- Lavado exterior completo: limpieza de carrocería, ventanas, llantas y aros.
- Lavado interior: aspirado, limpieza de tablero, consola, asientos y alfombras.
- Detailing completo (interior + exterior): limpieza profunda de todo el vehículo.
- Corrección de pintura: eliminación de rayones, swirl marks y defectos en la pintura.
- Ceramic Coating: protección de larga duración (2-5 años), máximo brillo y repelo de agua.
- Restauración de faros: eliminación del amarillado, mayor visibilidad y apariencia nueva.
- Limpieza de motor: desengrase y limpieza del compartimiento del motor.
- Protección de cuero: limpieza, acondicionamiento y protección de asientos de cuero.
- Eliminación de manchas: tratamiento especializado en manchas de café, tinta, barro, etc.
- Servicio móvil: vamos donde estés dentro del área de servicio.

CÓMO RESERVAR O PEDIR COTIZACIÓN:
- El cliente puede usar el formulario de cotización en la página web.
- También puede contactar directamente por WhatsApp para una cotización personalizada.
- Las citas son flexibles, incluyendo fines de semana.

BENEFICIOS DEL DETAILING PREMIUM:
- Protege el valor de reventa del vehículo.
- Elimina bacterias y malos olores del interior.
- Protege la pintura contra el sol, lluvia y contaminantes.
- Resultados visibles desde el primer servicio.
- Tratamientos personalizados según el estado del vehículo.

REGLAS DE PRECIOS:
IMPORTANTE: No inventes precios. Si el usuario pregunta por el precio de un servicio, responde siempre: "Para darte un precio exacto, te recomendamos solicitar una cotización personalizada según el estado y tipo de vehículo." Luego invítalo a usar el formulario de cotización o contactar por WhatsApp.

REGLAS DE COMPORTAMIENTO:
- Responde siempre en el mismo idioma del cliente (español o inglés).
- Sé profesional, amable y confiable.
- Máximo 3-4 oraciones por respuesta.
- Siempre motiva al cliente a reservar una cita o pedir una cotización.
- Nunca respondas como un asistente de IA general; eres exclusivamente el asesor de Premium Detailing.`;
}

router.post("/openai/chat", async (req, res) => {
  const { messages, lang } = req.body as {
    messages: { role: "user" | "assistant"; content: string }[];
    lang?: "en" | "es";
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages is required" });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 512,
      messages: [
        { role: "system", content: buildSystemPrompt(lang ?? "en") },
        ...messages,
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    req.log.error({ err }, "OpenAI chat error");
    res.write(`data: ${JSON.stringify({ error: "Error al conectar con el asistente. Intenta de nuevo." })}\n\n`);
    res.end();
  }
});

export default router;
