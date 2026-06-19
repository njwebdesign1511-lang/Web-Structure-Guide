import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-background py-12 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <a href="#home" className="text-2xl font-display font-bold text-white tracking-wider flex items-center gap-2 justify-center md:justify-start mb-2">
              ALBERT<span className="text-primary">AUTO</span>
            </a>
            <p className="text-gray-500 text-sm tracking-widest uppercase">Est. 2023</p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-300 font-medium mb-1">{t.footer.tagline}</p>
            <p className="text-gray-500 text-sm">{t.footer.sub}</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} Albert Auto Detailing. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
