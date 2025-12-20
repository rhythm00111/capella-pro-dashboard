import { LayoutGrid } from "lucide-react";
import { GlassCard } from "../common/GlassCard";

export function EmptyDashboard() {
  return (
    <div className="flex flex-1 items-center justify-center p-16">
      <GlassCard className="max-w-xs text-center px-8 py-10">
        <div className="mx-auto mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/60">
          <LayoutGrid className="h-5 w-5 text-muted-foreground/80" />
        </div>
        
        <h2 className="text-[15px] font-medium text-foreground/85 tracking-tight">
          Your dashboard is ready
        </h2>
        
        <p className="mt-2.5 text-[13px] text-muted-foreground leading-relaxed">
          Widgets, insights, and AI assistance will appear here.
        </p>
      </GlassCard>
    </div>
  );
}
