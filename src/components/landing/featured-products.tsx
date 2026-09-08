"use client";

import { GlassCard } from "@/components/shop/glass-card";
import Link from "next/link";

const featuredItems = [
  { id: "1", title: "MacBook Pro 16\" M3 Max", price: "$3,499.00", category: "Computers" },
  { id: "2", title: "iPhone 17 Pro Max", price: "$1,199.00", category: "Mobile" },
  { id: "3", title: "Sony WH-1000XM5", price: "$398.00", category: "Tech Gadgets" },
  { id: "4", title: "Samsung Odyssey G9", price: "$1,299.00", category: "Computers" },
];

export function FeaturedProducts() {
  return (
    <section className="py-20 px-6 container mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Featured Hardware</h2>
          <p className="text-gray-400 text-sm">Hand-picked premium tech products currently trending.</p>
        </div>
        <Link href="/shop" className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
          View All Products →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredItems.map((item) => (
          <GlassCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}