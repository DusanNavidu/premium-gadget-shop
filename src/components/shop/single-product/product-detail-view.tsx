"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check, Heart, Star, Minus, Plus, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import type { Product } from "@/data/products";
import type { ShippingMethod } from "@/data/shipping-methods";
import { ImageGallery } from "./image-gallery";
import { VariantSelector } from "./variant-selector";
import { Button } from "@/components/ui/button";
import { ShippingSelector } from "./shipping-selector";
import { ProductSpecifications } from "./product-specifications";
import { PriceDisplay } from "./price-display";
import { useCartStore } from "@/store/cart-store";

interface ColorOpt { name: string; hex: string; imageRef?: string; }
interface Option { label: string; priceAdjustment: number; }
interface ProductSpec { icon: string; label: string; value: string; }

interface ProductDetailProps {
  product: Product;
  media?: { gallery: string[] };
  variants?: { colors?: ColorOpt[]; ramOptions?: Option[]; storageOptions?: Option[]; };
  details?: { longDescription: string; specs: ProductSpec[] };
  shippingMethods: ShippingMethod[];
}

const badgeStyle: Record<NonNullable<Product["badge"]>, string> = {
  New: "bg-primary text-primary-foreground",
  Sale: "bg-destructive text-white",
  "Best Seller": "bg-warning text-white",
  Trending: "bg-accent text-white",
  Limited: "bg-foreground text-background",
};

export function ProductDetailView({ product, media, variants, details, shippingMethods }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState<ColorOpt | null>(null);
  const [selectedRam, setSelectedRam] = useState<Option | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<Option | null>(null);
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.setIsOpen);

  const isColorReq = (variants?.colors?.length ?? 0) > 0;
  const isRamReq = (variants?.ramOptions?.length ?? 0) > 0;
  const isStorageReq = (variants?.storageOptions?.length ?? 0) > 0;

  const isColorValid = !isColorReq || selectedColor !== null;
  const isRamValid = !isRamReq || selectedRam !== null;
  const isStorageValid = !isStorageReq || selectedStorage !== null;
  const isShippingValid = selectedShipping !== null;

  const canAddToCart = isColorValid && isRamValid && isStorageValid && isShippingValid && product.inStock;

  const adjustmentsTotal = (selectedRam?.priceAdjustment ?? 0) + (selectedStorage?.priceAdjustment ?? 0);
  const shippingPrice = selectedShipping?.price ?? 0;

  const finalPrice = useMemo(() => {
    return (product.basePrice + adjustmentsTotal + shippingPrice) * quantity;
  }, [product.basePrice, adjustmentsTotal, shippingPrice, quantity]);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0,
  }).format(finalPrice);

  const handleAddToCart = () => {
    if (!canAddToCart) return;

    addItem({
      product,
      quantity,
      finalPrice,
      selectedColor,
      selectedRam,
      selectedStorage,
      selectedShipping,
    });

    setJustAdded(true);
    // Let the success state register for a beat, then hand off to the cart drawer —
    // matches the "add → confirm → review cart" flow shoppers expect.
    setTimeout(() => {
      setJustAdded(false);
      openCart(true);
    }, 700);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span>{product.subCategory}</span>
        <span>/</span>
        <span className="text-foreground font-medium truncate">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Images & Specs */}
        <div className="lg:col-span-6 space-y-8">
          <ImageGallery
            baseImage={product.thumbnail}
            gallery={media?.gallery || []}
            selectedColor={selectedColor || undefined}
          />
          <ProductSpecifications specs={details?.specs} />
        </div>

        {/* Right Column: Details, Selections & Checkout — internally scrollable panel */}
        <div className="lg:col-span-6 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto flex flex-col space-y-7 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">
                {product.subCategory}
              </span>
              {product.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeStyle[product.badge]}`}>
                  {product.badge}
                </span>
              )}
            </div>

            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                {product.title}
              </h1>
              <button
                onClick={() => setIsWishlisted((v) => !v)}
                aria-label="Toggle wishlist"
                className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full clay-card hover:bg-foreground/5 transition-colors"
              >
                <motion.span
                  animate={isWishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-destructive text-destructive" : "text-foreground/70"}`} />
                </motion.span>
              </button>
            </div>

            {product.rating !== undefined && (
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(product.rating!) ? "fill-warning text-warning" : "text-foreground/15"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating.toFixed(1)}
                  {product.reviewCount !== undefined && ` · ${product.reviewCount} reviews`}
                </span>
              </div>
            )}

            {details?.longDescription && (
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
                {details.longDescription}
              </p>
            )}
          </div>

          <PriceDisplay
            finalPrice={finalPrice}
            formattedPrice={formattedPrice}
            basePrice={product.basePrice * quantity}
            adjustmentsTotal={adjustmentsTotal * quantity}
            shippingPrice={shippingPrice}
          />

          {variants && (
            <VariantSelector
              variants={variants}
              selectedColor={selectedColor}
              selectedRam={selectedRam}
              selectedStorage={selectedStorage}
              onColorSelect={setSelectedColor}
              onRamSelect={setSelectedRam}
              onStorageSelect={setSelectedStorage}
            />
          )}

          <ShippingSelector
            methods={shippingMethods}
            selected={selectedShipping}
            onSelect={setSelectedShipping}
          />

          {/* Quantity */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Quantity</span>
            <div className="flex items-center gap-1 clay-card rounded-full p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-foreground/5 transition-colors disabled:opacity-30"
                disabled={quantity <= 1}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-foreground">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                aria-label="Increase quantity"
                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-foreground/5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Checkout Button & Error Message */}
          <div className="pt-6 border-t border-clay-border flex flex-col gap-3">
            {!canAddToCart && (
              <span className="text-xs font-semibold text-destructive text-center">
                * Please select all required options and a shipping method to proceed.
              </span>
            )}
            <Button
              variant="primary"
              size="lg"
              className={`w-full rounded-2xl h-14 text-base group ${!canAddToCart ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleAddToCart}
              disabled={!canAddToCart}
            >
              <AnimatePresence mode="wait">
                {justAdded ? (
                  <motion.span key="added" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                    <Check className="w-5 h-5" /> Successfully Added!
                  </motion.span>
                ) : (
                  <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                    Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: ShieldCheck, label: "2-Year Warranty" },
                { icon: RotateCcw, label: "30-Day Returns" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5 py-3 rounded-xl bg-foreground/[0.03]">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-medium text-muted-foreground leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}