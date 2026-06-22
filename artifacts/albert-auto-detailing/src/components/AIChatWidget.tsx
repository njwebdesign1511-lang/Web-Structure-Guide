import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, ChevronDown, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hola 👋 Soy el asistente virtual de Albert Auto Detailing. Puedo ayudarte a elegir el mejor paquete para tu vehículo o resolver tus dudas sobre nuestros servicios. ¿En qué puedo ayudarte?",
};

export default function AIChatWidget() {
  const [open, setOpen]           = useState(false);
  const [messages, setMessages]   = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput]         = useState("");
  const [streaming, setStreaming] = useState(false);
  const [unread, setUnread]       = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);
  const abortRef  = useRef<AbortController | null>(null);

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
          content: "Lo siento, hubo un error. Por favor intenta de nuevo.",
        };
        return copy;
      });
    } finally {
      setStreaming(false);
      if (!open) setUnread(true);
    }
  }, [input, messages, streaming, open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Floating action button ── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="ai-chat-fab"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Abrir asistente IA"
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
            {open ? <ChevronDown size={22} /> : <Bot size={22} />}
          </motion.span>
        </AnimatePresence>
        <span className="ai-chat-fab-label">
          {open ? "Cerrar" : "💬 Asistente IA"}
        </span>
        {!open && unread && <span className="ai-chat-unread" />}
      </motion.button>

      {/* ── Chat window ── */}
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
                <Bot size={16} />
              </div>
              <div className="ai-chat-header-info">
                <span className="ai-chat-header-name">Asistente IA</span>
                <span className="ai-chat-header-sub">Albert Auto Detailing</span>
              </div>
              <div className="ai-chat-header-dot" title="En línea" />
              <button className="ai-chat-close" onClick={() => setOpen(false)} aria-label="Cerrar">
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
                      <Bot size={11} />
                    </div>
                  )}
                  <div className={`ai-chat-bubble ${msg.role}`}>
                    {msg.content === "" && streaming && i === messages.length - 1 ? (
                      <span className="ai-chat-typing">
                        <span /><span /><span />
                      </span>
                    ) : (
                      msg.content
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
                placeholder="Escribe tu pregunta…"
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
