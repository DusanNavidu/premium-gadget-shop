"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShoppingBag, Check, Eye, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/data/products";
import { productMedia } from "@/data/product-media";
import { productVariants } from "@/data/product-variants";

const SLIDESHOW_INTERVAL_MS = 800;

interface GlassCardProps extends Product {
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onSelectOptions?: (product: Product) => void;
  onToggleWishlist?: (product: Product, next: boolean) => void;
}

export function GlassCard(props: GlassCardProps) {
  const {
    id, title, basePrice, subCategory, thumbnail,
    rating, reviewCount, badge, inStock = true,
    onQuickView, onAddToCart, onSelectOptions, onToggleWishlist,
  } = props;

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // --- Join media + variants by productId, simulating a relational lookup ---
  const media = useMemo(() => productMedia.find((m) => m.productId === id), [id]);
  const variant = useMemo(() => productVariants.find((v) => v.productId === id), [id]);
  const hasVariants = !!variant && (
    (variant.colors?.length ?? 0) > 0 ||
    (variant.ramOptions?.length ?? 0) > 0 ||
    (variant.storageOptions?.length ?? 0) > 0
  );

  const images = useMemo(() => {
    const base = media?.thumbnail ?? thumbnail;
    return [base, ...(media?.gallery ?? [])];
  }, [media, thumbnail]);

  // --- Hover slideshow ---
  const startSlideshow = () => {
    if (images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, SLIDESHOW_INTERVAL_MS);
  };

  const stopSlideshow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setImgIndex(0); // revert to thumbnail immediately
  };

  useEffect(() => () => stopSlideshow(), []); // cleanup on unmount

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);

  const badgeStyle: Record<NonNullable<Product["badge"]>, string> = {
    New: "bg-primary text-primary-foreground",
    Sale: "bg-destructive text-white",
    "Best Seller": "bg-warning text-white",
    Trending: "bg-accent text-white",
    Limited: "bg-foreground text-background",
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    const next = !isWishlisted;
    setIsWishlisted(next);
    onToggleWishlist?.(props, next);
  };

  const handlePrimaryAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inStock) return;

    if (hasVariants) {
      onSelectOptions?.(props);
      return;
    }

    if (justAdded) return;
    setJustAdded(true);
    onAddToCart?.(props);
    setTimeout(() => setJustAdded(false), 1000);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    onQuickView?.(props);
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={startSlideshow}
      onMouseLeave={stopSlideshow}
      className="group relative flex flex-col overflow-hidden rounded-2xl clay-card"
    >
      {/* Image area — strict 1:1 square, hover slideshow */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-foreground/[0.06] to-transparent m-2">
        <AnimatePresence mode="sync">
          <motion.div
            key={images[imgIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[imgIndex]}
              alt={title}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Slideshow progress dots — only shown when there's a gallery */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === imgIndex ? "w-4 bg-primary" : "w-1 bg-foreground/20"
                }`}
              />
            ))}
          </div>
        )}

        {badge && (
          <span
            className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide z-10 ${badgeStyle[badge]}`}
          >
            {badge}
          </span>
        )}

        <button
          onClick={handleWishlist}
          aria-label="Toggle wishlist"
          className="absolute top-2.5 right-2.5 flex items-center justify-center w-8 h-8 rounded-full bg-background/70 backdrop-blur-md border border-clay-border transition-transform hover:scale-110 z-10"
        >
          <motion.span
            animate={isWishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isWishlisted ? "fill-destructive text-destructive" : "text-foreground/70"
              }`}
            />
          </motion.span>
        </button>

        <div className="absolute inset-0 flex items-center justify-center bg-background/0 group-hover:bg-background/20 transition-colors duration-300 pointer-events-none z-10">
          <motion.button
            onClick={handleQuickView}
            aria-label="Quick view"
            whileHover={{ scale: 1.08 }}
            className="pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-full bg-background/90 backdrop-blur-md border border-clay-border text-xs font-medium text-foreground shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </motion.button>
        </div>

        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm z-20">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-foreground text-background">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 px-4 pt-1 pb-4 flex-1">
        <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">
          {subCategory}
        </span>

        <h3 className="font-semibold text-sm md:text-base text-foreground line-clamp-1">
          {title}
        </h3>

        {rating !== undefined && (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.round(rating) ? "fill-warning text-warning" : "text-foreground/15"
                  }`}
                />
              ))}
            </div>
            {reviewCount !== undefined && (
              <span className="text-[11px] text-muted-foreground">({reviewCount})</span>
            )}
          </div>
        )}

        <div className="flex items-center gap-1.5 mt-0.5">
          {hasVariants && (
            <span className="text-[11px] text-muted-foreground">From</span>
          )}
          <p className="font-semibold text-foreground text-base md:text-lg">
            {formatPrice(basePrice)}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-3">
          {hasVariants ? (
            <button
              onClick={handlePrimaryAction}
              disabled={!inStock}
              className="flex-1 py-2.5 rounded-xl clay-btn-primary text-xs md:text-sm font-medium flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Select Options
            </button>
          ) : (
            <Link
              href={`/shop/${id}`}
              className="flex-1 py-2.5 rounded-xl clay-btn-primary text-xs md:text-sm font-medium text-center"
            >
              View Details
            </Link>
          )}

          {!hasVariants && (
            <button
              onClick={handlePrimaryAction}
              aria-label="Add to cart"
              disabled={!inStock}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl clay-card hover:bg-foreground/5 transition-colors disabled:opacity-40 disabled:pointer-events-none shrink-0 overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {justAdded ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Check className="w-4 h-4 text-success" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="bag"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <ShoppingBag className="w-4 h-4 text-foreground" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}