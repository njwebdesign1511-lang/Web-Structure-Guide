import { motion } from "framer-motion";
import aboutImg from "@/assets/images/about.png";
import { useContent } from "@/contexts/ContentContext";

export default function About() {
  const { content } = useContent();
  const a = content.about;

  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] md:aspect-square rounded-sm overflow-hidden relative border border-border">
              <img src={aboutImg} alt="Professional detailing work" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 border border-primary/20 backdrop-blur-sm -z-10 rounded-sm" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">{a.eyebrow}</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">{a.heading}</h3>
            <div className="w-20 h-1 bg-primary mb-8" />
            <p className="text-gray-300 text-lg leading-relaxed mb-6">{a.p1}</p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">{a.p2}</p>
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
              <div>
                <div className="text-3xl font-display font-bold text-white mb-2">{a.stat1Value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{a.stat1Label}</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-white mb-2">{a.stat2Value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{a.stat2Label}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
