import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "feature";
  children: React.ReactNode;
}

export const Card = ({
  variant = "default",
  className,
  children,
  ...props
}: CardProps) => {
  const baseStyles = "rounded-2xl transition-all duration-300";
  
  const variants = {
    default: "bg-white dark:bg-gray-800/90 shadow-lg hover:shadow-xl p-6",
    glass: "glass-card backdrop-blur-xl bg-white/10 dark:bg-gray-800/10",
    feature: "feature-card hover:-translate-y-1"
  };

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}; 