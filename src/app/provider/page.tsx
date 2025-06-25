import { Suspense } from "react";
import ProviderPage from "@/screens/provider";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
  searchParams: Promise<{
    query?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  
  return (
    <Suspense fallback={<ProviderPageSkeleton />}>
      <ProviderPage searchParams={params} />
    </Suspense>
  );
}

function ProviderPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-8 w-48 mb-8" />
      <div className="space-y-6">
        <div className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}