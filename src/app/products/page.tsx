import { Suspense } from "react";
import ProductsPage from "@/screens/products";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
  searchParams: Promise<{
    query?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    bestSellers?: string;
    page?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsPage searchParams={params} />
    </Suspense>
  );
}

function ProductsPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Skeleton */}
        <div className="lg:w-64 space-y-6">
          <Skeleton className="h-8 w-32" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
        
        {/* Products Grid Skeleton */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}