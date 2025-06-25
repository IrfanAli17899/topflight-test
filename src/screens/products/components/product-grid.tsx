import { ProductCard } from "@/components/ui/product-card";
import { ProductPagination } from "./product-pagination";
import { type Product } from "@/data/products";

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
}

export function ProductGrid({ products, currentPage, totalPages }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search terms to find what you&apos;re looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}