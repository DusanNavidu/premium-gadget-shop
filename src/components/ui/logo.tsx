"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import { Cpu } from "lucide-react";

export function Logo() {
  const text = "TechVault";
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: i * 0.03 },
    }),
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.6 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 14, stiffness: 220 },
    },
  };

  return (
    <Link href="/" className="flex items-center gap-2.5 group shrink-0">
      {/* Icon mark */}
      <motion.div
        whileHover={{ rotate: -8, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl bg-linear-to-br from-primary to-accent shadow-lg shadow-primary/30"
      >
        <Cpu className="w-5 h-5 md:w-5.5 md:h-5.5 text-primary-foreground" strokeWidth={2.2} />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
      </motion.div>

      {/* Text content */}
      <div className="flex flex-col justify-center">
        <span className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-[0.25em] leading-none mb-0.5">
          Gadgets & Tech
        </span>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex font-extrabold text-xl md:text-2xl tracking-tight leading-none text-foreground"
        >
          {letters.map((letter, index) => (
            <motion.span key={index} variants={child} className="inline-block">
              {letter}
            </motion.span>
          ))}
          <motion.span variants={child} className="text-primary inline-block ml-0.5">
            .
          </motion.span>
        </motion.div>
      </div>
    </Link>
  );
}