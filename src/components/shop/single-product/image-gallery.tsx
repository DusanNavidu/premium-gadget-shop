"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  baseImage: string;
  gallery: string[];
  selectedColor?: { name: string; imageRef?: string };
}

export function ImageGallery({ baseImage, gallery, selectedColor }: ImageGalleryProps) {
  const allImages = [selectedColor?.imageRef || baseImage, ...gallery].filter(Boolean) as string[];
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    setActiveIdx(0);
  }, [selectedColor]);

  const goTo = (idx: number) => setActiveIdx((idx + allImages.length) % allImages.length);

  if (allImages.length === 0) {
    return (
      <div className="relative w-full aspect-square rounded-4xl clay-card flex items-center justify-center text-muted-foreground text-sm">
        No image available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Display */}
      <div className="relative w-full aspect-square rounded-4xl clay-card bg-linear-to-br from-foreground/[0.04] to-transparent flex items-center justify-center p-8 overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.04 }}
            className="relative w-full h-full"
          >
            <Image
              src={allImages[activeIdx]}
              alt="Product View"
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => goTo(activeIdx - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-background/70 backdrop-blur-md border border-clay-border opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => goTo(activeIdx + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-background/70 backdrop-blur-md border border-clay-border opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>

            {/* Dot indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
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

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all bg-foreground/[0.03] ${
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