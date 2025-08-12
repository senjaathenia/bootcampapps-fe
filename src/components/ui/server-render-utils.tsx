// Server-safe utility functions for rendering
export const formatDateForTable = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

export const getStatusBadgeClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-500 text-white";
    case "pending":
      return "bg-yellow-500 text-black";
    case "overdue":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export const getStatusText = (status: string): string => {
  switch (status.toLowerCase()) {
    case "completed":
      return "Selesai";
    case "pending":
      return "Menunggu";
    case "overdue":
      return "Terlambat";
    default:
      return status;
  }
};
