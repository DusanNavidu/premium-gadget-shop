"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Package } from "lucide-react";
import { orders } from "@/data/orders";
import { StatusBadge } from "@/components/profile/status-badge";

export default function OrdersPage() {
  const formatPrice = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

  if (orders.length === 0) {
    return (
      <div className="clay-card rounded-4xl p-16 flex flex-col items-center text-center">
        <Package className="w-12 h-12 text-muted-foreground/40 mb-4" />
        <p className="font-semibold text-foreground mb-1">No orders yet</p>
        <p className="text-sm text-muted-foreground">Your order history will show up here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground mb-2">Order History</h2>
      {orders.map((order, i) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Link
            href={`/profile/orders/${order.id}`}
            className="clay-card p-5 md:p-6 rounded-2xl flex items-center justify-between gap-4 hover:bg-foreground/[0.02] transition-colors group"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="hidden sm:flex w-12 h-12 rounded-xl bg-foreground/[0.04] items-center justify-center shrink-0">
                <Package className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-sm text-foreground">{order.id}</p>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  {" · "}
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="font-bold text-foreground text-sm md:text-base">{formatPrice(order.total)}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}