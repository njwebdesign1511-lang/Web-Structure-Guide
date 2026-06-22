import { useEffect } from "react";
import { useContent } from "@/contexts/ContentContext";

export default function SeoHelmet() {
  const { content } = useContent();
  const seo = (content as any).seo as {
    title?: string;
    description?: string;
    keywords?: string;
    gaId?: string;
    gscCode?: string;
  } | undefined;

  useEffect(() => {
    if (!seo) return;

    if (seo.title) {
      document.title = seo.title;
    }

    const setMeta = (name: string, content: string, prop?: boolean) => {
      if (!content) return;
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (seo.description) {
      setMeta("description", seo.description);
      setMeta("og:description", seo.description, true);
      setMeta("twitter:description", seo.description);
    }

    if (seo.keywords) {
      setMeta("keywords", seo.keywords);
    }

    if (seo.title) {
      setMeta("og:title", seo.title, true);
      setMeta("twitter:title", seo.title);
    }

    if (seo.gscCode) {
      const existing = document.querySelector(`meta[name="google-site-verification"]`);
      if (!existing) {
        const el = document.createElement("meta");
        el.setAttribute("name", "google-site-verification");
        el.setAttribute("content", seo.gscCode);
        document.head.appendChild(el);
      } else {
        existing.setAttribute("content", seo.gscCode);
      }
    }

    if (seo.gaId && !document.querySelector(`script[data-ga="${seo.gaId}"]`)) {
      const s1 = document.createElement("script");
      s1.setAttribute("data-ga", seo.gaId);
      s1.async = true;
      s1.src = `https://www.googletagmanager.com/gtag/js?id=${seo.gaId}`;
      document.head.appendChild(s1);
      const s2 = document.createElement("script");
      s2.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${seo.gaId}');`;
      document.head.appendChild(s2);
    }
  }, [seo?.title, seo?.description, seo?.keywords, seo?.gaId, seo?.gscCode]);

  return null;
}
