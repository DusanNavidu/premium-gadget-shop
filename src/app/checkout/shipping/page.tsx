import { ArrowRight } from "lucide-react";
import { CheckoutShell } from "@/components/checkout/checkout-shell";
import { ShippingForm } from "@/components/checkout/shipping-form";
import { Button } from "@/components/ui/button";

export default function ShippingPage() {
  return (
    <CheckoutShell
      ctaSlot={
        <Button form="shipping-form" type="submit" variant="primary" className="w-full h-14 text-base rounded-2xl font-bold flex items-center justify-center gap-2">
          Continue to Payment <ArrowRight className="w-4 h-4" />
        </Button>
      }
    >
      <ShippingForm />
    </CheckoutShell>
  );
}