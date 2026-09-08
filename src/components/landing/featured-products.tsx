"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { GlassCard } from "@/components/shop/glass-card";
import { products, CATEGORY_TABS, type Product } from "@/data/products";

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<(typeof CATEGORY_TABS)[number]["id"]>("all");

  const filtered = useMemo(() => {
    const list = activeTab === "all" ? products : products.filter((p) => p.category === activeTab);
    return list.slice(0, 8); // featured section shows up to 8; full grid lives on /shop
  }, [activeTab]);

  // Wired up in step 2 (Toast + Quick View Modal). For now these are safe no-ops.
  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product.title);
  };
  const handleToggleWishlist = (product: Product, next: boolean) => {
    console.log(next ? "Added to wishlist:" : "Removed from wishlist:", product.title);
  };
  const handleQuickView = (product: Product) => {
    console.log("Quick view:", product.title);
  };

  return (
    <section className="py-16 md:py-20 px-4 md:px-6 container mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
            Featured Hardware
          </h2>
          <p className="text-muted-foreground text-sm">
            Hand-picked premium tech products currently trending.
          </p>
        </div>
        <Link
          href="/shop"
          className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          View All Products →
        </Link>
      </div>

      {/* Animated category tabs */}
      <LayoutGroup id="featured-tabs">
        <div className="flex items-center gap-1.5 mb-8 md:mb-10 clay-card w-fit p-1.5 rounded-full overflow-x-auto max-w-full">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-colors"
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="active-tab-pill"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  activeTab === tab.id ? "text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </LayoutGroup>

      {/* Filtered product grid */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: { transition: { staggerChildren: 0.06 } },
            }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <GlassCard
                  {...item}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={handleQuickView}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="flex flex-col items-center justify-center text-center py-20 clay-card rounded-2xl"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-foreground/5 mb-4">
              <PackageSearch className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground mb-1">No products found</p>
            <p className="text-sm text-muted-foreground">
              Try a different category or check back soon.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}