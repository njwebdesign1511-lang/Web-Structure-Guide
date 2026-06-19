import { Switch, Route } from "wouter";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ContentProvider } from "@/contexts/ContentContext";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/not-found";
import AdminPanel from "@/admin/AdminPanel";

function AppInner() {
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.shiftKey && e.key === "N") {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (adminOpen) {
    return <AdminPanel />;
  }

  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ContentProvider>
      <LanguageProvider>
        <TooltipProvider>
          <AppInner />
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </ContentProvider>
  );
}

export default App;
