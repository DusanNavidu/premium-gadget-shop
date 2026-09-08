"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface GlassCardProps {
  id: string;
  title: string;
  price: string;
  category: string;
}

export function GlassCard({ id, title, price, category }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="glass-panel rounded-2xl p-4 flex flex-col gap-4 overflow-hidden group cursor-pointer"
    >
      <div className="relative w-full h-48 rounded-xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center overflow-hidden">
        {/* Placeholder for Product Image */}
        <span className="text-sm font-medium opacity-50 group-hover:scale-110 transition-transform duration-500">Image Placehoder</span>
      </div>
      
      <div className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-widest text-[hsl(var(--primary))] font-semibold">
          {category}
        </span>
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        <p className="font-light opacity-80">{price}</p>
      </div>
      
      <Link 
        href={`/shop/${id}`}
        className="mt-2 w-full py-2 rounded-lg bg-[hsl(var(--primary))] text-white text-sm font-medium text-center hover:opacity-90 transition-opacity"
      >
        View Details
      </Link>
    </motion.div>
  );
}