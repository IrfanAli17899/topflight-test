"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useServerAction } from "zsa-react";
import { getCartAction, clearCartAction } from "@/apis/cart";
import { createOrderAction } from "@/apis/orders";
import { CheckoutForm } from "./components/checkout-form";
import { OrderSummary } from "./components/order-summary";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  
  const { data: cart, execute: getCart, isPending } = useServerAction(getCartAction);
  const { execute: clearCart } = useServerAction(clearCartAction);
  const { execute: createOrder } = useServerAction(createOrderAction);

  useEffect(() => {
    getCart({});
  }, [getCart]);

  const handleSubmitOrder = async (formData: any) => {
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
    await clearCart({});
    
    setOrderId(order.id);
    setOrderComplete(true);
    setIsSubmitting(false);
  };

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading checkout...</div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center py-16">
          <CardContent>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some products to your cart before checking out.
            </p>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto text-center border-0 shadow-2xl bg-card/50 backdrop-blur-sm">
            <CardContent className="p-12">
              <div className="text-green-500 mb-6">
                <CheckCircle className="h-16 w-16 mx-auto" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
              <p className="text-muted-foreground mb-2">
                Thank you for your order. Your order ID is:
              </p>
              <p className="text-2xl font-bold text-primary mb-8">{orderId}</p>
              <p className="text-muted-foreground mb-8">
                You will receive an email confirmation shortly with your order details and tracking information.
              </p>
              <div className="space-y-4">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/">Back to Home</Link>
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
          <Button variant="ghost" asChild className="mb-4">
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