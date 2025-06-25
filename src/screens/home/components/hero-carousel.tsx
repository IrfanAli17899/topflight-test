import { getBestSellersAction } from "@/apis/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/ui/product-card";

export async function HeroCarousel() {
  const [bestSellers, error] = await getBestSellersAction({ limit: 6 });

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Failed to load featured products</p>
      </div>
    );
  }

  return (
    <div className="relative mt-16">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 rounded-full glass-card shadow-soft text-sm font-medium text-muted-foreground mb-4">
          🔥 Featured Products
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Start Your Journey With These
        </h2>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {bestSellers.map((product) => (
            <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="glass-card shadow-glow hover:shadow-glow border-0 -left-4 lg:-left-12" />
        <CarouselNext className="glass-card shadow-glow hover:shadow-glow border-0 -right-4 lg:-right-12" />
      </Carousel>
    </div>
  );
}