interface SidebarHeaderProps {
  userName?: string;
  userProfession?: string;
}

export function SidebarHeader({
  userName = "User Name",
  userProfession = "Your Profession",
}: SidebarHeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-[11px] font-medium tracking-[0.15em] text-muted-foreground/70 uppercase">
        Capella Pro
      </h1>
      
      <div className="mt-5 space-y-0.5">
        <p className="text-[11px] text-muted-foreground/60">{getGreeting()}</p>
        <p className="text-[13px] font-normal text-foreground/75 tracking-tight">{userName}</p>
        <p className="text-[11px] text-muted-foreground/50">{userProfession}</p>
      </div>
    </div>
  );
}
