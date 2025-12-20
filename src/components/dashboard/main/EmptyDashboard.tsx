import { LayoutGrid } from "lucide-react";
import { GlassCard } from "../common/GlassCard";

export function EmptyDashboard() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <GlassCard className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <LayoutGrid className="h-8 w-8 text-muted-foreground" />
        </div>
        
        <h2 className="text-xl font-semibold text-foreground">
          Your business dashboard is ready.
        </h2>
        
        <p className="mt-3 text-sm text-muted-foreground">
          Widgets, insights, and AI assistance will appear here.
        </p>
      </GlassCard>
    </div>
  );
}
