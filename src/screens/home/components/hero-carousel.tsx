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
    <div className="relative mt-16 w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 rounded-full glass-card shadow-soft text-sm font-medium text-muted-foreground mb-4">
          🔥 Featured Products
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Start Your Journey With These
        </h2>
      </div>
      
      <div className="w-full max-w-none">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {bestSellers.map((product) => (
              <CarouselItem key={product.id} className="pl-0 basis-full flex justify-center">
                <div className="w-full max-w-sm mx-auto">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="glass-card shadow-glow hover:shadow-glow border-0 left-4 lg:left-8" />
          <CarouselNext className="glass-card shadow-glow hover:shadow-glow border-0 right-4 lg:right-8" />
        </Carousel>
      </div>
    </div>
  );
}