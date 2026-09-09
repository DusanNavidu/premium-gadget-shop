"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { PackageSearch } from "lucide-react";
import { GlassCard } from "@/components/shop/glass-card";
import { products, CATEGORY_TABS } from "@/data/products";

export function ShopExplorer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryQuery = searchParams.get("category");
  const searchQuery = searchParams.get("q") || "";

  const [activeTab, setActiveTab] = useState(categoryQuery || "all");

  useEffect(() => {
    if (categoryQuery) {
      setActiveTab(categoryQuery);
    } else {
      setActiveTab("all");
    }
  }, [categoryQuery]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (tabId === "all") {
      currentParams.delete("category");
    } else {
      currentParams.set("category", tabId);
    }
    
    const search = currentParams.toString();
    const query = search ? `?${search}` : "";
    
    router.push(`/shop${query}`, { scroll: false });
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = activeTab === "all" || p.category === activeTab;
      
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchCategory && matchSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="flex flex-col gap-8">
      
      {searchQuery && (
        <div className="text-sm text-muted-foreground">
          Showing results for: <span className="font-semibold text-foreground">"{searchQuery}"</span>
        </div>
      )}

      {/* Animated Category Tabs */}
      <LayoutGroup id="shop-tabs">
        <div className="flex items-center gap-1.5 clay-card w-fit p-1.5 rounded-full overflow-x-auto max-w-full scrollbar-hide">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className="relative px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors"
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="shop-active-tab-pill"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <span className={`relative z-10 ${activeTab === tab.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </LayoutGroup>

      {/* Filtered Product Grid */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={activeTab + searchQuery}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
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
                <GlassCard {...item} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="flex flex-col items-center justify-center text-center py-24 clay-card rounded-4xl w-full"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-foreground/5 mb-5">
              <PackageSearch className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-bold text-foreground mb-2">No products found</p>
            <p className="text-sm md:text-base text-muted-foreground max-w-sm">
              We couldn't find any items matching your criteria. Try adjusting your search or filters.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}