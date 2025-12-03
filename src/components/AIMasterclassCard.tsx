import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Brain, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import aiMasterclass1 from "@/assets/ai-masterclass-1.png";
import aiMasterclass2 from "@/assets/ai-masterclass-2.png";
import aiMasterclass3 from "@/assets/ai-masterclass-3.png";
import PurchaseDialog from "./PurchaseDialog";

const images = [aiMasterclass1, aiMasterclass2, aiMasterclass3];

const AIMasterclassCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      <div className="group relative glass rounded-2xl p-6 md:p-8 transition-all duration-500 hover:shadow-elevated hover:-translate-y-2 border-primary/50">
        <div className="absolute inset-0 bg-gradient-glow rounded-2xl opacity-50" />

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
            <Brain className="w-7 h-7 text-primary" />
          </div>

          <h3 className="text-xl md:text-2xl font-heading font-semibold mb-3">
            AI Masterclass Materials
          </h3>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            A Complete Guide to Mastering Artificial Intelligence - From Zero to Hero by Sumit Kumar Singh
          </p>

          {/* Image Slider */}
          <div className="relative mb-6 rounded-xl overflow-hidden bg-background/50">
            <div className="relative aspect-[4/3] w-full">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`AI Masterclass Preview ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary w-6"
                      : "bg-foreground/30 hover:bg-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Price and Buy Button */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Price</span>
              <span className="text-2xl font-bold text-primary">₹99</span>
            </div>
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => setIsDialogOpen(true)}
              className="gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <PurchaseDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </>
  );
};

export default AIMasterclassCard;
