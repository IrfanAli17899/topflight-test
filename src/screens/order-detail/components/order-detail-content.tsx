"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Package, User, MapPin, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Order } from "@/data/orders";
import { useServerAction } from "zsa-react";
import { updateOrderStatusAction } from "@/apis/orders";

interface OrderDetailContentProps {
  order: Order;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-purple-100 text-purple-800 border-purple-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

export function OrderDetailContent({ order: initialOrder }: OrderDetailContentProps) {
  const [order, setOrder] = useState(initialOrder);
  const [isUpdating, setIsUpdating] = useState(false);
  const { execute: updateOrderStatus } = useServerAction(updateOrderStatusAction);

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    
    const [updatedOrder, error] = await updateOrderStatus({
      id: order.id,
      status: newStatus as any,
    });

    if (error) {
      console.error("Failed to update order status:", error);
    } else {
      setOrder(updatedOrder);
    }
    
    setIsUpdating(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/provider">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
        </Button>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Order {order.id}</h1>
            <p className="text-muted-foreground">
              Placed on {new Date(order.createdAt).toLocaleDateString()} at{' '}
              {new Date(order.createdAt).toLocaleTimeString()}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge 
              variant="outline" 
              className={`${statusColors[order.status]} text-sm px-3 py-1`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
            
            <Select 
              value={order.status} 
              onValueChange={handleStatusUpdate}
              disabled={isUpdating}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.productName}</h4>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${item.price.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          ${(item.price * item.quantity).toFixed(2)} total
                        </p>
                      </div>
                    </div>
                    {index < order.items.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Contact Details</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Name:</span> {order.customerName}</p>
                  <p><span className="font-medium">Email:</span> {order.customerEmail}</p>
                  <p><span className="font-medium">Phone:</span> {order.customerPhone}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Shipping Address
                </h4>
                <div className="text-sm text-muted-foreground">
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${(order.total - (order.total > 50 ? 0 : 9.99) - (order.total * 0.08)).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {order.total > 50 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      "$9.99"
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(order.total * 0.08).toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div className="text-sm">
                    <p className="font-medium">Order Placed</p>
                    <p className="text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {order.updatedAt !== order.createdAt && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div className="text-sm">
                      <p className="font-medium">Status Updated</p>
                      <p className="text-muted-foreground">
                        {new Date(order.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}