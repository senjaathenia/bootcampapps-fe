"use client";

import DashboardIndex from "@/features/dashboard";
import {
  Assignment,
  Course,
  DashboardStats,
  Session,
} from "@/features/dashboard/schema";
import apiClient from "@/lib/apiClient";
import { useEffect, useState } from "react";

// Main Dashboard Page - Handles data fetching and state management
export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulated user role - in real app, this would come from auth context
  const [isAdmin] = useState(false);

  // Toggle untuk development - set true untuk pakai mock data
  const USE_MOCK_DATA = false;

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Kalau development mode, pakai mock data
        if (USE_MOCK_DATA) {
          console.log("🎭 Using mock data for development");

          // Set mock stats
          setStats({
            totalSessions: 12,
            completedAssignments: 8,
            activeCourses: 5,
          });

          // Set mock data untuk sections lain
          setSessions([
            {
              id: "1",
              title: "Implementasi Html css dan js",
              course: "Basic Html Css Javascript",
              mentor: "Aditya Kunto",
              date: "21 Agustus 2025",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },
          ]);

          setAssignments([
            {
              id: "1",
              title: "Membuat Black Box Testing",
              description: "Fundamental QA",
              dueDate: "01 September 2025",
              status: "graded",
            },
          ]);

          setCourses([
            {
              id: "1",
              title: "Fundamental QA",
              instructor: "QA Teams",
              startDate: "01 Agustus 2025",
              progress: 75,
            },
          ]);

          setLoading(false);
          return;
        }

        // Real API calls (kalau USE_MOCK_DATA = false)
        // Fetch stats data with individual error handling
        let calculatedStats: DashboardStats = {
          totalSessions: 0,
          completedAssignments: 0,
          activeCourses: 0,
        };

        // Fetch course data for active courses count
        try {
          const courseRes = await apiClient.get<any[]>("/course");
          calculatedStats.activeCourses = courseRes.data.length;
          console.log("✅ Course data loaded:", courseRes.data.length);
        } catch (err) {
          console.warn("❌ Failed to fetch course data:", err);
          calculatedStats.activeCourses = 5; // fallback
        }

        // Fetch session data for total sessions count
        try {
          const sessionRes = await apiClient.get<any[]>("/session");
          calculatedStats.totalSessions = sessionRes.data.length;
          console.log("✅ Session data loaded:", sessionRes.data.length);
        } catch (err) {
          console.warn("❌ Failed to fetch session data:", err);
          calculatedStats.totalSessions = 12; // fallback
        }

        // Fetch assignment data for completed assignments count
        try {
          const assignmentRes = await apiClient.get<any[]>("/assignment");
          calculatedStats.completedAssignments = assignmentRes.data.length;
          console.log("✅ Assignment data loaded:", assignmentRes.data.length);
        } catch (err) {
          console.warn("❌ Failed to fetch assignment data:", err);
          calculatedStats.completedAssignments = 8; // fallback
        }

        setStats(calculatedStats);

        // Fetch other data with fallbacks
        try {
          const sessionsRes = await apiClient.get<any[]>("/session");
          setSessions(
            sessionsRes.data.map((s: any) => ({
              id: String(s.id),
              title: s.title, // required by Session type
              course: s.course?.name || "",
              mentor: s.course?.mentor?.name || "",
              date: s.date,
              description: s.description,
            }))
          );
        } catch (err) {
          console.warn("❌ Failed to fetch sessions data:", err);
          setSessions([]);
        }

        try {
          const assignmentsRes = await apiClient.get<any[]>("/assignment");
          setAssignments(
            assignmentsRes.data.map((a: any) => ({
              id: String(a.id),
              title: a.title,
              description: a.description || "", // required by Assignment type
              subject: a.session?.title || "",
              dueDate:
                a.date && a.date !== "0001-01-01T00:00:00Z"
                  ? a.date
                  : a.session?.date || "",
              status: a.status,
            }))
          );
        } catch (err) {
          console.warn("❌ Failed to fetch assignments data:", err);
          setAssignments([]);
        }

        try {
          const coursesRes = await apiClient.get<any[]>("/course");
          setCourses(
            coursesRes.data.map((c: any) => ({
              id: String(c.id),
              title: c.name,
              instructor: c.mentor?.name || "",
              startDate: c.created_at,
              progress: 0, // set default, update jika ada field progress
            }))
          );
        } catch (err) {
          console.warn("❌ Failed to fetch courses data:", err);
          setCourses([]);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");

        // Fallback to mock data for development
        setStats({
          totalSessions: 12,
          completedAssignments: 8,
          activeCourses: 5,
        });
        setSessions([
          {
            id: "1",
            title: "Implementasi Html css dan js",
            course: "Basic Html Css Javascript",
            mentor: "Aditya Kunto",
            date: "21 Agustus 2025",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
        ]);
        setAssignments([
          {
            id: "1",
            title: "Membuat Black Box Testing",
            description: "Fundamental QA",
            dueDate: "01 September 2025",
            status: "graded",
          },
        ]);
        setCourses([
          {
            id: "1",
            title: "Fundamental QA",
            instructor: "QA Teams",
            startDate: "01 Agustus 2025",
            progress: 75,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Handler functions for CRUD operations
  const handleEditSession = async (sessionId: string) => {
    console.log("Edit session:", sessionId);
    // Implement edit logic or navigate to edit page
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      await apiClient.post(`/sessions/${sessionId}/delete`);
      setSessions((prev) => prev.filter((session) => session.id !== sessionId));
    } catch (err) {
      console.error("Error deleting session:", err);
    }
  };

  const handleEditAssignment = async (assignmentId: string) => {
    console.log("Edit assignment:", assignmentId);
    // Implement edit logic
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      await apiClient.post(`/assignments/${assignmentId}/delete`);
      setAssignments((prev) =>
        prev.filter((assignment) => assignment.id !== assignmentId)
      );
    } catch (err) {
      console.error("Error deleting assignment:", err);
    }
  };

  const handleEditCourse = async (courseId: string) => {
    console.log("Edit course:", courseId);
    // Implement edit logic
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await apiClient.post(`/courses/${courseId}/delete`);
      setCourses((prev) => prev.filter((course) => course.id !== courseId));
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading dashboard...</div>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <DashboardIndex
      stats={stats!}
      sessions={sessions}
      assignments={assignments}
      courses={courses}
      isAdmin={isAdmin}
      onEditSession={handleEditSession}
      onDeleteSession={handleDeleteSession}
      onEditAssignment={handleEditAssignment}
      onDeleteAssignment={handleDeleteAssignment}
      onEditCourse={handleEditCourse}
      onDeleteCourse={handleDeleteCourse}
    />
  );
}
