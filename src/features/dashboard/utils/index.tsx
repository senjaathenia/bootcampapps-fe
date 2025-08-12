import { Assignment, Session } from "../schema";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const getStatusColor = (status: Assignment["status"]): string => {
  switch (status) {
    case "graded":
      return "bg-green-600 hover:bg-green-700";
    case "not_reviewed":
      return "bg-yellow-600 hover:bg-yellow-700";
    case "not_uploaded":
      return "bg-red-600 hover:bg-red-700";
    default:
      return "bg-gray-600 hover:bg-gray-700";
  }
};

export const getStatusText = (status: Assignment["status"]): string => {
  switch (status) {
    case "graded":
      return "Graded";
    case "not_uploaded":
      return "Not Submitted";
    case "not_reviewed":
      return "Not Reviewed";
    default:
      return "Unknown";
  }
};

// Helper untuk ambil tanggal assignment dari session.date jika ada
export const getAssignmentDate = (assignment: any): string => {
  // Jika assignment.session.date ada, pakai itu
  if (assignment.session && assignment.session.date) {
    return formatDate(assignment.session.date);
  }
  // Fallback ke assignment.dueDate jika ada
  if (assignment.dueDate) {
    return formatDate(assignment.dueDate);
  }
  return "Invalid Date";
};

export const calculateProgress = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

export const filterSessionsByPeriod = (
  sessions: Session[],
  period: "today" | "week" | "month"
): Session[] => {
  const now = new Date();
  const startDate = new Date();

  switch (period) {
    case "today":
      startDate.setHours(0, 0, 0, 0);
      break;
    case "week":
      startDate.setDate(now.getDate() - 7);
      break;
    case "month":
      startDate.setMonth(now.getMonth() - 1);
      break;
  }

  return sessions.filter((session) => new Date(session.date) >= startDate);
};
