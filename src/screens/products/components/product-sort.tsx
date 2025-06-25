"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductSortProps {
  currentSort?: string;
}

export function ProductSort({ currentSort }: ProductSortProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === "default") {
      params.delete("sortBy");
    } else {
      params.set("sortBy", value);
    }
    
    // Reset to first page when sort changes
    params.delete('page');
    
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      <Select value={currentSort || "default"} onValueChange={handleSortChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="name">Name (A-Z)</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="best-sellers">Best Sellers First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}