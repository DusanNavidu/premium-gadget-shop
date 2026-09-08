"use client";

import * as React from "react";
import { motion } from "framer-motion";

export interface ButtonProps extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
> {
    variant?: "primary" | "secondary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "secondary", children, ...props }, ref) => {
        const baseStyle = "px-6 py-3 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 select-none";

        // Primary (Blue) vs Secondary (Glass-Clay)
        const variantStyle = variant === "primary"
            ? "bg-blue-600 text-white shadow-[0_8px_24px_rgba(37,99,235,0.4)] inset-0 border border-blue-400/50"
            : "glass-clay text-foreground hover:bg-white/5 dark:hover:bg-white/5";

        return (
            <motion.button
                ref={ref}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95, y: 0 }}
                className={`${baseStyle} ${variantStyle} ${className}`}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);
Button.displayName = "Button";