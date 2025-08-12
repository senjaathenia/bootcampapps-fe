"use client";

import { AssignmentsList } from "./components/assignment-list";
import { DashboardCoursesList } from "./components/courses-list";
import { SessionsTable } from "./components/session-table";
import { StatsOverview } from "./components/stats-overview";
import { Assignment, Course, DashboardStats, Session } from "./schema";

interface DashboardIndexProps {
  stats: DashboardStats;
  sessions: Session[];
  assignments: Assignment[];
  courses: Course[];
  isAdmin?: boolean;
  onEditSession?: (sessionId: string) => void;
  onDeleteSession?: (sessionId: string) => void;
  onEditAssignment?: (assignmentId: string) => void;
  onDeleteAssignment?: (assignmentId: string) => void;
  onEditCourse?: (courseId: string) => void;
  onDeleteCourse?: (courseId: string) => void;
}

// Mock data untuk development
const mockStats: DashboardStats = {
  totalSessions: 12,
  completedAssignments: 8,
  activeCourses: 5,
};

const mockSessions: Session[] = [
  {
    id: "1",
    title: "Implementasi Html css dan js",
    course: "Basic Html Css Javascript",
    mentor: "Aditya Kunto",
    date: "21 Agustus 2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    id: "2",
    title: "Javascript Html css dan js",
    course: "Basic Html Css Javascript",
    mentor: "Aditya Kunto",
    date: "21 Agustus 2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "3",
    title: "Implementasi Html css dan js",
    course: "Basic Html Css Javascript",
    mentor: "Aditya Kunto",
    date: "21 Agustus 2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "4",
    title: "Advanced React Components",
    course: "Advanced React Development",
    mentor: "Sarah Johnson",
    date: "22 Agustus 2025",
    description:
      "Deep dive into React components, hooks, and state management. Learn advanced patterns and optimization techniques.",
  },
  {
    id: "5",
    title: "Node.js Backend Setup",
    course: "Node.js Backend Development",
    mentor: "Michael Chen",
    date: "23 Agustus 2025",
    description:
      "Setting up Node.js server, Express.js routing, and database connections. Building RESTful APIs.",
  },
  {
    id: "6",
    title: "Database Design Principles",
    course: "Database Design & SQL",
    mentor: "Jessica Lee",
    date: "24 Agustus 2025",
    description:
      "Learn database normalization, relationships, and efficient query design. PostgreSQL and MongoDB basics.",
  },
  {
    id: "7",
    title: "UI/UX Fundamentals",
    course: "UI/UX Design Fundamentals",
    mentor: "David Wilson",
    date: "25 Agustus 2025",
    description:
      "User interface design principles, wireframing, prototyping, and user experience best practices.",
  },
];

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Membuat Biodata Testing Framework UI",
    description: "1 Agustus 2025, 18:00",
    dueDate: "2025-08-01",
    status: "graded",
  },
  {
    id: "2",
    title: "Membuat Halaman HTML CSS",
    description: "1 Agustus 2025, 18:00",
    dueDate: "2025-08-01",
    status: "not_reviewed",
  },
  {
    id: "3",
    title: "Membuat Unit Testing Framework UI",
    description: "1 Agustus 2025, 18:00",
    dueDate: "2025-08-01",
    status: "not_uploaded",
  },
  {
    id: "4",
    title: "React Component Development",
    description: "2 Agustus 2025, 18:00",
    dueDate: "2025-08-02",
    status: "graded",
  },
  {
    id: "5",
    title: "Database Schema Design",
    description: "3 Agustus 2025, 18:00",
    dueDate: "2025-08-03",
    status: "not_reviewed",
  },
  {
    id: "6",
    title: "API Integration Testing",
    description: "4 Agustus 2025, 18:00",
    dueDate: "2025-08-04",
    status: "not_uploaded",
  },
];

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Fundamental QA",
    instructor: "QA Teams",
    startDate: "1 Agustus 2025",
    progress: 75,
  },
  {
    id: "2",
    title: "Basic Html Css Javascript",
    instructor: "Aditya Kunto",
    startDate: "1 Agustus 2025",
    progress: 60,
  },
  {
    id: "3",
    title: "Advanced React Development",
    instructor: "Aditya Kunto",
    startDate: "5 Agustus 2025",
    progress: 45,
  },
  {
    id: "4",
    title: "Node.js Backend Development",
    instructor: "Sarah Johnson",
    startDate: "10 Agustus 2025",
    progress: 30,
  },
  {
    id: "5",
    title: "Database Design & SQL",
    instructor: "Michael Chen",
    startDate: "15 Agustus 2025",
    progress: 20,
  },
  {
    id: "6",
    title: "UI/UX Design Fundamentals",
    instructor: "Jessica Lee",
    startDate: "20 Agustus 2025",
    progress: 10,
  },
  {
    id: "7",
    title: "DevOps & CI/CD Pipeline",
    instructor: "David Wilson",
    startDate: "25 Agustus 2025",
    progress: 5,
  },
  {
    id: "8",
    title: "Mobile App Development",
    instructor: "Emma Davis",
    startDate: "30 Agustus 2025",
    progress: 0,
  },
];

// Main Dashboard Component - Pure UI component
export default function DashboardIndex({
  stats,
  sessions,
  assignments,
  courses,
  isAdmin = false,
  onEditSession,
  onDeleteSession,
  onEditAssignment,
  onDeleteAssignment,
  onEditCourse,
  onDeleteCourse,
}: DashboardIndexProps) {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <StatsOverview stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sessions Table - Takes 2 columns */}
        <div className="lg:col-span-2">
          <SessionsTable
            sessions={sessions}
            itemsPerPage={1}
            isAdmin={isAdmin}
            onEdit={onEditSession}
            onDelete={onDeleteSession}
          />
        </div>

        {/* Right Side Column */}
        <div className="space-y-6 -mt-[165px]">
          {/* Assignments - Moved up */}
          <AssignmentsList
            assignments={assignments}
            maxItems={5}
            isAdmin={isAdmin}
            onEdit={onEditAssignment}
            onDelete={onDeleteAssignment}
          />

          {/* Courses */}
          <DashboardCoursesList
            courses={courses}
            isAdmin={isAdmin}
            onEdit={onEditCourse}
            onDelete={onDeleteCourse}
          />
        </div>
      </div>
    </div>
  );
}
