"use client";

import { Lock } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useOrderTotals } from "@/hooks/use-order-totals";

export function OrderSummaryCard({ ctaSlot }: { ctaSlot?: React.ReactNode }) {
  const { items } = useCartStore();
  const { itemCost, totalShipping, estimatedTax, grandTotal } = useOrderTotals();

  const formatPrice = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  return (
    <div className="clay-card p-6 md:p-8 rounded-4xl sticky top-28">
      <h3 className="text-xl font-bold text-foreground mb-6">Order Summary</h3>

      <div className="space-y-4 mb-6 max-h-[30vh] overflow-y-auto pr-2">
        {items.map((item) => (
          <div key={item.cartItemId} className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-bold text-primary shrink-0">{item.quantity}x</span>
              <span className="text-foreground line-clamp-1">{item.product.title}</span>
            </div>
            <span className="font-semibold shrink-0 ml-2">
              {formatPrice((item.finalPrice - (item.selectedShipping?.price || 0)) * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-6 border-t border-clay-border text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Item Total</span>
          <span className="font-semibold text-foreground">{formatPrice(itemCost)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span className="font-semibold text-foreground">
            {totalShipping === 0 ? "Free" : formatPrice(totalShipping)}
          </span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Estimated Tax (8%)</span>
          <span className="font-semibold text-foreground">{formatPrice(estimatedTax)}</span>
        </div>
      </div>

      <div className="flex justify-between items-end pt-6 mt-6 border-t border-clay-border">
        <div>
          <span className="block text-sm text-muted-foreground mb-1">Total to Pay</span>
          <span className="text-3xl font-extrabold text-foreground">{formatPrice(grandTotal)}</span>
        </div>
      </div>

      {ctaSlot && <div className="mt-8">{ctaSlot}</div>}

      <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
        <Lock className="w-3 h-3" /> Payments are secure and encrypted.
      </p>
    </div>
  );
}