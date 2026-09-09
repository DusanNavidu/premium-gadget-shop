"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Lock, Palette, Trash2, Check } from "lucide-react";
import { useUserStore } from "@/store/user-store";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

export default function SettingsPage() {
  const { notifications, updateNotifications } = useUserStore();
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [pwSaved, setPwSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const inputClass =
    "w-full h-12 px-4 rounded-xl bg-background border border-clay-border outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm";
  const labelClass = "block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider";

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPwSaved(true);
    setPasswords({ current: "", next: "", confirm: "" });
    setTimeout(() => setPwSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Account Settings</h2>

      {/* Password */}
      <div className="clay-card p-6 md:p-8 rounded-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-foreground text-base">Change Password</h3>
        </div>

        <form onSubmit={handlePasswordSubmit} className="grid grid-cols-1 gap-4 max-w-md">
          <div>
            <label className={labelClass}>Current Password</label>
            <input type="password" required className={inputClass} value={passwords.current} onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))} />
          </div>
          <div>
            <label className={labelClass}>New Password</label>
            <input type="password" required className={inputClass} value={passwords.next} onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))} />
          </div>
          <div>
            <label className={labelClass}>Confirm New Password</label>
            <input type="password" required className={inputClass} value={passwords.confirm} onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))} />
          </div>
          <Button type="submit" variant="primary" className="rounded-xl w-fit">
            <AnimatePresence mode="wait" initial={false}>
              {pwSaved ? (
                <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> Password Updated
                </motion.span>
              ) : (
                <motion.span key="upd" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  Update Password
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </form>
      </div>

      {/* Notifications */}
      <div className="clay-card p-6 md:p-8 rounded-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-foreground text-base">Notifications</h3>
        </div>

        <div className="space-y-4">
          {[
            { key: "orderUpdates" as const, label: "Order Updates", desc: "Shipping and delivery status changes" },
            { key: "promotions" as const, label: "Promotions & Deals", desc: "Discounts and limited-time offers" },
            { key: "newArrivals" as const, label: "New Arrivals", desc: "Be the first to know about new products" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-clay-border last:border-0">
              <div>
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
              <Toggle
                checked={notifications[item.key]}
                onChange={(v) => updateNotifications({ [item.key]: v })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Appearance note */}
      <div className="clay-card p-6 md:p-8 rounded-4xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Palette className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Appearance</p>
          <p className="text-xs text-muted-foreground mt-0.5">Switch between light and dark mode using the toggle in the header.</p>
        </div>
      </div>

      {/* Danger zone */}
      <div className="clay-card p-6 md:p-8 rounded-4xl border border-destructive/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
            <Trash2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-destructive text-base">Danger Zone</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Deleting your account is permanent and cannot be undone. All order history and saved data will be lost.
        </p>
        {!showDeleteConfirm ? (
          <Button
            variant="ghost"
            onClick={() => setShowDeleteConfirm(true)}
            className="border border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-xl"
          >
            Delete Account
          </Button>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Are you sure?</span>
            <Button 
              variant="primary" 
              size="sm" 
              className="bg-destructive! border-destructive! shadow-none hover:brightness-110! rounded-lg"
            >
              Yes, Delete
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => setShowDeleteConfirm(false)}
              className="rounded-lg"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}