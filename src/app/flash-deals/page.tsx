"use client";

import { motion } from "framer-motion";
import { Zap, Flame } from "lucide-react";
import { products } from "@/data/products";
import { FlashDealCard } from "@/components/shop/flash-deal-card";
import { useCountdown } from "@/hooks/use-countdown";

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
        <span className="text-xl md:text-2xl font-extrabold text-white tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] md:text-xs text-white/60 mt-1.5 uppercase tracking-wide">{label}</span>
    </div>
  );
}

export default function AllFlashDealsPage() {
  const { hours, minutes, seconds } = useCountdown();
  const flashDeals = products.filter((p) => p.badge === "Sale" && p.originalPrice);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero header */}
      <section
        className="relative overflow-hidden mx-4 md:mx-6 rounded-4xl md:rounded-[2.5rem] mb-10 md:mb-12"
        style={{ backgroundColor: "hsl(var(--hero-surface))", color: "hsl(var(--hero-surface-foreground))" }}
      >
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-destructive/25 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative container mx-auto px-6 py-12 md:py-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-destructive/20 text-white mb-5"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Ends Tonight</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3"
          >
            <Zap className="inline w-8 h-8 md:w-10 md:h-10 text-destructive mr-2 -mt-1" fill="currentColor" />
            Flash Deals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base max-w-lg mb-8"
            style={{ color: "hsl(var(--hero-surface-muted))" }}
          >
            Unbeatable prices on premium tech — refreshed daily. Grab them before the clock runs out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-3 md:gap-4"
          >
            <TimeBlock value={hours} label="Hours" />
            <span className="text-2xl font-bold text-white/40 -mt-4">:</span>
            <TimeBlock value={minutes} label="Minutes" />
            <span className="text-2xl font-bold text-white/40 -mt-4">:</span>
            <TimeBlock value={seconds} label="Seconds" />
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <div className="px-4 md:px-6 container mx-auto max-w-7xl">
        {flashDeals.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {flashDeals.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (i % 8) * 0.05 }}
              >
                <FlashDealCard {...product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="clay-card rounded-2xl p-16 flex flex-col items-center text-center">
            <Zap className="w-12 h-12 text-muted-foreground/40 mb-4" />
            <p className="font-semibold text-foreground mb-1">No active deals right now</p>
            <p className="text-sm text-muted-foreground">Check back soon for new flash offers.</p>
          </div>
        )}
      </div>
    </div>
  );
}