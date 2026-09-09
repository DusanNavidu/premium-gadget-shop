"use client";

import { useState, useEffect } from "react";
import { Timer, Zap } from "lucide-react";
import { FlashDealCard } from "@/components/shop/flash-deal-card"; 
import { products } from "@/data/products";

export function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay.getTime() - now.getTime();

      setTimeLeft({
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / 1000 / 60) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashItems = products.filter((p) => p.badge === "Sale" && p.originalPrice);

  if (flashItems.length === 0) return null;

  return (
    <section className="py-16 md:py-20 px-4 md:px-6 container mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 bg-destructive/10 border border-destructive/20 p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-6 h-6 text-destructive fill-destructive animate-pulse" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              Flash Deals
            </h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Up to 50% off on selected items. Hurry up!
          </p>
        </div>

        <div className="flex items-center gap-3 clay-card px-5 py-3 rounded-xl border-destructive/20">
          <Timer className="w-5 h-5 text-destructive" />
          <div className="flex items-center gap-2 text-xl font-bold font-mono">
            <span>{String(timeLeft.h).padStart(2, "0")}</span>:
            <span>{String(timeLeft.m).padStart(2, "0")}</span>:
            <span className="text-destructive">{String(timeLeft.s).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {flashItems.map((item) => (
          <FlashDealCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}