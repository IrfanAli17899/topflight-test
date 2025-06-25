"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, ArrowLeft, Package, Shield, Truck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { type Product } from "@/data/products";
import { useCartStore } from "@/lib/cart-store";

interface ProductDetailContentProps {
  product: Product;
}

export function ProductDetailContent({ product }: ProductDetailContentProps) {
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
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/products" className="hover:text-foreground transition-colors">
          Products
        </Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-foreground transition-colors">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      {/* Back Button */}
      <Button variant="ghost" asChild className="w-fit">
        <Link href="/products">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
      </Button>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <Card className="overflow-hidden border-0 shadow-2xl">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.isBestSeller && (
                <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600">
                  Best Seller
                </Badge>
              )}
            </div>
          </Card>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              {product.stock <= 10 && product.stock > 0 && (
                <Badge variant="destructive">Low Stock</Badge>
              )}
              {product.stock === 0 && (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-primary mb-6">
              ${product.price}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* Stock Info */}
          <div className="flex items-center gap-2 text-sm">
            <Package className="h-4 w-4" />
            <span>
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </span>
          </div>

          {/* Add to Cart */}
          <Button 
            className={`w-full py-6 transition-all duration-300 shadow-soft hover:shadow-glow rounded-xl ${
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

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <Card className="border-0 bg-muted/50">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Quality Guaranteed</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-muted/50">
              <CardContent className="p-4 text-center">
                <Truck className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Free Shipping</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-muted/50">
              <CardContent className="p-4 text-center">
                <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Fast Delivery</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}