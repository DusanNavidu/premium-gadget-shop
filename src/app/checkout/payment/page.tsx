import { ArrowRight } from "lucide-react";
import { CheckoutShell } from "@/components/checkout/checkout-shell";
import { PaymentForm } from "@/components/checkout/payment-form";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
  return (
    <CheckoutShell
      backHref="/checkout/shipping"
      backLabel="Back to Shipping"
      ctaSlot={
        <Button form="payment-form" type="submit" variant="primary" className="w-full h-14 text-base rounded-2xl font-bold flex items-center justify-center gap-2">
          Continue to Review <ArrowRight className="w-4 h-4" />
        </Button>
      }
    >
      <PaymentForm />
    </CheckoutShell>
  );
}