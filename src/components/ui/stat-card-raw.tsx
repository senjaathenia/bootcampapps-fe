import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardRawProps {
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

export function StatCardRaw({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}: StatCardRawProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
          <div className="h-12 w-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-cyan-500" />
          </div>
        </div>
        {trend && (
          <div className="mt-4 flex items-center">
            <span
              className={`text-sm ${
                trend.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend.isPositive ? "+" : "-"}
              {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-gray-500 ml-2">dari bulan lalu</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
