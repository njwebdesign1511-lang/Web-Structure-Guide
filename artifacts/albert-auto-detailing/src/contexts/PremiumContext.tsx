import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface PremiumContextValue {
  isLoggedIn: boolean;
  premiumMode: boolean;
  showLoginModal: boolean;
  togglePremium: () => void;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const PremiumContext = createContext<PremiumContextValue>({
  isLoggedIn: false,
  premiumMode: false,
  showLoginModal: false,
  togglePremium: () => {},
  login: async () => false,
  logout: () => {},
  openLoginModal: () => {},
  closeLoginModal: () => {},
});

const TOKEN_KEY = "premium_auth_token";
const PREF_KEY  = "premium_pref";

export function PremiumProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try { return !!localStorage.getItem(TOKEN_KEY); } catch { return false; }
  });

  const [premiumPref, setPremiumPref] = useState<boolean>(() => {
    try {
      const p = localStorage.getItem(PREF_KEY);
      return p === null ? true : p === "true";
    } catch { return true; }
  });

  const [showLoginModal, setShowLoginModal] = useState(false);

  const premiumMode = isLoggedIn && premiumPref;

  useEffect(() => {
    const html = document.documentElement;
    if (premiumMode) html.classList.add("premium-mode");
    else html.classList.remove("premium-mode");
  }, [premiumMode]);

  const togglePremium = useCallback(() => {
    if (!isLoggedIn) return;
    setPremiumPref(prev => {
      const next = !prev;
      try { localStorage.setItem(PREF_KEY, String(next)); } catch {}
      return next;
    });
  }, [isLoggedIn]);

  const login = useCallback(async (password: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) return false;
      const data = await res.json() as { token: string };
      try {
        localStorage.setItem(TOKEN_KEY, data.token);
        const savedPref = localStorage.getItem(PREF_KEY);
        const pref = savedPref === null ? true : savedPref === "true";
        if (savedPref === null) localStorage.setItem(PREF_KEY, "true");
        setPremiumPref(pref);
      } catch {}
      setIsLoggedIn(true);
      setShowLoginModal(false);
      return true;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    try { localStorage.removeItem(TOKEN_KEY); } catch {}
    setIsLoggedIn(false);
  }, []);

  const openLoginModal  = useCallback(() => setShowLoginModal(true), []);
  const closeLoginModal = useCallback(() => setShowLoginModal(false), []);

  return (
    <PremiumContext.Provider value={{
      isLoggedIn, premiumMode, showLoginModal,
      togglePremium, login, logout,
      openLoginModal, closeLoginModal,
    }}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  return useContext(PremiumContext);
}
