import { Suspense } from "react";
import { ShopExplorer } from "@/components/shop/shop-explorer";

export default function ShopPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-6 container mx-auto max-w-7xl">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
          The Tech Vault
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
          Discover our full collection of premium devices, precision accessories, and high-performance hardware engineered for your workflow.
        </p>
      </div>

      <Suspense fallback={<div className="h-64 flex items-center justify-center text-muted-foreground font-medium animate-pulse">Loading Catalog...</div>}>
        <ShopExplorer />
      </Suspense>
    </div>
  );
}