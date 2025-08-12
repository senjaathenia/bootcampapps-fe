import { BookOpen, Calendar, FileText } from "lucide-react";
import { DashboardStats } from "../schema";
import { StatCard } from "./stat-card";

interface StatsOverviewProps {
  stats: DashboardStats;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <StatCard
        title="Total Sessions"
        value={stats.totalSessions}
        icon={Calendar}
        description="Active learning sessions"
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="Total Assignments"
        value={stats.completedAssignments}
        icon={FileText}
        description="Completed assignments"
        trend={{ value: 8, isPositive: true }}
      />
      <StatCard
        title="Active Courses"
        value={stats.activeCourses}
        icon={BookOpen}
        description="Currently enrolled"
        trend={{ value: 3, isPositive: false }}
      />
    </div>
  );
}
