import ServiceCard from "@/components/ServiceCard";
import AIMasterclassCard from "@/components/AIMasterclassCard";
import { Globe, Code2, Headphones, ExternalLink } from "lucide-react";

const webApps = [
  {
    name: "Periodicity",
    url: "https://www.periodicity.in",
    description: "Interactive periodic table application",
  },
  {
    name: "Budget Journal",
    url: "https://www.journal.budfi.in",
    description: "Personal finance journaling platform",
  },
  {
    name: "BudFi",
    url: "https://www.budfi.in",
    description: "Comprehensive budgeting solution",
  },
];

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Custom web solutions built with cutting-edge technologies. Scalable, secure, and stunning applications.",
    features: [
      "React & Next.js",
      "Full-stack solutions",
      "E-commerce platforms",
      "Progressive Web Apps",
    ],
    link: "#",
    linkText: "View Our Work",
  },
  {
    icon: Headphones,
    title: "Support & Maintenance",
    description:
      "Reliable ongoing support to keep your digital products running smoothly. We've got your back 24/7.",
    features: [
      "24/7 monitoring",
      "Bug fixes & updates",
      "Performance optimization",
      "Security patches",
    ],
    link: "#",
    linkText: "Get Support",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-3 mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive digital solutions tailored to elevate your business
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* AI Masterclass Card with Image Slider */}
          <AIMasterclassCard />
          
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        {/* Web Apps Showcase */}
        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/3">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Our Web Applications
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Explore our portfolio of production-ready web applications designed to solve real-world problems.
              </p>
            </div>

            <div className="lg:w-2/3 grid sm:grid-cols-3 gap-4 w-full">
              {webApps.map((app) => (
                <a
                  key={app.name}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass rounded-xl p-6 hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="font-heading font-semibold text-lg">
                      {app.name}
                    </h4>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {app.description}
                  </p>
                  <div className="mt-4 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Visit Site →
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
