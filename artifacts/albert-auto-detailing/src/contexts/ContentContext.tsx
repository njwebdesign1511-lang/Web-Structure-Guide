import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { defaultContent, type SiteContent } from "@/lib/defaultContent";

interface ContentContextValue {
  content: SiteContent;
  setContent: (c: SiteContent) => void;
  saveContent: (c: SiteContent) => Promise<void>;
  saving: boolean;
  saved: boolean;
  token: string | null;
  setToken: (t: string | null) => void;
  logout: () => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);

function mergeWithDefaults(remote: any): SiteContent {
  function deepMerge(def: any, rem: any): any {
    if (rem === null || rem === undefined) return def;
    if (typeof def !== "object" || Array.isArray(def)) return rem ?? def;
    const result: any = { ...def };
    for (const key of Object.keys(def)) {
      result[key] = deepMerge(def[key], rem[key]);
    }
    return result;
  }
  return deepMerge(defaultContent, remote);
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(defaultContent);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [token, setTokenState] = useState<string | null>(null);

  const setToken = (t: string | null) => {
    setTokenState(t);
  };

  const logout = () => setToken(null);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setContentState(mergeWithDefaults(data));
        }
      })
      .catch(() => {});
  }, []);

  const setContent = useCallback((c: SiteContent) => {
    setContentState(c);
  }, []);

  const saveContent = useCallback(async (c: SiteContent) => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(c),
      });
      if (!res.ok) throw new Error("Failed to save");
      setContentState(c);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }, [token]);

  return (
    <ContentContext.Provider value={{ content, setContent, saveContent, saving, saved, token, setToken, logout }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
