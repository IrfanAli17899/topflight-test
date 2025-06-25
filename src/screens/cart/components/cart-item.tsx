"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type CartItem as CartItemType } from "@/lib/cart";
import { useServerAction } from "zsa-react";
import { removeFromCartAction } from "@/apis/cart";

interface CartItemProps {
  item: CartItemType;
  onUpdate: () => void;
}

export function CartItem({ item, onUpdate }: CartItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const { execute: removeFromCart } = useServerAction(removeFromCartAction);

  const handleRemove = async () => {
    setIsRemoving(true);
    
    const [result, error] = await removeFromCart({ productId: item.productId });
    
    if (error) {
      console.error("Failed to remove from cart:", error);
    } else {
      onUpdate();
    }
    
    setIsRemoving(false);
  };

  return (
    <Card className="border-0 bg-muted/30">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Link href={`/products/${item.productId}`} className="flex-shrink-0">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden">
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
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}