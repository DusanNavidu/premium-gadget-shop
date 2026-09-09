"use client";

import { motion } from "framer-motion";

interface PriceDisplayProps {
  finalPrice: number;
  formattedPrice: string;
  basePrice?: number;
  adjustmentsTotal?: number;
  shippingPrice?: number;
}

const fmt = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

export function PriceDisplay({ finalPrice, formattedPrice, basePrice, adjustmentsTotal, shippingPrice }: PriceDisplayProps) {
  const hasBreakdown = (adjustmentsTotal ?? 0) > 0 || (shippingPrice ?? 0) > 0;

  return (
    <div className="clay-card rounded-2xl p-5">
      <div className="flex items-end gap-3">
        <motion.span
          key={finalPrice}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
        >
          {formattedPrice}
        </motion.span>
        <span className="text-xs text-muted-foreground mb-1.5">incl. taxes</span>
      </div>

      {hasBreakdown && basePrice !== undefined && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-muted-foreground">
          <span>Base {fmt(basePrice)}</span>
          {(adjustmentsTotal ?? 0) > 0 && <span>+ {fmt(adjustmentsTotal!)} options</span>}
          {(shippingPrice ?? 0) > 0 && <span>+ {fmt(shippingPrice!)} shipping</span>}
        </div>
      )}
    </div>
  );
}