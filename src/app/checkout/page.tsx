import { Suspense } from "react";
import CheckoutPage from "@/screens/checkout";
import { CheckoutPageSkeleton } from "@/screens/checkout/components/checkout-skeleton";

export default function Page() {
  return (
    <Suspense fallback={<CheckoutPageSkeleton />}>
      <CheckoutPage />
    </Suspense>
  );
}