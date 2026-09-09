"use client";

import { useCartStore } from "@/store/cart-store";

export function useOrderTotals() {
  const { items } = useCartStore();

  const itemCost = items.reduce((acc, item) => {
    const shippingPrice = item.selectedShipping?.price || 0;
    return acc + (item.finalPrice - shippingPrice) * item.quantity;
  }, 0);

  const totalShipping = items.reduce(
    (acc, item) => acc + (item.selectedShipping?.price || 0) * item.quantity,
    0
  );

  const estimatedTax = itemCost * 0.08;
  const grandTotal = itemCost + totalShipping + estimatedTax;

  return { itemCost, totalShipping, estimatedTax, grandTotal, itemCount: items.length };
}