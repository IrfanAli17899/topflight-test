"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ArrowUpDown, Loader2 } from "lucide-react";
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
  const [isPending, startTransition] = useTransition();

  const handleSortChange = (value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (value === "default") {
        params.delete("sortBy");
      } else {
        params.set("sortBy", value);
      }
      
      // Reset to first page when sort changes
      params.delete('page');
      
      router.push(`/products?${params.toString()}`);
    });
  };

  return (
    <div className="flex items-center gap-2">
      {isPending ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : <ArrowUpDown className="h-4 w-4 text-muted-foreground" />}
      <Select value={currentSort || "default"} onValueChange={handleSortChange} disabled={isPending}>
        <SelectTrigger className="w-48 rounded-xl">
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