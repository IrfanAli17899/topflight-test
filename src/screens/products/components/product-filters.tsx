"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ProductFiltersProps {
  categories: string[];
  searchParams: {
    query?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    bestSellers?: string;
  };
}

export function ProductFilters({ categories, searchParams }: ProductFiltersProps) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const [query, setQuery] = useState(searchParams.query || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.category || "all");
  const [minPrice, setMinPrice] = useState(searchParams.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.maxPrice || "");
  const [bestSellers, setBestSellers] = useState(searchParams.bestSellers === 'true');

  const updateFilters = (updates: Record<string, string | undefined>) => {
    startTransition(() => {
      const params = new URLSearchParams(urlSearchParams.toString());
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== "all") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      
      // Reset to first page when filters change
      params.delete('page');
      
      router.push(`/products?${params.toString()}`);
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ query });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateFilters({ category: category === "all" ? undefined : category });
  };

  const handlePriceFilter = () => {
    updateFilters({ 
      minPrice: minPrice || undefined, 
      maxPrice: maxPrice || undefined 
    });
  };

  const handleBestSellersToggle = () => {
    const newValue = !bestSellers;
    setBestSellers(newValue);
    updateFilters({ bestSellers: newValue ? 'true' : undefined });
  };

  const clearAllFilters = () => {
    setQuery("");
    setSelectedCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setBestSellers(false);
    startTransition(() => {
      router.push("/products");
    });
  };

  const hasActiveFilters = query || selectedCategory !== "all" || minPrice || maxPrice || bestSellers;

  return (
    <Card className="border-0 shadow-glow glass-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              disabled={isPending}
              className="text-muted-foreground hover:text-foreground rounded-xl"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <label className="text-sm font-medium mb-2 block">Search Products</label>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search by name or description..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 rounded-xl"
              disabled={isPending}
            />
            <Button type="submit" size="icon" variant="outline" disabled={isPending} className="rounded-xl">
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </form>
        </div>

        <Separator />

        {/* Best Sellers */}
        <div>
          <Button
            variant={bestSellers ? "default" : "outline"}
            onClick={handleBestSellersToggle}
            disabled={isPending}
            className="w-full justify-start rounded-xl"
          >
            ⭐ Best Sellers Only
          </Button>
        </div>

        <Separator />

        {/* Categories */}
        <div>
          <label className="text-sm font-medium mb-3 block">Categories</label>
          <div className="space-y-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "ghost"}
              onClick={() => handleCategoryChange("all")}
              disabled={isPending}
              className="w-full justify-start rounded-xl"
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                onClick={() => handleCategoryChange(category)}
                disabled={isPending}
                className="w-full justify-start rounded-xl"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <label className="text-sm font-medium mb-3 block">Price Range</label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="flex-1 rounded-xl"
                disabled={isPending}
              />
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="flex-1 rounded-xl"
                disabled={isPending}
              />
            </div>
            <Button
              variant="outline"
              onClick={handlePriceFilter}
              disabled={isPending}
              className="w-full rounded-xl"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Apply Price Filter
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <>
            <Separator />
            <div>
              <label className="text-sm font-medium mb-2 block">Active Filters</label>
              <div className="flex flex-wrap gap-2">
                {query && (
                  <Badge variant="secondary" className="gap-1 rounded-xl">
                    Search: {query}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => {
                        setQuery("");
                        updateFilters({ query: undefined });
                      }}
                    />
                  </Badge>
                )}
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="gap-1 rounded-xl">
                    {selectedCategory}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleCategoryChange("all")}
                    />
                  </Badge>
                )}
                {bestSellers && (
                  <Badge variant="secondary" className="gap-1 rounded-xl">
                    Best Sellers
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={handleBestSellersToggle}
                    />
                  </Badge>
                )}
                {(minPrice || maxPrice) && (
                  <Badge variant="secondary" className="gap-1 rounded-xl">
                    ${minPrice || "0"} - ${maxPrice || "∞"}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => {
                        setMinPrice("");
                        setMaxPrice("");
                        updateFilters({ minPrice: undefined, maxPrice: undefined });
                      }}
                    />
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}