"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { useCheckoutStore, type ShippingAddress } from "@/store/checkout-store";

export function ShippingForm() {
  const router = useRouter();
  const { shippingAddress, setShippingAddress } = useCheckoutStore();
  const [form, setForm] = useState<ShippingAddress>(
    shippingAddress ?? { firstName: "", lastName: "", email: "", phone: "", street: "", city: "", postalCode: "" }
  );

  const handleChange = (field: keyof ShippingAddress) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShippingAddress(form);
    router.push("/checkout/payment");
  };

  const inputClass =
    "w-full h-12 px-4 rounded-xl bg-background border border-clay-border outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm";
  const labelClass = "block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider";

  return (
    <section className="clay-card p-6 md:p-8 rounded-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <MapPin className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Shipping Address</h2>
      </div>

      <form id="shipping-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>First Name</label>
          <input required type="text" value={form.firstName} onChange={handleChange("firstName")} className={inputClass} placeholder="John" />
        </div>
        <div>
          <label className={labelClass}>Last Name</label>
          <input required type="text" value={form.lastName} onChange={handleChange("lastName")} className={inputClass} placeholder="Doe" />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Email Address</label>
          <input required type="email" value={form.email} onChange={handleChange("email")} className={inputClass} placeholder="john@example.com" />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Phone Number</label>
          <input required type="tel" value={form.phone} onChange={handleChange("phone")} className={inputClass} placeholder="+94 77 123 4567" />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Street Address</label>
          <input required type="text" value={form.street} onChange={handleChange("street")} className={inputClass} placeholder="123 Tech Lane, Suite 4" />
        </div>
        <div>
          <label className={labelClass}>City</label>
          <input required type="text" value={form.city} onChange={handleChange("city")} className={inputClass} placeholder="San Francisco" />
        </div>
        <div>
          <label className={labelClass}>Postal Code</label>
          <input required type="text" value={form.postalCode} onChange={handleChange("postalCode")} className={inputClass} placeholder="94105" />
        </div>
      </form>
    </section>
  );
}