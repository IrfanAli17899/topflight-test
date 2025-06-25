"use client";

import { useState } from "react";
import { ArrowLeft, CreditCard, CheckCircle, Package, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useServerAction } from "zsa-react";
import { createOrderAction } from "@/apis/orders";
import { CheckoutForm } from "./components/checkout-form";
import { OrderSummary } from "./components/order-summary";
import { useCartStore } from "@/lib/cart-store";
import Link from "next/link";

interface CheckoutFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  const [error, setError] = useState<string>("");
  
  const { cart, clearCart } = useCartStore();
  const { execute: createOrder } = useServerAction(createOrderAction);

  const handleSubmitOrder = async (formData: CheckoutFormData) => {
    if (!cart || cart.items.length === 0) return;

    setIsSubmitting(true);
    setError("");

    try {
      const subtotal = cart.total;
      const shipping = subtotal > 50 ? 0 : 9.99;
      const tax = subtotal * 0.08;
      const total = subtotal + shipping + tax;

      const orderData = {
        ...formData,
        items: cart.items.map(item => ({
          productId: item.productId,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: total,
      };

      console.log("Creating order with data:", orderData);

      const [order, orderError] = await createOrder(orderData);

      if (orderError) {
        console.error("Failed to create order:", orderError);
        setError("Failed to create order. Please try again.");
        setIsSubmitting(false);
        return;
      }

      console.log("Order created successfully:", order);

      // Clear the cart
      clearCart();
      
      setOrderId(order.id);
      setOrderComplete(true);
      setIsSubmitting(false);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
        <div className="container mx-auto px-4 py-8">
          <Card className="text-center py-16 border-0 shadow-glow glass-card">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Add some products to your cart before checking out.
              </p>
              <Button asChild className="rounded-xl">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Floating sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <Sparkles
              key={i}
              className={`absolute text-yellow-400 animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <Card className="max-w-4xl mx-auto text-center border-0 shadow-glow glass-card overflow-hidden">
            <CardContent className="p-16">
              {/* Success Animation */}
              <div className="relative mb-12">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-glow animate-bounce">
                  <CheckCircle className="h-16 w-16 text-white" />
                </div>
                <div className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-ping opacity-20"></div>
                <div className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-ping opacity-10 animation-delay-500"></div>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-pulse">
                🎉 Order Confirmed! 🎉
              </h1>
              
              <div className="glass-card p-8 rounded-2xl mb-10 max-w-lg mx-auto shadow-glow">
                <p className="text-muted-foreground mb-3 text-lg">Your order ID is:</p>
                <p className="text-4xl font-bold text-primary font-mono tracking-wider">{orderId}</p>
              </div>

              <div className="space-y-6 mb-12">
                <div className="flex items-center justify-center gap-4 text-lg text-muted-foreground glass-card p-4 rounded-xl max-w-md mx-auto">
                  <Package className="h-6 w-6 text-green-500" />
                  <span>Order added to provider portal successfully!</span>
                </div>
                <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
                  🎊 Congratulations! Your order has been successfully placed and is now being processed. 
                  You will receive an email confirmation shortly with your order details and tracking information. 
                  Your supplements will be shipped within 1-2 business days.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild size="lg" className="rounded-xl shadow-glow bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-lg px-8 py-6">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl glass-card text-lg px-8 py-6">
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl glass-card text-lg px-8 py-6">
                  <Link href="/provider">View in Provider Portal</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4 rounded-xl">
            <Link href="/cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <CreditCard className="h-8 w-8" />
            Checkout
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="border-destructive bg-destructive/10 mb-6">
            <CardContent className="p-4">
              <p className="text-destructive font-medium">{error}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <CheckoutForm 
              onSubmit={handleSubmitOrder}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Order Summary */}
          <div>
            <OrderSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}