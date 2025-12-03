import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content:
      "Working with TechVision transformed our digital presence completely. Their AI expertise helped us automate processes we never thought possible. Truly game-changing!",
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager, InnovateCo",
    content:
      "The web application they built for us exceeded all expectations. Clean code, beautiful design, and incredible performance. Our users love it!",
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder, DataFlow",
    content:
      "Their support team is phenomenal. Any issue we've had was resolved within hours, not days. It's rare to find such dedicated partners in tech.",
    avatar: "ER",
  },
  {
    id: 4,
    name: "David Kim",
    role: "CTO, NextGen Solutions",
    content:
      "The AI Masterclass materials were exactly what our team needed. Comprehensive, practical, and delivered results. Our ML capabilities improved dramatically.",
    avatar: "DK",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-glow rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-3 mb-4">
            What <span className="text-gradient">Customers Say</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it — hear from our satisfied clients
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 relative">
            <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/20" />

            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 text-2xl font-heading font-bold text-primary">
                {testimonials[currentIndex].avatar}
              </div>

              {/* Content */}
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 max-w-xl">
                "{testimonials[currentIndex].content}"
              </p>

              {/* Author */}
              <div>
                <h4 className="font-heading font-semibold text-lg">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="glass"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="glass"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
