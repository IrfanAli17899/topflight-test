import { Suspense } from "react";
import { BestSellersCarousel } from "./components/best-sellers-carousel";
import { FAQSection } from "./components/faq-section";
import { HeroSection } from "./components/hero-section";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      
      <section className="relative overflow-hidden py-24">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background" />
        
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Best Selling Products
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our most popular supplements trusted by thousands of customers
            </p>
          </div>
          
          <Suspense fallback={<BestSellersSkeleton />}>
            <BestSellersCarousel />
          </Suspense>
        </div>
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
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}