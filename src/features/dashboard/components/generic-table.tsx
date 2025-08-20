"use client";

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
import { Search } from "lucide-react";
import React, { useState } from "react";

export interface TableColumn {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
  width?: string;
}

interface GenericTableProps {
  data: any[];
  columns: TableColumn[];
  itemsPerPage?: number;
  title?: string;
}

export function GenericTable({
  data,
  columns,
  itemsPerPage = 10,
  title = "Table",
}: GenericTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

  const filteredData = data.filter((row) =>
    columns.some((col) => {
      const value = row[col.key];
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredData.slice(startIndex, endIndex);

  // Reset to page 1 when rows per page changes
  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <Card className="bg-[#171717] border-2 border-[#2F2F2F] rounded-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl font-bold">{title}</h2>
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
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={`text-gray-300 font-medium py-3 px-4 text-sm ${
                      col.width || ""
                    }`}
                  >
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRows.map((row, idx) => (
                <TableRow
                  key={row.id || idx}
                  className="border-transparent hover:bg-[#2F2F2F]/50"
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className="py-3 px-4 text-gray-300 truncate text-sm"
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="bg-[#171717] border-t border-[#2F2F2F] px-4 py-3 flex items-center justify-between mt-4 rounded-b-lg">
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-400">
                {filteredData.length > 0
                  ? `${startIndex + 1}-${Math.min(
                      endIndex,
                      filteredData.length
                    )} of ${filteredData.length} row(s)`
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
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 focus:outline-none focus:ring-0"
                  >
                    {"<"}
                  </button>
                  <span className="text-sm text-gray-400 px-2">
                    {currentPage}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 focus:outline-none focus:ring-0"
                  >
                    {">"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
