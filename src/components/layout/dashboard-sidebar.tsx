import { BookOpen, Home } from "lucide-react";
import Link from "next/link";

export function DashboardSidebar() {
  return (
    <div
      className="w-[220px] bg-[#171717] border-2 border-[#2F2F2F] rounded-lg min-h-screen"
      style={{ width: "220px", minWidth: "220px" }}
    >
      {/* Header with Avatar */}
      <div className="p-6 flex justify-between items-start">
        <h1 className="text-xl font-bold text-white">Logo LMS</h1>
      </div>

      {/* Navigation */}
      <div className="px-4 space-y-4">
        <Link
          href="/dashboard"
          className="bg-gray-200 rounded-lg p-3 flex items-center gap-3 hover:bg-gray-300 transition-colors"
        >
          <Home className="h-5 w-5 text-gray-800" />
          <span className="text-gray-800 font-medium">Dashboard</span>
        </Link>
        <Link
          href="/course"
          className="bg-gray-200 rounded-lg p-3 flex items-center gap-3 hover:bg-gray-300 transition-colors"
        >
          <BookOpen className="h-5 w-5 text-gray-800" />
          <span className="text-gray-800 font-medium">Courses</span>
        </Link>
      </div>
    </div>
  );
}
