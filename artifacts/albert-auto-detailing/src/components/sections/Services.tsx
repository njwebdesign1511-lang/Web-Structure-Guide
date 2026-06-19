import { motion } from "framer-motion";
import { Sparkles, Shield, Droplets, Car, Sun, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "VIP Interior Clean",
    description: "Deep clean for a luxurious interior experience. We address every crevice, treating leather, plastics, and fabrics."
  },
  {
    icon: Shield,
    title: "2 Step Wax",
    description: "Enhances shine and protects your paint from harsh elements while giving a wet, mirror-like finish."
  },
  {
    icon: Droplets,
    title: "Shampoo",
    description: "Thorough hand wash to remove dirt and grime, ensuring a scratch-free pristine exterior."
  },
  {
    icon: Car,
    title: "Bumper to Bumper",
    description: "Complete detailing inside and out. The ultimate package for a total vehicle reset."
  },
  {
    icon: Sun,
    title: "Headlight Restoration",
    description: "Restores clarity and improves night visibility, removing yellowing and oxidation from lenses."
  },
  {
    icon: ShieldCheck,
    title: "Wax & Protect",
    description: "Long-lasting protection with a brilliant shine that repels water and environmental contaminants."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-card relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Our Services</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Expert Auto Care</h3>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-background border border-border p-8 rounded-sm hover:border-primary/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100" />
              <service.icon className="w-12 h-12 text-primary mb-6 stroke-[1.5]" />
              <h4 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">{service.title}</h4>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
