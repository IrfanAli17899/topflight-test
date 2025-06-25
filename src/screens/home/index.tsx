import { Suspense } from "react";
import { BestSellersCarousel } from "./components/best-sellers-carousel";
import { FAQSection } from "./components/faq-section";
import { HeroSection } from "./components/hero-section";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      
      <section className="relative overflow-hidden py-32">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-background" />
        
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full glass-card shadow-soft text-sm font-medium text-muted-foreground mb-8">
              ⭐ Customer Favorites
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Best Selling Products
            </h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Discover our most popular supplements trusted by thousands of customers worldwide
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
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}