"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Package, Heart, Check } from "lucide-react";
import { useUserStore } from "@/store/user-store";
import { orders } from "@/data/orders";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { firstName, lastName, email, phone, address, updateProfile } = useUserStore();
  const [form, setForm] = useState({ firstName, lastName, email, phone, address });
  const [saved, setSaved] = useState(false);

  const inputClass =
    "w-full h-12 px-4 rounded-xl bg-background border border-clay-border outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm";
  const labelClass = "block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { icon: Package, label: "Total Orders", value: orders.length },
          { icon: Heart, label: "Wishlist Items", value: 4 },
          { icon: User, label: "Account Status", value: "Active" },
        ].map((stat) => (
          <div key={stat.label} className="clay-card p-5 rounded-2xl flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Profile form */}
      <div className="clay-card p-6 md:p-8 rounded-4xl">
        <h2 className="text-xl font-bold text-foreground mb-6">Personal Information</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>First Name</label>
            <input className={inputClass} value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input className={inputClass} value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} />
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input type="tel" className={inputClass} value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Default Address</label>
            <input className={inputClass} value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} />
          </div>

          <div className="md:col-span-2 pt-2">
            <Button type="submit" variant="primary" className="rounded-xl">
              <AnimatePresence mode="wait" initial={false}>
                {saved ? (
                  <motion.span key="saved" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                    <Check className="w-4 h-4" /> Saved
                  </motion.span>
                ) : (
                  <motion.span key="save" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    Save Changes
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}