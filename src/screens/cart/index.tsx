"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useServerAction } from "zsa-react";
import { getCartAction } from "@/apis/cart";
import { CartItem } from "./components/cart-item";
import { CartSummary } from "./components/cart-summary";

export default function CartPage() {
  const { data: cart, execute: getCart, isPending } = useServerAction(getCartAction);

  useEffect(() => {
    getCart({});
  }, [getCart]);

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading cart...</div>
      </div>
    );
  }

  const cartItems = cart?.items || [];
  const isEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
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
          <Card className="text-center py-16 border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardContent>
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild size="lg">
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
              <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Cart Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem key={item.productId} item={item} onUpdate={() => getCart({})} />
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