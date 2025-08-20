import DashboardIndex from "@/features/dashboard";
import { Assignment, Course, Session } from "@/features/dashboard/schema";
import apiClient from "@/lib/apiClient";
import { BookOpen, Calendar, FileText } from "lucide-react";

// Modular fetchers
async function getSessions(): Promise<Session[]> {
  const { data } = await apiClient.get<Session[]>("/session");
  return data;
}

async function getAssignments(): Promise<Assignment[]> {
  const { data } = await apiClient.get<Assignment[]>("/assignment");
  return data;
}

async function getCourses(): Promise<Course[]> {
  const { data } = await apiClient.get<Course[]>("/course");
  return data;
}

async function fetchApi<T>(endpoint: string): Promise<T[]> {
  const res = await fetch(`http://localhost:8002${endpoint}`, {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data || [];
}

export default async function DashboardPage() {
  // Fetch all data server-side
  const [sessions, assignments, courses] = await Promise.all([
    getSessions(),
    getAssignments(),
    getCourses(),
  ]);

  // Custom stats cards array
  const statsCards = [
    {
      title: "Total Sessions",
      value: sessions.length,
      icon: Calendar,
      description: "Active learning sessions",
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Total Assignments",
      value: assignments.length,
      icon: FileText,
      description: "Completed assignments",
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Active Courses",
      value: courses.length,
      icon: BookOpen,
      description: "Currently enrolled",
      trend: { value: 3, isPositive: false },
    },
  ];

  // Map data if needed (optional, sesuai FE type)
  const mappedSessions = sessions.map((s: any) => ({
    id: String(s.id),
    title: s.title,
    course: s.course?.name || "",
    mentor: s.course?.mentor?.name || "",
    date: s.date,
    description: s.description,
  }));
  const mappedAssignments = assignments.map((a: any) => ({
    id: String(a.id),
    title: a.title,
    description: a.description || "",
    subject: a.session?.title || "",
    dueDate:
      a.date && a.date !== "0001-01-01T00:00:00Z"
        ? a.date
        : a.session?.date || "",
    status: a.status,
  }));
  const mappedCourses = courses.map((c: any) => ({
    id: String(c.id),
    title: c.name,
    instructor: c.mentor?.name || "",
    startDate: c.created_at,
    progress: 0,
  }));

  return (
    <DashboardIndex
      statsCards={statsCards}
      sessions={mappedSessions}
      assignments={mappedAssignments}
      courses={mappedCourses}
      isAdmin={false}
    />
  );
}
