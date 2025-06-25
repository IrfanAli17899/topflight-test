import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Premium Supplements for
            <span className="text-primary block">Peak Performance</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fuel your fitness journey with our scientifically-backed supplements. 
            From protein powders to pre-workouts, we have everything you need to reach your goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/products?bestSellers=true">Best Sellers</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}