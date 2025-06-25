import { getBestSellersAction } from "@/apis/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/ui/product-card";

export async function BestSellersCarousel() {
  const [bestSellers, error] = await getBestSellersAction({ limit: 6 });

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Failed to load best sellers</p>
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-7xl mx-auto"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {bestSellers.map((product) => (
          <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}