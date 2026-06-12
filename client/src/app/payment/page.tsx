import { Suspense } from "react";
import PaymentContent from "./PaymentContent";
import PaymentSkeleton from "./PaymentSkeleton";

export default function PaymentPage() {
  return (
    <Suspense fallback={<PaymentSkeleton />}>
      <PaymentContent />
    </Suspense>
  );
}