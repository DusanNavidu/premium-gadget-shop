"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Smartphone, Laptop, Headphones, ChevronRight, Sparkles } from "lucide-react";

const categories = [
    {
        id: "all",
        title: "All Products",
        description: "Browse our entire premium catalog",
        icon: Sparkles,
        color: "from-foreground/10 to-transparent",
        iconColor: "text-foreground",
    },
    {
        id: "mobile",
        title: "Mobile Devices",
        description: "Flagships, Tablets & Premium Accessories",
        icon: Smartphone,
        color: "from-blue-500/20 to-transparent",
        iconColor: "text-blue-500",
    },
    {
        id: "computers",
        title: "Computers & Laptops",
        description: "Ultrabooks, Monitors & Keyboards",
        icon: Laptop,
        color: "from-purple-500/20 to-transparent",
        iconColor: "text-purple-500",
    },
    {
        id: "audio",
        title: "Audio & Wearables",
        description: "Noise-Canceling Audio & Smartwatches",
        icon: Headphones,
        color: "from-emerald-500/20 to-transparent",
        iconColor: "text-emerald-500",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function CategoryExplorer() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4"
        >
            {categories.map((cat) => (
                <motion.div key={cat.id} variants={itemVariants}>
                    {/* මෙහිදී අපි URL එක /shop?category=id ලෙස යවයි */}
                    <Link href={cat.id === "all" ? "/shop" : `/shop?category=${cat.id}`} className="block group">
                        <div className="relative flex items-center p-4 md:p-6 rounded-3xl clay-card overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]">

                            {/* Background Glow */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-bl ${cat.color} blur-2xl rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none`} />

                            <div className="relative z-10 flex items-center w-full gap-4 md:gap-5">
                                {/* Icon Box */}
                                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center bg-background/80 backdrop-blur-md border border-clay-border shadow-sm shrink-0 group-hover:scale-110 transition-transform duration-300 ${cat.iconColor}`}>
                                    <cat.icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2} />
                                </div>

                                {/* Text Content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base md:text-lg font-bold text-foreground mb-0.5 md:mb-1 group-hover:text-primary transition-colors truncate">
                                        {cat.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-muted-foreground truncate">
                                        {cat.description}
                                    </p>
                                </div>

                                {/* Arrow */}
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-foreground/5 text-foreground shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                            </div>

                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
}