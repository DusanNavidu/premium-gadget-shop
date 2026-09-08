"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, LayoutGrid, User, ShoppingBag } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Category", href: "/categories", icon: LayoutGrid },
  { name: "Cart", href: "/cart", icon: ShoppingBag, badge: 3 },
  { name: "You", href: "/profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.25 }}
      className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50 w-[88%] sm:w-auto"
    >
      <nav className="flex items-center justify-around sm:justify-center gap-1 sm:gap-3 md:gap-8 px-3 sm:px-5 md:px-8 py-2.5 md:py-3 bg-background/70 backdrop-blur-2xl border border-clay-border shadow-[0_20px_45px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.5)] rounded-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href} className="relative">
              <motion.div
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative flex flex-col items-center justify-center w-12 sm:w-14 md:w-16 h-11 sm:h-12 md:h-14 rounded-full group"
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
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                  {item.badge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
                      className="absolute -top-2 -right-3 bg-destructive text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-md"
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </div>
                <span
                  className={`text-[10px] mt-1 font-medium transition-all duration-300 ${
                    isActive
                      ? "text-primary opacity-100"
                      : "text-muted-foreground opacity-0 sm:opacity-100 group-hover:text-foreground"
                  }`}
                >
                  {item.name}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}