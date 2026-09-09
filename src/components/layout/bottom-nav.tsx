"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, LayoutGrid, User, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Category", href: "/categories", icon: LayoutGrid },
  { name: "Cart", href: "#", icon: ShoppingBag },
  { name: "You", href: "/profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const { items, setIsOpen } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.25 }}
      className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 md:px-6"
    >
      <nav className="flex items-center justify-around sm:justify-center gap-1 sm:gap-3 px-3 sm:px-5 py-2.5 bg-background/70 backdrop-blur-2xl border border-clay-border shadow-[0_20px_45px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.5)] rounded-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href && item.name !== "Cart";
          const Icon = item.icon;
          const isCart = item.name === "Cart";
          const cartCount = mounted ? items.length : 0;

          const content = (
            <motion.div
              whileHover={{ y: -4, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative flex flex-col items-center justify-center w-12 sm:w-14 h-11 sm:h-12 rounded-full group"
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-primary/10 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}

              <div className="relative flex items-center justify-center">
                <Icon
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`w-5 h-5 transition-all duration-300 ${
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
                {isCart && cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-3 bg-black text-white dark:bg-amber-50 dark:text-black text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-md"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 font-medium transition-all duration-300 ${
                  isActive ? "text-primary opacity-100" : "text-muted-foreground opacity-100 group-hover:text-foreground"
                }`}
              >
                {item.name}
              </span>
            </motion.div>
          );

          if (isCart) {
            return (
              <button key={item.name} onClick={() => setIsOpen(true)} className="relative">
                {content}
              </button>
            );
          }

          return (
            <Link key={item.name} href={item.href} className="relative">
              {content}
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}