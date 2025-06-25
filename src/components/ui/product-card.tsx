"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Product } from "@/data/products";
import { useCartStore } from "@/lib/cart-store";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { cart, addToCart } = useCartStore();
  
  const isInCart = cart.items.some(item => item.productId === product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInCart) return; // Don't add if already in cart
    
    setIsAdding(true);
    
    // Add a small delay for better UX
    setTimeout(() => {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      setIsAdding(false);
    }, 300);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group hover:shadow-glow transition-all duration-500 h-full flex flex-col border-0 glass-card overflow-hidden hover:scale-[1.02]">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {product.isBestSeller && (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-0 shadow-glow rounded-xl">
                ⭐ Best Seller
              </Badge>
            )}
            {product.stock <= 10 && product.stock > 0 && (
              <Badge variant="destructive" className="absolute top-3 right-3 shadow-glow rounded-xl">
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
              <Badge variant="secondary" className="glass-card rounded-xl">
                {product.category}
              </Badge>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0">
          <Button 
            className={`w-full transition-all duration-300 shadow-soft hover:shadow-glow rounded-xl ${
              isInCart 
                ? "bg-green-600 hover:bg-green-700 text-white" 
                : "bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
            }`}
            onClick={handleAddToCart}
            disabled={isAdding || product.stock === 0 || isInCart}
          >
            {isInCart ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                {isAdding ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}