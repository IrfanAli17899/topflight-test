import { Suspense } from "react";
import CartPage from "@/screens/cart";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  return (
    <Suspense fallback={<CartPageSkeleton />}>
      <CartPage />
    </Suspense>
  );
}

function CartPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-8 w-48 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}