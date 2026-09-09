"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { motion } from "framer-motion";
import { Shield, Target, Cpu, Users, Award, TrendingUp, Sparkles } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To bridge the gap between cutting-edge technology and everyday users by providing a curated, premium shopping experience.",
  },
  {
    icon: Shield,
    title: "Authenticity",
    desc: "We guarantee 100% genuine products sourced directly from official manufacturers with full warranty support.",
  },
  {
    icon: Cpu,
    title: "Innovation",
    desc: "Constantly updating our catalog with the latest releases in the tech world to keep you ahead of the curve.",
  },
];

const stats = [
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: Award, value: "8+", label: "Years of Trust" },
  { icon: TrendingUp, value: "1,200+", label: "Products Curated" },
  { icon: Shield, value: "100%", label: "Genuine Guarantee" },
];

export default function AboutPage() {
  return (
    <div className="relative flex flex-col min-h-screen pt-24 pb-20 px-4 md:px-6 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-32 right-1/4 w-80 h-80 bg-primary/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-accent/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative container mx-auto max-w-5xl">
        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 md:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Story</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            About TechVault
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We are dedicated to bringing you the most advanced and premium technological hardware available.
          </p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="clay-card rounded-4xl p-6 md:p-8 mb-14 md:mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-2">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-2xl md:text-3xl font-extrabold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
              whileHover={{ y: -6 }}
              className="clay-card p-8 rounded-4xl text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-accent text-primary-foreground flex items-center justify-center mb-6 shadow-lg shadow-primary/25">
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Story section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="clay-card rounded-4xl p-8 md:p-12 mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-bold mb-3 block">
              How We Started
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">
              Built by people who love tech as much as you do
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              TechVault started as a small team frustrated by counterfeit listings and inconsistent
              service in online electronics retail. Today we work directly with manufacturers and
              authorized distributors to deliver a shopping experience that matches the quality of
              the products we sell — fast, transparent, and genuinely premium.
            </p>
          </div>
          <div className="relative aspect-square rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
            <div className="absolute w-40 h-40 bg-primary/20 blur-[60px] rounded-full" />
            <Cpu className="w-20 h-20 text-primary relative z-10" strokeWidth={1.2} />
          </div>
        </motion.div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-4xl p-8 md:p-12 text-center overflow-hidden relative"
          style={{ backgroundColor: "hsl(var(--hero-surface))", color: "hsl(var(--hero-surface-foreground))" }}
        >
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/25 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 relative z-10">
            Ready to upgrade your setup?
          </h2>
          <p className="text-sm md:text-base opacity-70 max-w-lg mx-auto mb-6 relative z-10">
            Explore our full catalog of premium mobiles, computers, and audio gear.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all relative z-10"
          >
            Browse Shop
          </a>
        </motion.div>
      </div>
    </div>
  );
}