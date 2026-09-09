"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Smartphone, Laptop, Headphones, ArrowRight } from "lucide-react";

const categories = [
  {
    id: "mobile",
    title: "Mobile Devices",
    description: "Flagships, Tablets & Premium Accessories",
    icon: Smartphone,
    color: "from-blue-500/20 to-transparent",
    iconColor: "text-blue-500",
    delay: 0.1,
  },
  {
    id: "computers",
    title: "Computers & Laptops",
    description: "Ultrabooks, Monitors & Mechanical Keyboards",
    icon: Laptop,
    color: "from-purple-500/20 to-transparent",
    iconColor: "text-purple-500",
    delay: 0.2,
  },
  {
    id: "audio",
    title: "Audio & Wearables",
    description: "Noise-Canceling Audio & Smartwatches",
    icon: Headphones,
    color: "from-emerald-500/20 to-transparent",
    iconColor: "text-emerald-500",
    delay: 0.3,
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 container mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
            Explore Categories
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed">
            Discover our meticulously curated collection of premium hardware, designed to elevate your daily digital workflow.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: cat.delay, ease: "easeOut" }}
          >
            <Link href={`/shop?category=${cat.id}`} className="block group h-full">
              <div className="relative h-full flex flex-col p-8 rounded-4xl clay-card overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                
                {/* Background Glow Effect */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-linear-to-bl ${cat.color} blur-[60px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-background/80 backdrop-blur-md border border-clay-border shadow-sm mb-8 group-hover:scale-110 transition-transform duration-500 ${cat.iconColor}`}>
                    <cat.icon className="w-7 h-7" strokeWidth={2} />
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                      {cat.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      <span>Browse Collection</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}