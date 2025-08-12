"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Assignment } from "../schema";
import { formatDate, getStatusColor, getStatusText } from "../utils";
import { InfiniteScroll, useSearchFilter } from "./infinite-scroll";

// Single Assignment Item Component with hover effects
interface AssignmentItemProps {
  assignment: Assignment;
}

function AssignmentItem({ assignment }: AssignmentItemProps) {
  return (
    <div className="group p-4 rounded-lg transition-all duration-200 hover:bg-gray-700/50 cursor-pointer">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Assignment Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-sm leading-tight group-hover:text-white transition-colors">
              {assignment.title}
            </h3>
            <p className="text-gray-400 text-xs mt-1">{assignment.description}</p>
          </div>
        </div>

        {/* Date & Status */}
        <div className="text-right flex-shrink-0">
          <p className="text-white text-xs font-medium">
            {formatDate(assignment.dueDate)}
          </p>
          <Badge
            className={`${getStatusColor(
              assignment.status
            )} text-white text-xs px-2 py-1 font-medium mt-1`}
          >
            {getStatusText(assignment.status)}
          </Badge>
        </div>
      </div>
    </div>
  );
}

interface AssignmentsListProps {
  assignments: Assignment[];
  maxItems?: number;
  isAdmin?: boolean;
  onEdit?: (assignmentId: string) => void;
  onDelete?: (assignmentId: string) => void;
}

export function AssignmentsList({
  assignments,
  maxItems = 10,
  isAdmin = false,
  onEdit,
  onDelete,
}: AssignmentsListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter assignments using the custom hook
  const filteredAssignments = useSearchFilter(
    assignments,
    ["title", "description"],
    searchTerm
  );

  // Render function for individual assignment items
  const renderAssignmentItem = (assignment: Assignment, index: number) => (
    <AssignmentItem assignment={assignment} />
  );

  return (
    <Card className="bg-[#171717] border-[#2F2F2F] h-[400px] flex flex-col">
      {/* Sticky Header */}
      <CardHeader className="pb-4 sticky top-0 bg-[#171717] z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl font-bold">Assignments</h2>
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
          items={filteredAssignments}
          renderItem={renderAssignmentItem}
          itemsPerPage={3}
          loadMoreItems={2}
          className="h-full"
          containerClassName="p-2"
          emptyMessage="No assignments found"
          scrollbarTheme="gray"
          onLoadMore={(current, total) => {
            console.log(`Loading more assignments: ${current}/${total}`);
          }}
        />
      </CardContent>
    </Card>
  );
}
