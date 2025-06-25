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
      <Card className="group hover:shadow-2xl transition-all duration-500 h-full flex flex-col border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {product.isBestSeller && (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-0 shadow-lg">
                ⭐ Best Seller
              </Badge>
            )}
            {product.stock <= 10 && product.stock > 0 && (
              <Badge variant="destructive" className="absolute top-3 right-3 shadow-lg">
                Low Stock
              </Badge>
            )}
          </div>
          
          <div className="p-6 space-y-3 flex-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating}</span>
              <span>({product.reviews} reviews)</span>
            </div>
            
            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between pt-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
              <Badge variant="secondary" className="bg-muted/50">
                {product.category}
              </Badge>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0">
          <Button 
            className="w-full group-hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl" 
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