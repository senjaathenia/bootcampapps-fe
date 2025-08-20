import { AssignmentsList } from "./components/assignment-list";
import { DashboardCoursesList } from "./components/courses-list";
import { GenericTable } from "./components/generic-table";
import { StatsOverview } from "./components/stats-overview";

import { Assignment, Course, Session } from "./schema";

interface DashboardIndexProps {
  statsCards?: import("./components/stats-overview").StatCardConfig[];
  sessions?: Session[];
  assignments?: Assignment[];
  courses?: Course[];
  isAdmin?: boolean;
  onEditSession?: (sessionId: string) => void;
  onDeleteSession?: (sessionId: string) => void;
  onEditAssignment?: (assignmentId: string) => void;
  onDeleteAssignment?: (assignmentId: string) => void;
  onEditCourse?: (courseId: string) => void;
  onDeleteCourse?: (courseId: string) => void;
}

export default function DashboardIndex(props: DashboardIndexProps) {
  const {
    statsCards,
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
  } = props;
  return (
    <div className="space-y-6">
      {/* Custom Stats Overview */}
      {statsCards && <StatsOverview cards={statsCards} />}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sessions Table - Takes 2 columns */}
        <div className="lg:col-span-2">
          {sessions && (
            <GenericTable
              data={sessions}
              columns={[
                { key: "title", label: "Title" },
                { key: "course", label: "Course" },
                { key: "mentor", label: "Mentor" },
                { key: "date", label: "Date" },
                { key: "description", label: "Description" },
              ]}
              itemsPerPage={1}
            />
          )}
        </div>

        {/* Right Side Column */}
        <div className="space-y-6 -mt-[165px]">
          {assignments && (
            <AssignmentsList
              assignments={assignments}
              maxItems={5}
              isAdmin={isAdmin}
              onEdit={onEditAssignment}
              onDelete={onDeleteAssignment}
            />
          )}
          {courses && (
            <DashboardCoursesList
              courses={courses}
              isAdmin={isAdmin}
              onEdit={onEditCourse}
              onDelete={onDeleteCourse}
            />
          )}
        </div>
      </div>
    </div>
  );
}
