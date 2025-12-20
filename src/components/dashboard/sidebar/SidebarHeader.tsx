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
      <h1 className="text-xl font-semibold tracking-tight text-foreground">
        CAPELLA PRO
      </h1>
      
      <div className="mt-6 space-y-1">
        <p className="text-sm text-muted-foreground">{getGreeting()}</p>
        <p className="text-base font-medium text-foreground">{userName}</p>
        <p className="text-sm text-muted-foreground">{userProfession}</p>
      </div>
    </div>
  );
}
