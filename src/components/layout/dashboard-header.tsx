interface DashboardHeaderProps {
  userName?: string;
  userEmail?: string;
}

export function DashboardHeader({
  userName = "Angga",
  userEmail = "angga@yopmail.com",
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome {userName}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-white text-sm font-medium">
            {userName} Ady Pratama
          </p>
          <p className="text-gray-400 text-xs">{userEmail}</p>
        </div>
        <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-sm">AP</span>
        </div>
      </div>
    </div>
  );
}
