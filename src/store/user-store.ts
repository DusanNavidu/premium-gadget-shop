"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface NotificationPrefs {
  orderUpdates: boolean;
  promotions: boolean;
  newArrivals: boolean;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  notifications: NotificationPrefs;
  memberSince: string;
}

interface UserState extends UserProfile {
  updateProfile: (data: Partial<UserProfile>) => void;
  updateNotifications: (prefs: Partial<NotificationPrefs>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+94 77 123 4567",
      address: "123 Tech Lane, Suite 4, San Francisco, CA 94105",
      memberSince: "2024",
      notifications: { orderUpdates: true, promotions: false, newArrivals: true },
      updateProfile: (data) => set((s) => ({ ...s, ...data })),
      updateNotifications: (prefs) =>
        set((s) => ({ notifications: { ...s.notifications, ...prefs } })),
    }),
    { name: "techvault-user" }
  )
);