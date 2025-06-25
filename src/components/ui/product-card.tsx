"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Product } from "@/data/products";
import { useServerAction } from "zsa-react";
import { addToCartAction } from "@/apis/cart";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { execute: addToCart } = useServerAction(addToCartAction);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    
    const [result, error] = await addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    if (error) {
      console.error("Failed to add to cart:", error);
    }
    
    setIsAdding(false);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden rounded-t-xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.isBestSeller && (
              <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
                Best Seller
              </Badge>
            )}
          </div>
          
          <div className="p-4 space-y-2 flex-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{product.rating}</span>
              <span>({product.reviews} reviews)</span>
            </div>
            
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between pt-2">
              <span className="text-2xl font-bold">${product.price}</span>
              <Badge variant="secondary">{product.category}</Badge>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full" 
            onClick={handleAddToCart}
            disabled={isAdding || product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isAdding ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}