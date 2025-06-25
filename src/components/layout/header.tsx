"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { getCartAction } from "@/apis/cart";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: cart } = useServerAction(getCartAction, {});

  const cartItemsCount = cart?.items.length || 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-blue-600 group-hover:scale-110 transition-transform duration-300"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
                SupplementStore
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors duration-300 relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors duration-300 relative group">
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/provider" className="text-sm font-medium hover:text-primary transition-colors duration-300 relative group">
                Provider Portal
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-muted/50 transition-colors duration-300">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-primary to-blue-600 text-xs text-primary-foreground flex items-center justify-center font-bold animate-pulse">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 bg-background/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-sm font-medium hover:text-primary transition-colors px-2 py-1 rounded hover:bg-muted/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="text-sm font-medium hover:text-primary transition-colors px-2 py-1 rounded hover:bg-muted/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/provider" 
                className="text-sm font-medium hover:text-primary transition-colors px-2 py-1 rounded hover:bg-muted/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Provider Portal
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}