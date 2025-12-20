import { LayoutGrid } from "lucide-react";
import { GlassCard } from "../common/GlassCard";

export function EmptyDashboard() {
  return (
    <div className="flex flex-1 items-center justify-center p-12">
      <GlassCard className="max-w-sm text-center">
        <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
          <LayoutGrid className="h-5 w-5 text-muted-foreground" />
        </div>
        
        <h2 className="text-base font-medium text-foreground/90">
          Your dashboard is ready
        </h2>
        
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Widgets, insights, and AI assistance will appear here.
        </p>
      </GlassCard>
    </div>
  );
}
