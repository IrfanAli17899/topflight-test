import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Order } from "@/data/orders";
import { OrderPagination } from "./order-pagination";

interface OrdersTableProps {
  orders: Order[];
  currentPage: number;
  totalPages: number;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-purple-100 text-purple-800 border-purple-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

export function OrdersTable({ orders, currentPage, totalPages }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="border-0 shadow-glow glass-card">
          <CardContent className="text-center py-16">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to find what you&apos;re looking for.
            </p>
          </CardContent>
        </Card>
        
        {/* Show pagination even when no results if there are multiple pages */}
        {totalPages > 1 && (
          <OrderPagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-glow glass-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-semibold">Order ID</th>
                  <th className="text-left p-4 font-semibold">Customer</th>
                  <th className="text-left p-4 font-semibold">Items</th>
                  <th className="text-left p-4 font-semibold">Total</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Date</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <Link 
                        href={`/provider/orders/${order.id}`}
                        className="font-mono text-sm font-semibold text-primary hover:underline"
                      >
                        {order.id}
                      </Link>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        <div className="text-muted-foreground">
                          {order.items.slice(0, 2).map(item => item.productName).join(', ')}
                          {order.items.length > 2 && ` +${order.items.length - 2} more`}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold">${order.total.toFixed(2)}</span>
                    </td>
                    <td className="p-4">
                      <Badge 
                        variant="outline" 
                        className={`${statusColors[order.status]} rounded-xl`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="text-muted-foreground">
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Button asChild variant="ghost" size="sm" className="rounded-xl">
                        <Link href={`/provider/orders/${order.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Always show pagination if there are multiple pages, regardless of current results */}
      {totalPages > 1 && (
        <OrderPagination
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}