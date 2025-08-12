"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

interface InfiniteScrollProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemsPerPage?: number;
  loadMoreItems?: number;
  className?: string;
  containerClassName?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  endMessage?: string;
  showLoadingIndicator?: boolean;
  scrollbarTheme?:
    | "gray"
    | "green"
    | "blue"
    | "purple"
    | "pink"
    | "red"
    | "orange";
  onLoadMore?: (currentItems: number, totalItems: number) => void;
}

const scrollbarThemes = {
  gray: {
    thumb: "#9ca3af",
    track: "#1f2937",
    class: "scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-800",
  },
  green: {
    thumb: "#10b981",
    track: "#064e3b",
    class: "scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-green-900",
  },
  blue: {
    thumb: "#3b82f6",
    track: "#1e3a8a",
    class: "scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-800",
  },
  purple: {
    thumb: "#8b5cf6",
    track: "#581c87",
    class:
      "scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-900",
  },
  pink: {
    thumb: "#ec4899",
    track: "#831843",
    class: "scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-pink-900",
  },
  red: {
    thumb: "#ef4444",
    track: "#7f1d1d",
    class: "scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-red-900",
  },
  orange: {
    thumb: "#f97316",
    track: "#9a3412",
    class:
      "scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-orange-800",
  },
};

export function InfiniteScroll<T extends { id: string }>({
  items,
  renderItem,
  itemsPerPage = 5,
  loadMoreItems = 3,
  className = "",
  containerClassName = "",
  emptyMessage = "No items found",
  endMessage = "You've reached the end!",
  showLoadingIndicator = true,
  scrollbarTheme = "gray",
  onLoadMore,
}: InfiniteScrollProps<T>) {
  const [loadedCount, setLoadedCount] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const theme = scrollbarThemes[scrollbarTheme];
  const displayedItems = items.slice(0, loadedCount);

  useEffect(() => {
    setLoadedCount(itemsPerPage);
    setIsLoading(false);
  }, [items, itemsPerPage]);

  const lastItemElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && loadedCount < items.length) {
          setIsLoading(true);
          onLoadMore?.(loadedCount, items.length);
          setTimeout(() => {
            setLoadedCount((prev) =>
              Math.min(prev + loadMoreItems, items.length)
            );
            setIsLoading(false);
          }, 300);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, loadedCount, items.length, loadMoreItems, onLoadMore]
  );

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div
      className={`h-full overflow-y-auto ${theme.class} ${className}`}
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: `${theme.thumb} ${theme.track}`,
      }}
    >
      <div className={`space-y-1 ${containerClassName}`}>
        {displayedItems.length ? (
          displayedItems.map((item, index) => (
            <div
              key={item.id}
              ref={
                index === displayedItems.length - 1 ? lastItemElementRef : null
              }
            >
              {renderItem(item, index)}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">{emptyMessage}</div>
        )}

        {isLoading && showLoadingIndicator && (
          <div className="flex items-center justify-center py-6 space-x-1">
            {[0, 75, 150].map((delay) => (
              <div
                key={delay}
                className={`w-2 h-2 bg-gray-400 rounded-full animate-bounce`}
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        )}

        {loadedCount >= items.length && items.length > itemsPerPage && (
          <div className="text-center py-4 text-gray-500 text-xs">
            {endMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export function useSearchFilter<T>(
  items: T[],
  searchFields: (keyof T)[],
  searchTerm: string
) {
  return items.filter((item) =>
    searchFields.some((field) =>
      String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
}
