"use client";

import { ShieldCheck, Zap, Truck, Headphones } from "lucide-react";

const highlights = [
  { icon: Zap, title: "Next-Gen Performance", desc: "Equipped with the latest architectures." },
  { icon: ShieldCheck, title: "Official Warranty", desc: "Authentic products with full support." },
  { icon: Truck, title: "Express Logistics", desc: "Swift delivery right to your door." },
  { icon: Headphones, title: "24/7 Expert Support", desc: "Dedicated tech specialists to assist you." },
];

export function TechHighlights() {
  return (
    <section className="py-20 px-6 border-y border-white/5 bg-white/1">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {highlights.map((h, i) => {
          const Icon = h.icon;
          return (
            <div key={i} className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-base mb-1">{h.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{h.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}