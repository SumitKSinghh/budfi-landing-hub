import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  link?: string;
  linkText?: string;
  isHighlighted?: boolean;
}

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  features,
  link,
  linkText = "Learn More",
  isHighlighted = false,
}: ServiceCardProps) => {
  return (
    <div
      className={`group relative glass rounded-2xl p-6 md:p-8 transition-all duration-500 hover:shadow-elevated hover:-translate-y-2 ${
        isHighlighted ? "border-primary/50" : ""
      }`}
    >
      {isHighlighted && (
        <div className="absolute inset-0 bg-gradient-glow rounded-2xl opacity-50" />
      )}
      
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="w-7 h-7 text-primary" />
        </div>

        <h3 className="text-xl md:text-2xl font-heading font-semibold mb-3">
          {title}
        </h3>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>

        {features && features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {link && (
          <Button variant="ghost" className="group/btn p-0 h-auto text-primary">
            {linkText}
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
