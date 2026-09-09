import { CheckoutShell } from "@/components/checkout/checkout-shell";
import { OrderReview } from "@/components/checkout/order-review";

export default function ReviewPage() {
  return (
    <CheckoutShell backHref="/checkout/payment" backLabel="Back to Payment">
      <OrderReview />
    </CheckoutShell>
  );
}