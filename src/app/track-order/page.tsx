"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Truck, PackageX } from "lucide-react";
import { orders } from "@/data/orders";
import { StatusBadge } from "@/components/profile/status-badge";
import { TrackingTimeline } from "@/components/profile/tracking-timeline";
import { Button } from "@/components/ui/button";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<(typeof orders)[number] | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find((o) => o.id.toLowerCase() === orderId.trim().toLowerCase());
    setResult(found ?? null);
    setSearched(true);
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 md:px-6 overflow-hidden">
      <div className="absolute top-24 left-1/3 w-72 h-72 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative container mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-5">
            <Truck className="w-3.5 h-3.5" />
            <span>Order Tracking</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
            Track Your Order
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Enter your order ID to see real-time delivery status.
          </p>
        </div>

        <form onSubmit={handleSearch} className="clay-card p-4 rounded-2xl flex items-center gap-2 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. TV-2026-10456"
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-background border border-clay-border outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm font-mono"
            />
          </div>
          <Button type="submit" variant="primary" size="md" className="shrink-0 rounded-xl">
            Track
          </Button>
        </form>

        <AnimatePresence mode="wait">
          {searched && result && (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="clay-card p-6 md:p-8 rounded-4xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-bold text-foreground">{result.id}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">{result.trackingNumber}</p>
                </div>
                <StatusBadge status={result.status} />
              </div>
              <TrackingTimeline steps={result.trackingSteps} />
            </motion.div>
          )}

          {searched && !result && (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="clay-card p-10 rounded-4xl flex flex-col items-center text-center"
            >
              <PackageX className="w-10 h-10 text-muted-foreground/40 mb-3" />
              <p className="font-semibold text-foreground mb-1">Order not found</p>
              <p className="text-sm text-muted-foreground">Double check the order ID and try again.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}