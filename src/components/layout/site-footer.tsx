"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe, Camera, MessageCircle, Play, Send,
  Mail, Phone, MapPin, Cpu, Check,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const categoryLinks = [
  { label: "Mobile Phones", href: "/shop?category=mobile" },
  { label: "Computers & Laptops", href: "/shop?category=computers" },
  { label: "Audio & Wearables", href: "/shop?category=audio" },
];

const supportLinks = [
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Returns & Warranty", href: "/returns" },
  { label: "FAQs", href: "/faq" },
  { label: "Track Order", href: "/track-order" },
];

const socialLinks = [
  { icon: Globe, href: "#", label: "Facebook" },
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: MessageCircle, href: "#", label: "Twitter" },
  { icon: Play, href: "#", label: "YouTube" },
];

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: "hsl(var(--hero-surface))",
        color: "hsl(var(--hero-surface-foreground))",
      }}
    >
      {/* Top gradient hairline */}
      <div className="h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative container mx-auto px-6 pt-16 pb-8">
        {/* Newsletter strip */}
        <div className="clay-glass border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-14">
          <div className="text-center md:text-left">
            <h3 className="text-lg md:text-xl font-bold" style={{ color: "hsl(var(--hero-surface-foreground))" }}>
              Get exclusive deals in your inbox
            </h3>
            <p className="text-sm mt-1" style={{ color: "hsl(var(--hero-surface-muted))" }}>
              Sign up and be the first to know about new arrivals and price drops.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-12 flex-1 md:w-64 px-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm placeholder:text-white/30"
              style={{ color: "hsl(var(--hero-surface-foreground))" }}
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex items-center justify-center h-12 w-12 shrink-0 rounded-xl bg-primary text-primary-foreground hover:brightness-110 transition-all"
            >
              <motion.span
                key={subscribed ? "check" : "send"}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </motion.span>
            </button>
          </form>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="sm:col-span-2 md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-primary to-accent shadow-lg shadow-primary/30">
                <Cpu className="w-5 h-5 text-primary-foreground" strokeWidth={2.2} />
              </div>
              <span className="font-extrabold tracking-tight text-lg" style={{ color: "hsl(var(--hero-surface-foreground))" }}>
                TechVault.
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "hsl(var(--hero-surface-muted))" }}>
              Premium digital storefront specialized in high-performance mobile, computing, and tech hardware.
            </p>

            <div className="space-y-2 mt-1 text-sm" style={{ color: "hsl(var(--hero-surface-muted))" }}>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@techvault.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+94 77 123 4567</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Colombo, Sri Lanka</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-primary hover:border-primary transition-colors group"
                >
                  <Icon className="w-4 h-4 transition-colors" style={{ color: "hsl(var(--hero-surface-muted))" }} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "hsl(var(--hero-surface-foreground))" }}>
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-primary"
                    style={{ color: "hsl(var(--hero-surface-muted))" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "hsl(var(--hero-surface-foreground))" }}>
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-primary"
                    style={{ color: "hsl(var(--hero-surface-muted))" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "hsl(var(--hero-surface-foreground))" }}>
              Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-primary"
                    style={{ color: "hsl(var(--hero-surface-muted))" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderColor: "hsl(var(--hero-surface-foreground) / 0.08)", color: "hsl(var(--hero-surface-muted))" }}
        >
          <p>&copy; {new Date().getFullYear()} TechVault. All rights reserved.</p>

          {/* Payment method badges */}
          <div className="flex items-center gap-2">
            {["Visa", "Mastercard", "Amex", "PayPal"].map((method) => (
              <span
                key={method}
                className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold tracking-wide"
                style={{ color: "hsl(var(--hero-surface-muted))" }}
              >
                {method}
              </span>
            ))}
          </div>

          <p>Built with Next.js & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}