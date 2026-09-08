"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Smartphone, Laptop, Cpu } from "lucide-react";

const categories = [
  { title: "Mobile Devices", description: "Flagship smartphones with breakthrough camera systems.", icon: Smartphone, href: "/shop" },
  { title: "Computers & Laptops", description: "High-performance workstations built for pros.", icon: Laptop, href: "/shop" },
  { title: "Tech Gadgets", description: "Cutting-edge peripherals and smart accessories.", icon: Cpu, href: "/shop" },
];

export function CategoryShowcase() {
  return (
    <section className="py-20 px-6 container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground tracking-tight mb-2">Explore Categories</h2>
        <p className="text-foreground/60 text-sm">Curated hardware segments designed for premium experiences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Link href={cat.href} className="clay-card p-8 flex flex-col gap-4 group hover:scale-[1.02] transition-transform h-full">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{cat.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{cat.description}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}