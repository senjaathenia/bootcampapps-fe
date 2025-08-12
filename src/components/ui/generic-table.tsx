"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import React, { ReactNode, useState } from "react";

export interface GenericTableTheme {
  card: string;
  header: string;
  title: string;
  search: string;
  searchIcon: string;
  table: string;
  tableHeader: string;
  tableHeaderCell: string;
  tableRow: string;
  tableRowHover: string;
  tableCell: string;
  expandedContent: string;
  pagination: string;
  paginationText: string;
  paginationButton: string;
}

export type RenderVariant =
  | "default"
  | "formatted-date"
  | "highlighted-text"
  | "badge"
  | "custom";

export interface TableColumn {
  key: string;
  title: string;
  width?: string;
  className?: string;
  render?: (value: any, item: any) => ReactNode; // For client components
  renderVariant?: RenderVariant; // For server components
  renderProps?: Record<string, any>; // Additional props for rendering
}

export interface TableItem {
  id: string;
  [key: string]: any;
  expandedContent?: ReactNode;
}

interface GenericTableProps {
  title: string;
  items: TableItem[];
  columns: TableColumn[];
  searchFields?: string[];
  searchPlaceholder?: string;
  itemsPerPage?: number;
  className?: string;
  theme?: GenericTableTheme;
  onItemClick?: (item: TableItem) => void;
  expandable?: boolean;
}

const defaultTheme: GenericTableTheme = {
  card: "bg-[#171717] border-2 border-[#2F2F2F] rounded-lg",
  header: "pb-3",
  title: "text-white text-xl font-bold",
  search:
    "pl-10 bg-[#73737380] border-[#2F2F2F] text-white placeholder-gray-400 text-sm h-8 focus:outline-none focus:ring-0 focus:border-[#2F2F2F] border-2",
  searchIcon: "text-gray-400",
  table:
    "bg-[#171717] rounded-lg overflow-hidden border border-[#2F2F2F] w-full",
  tableHeader: "border-[#2F2F2F] bg-[#171717]",
  tableHeaderCell: "text-gray-300 font-medium py-3 px-4 text-sm",
  tableRow: "border-transparent",
  tableRowHover: "hover:bg-[#2F2F2F]/50",
  tableCell: "py-3 px-4 text-gray-300 truncate text-sm",
  expandedContent:
    "bg-[#202020] border-t border-[#2f2f2f] p-6 w-full max-w-full overflow-hidden",
  pagination:
    "bg-gray-900 border-t border-[#2F2F2F] px-4 py-3 flex items-center justify-between",
  paginationText: "text-xs text-gray-400",
  paginationButton:
    "h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 focus:outline-none focus:ring-0",
};

export function GenericTable({
  title,
  items,
  columns,
  searchFields = [],
  searchPlaceholder = "Search...",
  itemsPerPage = 10,
  className = "",
  theme = defaultTheme,
  onItemClick,
  expandable = false,
}: GenericTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    searchFields.some((field) => {
      const value = item[field];
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Render cell content based on variant or custom render
  const renderCellContent = (column: TableColumn, value: any, item: any) => {
    // If has custom render function (for client components)
    if (column.render) {
      return column.render(value, item);
    }

    // If has render variant (for server components)
    if (column.renderVariant) {
      switch (column.renderVariant) {
        case "formatted-date":
          // Import formatDate dynamically if needed
          if (typeof value === "string") {
            // Simple date formatting - you can customize this
            return new Date(value).toLocaleDateString();
          }
          return value;

        case "highlighted-text":
          return (
            <span className="text-white font-medium truncate text-sm">
              {value}
            </span>
          );

        case "badge":
          // Can use renderProps for badge styling
          const badgeClass = column.renderProps?.className || "bg-blue-500";
          return (
            <span className={`px-2 py-1 rounded text-xs ${badgeClass}`}>
              {value}
            </span>
          );

        case "custom":
          // Use renderProps for additional data
          return column.renderProps?.content || value;

        case "default":
        default:
          return value;
      }
    }

    // Fallback to plain value
    return value;
  };

  const toggleRowExpansion = (itemId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <Card className={`${theme.card} ${className}`}>
      <CardHeader className={theme.header}>
        <div className="flex items-center justify-between">
          <h2 className={theme.title}>{title}</h2>
          <div className="relative w-40">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.searchIcon} h-4 w-4`}
            />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={theme.search}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className={theme.table}>
          <Table>
            <TableHeader>
              <TableRow className={theme.tableHeader}>
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={`${theme.tableHeaderCell} ${
                      column.width || ""
                    } ${column.className || ""}`}
                  >
                    {column.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((item) => (
                <React.Fragment key={item.id}>
                  {/* Main Row */}
                  <TableRow
                    className={`${theme.tableRow} ${theme.tableRowHover} ${
                      onItemClick ? "cursor-pointer" : ""
                    }`}
                    onClick={() => onItemClick?.(item)}
                  >
                    {columns.map((column, index) => (
                      <TableCell key={column.key} className={theme.tableCell}>
                        {index === 0 && expandable && item.expandedContent ? (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleRowExpansion(item.id);
                              }}
                              className="h-5 w-5 p-0 text-gray-400 hover:text-white hover:bg-transparent flex-shrink-0"
                            >
                              {expandedRows.has(item.id) ? (
                                <ChevronUp className="h-3 w-3" />
                              ) : (
                                <ChevronDown className="h-3 w-3" />
                              )}
                            </Button>
                            {renderCellContent(column, item[column.key], item)}
                          </div>
                        ) : (
                          renderCellContent(column, item[column.key], item)
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Expanded Content Row */}
                  {expandable &&
                    expandedRows.has(item.id) &&
                    item.expandedContent && (
                      <TableRow className="border-gray-700">
                        <TableCell colSpan={columns.length} className="p-0">
                          <div className={theme.expandedContent}>
                            {item.expandedContent}
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
        {totalPages > 1 && (
          <div className={theme.pagination}>
            <p className={theme.paginationText}>
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={theme.paginationButton}
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={theme.paginationButton}
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
