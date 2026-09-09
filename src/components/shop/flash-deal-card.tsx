"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, Star, ShoppingBag, Check, Eye } from "lucide-react";
import type { Product } from "@/data/products";
import { productMedia } from "@/data/product-media";
import { productVariants } from "@/data/product-variants";
import { useCartStore } from "@/store/cart-store";

const SLIDESHOW_INTERVAL_MS = 800;

interface FlashDealCardProps extends Product {
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product, next: boolean) => void;
}

export function FlashDealCard(props: FlashDealCardProps) {
  const {
    id, title, basePrice, originalPrice, subCategory, thumbnail,
    rating, reviewCount, inStock = true,
    onQuickView, onAddToCart, onToggleWishlist,
  } = props;
  
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    setImgIndex(0); 
  };

  useEffect(() => () => stopSlideshow(), []);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - basePrice) / originalPrice) * 100) 
    : 0;

  const handleCardClick = () => {
    router.push(`/shop/${id}`);
  };

  const handlePrimaryAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;
    
    if (hasVariants) {
      router.push(`/shop/${id}`);
    } else {
      if (justAdded) return;

      const { onQuickView, onAddToCart, onToggleWishlist, ...productData } = props;

      addItem({
        product: productData as Product,
        quantity: 1,
        finalPrice: basePrice,
      });

      setJustAdded(true);
      onAddToCart?.(props);
      setTimeout(() => setJustAdded(false), 1500);
    }
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={startSlideshow}
      onMouseLeave={stopSlideshow}
      onClick={handleCardClick} 
      className="group relative flex flex-col overflow-hidden rounded-2xl clay-card border-destructive/20 cursor-pointer"
    >
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-linear-to-br from-destructive/[0.05] to-transparent m-2">
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

        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
            {images.map((_, i) => (
              <span key={i} className={`h-1 rounded-full transition-all duration-300 ${i === imgIndex ? "w-4 bg-destructive" : "w-1 bg-foreground/20"}`} />
            ))}
          </div>
        )}

        {discountPercentage > 0 && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider z-10 bg-black text-white shadow-md">
            -{discountPercentage}% OFF
          </span>
        )}

        <button
          onClick={(e) => { 
            e.preventDefault(); 
            e.stopPropagation();
            setIsWishlisted(!isWishlisted); 
            onToggleWishlist?.(props, !isWishlisted); 
          }}
          className="absolute top-2.5 right-2.5 flex items-center justify-center w-8 h-8 rounded-full bg-background/70 backdrop-blur-md border border-clay-border transition-transform hover:scale-110 z-10"
        >
          <motion.span animate={isWishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }} transition={{ duration: 0.35 }}>
            <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? "fill-destructive text-destructive" : "text-foreground/70"}`} />
          </motion.span>
        </button>

        <div className="absolute inset-0 flex items-center justify-center bg-background/0 group-hover:bg-background/20 transition-colors duration-300 pointer-events-none z-10">
          <motion.button
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation();
              onQuickView?.(props); 
            }}
            whileHover={{ scale: 1.08 }}
            className="pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-full bg-background/90 backdrop-blur-md border border-clay-border text-xs font-medium text-foreground shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </motion.button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 px-4 pt-1 pb-4 flex-1">
        <span className="text-[10px] uppercase tracking-widest text-destructive font-bold">
          {subCategory}
        </span>

        <h3 className="font-semibold text-sm md:text-base text-foreground line-clamp-1">
          {title}
        </h3>

        {/* Custom Price Display with Strikethrough */}
        <div className="flex items-end gap-2 mt-1">
          <p className="font-extrabold text-foreground text-lg md:text-xl">
            {formatPrice(basePrice)}
          </p>
          {originalPrice && (
            <p className="text-xs md:text-sm text-muted-foreground line-through mb-0.5">
              {formatPrice(originalPrice)}
            </p>
          )}
        </div>

        {/* Unified Add to Cart Button */}
        <div className="mt-3">
          <button
            onClick={handlePrimaryAction}
            disabled={!inStock}
            className="w-full py-2.5 rounded-xl clay-btn-primary text-xs md:text-sm font-bold flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none hover:brightness-110 transition-all overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {justAdded && !hasVariants ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 text-green-300" /> Added to Cart
                </motion.span>
              ) : (
                <motion.span
                  key="bag"
                  initial={{ scale: 0, y: -10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, y: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
        
      </div>
    </motion.div>
  );
}