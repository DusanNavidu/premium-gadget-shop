"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ImageGalleryProps {
  baseImage: string;
  gallery: string[];
  selectedColor?: { name: string; imageRef?: string };
}

const SWIPE_THRESHOLD = 50;

export function ImageGallery({ baseImage, gallery, selectedColor }: ImageGalleryProps) {
  const allImages = [selectedColor?.imageRef || baseImage, ...gallery].filter(Boolean) as string[];
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const initialLoad = useRef(true);

  useEffect(() => {
    setActiveIdx(0);
    setDirection(0);
  }, [selectedColor]);

  useEffect(() => {
    initialLoad.current = false;
  }, []);

  const goTo = (idx: number, dir: number) => {
    setDirection(dir);
    setActiveIdx((idx + allImages.length) % allImages.length);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) goTo(activeIdx + 1, 1);
    else if (info.offset.x > SWIPE_THRESHOLD) goTo(activeIdx - 1, -1);
  };

  if (allImages.length === 0) {
    return (
      <div className="relative w-full max-w-130 mx-auto aspect-4/5 rounded-4xl clay-card flex items-center justify-center text-muted-foreground text-sm">
        No image available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Display — capped width, portrait-leaning frame */}
      <div className="relative w-full max-w-130 mx-auto aspect-4/5 rounded-4xl clay-card bg-linear-to-br from-foreground/[0.04] to-transparent overflow-hidden group touch-pan-y">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeIdx}
            custom={direction}
            drag={allImages.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center p-8 md:p-10 cursor-grab active:cursor-grabbing"
          >
            <div className="relative w-full h-full">
              <Image
                src={allImages[activeIdx]}
                alt="Product View"
                fill
                className="object-contain drop-shadow-2xl pointer-events-none select-none"
                sizes="(max-width: 768px) 90vw, 520px"
                priority={initialLoad.current && activeIdx === 0}
                draggable={false}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Zoom hint */}
        <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-background/70 backdrop-blur-md border border-clay-border opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn className="w-3.5 h-3.5 text-foreground/60" />
        </div>

        {/* Nav arrows — always visible on mobile, hover-reveal on desktop */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => goTo(activeIdx - 1, -1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-background/80 backdrop-blur-md border border-clay-border opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => goTo(activeIdx + 1, 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-background/80 backdrop-blur-md border border-clay-border opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:scale-105"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>

            {/* Dot indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > activeIdx ? 1 : -1)}
                  aria-label={`Go to image ${i + 1}`}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIdx ? "20px" : "6px",
                    backgroundColor: i === activeIdx ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.2)",
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails — scrollbar hidden */}
      {allImages.length > 1 && (
        <div
          className="flex items-center justify-center gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx, idx > activeIdx ? 1 : -1)}
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all bg-foreground/[0.03] ${
                activeIdx === idx ? "border-primary scale-105 shadow-md" : "border-clay-border/60 hover:border-primary/50"
              }`}
            >
              <Image src={img} alt={`Thumb ${idx}`} fill className="object-contain p-2" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}