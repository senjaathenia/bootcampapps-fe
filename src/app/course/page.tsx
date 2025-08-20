import { GenericTable } from "@/features/dashboard/components/generic-table";
import { Course } from "@/features/dashboard/schema";
import apiClient from "@/lib/apiClient";

export default async function DashboardPage() {
  // Fetch all data server-side
  const { data: courses } = await apiClient.get<Course[]>("/course");

  // Map course sesuai response postman
  const mappedCourses = courses.map((c: any) => ({
    id: String(c.id),
    name: c.name || "-",
    description: c.description || "-",
    mentor: c.mentor?.name || "-",
    participantsCount: Array.isArray(c.participants)
      ? c.participants.length
      : 0,
    created_at: c.created_at || "-",
    participants: Array.isArray(c.participants)
      ? c.participants
          .map((p: any) => p.user?.name)
          .filter(Boolean)
          .join(", ")
      : "-",
  }));

  // Custom columns sesuai data course
  const columns = [
    { key: "name", label: "Course Name" },
    { key: "mentor", label: "Mentor" },
    { key: "created_at", label: "Date" },
  ];

  return (
    <div>
      <h2 className="mb-10 text-3xl font-bold">Course List </h2>
      <div className="space-y-6">
        <GenericTable
          data={mappedCourses}
          itemsPerPage={5}
          columns={columns}
          title="Course Table"
        />
      </div>
    </div>
  );
}
