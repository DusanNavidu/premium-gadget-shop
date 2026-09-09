"use client";

import { usePathname, useRouter } from "next/navigation";
import { Check, MapPin, CreditCard, ClipboardCheck } from "lucide-react";
import { useCheckoutStore } from "@/store/checkout-store";

const STEPS = [
  { id: "shipping", label: "Shipping", path: "/checkout/shipping" },
  { id: "payment", label: "Payment", path: "/checkout/payment" },
  { id: "review", label: "Review", path: "/checkout/review" },
];

export function CheckoutStepper() {
  const pathname = usePathname();
  const router = useRouter();
  const { shippingAddress, cardDetails } = useCheckoutStore();

  const activeIndex = STEPS.findIndex((s) => pathname.includes(s.id));

  const canNavigateTo = (index: number) => {
    if (index === 0) return true;
    if (index === 1) return !!shippingAddress;
    if (index === 2) return !!shippingAddress && !!cardDetails;
    return false;
  };

  return (
    <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 mb-10 overflow-x-auto pb-2">
      {STEPS.map((step, index) => {
        const isActive = index === activeIndex;
        const isDone = index < activeIndex;
        const isClickable = canNavigateTo(index) && index !== activeIndex;

        return (
          <div key={step.id} className="flex items-center gap-2 md:gap-3 shrink-0">
            <button
              onClick={() => isClickable && router.push(step.path)}
              disabled={!isClickable}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : isDone
                  ? "bg-primary/10 text-primary"
                  : "bg-foreground/[0.04] text-muted-foreground"
              } ${isClickable ? "cursor-pointer hover:brightness-105" : "cursor-default"}`}
            >
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                  isActive ? "bg-primary-foreground/20" : isDone ? "bg-primary text-primary-foreground" : "bg-foreground/10"
                }`}
              >
                {isDone ? <Check className="w-3 h-3" /> : index + 1}
              </span>
              <span className="text-xs md:text-sm font-semibold whitespace-nowrap">{step.label}</span>
            </button>

            {index < STEPS.length - 1 && <div className="w-6 md:w-10 h-px bg-clay-border shrink-0" />}
          </div>
        );
      })}
    </div>
  );
}