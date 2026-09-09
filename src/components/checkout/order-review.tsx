"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, CreditCard, Package, ShieldCheck } from "lucide-react";
import { useCheckoutStore } from "@/store/checkout-store";
import { useCartStore } from "@/store/cart-store";
import { useOrderTotals } from "@/hooks/use-order-totals";
import { useRequirePayment } from "@/hooks/use-checkout-guards";
import { Button } from "@/components/ui/button";

export function OrderReview() {
  useRequirePayment(); // kicks back a step if shipping/payment isn't done yet

  const router = useRouter();
  const { shippingAddress, cardDetails } = useCheckoutStore();
  const { items, clearCart } = useCartStore();
  const { grandTotal } = useOrderTotals();
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

  const maskedCard = cardDetails?.cardNumber
    ? `•••• •••• •••• ${cardDetails.cardNumber.replace(/\s/g, "").slice(-4)}`
    : "";

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Replace with a real payment API call.
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      router.push("/checkout/success");
    }, 2000);
  };

  if (!shippingAddress || !cardDetails) return null;

  return (
    <div className="space-y-6">
      {/* Shipping summary */}
      <section className="clay-card p-6 md:p-8 rounded-4xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Shipping To</h2>
          </div>
          <button onClick={() => router.push("/checkout/shipping")} className="text-xs font-semibold text-primary hover:text-primary/80">
            Edit
          </button>
        </div>
        <p className="text-sm text-foreground font-medium">
          {shippingAddress.firstName} {shippingAddress.lastName}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.postalCode}
        </p>
        <p className="text-sm text-muted-foreground">
          {shippingAddress.email} · {shippingAddress.phone}
        </p>
      </section>

      {/* Payment summary */}
      <section className="clay-card p-6 md:p-8 rounded-4xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Payment Method</h2>
          </div>
          <button onClick={() => router.push("/checkout/payment")} className="text-xs font-semibold text-primary hover:text-primary/80">
            Edit
          </button>
        </div>
        <p className="text-sm text-foreground font-medium font-mono tracking-wider">{maskedCard}</p>
        <p className="text-sm text-muted-foreground mt-1">{cardDetails.nameOnCard}</p>
      </section>

      {/* Items */}
      <section className="clay-card p-6 md:p-8 rounded-4xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-foreground">
            Items <span className="text-muted-foreground font-normal">({items.length})</span>
          </h2>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.cartItemId} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-3">
                <span className="font-bold text-primary">{item.quantity}x</span>
                <span className="text-foreground">{item.product.title}</span>
              </div>
              <span className="font-semibold text-foreground">
                {formatPrice((item.finalPrice - (item.selectedShipping?.price || 0)) * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Button
        onClick={handlePlaceOrder}
        variant="primary"
        isLoading={isProcessing}
        disabled={isProcessing}
        className="w-full h-14 text-base rounded-2xl font-bold flex items-center justify-center gap-2"
      >
        <ShieldCheck className="w-5 h-5" /> Place Order — {formatPrice(grandTotal)}
      </Button>
    </div>
  );
}