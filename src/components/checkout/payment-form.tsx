"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";
import { useCheckoutStore } from "@/store/checkout-store";
import { useRequireShipping } from "@/hooks/use-checkout-guards";

export function PaymentForm() {
  useRequireShipping(); // kicks back to /checkout/shipping if visited directly by URL

  const router = useRouter();
  const { cardDetails, paymentMethod, setPaymentMethod, setCardDetails } = useCheckoutStore();

  const [cardNumber, setCardNumber] = useState(cardDetails?.cardNumber ?? "");
  const [expiry, setExpiry] = useState(cardDetails?.expiry ?? "");
  const [cvc, setCvc] = useState("");
  const [nameOnCard, setNameOnCard] = useState(cardDetails?.nameOnCard ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCardDetails({ cardNumber, expiry, cvc, nameOnCard });
    router.push("/checkout/review");
  };

  const inputClass =
    "w-full h-12 px-4 rounded-xl bg-background border border-clay-border outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm";
  const labelClass = "block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider";

  return (
    <section className="clay-card p-6 md:p-8 rounded-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <CreditCard className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Payment Method</h2>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => setPaymentMethod("card")}
          className={`flex-1 h-14 rounded-xl border-2 flex items-center justify-center gap-2 transition-colors ${
            paymentMethod === "card" ? "border-primary bg-primary/5" : "border-clay-border bg-background"
          }`}
        >
          <CreditCard className={`w-5 h-5 ${paymentMethod === "card" ? "text-primary" : "text-muted-foreground"}`} />
          <span className={`font-bold text-sm ${paymentMethod === "card" ? "text-primary" : "text-foreground"}`}>
            Credit Card
          </span>
        </button>
        <button
          type="button"
          disabled
          className="flex-1 h-14 rounded-xl border border-clay-border bg-background flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
        >
          <span className="font-bold text-foreground text-sm">Apple Pay</span>
        </button>
      </div>

      <form id="payment-form" onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelClass}>Card Number</label>
          <div className="relative">
            <input
              required
              type="text"
              maxLength={19}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className={`${inputClass} pl-12 font-mono tracking-widest`}
              placeholder="0000 0000 0000 0000"
            />
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Expiry Date</label>
            <input required type="text" maxLength={5} value={expiry} onChange={(e) => setExpiry(e.target.value)} className={`${inputClass} font-mono`} placeholder="MM/YY" />
          </div>
          <div>
            <label className={labelClass}>CVC</label>
            <input required type="text" maxLength={3} value={cvc} onChange={(e) => setCvc(e.target.value)} className={`${inputClass} font-mono`} placeholder="123" />
          </div>
        </div>

        <div>
          <label className={labelClass}>Name on Card</label>
          <input required type="text" value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} className={inputClass} placeholder="John Doe" />
        </div>
      </form>
    </section>
  );
}