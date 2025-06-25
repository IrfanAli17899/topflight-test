import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-primary"></div>
              <span className="text-lg font-bold">SupplementStore</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted source for premium supplements and nutrition products.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products?category=Protein" className="hover:text-foreground transition-colors">Protein</Link></li>
              <li><Link href="/products?category=Pre-Workout" className="hover:text-foreground transition-colors">Pre-Workout</Link></li>
              <li><Link href="/products?category=Vitamins" className="hover:text-foreground transition-colors">Vitamins</Link></li>
              <li><Link href="/products?category=Creatine" className="hover:text-foreground transition-colors">Creatine</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Returns</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/provider" className="hover:text-foreground transition-colors">Provider Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 SupplementStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}