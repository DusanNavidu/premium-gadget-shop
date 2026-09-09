"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
}

export interface CardDetails {
  cardNumber: string;
  expiry: string;
  cvc: string;
  nameOnCard: string;
}

export type PaymentMethod = "card" | "applepay";

interface CheckoutState {
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod;
  cardDetails: CardDetails | null;
  setShippingAddress: (address: ShippingAddress) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setCardDetails: (details: CardDetails) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      shippingAddress: null,
      paymentMethod: "card",
      cardDetails: null,
      setShippingAddress: (address) => set({ shippingAddress: address }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      setCardDetails: (details) => set({ cardDetails: details }),
      reset: () => set({ shippingAddress: null, paymentMethod: "card", cardDetails: null }),
    }),
    {
      name: "techvault-checkout",
      // Card number/CVC are never written to localStorage — only kept in memory for this step.
      partialize: (state) => ({
        shippingAddress: state.shippingAddress,
        paymentMethod: state.paymentMethod,
      }),
    }
  )
);