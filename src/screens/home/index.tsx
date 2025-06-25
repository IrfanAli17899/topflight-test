import { Suspense } from "react";
import { BestSellersCarousel } from "./components/best-sellers-carousel";
import { FAQSection } from "./components/faq-section";
import { HeroSection } from "./components/hero-section";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Best Selling Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular supplements trusted by thousands of customers
          </p>
        </div>
        
        <Suspense fallback={<BestSellersSkeleton />}>
          <BestSellersCarousel />
        </Suspense>
      </section>

      <FAQSection />
    </div>
  );
}

function BestSellersSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-1/4" />
        </div>
      ))}
    </div>
  );
}