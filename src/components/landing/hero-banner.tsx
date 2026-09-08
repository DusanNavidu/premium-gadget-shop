"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { heroProducts } from "@/data/hero-products";
import { Button } from "../ui/button";

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
    <section className="relative px-3 sm:px-4 md:px-6 pt-20 sm:pt-24 md:pt-32 pb-6 md:pb-12">
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative container mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem]
                   shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] md:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]"
        style={{
          backgroundColor: "hsl(var(--hero-surface))",
          color: "hsl(var(--hero-surface-foreground))",
        }}
      >
        {/* Faint connecting-line texture */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="hero-lines" width="120" height="120" patternUnits="userSpaceOnUse">
              <path
                d="M0 60 Q30 20 60 60 T120 60"
                stroke="hsl(var(--hero-surface-foreground))"
                strokeWidth="1"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-lines)" />
        </svg>

        {/* Decorative color blobs */}
        <div className="absolute top-10 right-[15%] w-16 h-16 sm:w-24 sm:h-24 md:w-40 md:h-40 rounded-full bg-primary/70 blur-sm pointer-events-none" />
        <div className="absolute bottom-10 right-[5%] w-20 h-20 sm:w-32 sm:h-32 md:w-56 md:h-56 rounded-full bg-primary/60 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:grid md:grid-cols-2 md:gap-4 md:items-center px-5 sm:px-8 md:px-14 py-8 sm:py-10 md:py-0 md:h-[600px] lg:h-[620px]">
          {/* Product image + floating price card */}
          <div className="relative flex items-center justify-center order-1 md:order-2 md:h-full mb-2 sm:mb-4 md:mb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.85, rotate: 4 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative flex items-center justify-center"
              >
                <div className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  <Image
                    src={active.image}
                    alt={active.eyebrow}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority={activeIndex === 0}
                    sizes="(max-width: 768px) 200px, 384px"
                  />
                </div>

                {/* Floating price card */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="absolute -bottom-1 right-0 sm:bottom-2 sm:-right-2 md:right-0 flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-white shadow-xl w-40 sm:w-52 md:w-56"
                >
                  <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 bg-primary/10">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-neutral-900 leading-tight truncate">
                      {active.badge}
                    </p>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-neutral-500">
                      Price: <span className="text-primary font-semibold">{formattedPrice}</span>
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 md:h-full md:justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center md:items-start w-full"
              >
                <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight md:min-h-[120px] lg:min-h-[144px] line-clamp-2">
                  <span>{active.titlePrefix}</span>{" "}
                  <span className="text-primary">{active.titleHighlight}</span>
                </h1>

                <p
                  className="mt-3 sm:mt-4 md:mt-6 text-[13px] sm:text-sm md:text-[15px] lg:text-lg max-w-xs sm:max-w-sm md:max-w-lg font-light md:min-h-[56px] line-clamp-3"
                  style={{ color: "hsl(var(--hero-surface-muted))" }}
                >
                  {active.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-row items-center gap-2.5 sm:gap-4 md:gap-5 mt-6 sm:mt-8 md:mt-10 w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                className="group whitespace-nowrap flex-1 sm:flex-none md:!px-8 md:!py-4 md:!text-base"
              >
                Explore Now
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </Button>

              <Button
                variant="ghost"
                size="md"
                className="group pl-1.5 pr-4 sm:pl-2 sm:pr-6 border border-transparent hover:border-white/10 whitespace-nowrap shrink-0"
              >
                <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white group-hover:scale-105 transition-transform shadow-lg shrink-0">
                  <Play
                    className="w-3 h-3 sm:w-4 sm:h-4 ml-0.5 text-[hsl(var(--primary))]"
                    fill="currentColor"
                    stroke="currentColor"
                  />
                </span>
                <span
                  className="text-xs sm:text-sm hidden xs:inline"
                  style={{ color: "hsl(var(--hero-surface-foreground))" }}
                >
                  Watch Promotion
                </span>
              </Button>
            </div>

            {/* Product switcher dots */}
            <div className="flex items-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 md:mt-10">
              {heroProducts.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => goTo(index)}
                  aria-label={`Show ${item.eyebrow}`}
                  className="relative h-1.5 rounded-full transition-all duration-300"
                  style={{ width: index === activeIndex ? "24px" : "7px" }}
                >
                  <span
                    className="absolute inset-0 rounded-full transition-colors duration-300"
                    style={{
                      backgroundColor:
                        index === activeIndex
                          ? "hsl(var(--primary))"
                          : "hsl(var(--hero-surface-foreground) / 0.2)",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}