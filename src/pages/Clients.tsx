import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { GlassCard } from "@/components/dashboard/common/GlassCard";
import { Users } from "lucide-react";

const Clients = () => {
  return (
    <DashboardShell>
      <div className="flex flex-1 items-center justify-center p-12">
        <GlassCard className="max-w-sm text-center">
          <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
            <Users className="h-5 w-5 text-muted-foreground" />
          </div>
          <h2 className="text-base font-medium text-foreground/90">Clients</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Your client management will appear here.
          </p>
        </GlassCard>
      </div>
    </DashboardShell>
  );
};

export default Clients;
