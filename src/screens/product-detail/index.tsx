import { notFound } from "next/navigation";
import { getProductByIdAction } from "@/apis/products";
import { ProductDetailContent } from "./components/product-detail-content";
import { RelatedProducts } from "./components/related-products";

interface ProductDetailPageProps {
  productId: string;
}

export default async function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const [product, error] = await getProductByIdAction({ id: productId });

  if (error || !product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4 py-8">
        <ProductDetailContent product={product} />
        <RelatedProducts currentProductId={productId} category={product.category} />
      </div>
    </div>
  );
}