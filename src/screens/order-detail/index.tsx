import { notFound } from "next/navigation";
import { getOrderByIdAction } from "@/apis/orders";
import { OrderDetailContent } from "./components/order-detail-content";

interface OrderDetailPageProps {
  orderId: string;
}

export default async function OrderDetailPage({ orderId }: OrderDetailPageProps) {
  const [order, error] = await getOrderByIdAction({ id: orderId });

  if (error || !order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4 py-8">
        <OrderDetailContent order={order} />
      </div>
    </div>
  );
}