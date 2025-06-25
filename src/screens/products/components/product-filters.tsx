"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, X } from "lucide-react";
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
  
  const [query, setQuery] = useState(searchParams.query || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.category || "all");
  const [minPrice, setMinPrice] = useState(searchParams.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.maxPrice || "");
  const [bestSellers, setBestSellers] = useState(searchParams.bestSellers === 'true');

  const updateFilters = (updates: Record<string, string | undefined>) => {
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
    router.push("/products");
  };

  const hasActiveFilters = query || selectedCategory !== "all" || minPrice || maxPrice || bestSellers;

  return (
    <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
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
              className="flex-1"
            />
            <Button type="submit" size="icon" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <Separator />

        {/* Best Sellers */}
        <div>
          <Button
            variant={bestSellers ? "default" : "outline"}
            onClick={handleBestSellersToggle}
            className="w-full justify-start"
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
              className="w-full justify-start"
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                onClick={() => handleCategoryChange(category)}
                className="w-full justify-start"
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
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="flex-1"
              />
            </div>
            <Button
              variant="outline"
              onClick={handlePriceFilter}
              className="w-full"
            >
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
                  <Badge variant="secondary" className="gap-1">
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
                  <Badge variant="secondary" className="gap-1">
                    {selectedCategory}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleCategoryChange("all")}
                    />
                  </Badge>
                )}
                {bestSellers && (
                  <Badge variant="secondary" className="gap-1">
                    Best Sellers
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={handleBestSellersToggle}
                    />
                  </Badge>
                )}
                {(minPrice || maxPrice) && (
                  <Badge variant="secondary" className="gap-1">
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