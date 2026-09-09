"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const { isOpen, setIsOpen, items, removeItem, updateQuantity, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  // Hydration errors can occur when using Zustand with Next.js, so we ensure the component is mounted before rendering
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const total = getTotal();
  const formattedTotal = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(total);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-60"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-clay-border shadow-2xl z-70 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-clay-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold">Your Cart</h2>
                <span className="bg-foreground/10 text-foreground text-xs font-bold px-2 py-1 rounded-full">
                  {items.length}
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-foreground/5 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.cartItemId} className="flex gap-4 p-4 rounded-2xl border border-clay-border bg-foreground/[0.02]">
                    <div className="relative w-20 h-20 rounded-xl bg-background border border-clay-border flex items-center justify-center overflow-hidden shrink-0">
                      <Image src={item.product.thumbnail} alt={item.product.title} fill className="object-contain p-2" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm line-clamp-1">{item.product.title}</h4>
                        <div className="text-[11px] text-muted-foreground mt-1 space-y-0.5">
                          {item.selectedColor && <p>Color: {item.selectedColor.name}</p>}
                          {item.selectedStorage && <p>Storage: {item.selectedStorage.label}</p>}
                          {item.selectedRam && <p>RAM: {item.selectedRam.label}</p>}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="font-extrabold text-sm text-primary">
                          ${item.finalPrice}
                        </div>
                        <div className="flex items-center gap-3 bg-background border border-clay-border rounded-lg px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.cartItemId)}
                      className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-clay-border bg-background/50 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground font-medium">Subtotal</span>
                  <span className="text-2xl font-extrabold">{formattedTotal}</span>
                </div>
                <Button 
                    variant="primary" 
                    className="w-full h-14 text-base rounded-2xl font-bold"
                    onClick={() => {
                        setIsOpen(false);
                        router.push("/checkout");
                    }}
                    >
                    Proceed to Checkout
                    </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}