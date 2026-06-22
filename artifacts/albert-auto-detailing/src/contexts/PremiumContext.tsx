import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

interface PremiumContextValue {
  user: AuthUser | null;
  isLoggedIn: boolean;
  premiumMode: boolean;
  showLoginModal: boolean;
  togglePremium: () => void;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const PremiumContext = createContext<PremiumContextValue>({
  user: null,
  isLoggedIn: false,
  premiumMode: false,
  showLoginModal: false,
  togglePremium: () => {},
  login: async () => ({ ok: false }),
  register: async () => ({ ok: false }),
  logout: () => {},
  openLoginModal: () => {},
  closeLoginModal: () => {},
});

const TOKEN_KEY = "premium_auth_token";
const PREF_KEY  = "premium_pref";

async function fetchMe(token: string): Promise<AuthUser | null> {
  try {
    const res = await fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const data = await res.json() as { user: AuthUser };
    return data.user;
  } catch {
    return null;
  }
}

export function PremiumProvider({ children }: { children: ReactNode }) {
  const [user, setUser]               = useState<AuthUser | null>(null);
  const [hydrated, setHydrated]       = useState(false);
  const [premiumPref, setPremiumPref] = useState<boolean>(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isLoggedIn  = user !== null;
  const premiumMode = isLoggedIn && premiumPref;

  // Revalidate token on mount
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        const pref  = localStorage.getItem(PREF_KEY);
        if (pref !== null) setPremiumPref(pref === "true");
        if (token) {
          const u = await fetchMe(token);
          setUser(u);
          if (!u) localStorage.removeItem(TOKEN_KEY);
        }
      } catch {}
      setHydrated(true);
    })();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const html = document.documentElement;
    if (premiumMode) html.classList.add("premium-mode");
    else             html.classList.remove("premium-mode");
  }, [premiumMode, hydrated]);

  const togglePremium = useCallback(() => {
    if (!isLoggedIn) return;
    setPremiumPref(prev => {
      const next = !prev;
      try { localStorage.setItem(PREF_KEY, String(next)); } catch {}
      return next;
    });
  }, [isLoggedIn]);

  const applyToken = useCallback((token: string, u: AuthUser) => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      const savedPref = localStorage.getItem(PREF_KEY);
      const pref = savedPref === null ? true : savedPref === "true";
      if (savedPref === null) localStorage.setItem(PREF_KEY, "true");
      setPremiumPref(pref);
    } catch {}
    setUser(u);
    setShowLoginModal(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json() as { token?: string; user?: AuthUser; error?: string };
      if (!res.ok || !data.token || !data.user) {
        return { ok: false, error: data.error ?? "Error al iniciar sesión" };
      }
      applyToken(data.token, data.user);
      return { ok: true };
    } catch {
      return { ok: false, error: "Error de conexión" };
    }
  }, [applyToken]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json() as { token?: string; user?: AuthUser; error?: string };
      if (!res.ok || !data.token || !data.user) {
        return { ok: false, error: data.error ?? "Error al crear cuenta" };
      }
      applyToken(data.token, data.user);
      return { ok: true };
    } catch {
      return { ok: false, error: "Error de conexión" };
    }
  }, [applyToken]);

  const logout = useCallback(() => {
    try { localStorage.removeItem(TOKEN_KEY); } catch {}
    setUser(null);
  }, []);

  const openLoginModal  = useCallback(() => setShowLoginModal(true), []);
  const closeLoginModal = useCallback(() => setShowLoginModal(false), []);

  return (
    <PremiumContext.Provider value={{
      user, isLoggedIn, premiumMode, showLoginModal,
      togglePremium, login, register, logout,
      openLoginModal, closeLoginModal,
    }}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  return useContext(PremiumContext);
}
