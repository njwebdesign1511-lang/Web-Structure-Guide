import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ChevronDown, Loader2, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/contexts/ContentContext";

const WaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface Message {
  role: "user" | "assistant";
  content: string;
}

function WaButton({ href, lang }: { href: string; lang: "en" | "es" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg text-white text-xs font-bold transition-all"
      style={{ background: "#25D366", boxShadow: "0 2px 8px rgba(37,211,102,0.4)" }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#1DA851"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#25D366"; }}
    >
      <WaIcon />
      {lang === "es" ? "Escribir por WhatsApp" : "Chat on WhatsApp"}
    </a>
  );
}

function MessageContent({ content, waHref, lang }: { content: string; waHref: string; lang: "en" | "es" }) {
  const parts = content.split("{{WA_BUTTON}}");
  return (
    <span>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span style={{ display: "block", marginTop: "4px" }}>
              <WaButton href={waHref} lang={lang} />
            </span>
          )}
        </span>
      ))}
    </span>
  );
}

const WELCOME: Record<"en" | "es", string> = {
  es: "¡Hola! 👋 Soy el asistente virtual de Albert Auto Detailing. Puedo ayudarte con información sobre nuestros servicios, responder tus preguntas sobre tu vehículo o conectarte con nuestro equipo. ¿En qué puedo ayudarte hoy?",
  en: "Hi there! 👋 I'm the virtual assistant for Albert Auto Detailing. I can help you with info about our services, answer questions about your vehicle, or connect you with our team. How can I help you today?",
};

export default function AIChatWidget() {
  const { lang } = useLanguage();
  const { content } = useContent();

  const c = content.contact as any;
  const waNumber = c?.whatsapp ?? "14756898301";
  const waText   = c?.whatsappText ?? (lang === "es" ? "Hola, me gustaría una cotización." : "Hi! I'd like a quote.");
  const waHref   = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

  const welcomeMsg = (): Message => ({ role: "assistant", content: WELCOME[lang] });

  const [open, setOpen]           = useState(false);
  const [messages, setMessages]   = useState<Message[]>(() => [welcomeMsg()]);
  const [input, setInput]         = useState("");
  const [streaming, setStreaming] = useState(false);
  const [unread, setUnread]       = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);
  const abortRef  = useRef<AbortController | null>(null);

  useEffect(() => {
    setMessages([welcomeMsg()]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setStreaming(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages([...newMessages, assistantMsg]);

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/openai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          lang,
          waHref,
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) throw new Error("Network error");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const parsed = JSON.parse(line.slice(6)) as {
              content?: string;
              done?: boolean;
              error?: string;
            };
            if (parsed.done) break;
            if (parsed.error) {
              setMessages(prev => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: parsed.error! };
                return copy;
              });
              break;
            }
            if (parsed.content) {
              setMessages(prev => {
                const copy = [...prev];
                copy[copy.length - 1] = {
                  role: "assistant",
                  content: copy[copy.length - 1].content + parsed.content,
                };
                return copy;
              });
            }
          } catch {}
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: lang === "es"
            ? "Lo siento, hubo un error. Por favor intenta de nuevo."
            : "Sorry, an error occurred. Please try again.",
        };
        return copy;
      });
    } finally {
      setStreaming(false);
      if (!open) setUnread(true);
    }
  }, [input, messages, streaming, open, lang, waHref]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating action button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="ai-chat-fab"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={lang === "es" ? "Abrir asistente IA" : "Open AI assistant"}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.18 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {open ? <ChevronDown size={22} /> : <MessageCircle size={22} />}
          </motion.span>
        </AnimatePresence>
        <span className="ai-chat-fab-label">
          {open
            ? (lang === "es" ? "Cerrar" : "Close")
            : (lang === "es" ? "Asistente IA" : "AI Assistant")}
        </span>
        {!open && unread && <span className="ai-chat-unread" />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
            className="ai-chat-window"
          >
            {/* Header */}
            <div className="ai-chat-header">
              <div className="ai-chat-header-avatar">
                <MessageCircle size={16} />
              </div>
              <div className="ai-chat-header-info">
                <span className="ai-chat-header-name">{lang === "es" ? "Asistente Virtual" : "Virtual Assistant"}</span>
                <span className="ai-chat-header-sub">Albert Auto Detailing</span>
              </div>
              <div className="ai-chat-header-dot" title={lang === "es" ? "En línea" : "Online"} />
              <button className="ai-chat-close" onClick={() => setOpen(false)} aria-label={lang === "es" ? "Cerrar" : "Close"}>
                <X size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="ai-chat-messages">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`ai-chat-bubble-wrap ${msg.role}`}
                >
                  {msg.role === "assistant" && (
                    <div className="ai-chat-bubble-icon">
                      <MessageCircle size={11} />
                    </div>
                  )}
                  <div className={`ai-chat-bubble ${msg.role}`}>
                    {msg.content === "" && streaming && i === messages.length - 1 ? (
                      <span className="ai-chat-typing">
                        <span /><span /><span />
                      </span>
                    ) : (
                      <MessageContent content={msg.content} waHref={waHref} lang={lang as "en" | "es"} />
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="ai-chat-input-row">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={lang === "es" ? "Escribe tu pregunta…" : "Type your question…"}
                className="ai-chat-input"
                rows={1}
                disabled={streaming}
              />
              <motion.button
                onClick={sendMessage}
                disabled={!input.trim() || streaming}
                className="ai-chat-send"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Enviar"
              >
                {streaming ? <Loader2 size={16} className="ai-chat-spin" /> : <Send size={16} />}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
