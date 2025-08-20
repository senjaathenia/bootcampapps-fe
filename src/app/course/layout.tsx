import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black p-6 w-full">
      <div className="flex gap-6 min-h-[calc(100vh-3rem)]">
        <DashboardSidebar />
        <div className="flex-1 mt-10">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
