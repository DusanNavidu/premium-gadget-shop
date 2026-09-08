"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { heroProducts } from "@/data/hero-products";

const AUTO_ROTATE_MS = 5500;

export function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const active = heroProducts[activeIndex];

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + heroProducts.length) % heroProducts.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroProducts.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [isPaused]);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(active.price);

  return (
    <section className="relative px-4 md:px-6 pt-24 md:pt-32 pb-8 md:pb-12">
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative container mx-auto max-w-7xl overflow-hidden rounded-[2rem] md:rounded-[2.5rem]
                   border border-clay-border bg-gradient-to-br from-muted/60 via-background to-muted/30
                   dark:from-muted/20 dark:via-background dark:to-muted/5
                   shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]
                   h-[660px] sm:h-[600px] md:h-[600px] lg:h-[620px]"
      >
        {/* Subtle grid texture — premium tech feel */}
        <div
          className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)/0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
          }}
        />

        {/* Decorative glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-56 h-56 md:w-96 md:h-96 bg-primary/20 blur-[90px] md:blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-56 h-56 md:w-96 md:h-96 bg-accent/20 blur-[90px] md:blur-[130px] rounded-full pointer-events-none" />

        {/* Top hairline shine */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent pointer-events-none" />

        <div className="relative z-10 h-full grid md:grid-cols-2 gap-6 md:gap-4 items-center px-6 md:px-14">
          {/* Left: dynamic text */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 h-full justify-center py-6 md:py-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center md:items-start w-full"
              >
                <div className="h-7 md:h-8 flex items-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-medium bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
                    <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    <span>{active.eyebrow}</span>
                  </div>
                </div>

                <h1 className="mt-4 md:mt-6 min-h-[76px] sm:min-h-[100px] md:min-h-[120px] lg:min-h-[144px] text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight line-clamp-2">
                  <span className="text-foreground">{active.titlePrefix}</span>{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-accent to-primary">
                    {active.titleHighlight}
                  </span>
                </h1>

                <p className="mt-4 md:mt-6 min-h-[60px] sm:min-h-[52px] md:min-h-[56px] text-[13px] md:text-[15px] lg:text-lg text-muted-foreground max-w-lg font-light line-clamp-3">
                  {active.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto mt-8 md:mt-10">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-6 py-3.5 md:px-8 md:py-4 clay-btn-primary text-[13px] md:text-sm font-medium flex items-center justify-center gap-2 group"
              >
                <span>Browse Shop</span>
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="flex items-center gap-3 text-[13px] md:text-sm font-medium text-foreground group">
                <span className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-foreground group-hover:scale-105 transition-transform">
                  <Play className="w-3.5 h-3.5 ml-0.5 text-background" fill="currentColor" />
                </span>
                Watch Promotion
              </button>
            </div>

            {/* Product switcher dots */}
            <div className="flex items-center gap-2 mt-6 md:mt-8">
              {heroProducts.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => goTo(index)}
                  aria-label={`Show ${item.eyebrow}`}
                  className="relative h-1.5 rounded-full transition-all duration-300"
                  style={{ width: index === activeIndex ? "28px" : "8px" }}
                >
                  <span
                    className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                      index === activeIndex ? "bg-primary" : "bg-foreground/15"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: product image + floating card */}
          <div className="relative flex items-center justify-center order-1 md:order-2 h-full">
            {/* Glass pedestal ring behind product */}
            <div className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-88 md:h-88 lg:w-[26rem] lg:h-[26rem] rounded-full border border-clay-border bg-gradient-to-b from-foreground/[0.03] to-transparent pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.85, rotate: 4 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative flex items-center justify-center"
              >
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  <Image
                    src={active.image}
                    alt={active.eyebrow}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority={activeIndex === 0}
                    sizes="(max-width: 768px) 220px, 384px"
                  />
                </div>

                {/* Floating glass price card */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="absolute bottom-0 right-0 sm:-right-2 md:right-0 clay-card flex items-center gap-3 px-3.5 py-2.5 md:px-4 md:py-3 w-52 sm:w-56"
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="text-[11px] md:text-xs font-semibold text-foreground leading-tight truncate">
                      {active.badge}
                    </p>
                    <p className="text-[10px] md:text-xs text-muted-foreground">
                      Price: <span className="text-primary font-semibold">{formattedPrice}</span>
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}