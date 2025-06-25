import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background with enhanced gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass-card shadow-soft text-sm font-medium text-muted-foreground mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Trusted by 10,000+ Athletes Worldwide
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
              Premium Supplements for
              <span className="block bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                Peak Performance
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Fuel your fitness journey with our scientifically-backed supplements. 
              From protein powders to pre-workouts, we have everything you need to reach your goals.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button asChild size="lg" className="text-lg px-10 py-7 shadow-glow hover:shadow-glow transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
              <Link href="/products">
                Shop Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-10 py-7 border-2 glass-card hover:bg-accent/50 transition-all duration-300 rounded-xl">
              <Link href="/products?bestSellers=true">
                Best Sellers
              </Link>
            </Button>
          </div>

          {/* Enhanced trust indicators */}
          <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="glass-card p-6 rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="glass-card p-6 rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">100%</div>
              <div className="text-sm text-muted-foreground">Quality Guaranteed</div>
            </div>
            <div className="glass-card p-6 rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-sm text-muted-foreground">Customer Support</div>
            </div>
            <div className="glass-card p-6 rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">Free</div>
              <div className="text-sm text-muted-foreground">Shipping Over $50</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}