import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card
      className={`bg-[#171717] border border-[#2F2F2F] w-65 h-35 ${className || ""}`}
    >
      <CardContent className="p-4 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-medium text-gray-400">{title}</p>
            <p className="text-xl font-bold text-white">{value}</p>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
          <div className="h-10 w-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
            <Icon className="h-5 w-5 text-cyan-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
