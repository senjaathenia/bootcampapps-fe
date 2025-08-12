"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Course } from "../schema";
import { InfiniteScroll, useSearchFilter } from "./infinite-scroll";

// Utility function untuk format tanggal yang aman server-safe
const formatDateForTable = (dateString: string): string => {
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

// Single Course Item Component with hover effects
interface CourseItemProps {
  course: Course;
}

function CourseItem({ course }: CourseItemProps) {
  return (
    <div className="group p-4 rounded-lg transition-all duration-200 hover:bg-gray-700/50 cursor-pointer">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Course Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-sm leading-tight group-hover:text-white transition-colors">
              {course.title}
            </h3>
            <p className="text-gray-400 text-xs mt-1">{course.instructor}</p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="text-right flex-shrink-0">
          <p className="text-white text-xs font-medium">
            {formatDateForTable(course.startDate)}
          </p>
          <p className="text-gray-400 text-xs">09:00 - 12:00</p>
        </div>
      </div>
    </div>
  );
}

// Courses List Component with infinite scroll
interface DashboardCoursesListProps {
  courses: Course[];
  isAdmin?: boolean;
  onEdit?: (courseId: string) => void;
  onDelete?: (courseId: string) => void;
}

export function DashboardCoursesList({
  courses,
  isAdmin = false,
  onEdit,
  onDelete,
}: DashboardCoursesListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter courses using the custom hook
  const filteredCourses = useSearchFilter(
    courses,
    ["title", "instructor"],
    searchTerm
  );

  // Render function for individual course items
  const renderCourseItem = (course: Course, index: number) => (
    <CourseItem course={course} />
  );

  return (
    <Card className="bg-[#171717] border-[#2F2F2F] h-[400px] flex flex-col">
      {/* Sticky Header */}
      <CardHeader className="pb-4 sticky top-0 bg-[#171717] z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl font-bold">Courses</h2>
          <div className="relative w-32">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#73737380] border-[#2F2F2F] text-white placeholder-gray-400 text-sm h-8"
            />
          </div>
        </div>
      </CardHeader>

      {/* Scrollable Content with InfiniteScroll */}
      <CardContent className="flex-1 p-0 overflow-hidden">
        <InfiniteScroll
          items={filteredCourses}
          renderItem={renderCourseItem}
          itemsPerPage={5}
          loadMoreItems={3}
          className="h-full"
          containerClassName="p-2"
          emptyMessage="No courses found"
          scrollbarTheme="gray"
          onLoadMore={(current, total) => {
            console.log(`Loading more courses: ${current}/${total}`);
          }}
        />
      </CardContent>
    </Card>
  );
}
