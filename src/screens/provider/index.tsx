import { searchOrdersAction } from "@/apis/orders";
import { OrderFilters } from "./components/order-filters";
import { OrdersTable } from "./components/orders-table";

interface ProviderPageProps {
  searchParams: {
    query?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: string;
  };
}

export default async function ProviderPage({ searchParams }: ProviderPageProps) {
  const [result, error] = await searchOrdersAction({
    query: searchParams.query,
    status: searchParams.status as unknown as "pending" | "shipped" | "delivered" | "cancelled" | undefined,
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: 10,
  });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">Error Loading Orders</h1>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  const { orders, total, page, totalPages, statuses } = result;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Provider Portal</h1>
          <p className="text-muted-foreground text-lg">
            Manage orders and track customer purchases
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <OrderFilters 
            statuses={statuses}
            searchParams={searchParams}
          />
        </div>

        {/* Results Header */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {orders.length} of {total} orders
            {searchParams.query && (
              <span> for &quot;{searchParams.query}&quot;</span>
            )}
          </p>
        </div>

        {/* Orders Table */}
        <OrdersTable 
          orders={orders}
          currentPage={page}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}