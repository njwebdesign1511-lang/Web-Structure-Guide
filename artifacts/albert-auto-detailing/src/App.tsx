import { Switch, Route } from "wouter";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ContentProvider } from "@/contexts/ContentContext";
import { PremiumProvider } from "@/contexts/PremiumContext";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/not-found";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import AdminPanel from "@/admin/AdminPanel";
import { useContent } from "@/contexts/ContentContext";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Trash2 } from "lucide-react";

function ExitModal({
  onSave,
  onDiscard,
  onCancel,
  saving,
}: {
  onSave: () => void;
  onDiscard: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(2,12,36,0.85)", backdropFilter: "blur(8px)" }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 16 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="w-full max-w-sm rounded-xl p-8 shadow-2xl"
        style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.10)" }}
      >
        <div className="text-center mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(255,37,52,0.12)", border: "1px solid rgba(255,37,52,0.30)" }}
          >
            <Save className="w-5 h-5" style={{ color: "#FF2534" }} />
          </div>
          <h2 className="text-white font-bold text-xl mb-2 uppercase tracking-widest">Cambios sin guardar</h2>
          <p className="text-gray-400 text-sm">Tienes cambios que no han sido guardados. ¿Qué deseas hacer?</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-colors disabled:opacity-60"
            style={{ background: "#FF2534", color: "white" }}
            onMouseEnter={e => { if (!saving) (e.currentTarget as HTMLButtonElement).style.background = "#C41C27"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#FF2534"; }}
          >
            <Save className="w-4 h-4" />
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>

          <button
            onClick={onDiscard}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-colors"
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#9ca3af" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
          >
            <Trash2 className="w-4 h-4" />
            Descartar cambios
          </button>

          <button
            onClick={onCancel}
            className="w-full text-center text-xs text-gray-600 hover:text-gray-400 transition-colors py-1"
          >
            Cancelar (quedarse en el panel)
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function AppInner() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const { logout, isDirty, saveContent, content, discardChanges, saving } = useContent();

  const closePanel = () => {
    setAdminOpen(false);
    logout();
    setShowExitModal(false);
  };

  const handleExitRequest = () => {
    if (isDirty) {
      setShowExitModal(true);
    } else {
      closePanel();
    }
  };

  const handleSaveAndExit = async () => {
    await saveContent(content);
    closePanel();
  };

  const handleDiscardAndExit = () => {
    discardChanges();
    closePanel();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.shiftKey && e.key === "N") {
        e.preventDefault();
        if (adminOpen) {
          handleExitRequest();
        } else {
          setAdminOpen(true);
        }
      }
      if (e.key === "Escape" && adminOpen && !showExitModal) {
        e.preventDefault();
        handleExitRequest();
      }
      if (e.key === "Escape" && showExitModal) {
        e.preventDefault();
        setShowExitModal(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [adminOpen, isDirty, showExitModal, content]);

  if (adminOpen) {
    return (
      <>
        <AdminPanel />
        <AnimatePresence>
          {showExitModal && (
            <ExitModal
              onSave={handleSaveAndExit}
              onDiscard={handleDiscardAndExit}
              onCancel={() => setShowExitModal(false)}
              saving={saving}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ContentProvider>
      <LanguageProvider>
        <PremiumProvider>
          <TooltipProvider>
            <AppInner />
            <Toaster />
          </TooltipProvider>
        </PremiumProvider>
      </LanguageProvider>
    </ContentProvider>
  );
}

export default App;
