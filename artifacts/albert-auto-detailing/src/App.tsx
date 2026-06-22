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

function AppInner() {
  const [adminOpen, setAdminOpen] = useState(false);
  const { logout } = useContent();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.shiftKey && e.key === "N") {
        e.preventDefault();
        setAdminOpen((prev) => {
          if (prev) logout();
          return !prev;
        });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [logout]);

  if (adminOpen) {
    return <AdminPanel />;
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
