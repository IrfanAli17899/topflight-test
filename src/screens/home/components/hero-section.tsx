import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-muted/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Premium Supplements for
              <span className="block bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Peak Performance
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Fuel your fitness journey with our scientifically-backed supplements. 
              From protein powders to pre-workouts, we have everything you need to reach your goals.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button asChild size="lg" className="text-lg px-8 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <Link href="/products">
                Shop Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-2 hover:bg-muted/50 transition-all duration-300">
              <Link href="/products?bestSellers=true">
                Best Sellers
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Quality Guaranteed</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Customer Support</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">Free</div>
              <div className="text-sm text-muted-foreground">Shipping Over $50</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}