import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import MobileService from "@/components/sections/MobileService";
import WhyUs from "@/components/sections/WhyUs";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WaterDivider from "@/components/ui/WaterDivider";
import { useContent } from "@/contexts/ContentContext";

export default function Landing() {
  const { content } = useContent();
  const s = content.sections;

  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WaterDivider />
        {s.about && <About />}
        {s.services && <Services />}
        {s.services && <WaterDivider />}
        {s.mobileService && <MobileService />}
        {s.whyUs && <WhyUs />}
        {s.gallery && <Gallery />}
        {s.gallery && <WaterDivider />}
        {s.contact && <Contact />}
      </main>
      <Footer />
    </div>
  );
}
