import { useState } from "react";
import { useContent } from "@/contexts/ContentContext";
import AdminLogin from "./AdminLogin";
import AdminNav, { type AdminSection } from "./components/AdminNav";
import Dashboard from "./sections/Dashboard";
import TextsEditor from "./sections/TextsEditor";
import ServicesEditor from "./sections/ServicesEditor";
import ContactEditor from "./sections/ContactEditor";
import SectionsEditor from "./sections/SectionsEditor";
import TestimonialsEditor from "./sections/TestimonialsEditor";
import StyleEditor from "./sections/StyleEditor";

export default function AdminPanel() {
  const { token } = useContent();
  const [section, setSection] = useState<AdminSection>("dashboard");

  if (!token) return <AdminLogin />;

  const content = {
    dashboard: <Dashboard onNavigate={setSection} />,
    texts: <TextsEditor />,
    services: <ServicesEditor />,
    contact: <ContactEditor />,
    sections: <SectionsEditor />,
    testimonials: <TestimonialsEditor />,
    style: <StyleEditor />,
  }[section];

  return (
    <div className="flex min-h-screen bg-[#0a0d14] font-sans">
      <AdminNav active={section} onChange={setSection} />
      <main className="flex-1 md:ml-0 pt-14 md:pt-0 overflow-y-auto">
        <div className="p-4 md:p-8 max-w-4xl">
          {content}
        </div>
      </main>
    </div>
  );
}
