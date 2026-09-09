"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/store/checkout-store";

// Prevents jumping straight to /checkout/payment or /checkout/review by URL.
export function useRequireShipping() {
  const router = useRouter();
  const shippingAddress = useCheckoutStore((s) => s.shippingAddress);

  useEffect(() => {
    if (!shippingAddress) router.replace("/checkout/shipping");
  }, [shippingAddress, router]);
}

export function useRequirePayment() {
  const router = useRouter();
  const shippingAddress = useCheckoutStore((s) => s.shippingAddress);
  const cardDetails = useCheckoutStore((s) => s.cardDetails);

  useEffect(() => {
    if (!shippingAddress) router.replace("/checkout/shipping");
    else if (!cardDetails) router.replace("/checkout/payment");
  }, [shippingAddress, cardDetails, router]);
}