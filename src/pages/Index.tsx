import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>TechVision - Digital Innovation & Web Development Agency</title>
        <meta
          name="description"
          content="Transform your digital vision into reality with TechVision. We offer AI Masterclass materials, custom web development, innovative web applications, and 24/7 support services."
        />
        <meta
          name="keywords"
          content="AI, web development, digital agency, tech solutions, web applications"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <ServicesSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
