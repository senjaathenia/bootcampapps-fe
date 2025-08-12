import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ListItem {
  id: string;
  [key: string]: any;
}

interface ListCardRawProps {
  title: string;
  items: ListItem[];
  searchable?: boolean;
  maxItems?: number;
  className?: string;
  renderItem: (item: ListItem) => React.ReactNode;
  onSearch?: (term: string) => ListItem[];
}

export function ListCardRaw({
  title,
  items,
  searchable = false,
  maxItems = 10,
  className,
  renderItem,
  onSearch,
}: ListCardRawProps) {
  const displayItems = items.slice(0, maxItems);

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl font-bold">{title}</h2>
          {searchable && (
            <div className="relative w-40">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 text-sm h-8"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayItems.map((item) => (
          <div key={item.id} className="p-3 rounded-lg hover:bg-gray-700/50">
            {renderItem(item)}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
