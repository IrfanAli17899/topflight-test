import { Suspense } from "react";
import ProductsPage from "@/screens/products";
import { ProductsPageSkeleton } from "@/screens/products/components/products-skeleton";

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