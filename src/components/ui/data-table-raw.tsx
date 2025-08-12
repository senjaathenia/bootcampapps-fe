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
import { Search } from "lucide-react";

interface Column {
  key: string;
  label: string;
  width?: string;
}

interface DataTableRawProps {
  title: string;
  data: any[];
  columns: Column[];
  searchable?: boolean;
  expandable?: boolean;
  expandedContent?: (item: any) => React.ReactNode;
  itemsPerPage?: number;
  className?: string;
  onSearch?: (term: string) => any[];
  renderCell?: (item: any, column: Column) => React.ReactNode;
}

export function DataTableRaw({
  title,
  data,
  columns,
  searchable = false,
  expandable = false,
  expandedContent,
  itemsPerPage = 10,
  className,
  onSearch,
  renderCell,
}: DataTableRawProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl font-bold">{title}</h2>
          {searchable && (
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 bg-gray-800">
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={`text-gray-300 font-medium py-4 px-6 ${
                      column.width || ""
                    }`}
                  >
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={item.id || index}
                  className="border-gray-700 hover:bg-gray-800/50"
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} className="py-4 px-6">
                      {renderCell ? (
                        renderCell(item, column)
                      ) : (
                        <span className="text-white">{item[column.key]}</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
