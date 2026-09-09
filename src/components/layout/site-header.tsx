"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "../ui/logo";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";

const NAV_LINKS = [
  { label: "Mobiles", href: "/shop?category=mobile" },
  { label: "Computers", href: "/shop?category=computers" },
  { label: "Accessories", href: "/shop?category=accessories" },
];

export function SiteHeader() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { items, setIsOpen } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMounted(true), []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-2xl border-b border-clay-border shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
          : "bg-background/30 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6 gap-4 transition-all duration-300"
        style={{ height: scrolled ? "64px" : "80px" }}
      >
        {/* Logo */}
        <Logo />

        {/* Nav links - desktop only */}
        <nav className="hidden lg:flex items-center gap-1 shrink-0">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              {link.label}
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
          ))}
        </nav>

        {/* Premium Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl relative group hidden md:block">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gadgets, mobiles, laptops..."
            className="w-full h-11 pl-10 pr-16 rounded-full bg-foreground/[0.04] dark:bg-foreground/[0.06] border border-clay-border text-sm placeholder:text-muted-foreground/50 outline-none transition-all focus:bg-background focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
          />
          <div className="absolute inset-y-0 right-3 hidden lg:flex items-center pointer-events-none">
            <span className="text-[10px] font-semibold text-muted-foreground bg-foreground/5 px-2 py-1 rounded-md border border-clay-border">
              ⌘K
            </span>
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          <button className="relative p-2.5 rounded-full hover:bg-foreground/5 transition-colors hidden sm:flex items-center justify-center">
            <Heart className="w-5 h-5 text-foreground/80" />
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
              2
            </span>
          </button>

          <button 
            onClick={() => setIsOpen(true)}
            className="relative p-2.5 rounded-full hover:bg-foreground/5 transition-colors flex items-center justify-center"
          >
            <ShoppingBag className="w-5 h-5 text-foreground/80" />
            {mounted && items.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>

          <ThemeToggle />

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2.5 rounded-full hover:bg-foreground/5 transition-colors flex items-center justify-center"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search + nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-clay-border bg-background/95 backdrop-blur-2xl"
          >
            <div className="px-4 py-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search gadgets..."
                  className="w-full h-11 pl-10 pr-4 rounded-full bg-foreground/[0.04] border border-clay-border text-sm outline-none focus:border-primary/40"
                />
              </div>
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:bg-foreground/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}