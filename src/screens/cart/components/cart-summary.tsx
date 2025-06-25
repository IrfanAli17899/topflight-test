"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type Cart } from "@/lib/cart-store";
import { useCartStore } from "@/lib/cart-store";

interface CartSummaryProps {
  cart: Cart;
}

export function CartSummary({ cart }: CartSummaryProps) {
  const [isClearing, setIsClearing] = useState(false);
  const clearCart = useCartStore((state) => state.clearCart);

  const handleClearCart = async () => {
    setIsClearing(true);
    
    // Add a small delay for better UX
    setTimeout(() => {
      clearCart();
      setIsClearing(false);
    }, 300);
  };

  if (!cart || cart.items.length === 0) {
    return null;
  }

  const subtotal = cart.total;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <Card className="border-0 shadow-glow glass-card sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {shipping > 0 && (
          <div className="text-sm text-muted-foreground glass-card p-3 rounded-xl">
            💡 Add ${(50 - subtotal).toFixed(2)} more for free shipping!
          </div>
        )}

        <div className="space-y-3">
          <Button asChild size="lg" className="w-full rounded-xl shadow-glow">
            <Link href="/checkout">
              <CreditCard className="h-4 w-4 mr-2" />
              Proceed to Checkout
            </Link>
          </Button>
          
          <Button
            variant="outline"
            onClick={handleClearCart}
            disabled={isClearing}
            className="w-full rounded-xl glass-card"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isClearing ? "Clearing..." : "Clear Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}