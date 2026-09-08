"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
  > {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "secondary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyle =
      "relative overflow-hidden rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2 select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

    const sizeStyle: Record<NonNullable<ButtonProps["size"]>, string> = {
      sm: "px-4 py-2 text-xs gap-1.5",
      md: "px-6 py-3 text-sm gap-2",
      lg: "px-8 py-4 text-base gap-2.5",
    };

    const variantStyle: Record<NonNullable<ButtonProps["variant"]>, string> = {
      primary:
        "bg-primary text-primary-foreground shadow-[0_8px_24px_-6px_hsl(var(--primary)/0.5)] border border-primary/30 hover:brightness-110",
      secondary: "clay-card text-foreground hover:bg-foreground/5",
      ghost: "text-foreground hover:bg-foreground/5",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        disabled={disabled || isLoading}
        className={`${baseStyle} ${sizeStyle[size]} ${variantStyle[variant]} ${className}`}
        {...(props as Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd">)}
      >
        {/* Shine sweep — only on primary, gives it a premium glossy feel */}
        {variant === "primary" && (
          <span className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
        )}

        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <span className="relative flex items-center justify-center gap-2">
            {children}
          </span>
        )}
      </motion.button>
    );
  }
);
Button.displayName = "Button";