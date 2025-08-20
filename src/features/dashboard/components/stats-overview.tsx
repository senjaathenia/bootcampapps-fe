import { StatCard } from "./stat-card";

export interface StatCardConfig {
  title: string;
  value: number | string;
  icon: any;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

interface StatsOverviewProps {
  cards: StatCardConfig[];
}

export function StatsOverview({ cards }: StatsOverviewProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {cards.map((card, idx) => (
        <StatCard key={idx} {...card} />
      ))}
    </div>
  );
}
