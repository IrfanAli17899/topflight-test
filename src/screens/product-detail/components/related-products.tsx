import { searchProductsAction } from "@/apis/products";
import { ProductCard } from "@/components/ui/product-card";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

export async function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const [result, error] = await searchProductsAction({
    category,
    limit: 4,
  });

  if (error || !result.products.length) {
    return null;
  }

  // Filter out the current product
  const relatedProducts = result.products.filter(product => product.id !== currentProductId);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Related Products</h2>
        <p className="text-muted-foreground">
          More products from the {category} category
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}