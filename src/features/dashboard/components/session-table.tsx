"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Search,
} from "lucide-react";
import React, { useState } from "react";
import { Session } from "../schema";
import { formatDate } from "../utils";

interface SessionsTableProps {
  sessions: Session[];
  itemsPerPage?: number;
  isAdmin?: boolean;
  onEdit?: (sessionId: string) => void;
  onDelete?: (sessionId: string) => void;
}

export function SessionsTable({
  sessions,
  itemsPerPage = 10,
  isAdmin = false,
  onEdit,
  onDelete,
}: SessionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredSessions = sessions.filter(
    (session) =>
      session?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session?.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session?.mentor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSessions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentSessions = filteredSessions.slice(startIndex, endIndex);

  // Reset to page 1 when rows per page changes
  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  const toggleRowExpansion = (sessionId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(sessionId)) {
      newExpanded.delete(sessionId);
    } else {
      newExpanded.add(sessionId);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <Card className="bg-[#171717] border-2 border-[#2F2F2F] rounded-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl font-bold">Sessions</h2>
          <div className="relative w-40">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#73737380] border-[#2F2F2F] text-white placeholder-gray-400 text-sm h-8 focus:outline-none focus:ring-0 focus:border-[#2F2F2F] border-2"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="bg-[#171717] rounded-lg overflow-hidden border border-[#2F2F2F] w-full">
          <Table>
            <TableHeader>
              <TableRow className="border-[#2F2F2F] bg-[#171717]">
                <TableHead className="text-gray-300 font-medium py-3 px-4 w-[35%] text-sm">
                  Sessions Name
                </TableHead>
                <TableHead className="text-gray-300 font-medium py-3 px-4 w-[30%] text-sm">
                  Course
                </TableHead>
                <TableHead className="text-gray-300 font-medium py-3 px-4 w-[20%] text-sm">
                  Mentor
                </TableHead>
                <TableHead className="text-gray-300 font-medium py-3 px-4 w-[15%] text-sm">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSessions.map((session) => (
                <React.Fragment key={session.id}>
                  {/* Main Row */}
                  <TableRow className="border-transparent hover:bg-[#2F2F2F]/50">
                    <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {session.description && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRowExpansion(session.id)}
                            className="h-5 w-5 p-0 text-gray-400 hover:text-white hover:bg-transparent flex-shrink-0"
                          >
                            {expandedRows.has(session.id) ? (
                              <ChevronUp className="h-3 w-3" />
                            ) : (
                              <ChevronDown className="h-3 w-3" />
                            )}
                          </Button>
                        )}
                        <span className="text-white font-medium truncate text-sm">
                          {session.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-gray-300 truncate text-sm">
                      {session.course}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-gray-300 truncate text-sm">
                      {session.mentor}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-gray-300 truncate text-sm">
                      {formatDate(session.date)}
                    </TableCell>
                  </TableRow>

                  {/* Expanded Content Row */}
                  {expandedRows.has(session.id) && session.description && (
                    <TableRow className="border-gray-700">
                      <TableCell colSpan={4} className="p-0">
                        <div className="bg-[#202020] border-t border-[#2f2f2f] p-6 w-full max-w-full overflow-hidden">
                          <div className="space-y-4 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                              <div className="space-y-2">
                                <div className="break-words">
                                  <span className="text-white font-medium">
                                    Session:{" "}
                                  </span>
                                  <span className="text-white">
                                    {session.title}
                                  </span>
                                </div>
                                <div className="break-words">
                                  <span className="text-white font-medium">
                                    Course:{" "}
                                  </span>
                                  <span className="text-white">
                                    {session.course}
                                  </span>
                                </div>
                              </div>
                              <div className="text-left md:text-right space-y-1">
                                <div className="text-white font-medium">
                                  {session.mentor}
                                </div>
                                <div className="text-gray-400">
                                  {formatDate(session.date)}
                                </div>
                              </div>
                            </div>
                            <div className="border-t border-[#2f2f2f] pt-4 w-full">
                              <p className="text-gray-300 leading-relaxed break-words whitespace-pre-wrap">
                                {session.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredSessions.length > 0 && (
          <div className="bg-[#171717] border-t border-[#2F2F2F] px-4 py-3 flex items-center justify-between mt-4 rounded-b-lg">
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-400">
                {filteredSessions.length > 0
                  ? `${startIndex + 1}-${Math.min(
                      endIndex,
                      filteredSessions.length
                    )} of ${filteredSessions.length} row(s)`
                  : "0 of 0 row(s)"}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Rows per page</span>
                <Select
                  value={rowsPerPage.toString()}
                  onValueChange={handleRowsPerPageChange}
                >
                  <SelectTrigger className="w-16 h-8 bg-[#2F2F2F] border-[#2F2F2F] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2F2F2F] border-[#2F2F2F]">
                    <SelectItem
                      value="5"
                      className="text-white hover:bg-[#3F3F3F]"
                    >
                      5
                    </SelectItem>
                    <SelectItem
                      value="10"
                      className="text-white hover:bg-[#3F3F3F]"
                    >
                      10
                    </SelectItem>
                    <SelectItem
                      value="20"
                      className="text-white hover:bg-[#3F3F3F]"
                    >
                      20
                    </SelectItem>
                    <SelectItem
                      value="50"
                      className="text-white hover:bg-[#3F3F3F]"
                    >
                      50
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </p>
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 focus:outline-none focus:ring-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-400 px-2">
                    {currentPage}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 focus:outline-none focus:ring-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
