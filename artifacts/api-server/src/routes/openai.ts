import { Router } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";

const router = Router();

const SYSTEM_PROMPT = `Eres el asistente virtual de Albert Auto Detailing, un negocio profesional de detailing de autos ubicado en Norwalk, CT. Fundado en 2023.

SERVICIOS Y PAQUETES:
- Basic Wash: Lavado exterior, ventanas, aspirado interior. Sedán $50, SUV $65, Truck $75.
- Interior Detail: Limpieza profunda interior, extracción de manchas, acondicionamiento de cuero. Sedán $120, SUV $150, Truck $170.
- Exterior Detail: Clay bar, pulido, sellador de pintura, encerado. Sedán $150, SUV $185, Truck $210.
- Full Detail (más popular): Interior + Exterior completo. Sedán $220, SUV $280, Truck $320.
- Ceramic Coating: Protección de larga duración (2-5 años), brillo excepcional. Desde $499.
- Paint Correction: Elimina rayones y swirl marks. Cotización personalizada.
- Servicio Móvil: Vamos donde tú estés en el área de Norwalk, CT y alrededores.

CONTACTO:
- WhatsApp: disponible para agendar citas
- Área de servicio: Norwalk, CT y alrededores en Fairfield County
- Horario: flexible, incluyendo fines de semana

CÓMO AGENDAR:
Los clientes pueden agendar usando el formulario de cotización en la página web o via WhatsApp.

Tu rol es ayudar a los visitantes a:
1. Elegir el paquete más adecuado para su vehículo y necesidades
2. Entender qué incluye cada servicio
3. Saber los precios aproximados
4. Guiarlos a agendar una cita

Responde siempre en el mismo idioma del cliente (español o inglés).
Sé profesional, amable y conciso. Máximo 3-4 oraciones por respuesta.
Si no sabes algo específico, invita al cliente a contactar directamente via WhatsApp.`;

router.post("/openai/chat", async (req, res) => {
  const { messages } = req.body as {
    messages: { role: "user" | "assistant"; content: string }[];
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
      model: "gpt-5-mini",
      max_completion_tokens: 512,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
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
    res.write(`data: ${JSON.stringify({ error: "Error al procesar la respuesta." })}\n\n`);
    res.end();
  }
});

export default router;
