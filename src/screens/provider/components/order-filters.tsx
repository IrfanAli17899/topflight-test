"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OrderFiltersProps {
  statuses: readonly string[];
  searchParams: {
    query?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  };
}

export function OrderFilters({ statuses, searchParams }: OrderFiltersProps) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.query || "");
  const [selectedStatus, setSelectedStatus] = useState(searchParams.status || "all");
  const [startDate, setStartDate] = useState(searchParams.startDate || "");
  const [endDate, setEndDate] = useState(searchParams.endDate || "");

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
    
    router.push(`/provider?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ query });
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    updateFilters({ status: status === "all" ? undefined : status });
  };

  const handleDateFilter = () => {
    updateFilters({ 
      startDate: startDate || undefined, 
      endDate: endDate || undefined 
    });
  };

  const clearAllFilters = () => {
    setQuery("");
    setSelectedStatus("all");
    setStartDate("");
    setEndDate("");
    router.push("/provider");
  };

  const hasActiveFilters = query || selectedStatus !== "all" || startDate || endDate;

  return (
    <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Order Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Search by order ID, customer, or product..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Status Filter */}
          <div>
            <Select value={selectedStatus} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="flex gap-2">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="flex-1"
            />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleDateFilter}
            >
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t">
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
              {selectedStatus !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Status: {selectedStatus}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleStatusChange("all")}
                  />
                </Badge>
              )}
              {(startDate || endDate) && (
                <Badge variant="secondary" className="gap-1">
                  Date: {startDate || "Start"} - {endDate || "End"}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => {
                      setStartDate("");
                      setEndDate("");
                      updateFilters({ startDate: undefined, endDate: undefined });
                    }}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}