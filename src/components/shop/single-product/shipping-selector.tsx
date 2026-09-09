"use client";

import { Truck, Check } from "lucide-react";
import type { ShippingMethod } from "@/data/shipping-methods";

interface ShippingSelectorProps {
  methods: ShippingMethod[];
  selected: ShippingMethod | null;
  onSelect: (method: ShippingMethod) => void;
}

export function ShippingSelector({ methods, selected, onSelect }: ShippingSelectorProps) {
  return (
    <div>
      <span className="text-sm font-semibold text-foreground mb-3 block">Select Shipping Method</span>
      <div className="flex flex-col gap-2.5">
        {methods.map((method) => {
          const isActive = selected?.id === method.id;
          return (
            <button
              key={method.id}
              onClick={() => onSelect(method)}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${
                isActive ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-clay-border hover:border-foreground/25"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "bg-foreground/5 text-muted-foreground"
                }`}>
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{method.name}</p>
                  <p className="text-xs text-muted-foreground">{method.estimatedDays}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="font-bold text-sm text-foreground">
                  {method.price === 0 ? "Free" : `+$${method.price}`}
                </span>
                <div className={`flex items-center justify-center w-5 h-5 rounded-full border transition-colors ${
                  isActive ? "bg-primary border-primary" : "border-clay-border"
                }`}>
                  {isActive && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}