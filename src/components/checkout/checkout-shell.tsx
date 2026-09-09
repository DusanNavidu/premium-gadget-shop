"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { CheckoutStepper } from "./checkout-stepper";
import { OrderSummaryCard } from "./order-summary-card";

interface CheckoutShellProps {
  children: React.ReactNode;
  ctaSlot?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}

export function CheckoutShell({ children, ctaSlot, backHref, backLabel }: CheckoutShellProps) {
  const router = useRouter();
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
        <p className="text-muted-foreground text-sm mb-4">Add items to your cart before checking out.</p>
        <Button onClick={() => router.push("/shop")} variant="primary" className="mt-2 rounded-xl">
          Return to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-6 container mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-2">
          Secure Checkout
        </h1>
        <p className="text-muted-foreground flex items-center gap-2 text-sm">
          <Lock className="w-4 h-4" /> SSL Encrypted Connection
        </p>
      </div>

      <CheckoutStepper />

      {backHref && (
        <button
          onClick={() => router.push(backHref)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {backLabel ?? "Back"}
        </button>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-8">{children}</div>
        <div className="lg:col-span-5">
          <OrderSummaryCard ctaSlot={ctaSlot} />
        </div>
      </div>
    </div>
  );
}