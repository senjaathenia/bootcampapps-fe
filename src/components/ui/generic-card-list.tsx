"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ReactNode, useState } from "react";

export interface GenericCardListTheme {
  card: string;
  header: string;
  title: string;
  search: string;
  searchIcon: string;
  searchPlaceholder: string;
  item: string;
  itemHover: string;
  primaryText: string;
  secondaryText: string;
  metaText: string;
}

export interface CardListItem {
  id: string;
  primaryText: string;
  secondaryText?: string;
  metaText?: string;
  badge?: {
    text: string;
    className: string;
  };
  customContent?: ReactNode;
}

interface GenericCardListProps {
  title: string;
  items: CardListItem[];
  searchFields?: string[];
  searchPlaceholder?: string;
  maxItems?: number;
  className?: string;
  theme?: GenericCardListTheme;
  onItemClick?: (item: CardListItem) => void;
}

const defaultTheme: GenericCardListTheme = {
  card: "bg-[#171717] border-[#2F2F2F]",
  header: "pb-4",
  title: "text-white text-xl font-bold",
  search:
    "pl-10 bg-[#73737380] border-[#2F2F2F] text-white placeholder-gray-400 text-sm h-8",
  searchIcon: "text-gray-400",
  searchPlaceholder: "Search...",
  item: "p-3 rounded-lg",
  itemHover: "hover:bg-gray-700/50",
  primaryText: "text-white font-semibold text-sm leading-tight",
  secondaryText: "text-gray-400 text-xs mt-1",
  metaText: "text-white text-xs font-medium",
};

export function GenericCardList({
  title,
  items,
  searchFields = ["primaryText", "secondaryText"],
  searchPlaceholder,
  maxItems = 10,
  className = "",
  theme = defaultTheme,
  onItemClick,
}: GenericCardListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items
    .filter((item) =>
      searchFields.some((field) => {
        const value = item[field as keyof CardListItem];
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    )
    .slice(0, maxItems);

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
              placeholder={searchPlaceholder || theme.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={theme.search}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`${theme.item} ${theme.itemHover} ${
              onItemClick ? "cursor-pointer" : ""
            }`}
            onClick={() => onItemClick?.(item)}
          >
            {item.customContent || (
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className={theme.primaryText}>{item.primaryText}</h3>
                  {item.secondaryText && (
                    <p className={theme.secondaryText}>{item.secondaryText}</p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  {item.metaText && (
                    <p className={theme.metaText}>{item.metaText}</p>
                  )}
                  {item.badge && (
                    <Badge
                      className={`${item.badge.className} text-white text-xs px-2 py-1 font-medium mt-2`}
                    >
                      {item.badge.text}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
