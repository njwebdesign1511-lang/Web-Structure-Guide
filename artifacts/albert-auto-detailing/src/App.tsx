import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <LanguageProvider>
      <TooltipProvider>
        <Switch>
          <Route path="/" component={Landing} />
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </TooltipProvider>
    </LanguageProvider>
  );
}

export default App;
