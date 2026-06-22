import { useState } from "react";
import { useContent } from "@/contexts/ContentContext";
import { Lock, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@assets/logo-transparent.png";

function WelcomeSplash() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "#020C24" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <img
          src={logoImg}
          alt="Albert Auto Detailing"
          className="w-48 md:w-64 object-contain drop-shadow-2xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
          className="text-2xl md:text-3xl font-bold tracking-widest uppercase"
          style={{ color: "#D61C23", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Welcome boss
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut" }}
          className="h-0.5 w-48"
          style={{ background: "linear-gradient(to right, transparent, #D61C23, transparent)", transformOrigin: "left" }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function AdminLogin() {
  const { setToken } = useContent();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Contrasena incorrecta. Intenta de nuevo.");
        return;
      }
      const data = await res.json();
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        setTimeout(() => setToken(data.token), 400);
      }, 2000);
    } catch {
      setError("Error de conexion. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>{showSplash && <WelcomeSplash />}</AnimatePresence>

      <div className="min-h-screen bg-[#0a0d14] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-600/10 border border-red-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-widest uppercase">Admin Panel</h1>
            <p className="text-gray-500 text-sm mt-1">Albert Auto Detailing</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#111827] border border-white/10 rounded-xl p-8 shadow-2xl">
            <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">
              Contrasena
            </label>
            <div className="relative mb-6">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0d14] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors pr-10"
                placeholder="Ingresa la contrasena"
                autoFocus
              />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold tracking-widest uppercase py-3 rounded-lg transition-colors"
            >
              {loading ? "Verificando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
