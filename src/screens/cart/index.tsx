"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/lib/cart-store";
import { CartItem } from "./components/cart-item";
import { CartSummary } from "./components/cart-summary";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const cartItems = cart.items;
  const isEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4 rounded-xl">
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShoppingBag className="h-8 w-8" />
            Shopping Cart
            {!isEmpty && (
              <span className="text-lg font-normal text-muted-foreground">
                ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </span>
            )}
          </h1>
        </div>

        {isEmpty ? (
          <Card className="text-center py-16 border-0 shadow-glow glass-card">
            <CardContent>
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven&apos;t added any products to your cart yet.
              </p>
              <Button asChild size="lg" className="rounded-xl shadow-glow">
                <Link href="/products">
                  Start Shopping
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-glow glass-card">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
                  {cartItems.map((item) => (
                    <CartItem key={item.productId} item={item} />
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Cart Summary */}
            <div>
              <CartSummary cart={cart} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}