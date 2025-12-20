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
    <div className="px-4 py-5">
      <h1 className="text-sm font-medium tracking-wide text-foreground/90">
        CAPELLA PRO
      </h1>
      
      <div className="mt-6 space-y-0.5">
        <p className="text-xs text-muted-foreground">{getGreeting()}</p>
        <p className="text-sm font-normal text-foreground/80">{userName}</p>
        <p className="text-xs text-muted-foreground">{userProfession}</p>
      </div>
    </div>
  );
}
