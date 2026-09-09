"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { products } from "@/data/products";
import { FlashDealCard } from "@/components/shop/flash-deal-card";

export function FlashDeals() {
  const flashDeals = products
    .filter((p) => p.badge === "Sale" && p.originalPrice)
    .slice(0, 8);

  if (flashDeals.length === 0) return null;

  return (
    <section className="py-14 md:py-16 px-4 md:px-6 container mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl bg-destructive/10 text-destructive shrink-0">
            <Zap className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" />
          </div>
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-foreground tracking-tight">Flash Deals</h2>
            <p className="text-muted-foreground text-xs md:text-sm mt-0.5">
              Limited-time prices, while stock lasts.
            </p>
          </div>
        </div>

        <Link
          href="/flash-deals"
          className="flex items-center gap-1 text-xs md:text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0 whitespace-nowrap"
        >
          See All Deals <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </Link>
      </div>

      {/* Horizontal scroll */}
      <div
        className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {flashDeals.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="snap-start shrink-0 w-[65vw] xs:w-[280px] md:w-65 lg:w-67.5"
          >
            <FlashDealCard {...product} />
          </motion.div>
        ))}

        {/* View All card at the end of the scroll */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: flashDeals.length * 0.05 }}
          className="snap-start shrink-0 w-[65vw] xs:w-[280px] md:w-65 lg:w-67.5"
        >
          <Link
            href="/flash-deals"
            className="group flex flex-col items-center justify-center gap-3 h-full min-h-80 md:min-h-90 rounded-2xl clay-card border border-dashed border-primary/30 hover:border-primary/60 transition-colors"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <ArrowRight className="w-6 h-6" />
            </div>
            <div className="text-center px-4">
              <p className="font-bold text-foreground text-sm md:text-base">View All Deals</p>
              <p className="text-xs text-muted-foreground mt-1">Browse the full collection</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}