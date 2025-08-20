// import { GenericTable } from "@/features/dashboard/components/session-table";
// import { Assignment } from "@/features/dashboard/schema";
// import apiClient from "@/lib/apiClient";

// // Remove fetchApi, use apiClient.get instead

// export default async function DashboardPage() {
//   // Fetch all data server-side
//   const { data: assignments } = await apiClient.get<Assignment[]>(
//     "/assignment"
//   );

//   // Map assignment ke format Session agar bisa dipakai di SessionsTable
//   const mappedAssignments = assignments.map((a: any) => ({
//     id: String(a.id),
//     title: a.title || "",
//     participant: a.participants?.user?.name || "-",
//     course: a.course?.name || "-",
//     mentor: a.course?.mentor?.name || "-",
//     score: a.score ?? "-",
//     status: a.status || "-",
//     date: a.date && a.date !== "0001-01-01T00:00:00Z" ? a.date : "-",
//     file: a.file_path || "-",
//   }));
//   const columns = [
//     { key: "title", label: "Judul Tugas" },
//     { key: "participant", label: "Peserta" },
//     { key: "course", label: "Course" },
//     { key: "mentor", label: "Mentor" },
//     { key: "score", label: "Skor" },
//     { key: "status", label: "Status" },
//     { key: "date", label: "Tanggal" },
//     { key: "file", label: "File" },
//   ];
//   return (
//     <div className="space-y-6">
//       <h2 className="text-xl font-bold text-white mb-4">Assignment Table</h2>
//       <GenericTable
//         data={mappedAssignments}
//         itemsPerPage={5}
//         columns={columns}
//         title="Assignment Table"
//       />
//     </div>
//   );
// }
