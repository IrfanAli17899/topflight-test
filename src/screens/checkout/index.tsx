"use client";

import { useState } from "react";
import { ArrowLeft, CreditCard, CheckCircle, Package } from "lucide-react";
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
  
  const { cart, clearCart } = useCartStore();
  const { execute: createOrder } = useServerAction(createOrderAction);

  const handleSubmitOrder = async (formData: CheckoutFormData) => {
    if (!cart || cart.items.length === 0) return;

    setIsSubmitting(true);

    const orderData = {
      ...formData,
      items: cart.items.map(item => ({
        productId: item.productId,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: cart.total + (cart.total > 50 ? 0 : 9.99) + (cart.total * 0.08), // Include shipping and tax
    };

    const [order, error] = await createOrder(orderData);

    if (error) {
      console.error("Failed to create order:", error);
      setIsSubmitting(false);
      return;
    }

    // Clear the cart
    clearCart();
    
    setOrderId(order.id);
    setOrderComplete(true);
    setIsSubmitting(false);
  };

  if (!cart || cart.items.length === 0) {
    return (
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
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-3xl mx-auto text-center border-0 shadow-glow glass-card overflow-hidden">
            <CardContent className="p-12">
              {/* Success Animation */}
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-glow">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                <div className="absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-ping opacity-20"></div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Order Confirmed!
              </h1>
              
              <div className="glass-card p-6 rounded-2xl mb-8 max-w-md mx-auto">
                <p className="text-muted-foreground mb-2">Your order ID is:</p>
                <p className="text-3xl font-bold text-primary font-mono">{orderId}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Package className="h-5 w-5" />
                  <span>Order has been added to the provider portal</span>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  You will receive an email confirmation shortly with your order details and tracking information. 
                  Your order is now being processed and will be shipped soon.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-xl shadow-glow bg-gradient-to-r from-primary to-blue-600">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl glass-card">
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl glass-card">
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