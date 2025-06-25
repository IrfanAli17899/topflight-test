import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-blue-600"></div>
              <span className="text-lg font-bold">SupplementStore</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted source for premium supplements and nutrition products. 
              Fuel your fitness journey with scientifically-backed formulations.
            </p>
            <div className="flex space-x-4 pt-4">
              <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <span className="text-xs">📧</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <span className="text-xs">📱</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <span className="text-xs">🐦</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Products</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/products?category=Protein" className="hover:text-foreground transition-colors hover:underline">Protein Supplements</Link></li>
              <li><Link href="/products?category=Pre-Workout" className="hover:text-foreground transition-colors hover:underline">Pre-Workout</Link></li>
              <li><Link href="/products?category=Vitamins" className="hover:text-foreground transition-colors hover:underline">Vitamins & Minerals</Link></li>
              <li><Link href="/products?category=Creatine" className="hover:text-foreground transition-colors hover:underline">Creatine</Link></li>
              <li><Link href="/products?bestSellers=true" className="hover:text-foreground transition-colors hover:underline">Best Sellers</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors hover:underline">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors hover:underline">FAQ</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors hover:underline">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors hover:underline">Returns & Exchanges</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors hover:underline">Track Your Order</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors hover:underline">About Us</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors hover:underline">Our Mission</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors hover:underline">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors hover:underline">Terms of Service</Link></li>
              <li><Link href="/provider" className="hover:text-foreground transition-colors hover:underline">Provider Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 SupplementStore. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span>🔒 Secure Payments</span>
            <span>🚚 Fast Shipping</span>
            <span>✅ Quality Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}