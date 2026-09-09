"use client";

import { Flame } from "lucide-react";
import { useCountdown } from "@/hooks/use-countdown";

interface FlashDealBannerProps {
  originalPrice: number;
  basePrice: number;
}

export function FlashDealBanner({ originalPrice, basePrice }: FlashDealBannerProps) {
  const { hours, minutes, seconds } = useCountdown();
  const discount = Math.round(((originalPrice - basePrice) / originalPrice) * 100);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4 mb-8"
      style={{ backgroundColor: "hsl(var(--hero-surface))", color: "hsl(var(--hero-surface-foreground))" }}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-destructive/20 text-destructive shrink-0">
          <Flame className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-sm md:text-base">Flash Deal — {discount}% OFF</p>
          <p className="text-xs" style={{ color: "hsl(var(--hero-surface-muted))" }}>
            This price won&apos;t last — deal refreshes at midnight.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 font-mono font-bold text-sm md:text-base">
        <span className="px-2 py-1 rounded-md bg-white/10">{pad(hours)}</span>:
        <span className="px-2 py-1 rounded-md bg-white/10">{pad(minutes)}</span>:
        <span className="px-2 py-1 rounded-md bg-white/10">{pad(seconds)}</span>
      </div>
    </div>
  );
}