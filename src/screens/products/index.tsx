import { searchProductsAction } from "@/apis/products";
import { ProductFilters } from "./components/product-filters";
import { ProductGrid } from "./components/product-grid";
import { ProductSort } from "./components/product-sort";

interface ProductsPageProps {
  searchParams: {
    query?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    bestSellers?: string;
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const [result, error] = await searchProductsAction({
    query: searchParams.query,
    category: searchParams.category,
    minPrice: searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined,
    sortBy: searchParams.sortBy as any,
    bestSellers: searchParams.bestSellers === 'true',
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: 12,
  });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">Error Loading Products</h1>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  const { products, total, page, totalPages, categories } = result;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Our Products</h1>
          <p className="text-muted-foreground text-lg">
            Discover premium supplements for your fitness journey
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-24">
              <ProductFilters 
                categories={categories}
                searchParams={searchParams}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <p className="text-sm text-muted-foreground">
                  Showing {products.length} of {total} products
                  {searchParams.query && (
                    <span> for "{searchParams.query}"</span>
                  )}
                </p>
              </div>
              <ProductSort currentSort={searchParams.sortBy} />
            </div>

            {/* Products Grid */}
            <ProductGrid 
              products={products}
              currentPage={page}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}