import { cn } from "@/lib/utils";
import { glassCard } from "@/styles/glass";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn(glassCard, "p-8", className)}>
      {children}
    </div>
  );
}
