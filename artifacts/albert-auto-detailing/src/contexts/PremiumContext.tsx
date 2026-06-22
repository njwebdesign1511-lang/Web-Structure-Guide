import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface PremiumContextValue {
  premiumMode: boolean;
  togglePremium: () => void;
}

const PremiumContext = createContext<PremiumContextValue>({
  premiumMode: false,
  togglePremium: () => {},
});

export function PremiumProvider({ children }: { children: ReactNode }) {
  const [premiumMode, setPremiumMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem("premiumMode") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const html = document.documentElement;
    if (premiumMode) {
      html.classList.add("premium-mode");
    } else {
      html.classList.remove("premium-mode");
    }
    try {
      localStorage.setItem("premiumMode", String(premiumMode));
    } catch {}
  }, [premiumMode]);

  const togglePremium = () => setPremiumMode(p => !p);

  return (
    <PremiumContext.Provider value={{ premiumMode, togglePremium }}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  return useContext(PremiumContext);
}
