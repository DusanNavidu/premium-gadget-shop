"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { User, Package, Settings, LogOut, Camera, ShieldCheck } from "lucide-react";
import { useUserStore } from "@/store/user-store";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Orders", href: "/profile/orders", icon: Package },
  { label: "Settings", href: "/profile/settings", icon: Settings },
];

export function ProfileSidebar() {
  const pathname = usePathname();
  const { firstName, lastName, email, memberSince } = useUserStore();

  return (
    <aside className="lg:col-span-3">
      <div className="clay-card rounded-4xl overflow-hidden lg:sticky lg:top-28">
        
        {/* Decorative Cover Banner */}
        <div className="h-28 bg-linear-to-r from-primary/30 via-accent/20 to-primary/10 relative">
          <div className="absolute inset-0 bg-background/20 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
        </div>

        {/* Profile Info Section */}
        <div className="flex flex-col items-center text-center px-6 pb-6 border-b border-clay-border relative">
          
          {/* Avatar with Ring and Edit Button */}
          <div className="relative -mt-14 mb-4 border-2 border-background rounded-full shadow-lg">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 rounded-full p-1.5 bg-background shadow-xl relative z-10"
            >
              <div className="w-full h-full rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-3xl font-extrabold shadow-inner">
                {firstName[0]}{lastName[0]}
              </div>
            </motion.div>
            
            {/* Edit Camera Icon */}
            <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-background border border-clay-border shadow-md flex items-center justify-center text-muted-foreground hover:text-primary transition-colors z-20">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <h2 className="font-extrabold text-foreground text-xl flex items-center gap-1.5">
            {firstName} {lastName}
            <ShieldCheck className="w-5 h-5 text-primary" />
          </h2>
          <p className="text-sm text-muted-foreground mt-1 mb-4">{email}</p>
          
          <span className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider">
            Member since {memberSince}
          </span>
        </div>

        {/* Navigation Section */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="block relative group"
              >
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(0,0,0,0.1)] shadow-primary/30" 
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground hover:translate-x-1"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary transition-colors"}`} />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-clay-border bg-foreground/[0.02]">
          <Button
            variant="ghost"
            className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive border border-destructive/20 rounded-xl py-2.5 font-bold text-sm"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>

      </div>
    </aside>
  );
}