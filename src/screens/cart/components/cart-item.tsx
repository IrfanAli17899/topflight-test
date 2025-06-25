"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type CartItem as CartItemType } from "@/lib/cart-store";
import { useCartStore } from "@/lib/cart-store";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleRemove = async () => {
    setIsRemoving(true);
    
    // Add a small delay for better UX
    setTimeout(() => {
      removeFromCart(item.productId);
      setIsRemoving(false);
    }, 300);
  };

  return (
    <Card className="border-0 glass-card shadow-soft hover:shadow-glow transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Link href={`/products/${item.productId}`} className="flex-shrink-0">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover hover:scale-105 transition-transform"
              />
            </div>
          </Link>
          
          <div className="flex-1 min-w-0">
            <Link 
              href={`/products/${item.productId}`}
              className="font-semibold hover:text-primary transition-colors line-clamp-2"
            >
              {item.name}
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              Quantity: {item.quantity}
            </p>
          </div>
          
          <div className="flex flex-col items-end justify-between">
            <p className="font-bold text-lg">${item.price}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={isRemoving}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}