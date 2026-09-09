"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4"
    >
      <div className="w-24 h-24 rounded-full bg-success/20 text-success flex items-center justify-center mb-6">
        <CheckCircle2 className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-extrabold text-foreground mb-4">Payment Successful!</h1>
      <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
        Your order has been placed successfully. We&apos;ve sent a confirmation email with your order details.
      </p>
      <Button onClick={() => router.push("/")} variant="primary" className="h-14 px-8 rounded-2xl text-base">
        Continue Shopping
      </Button>
    </motion.div>
  );
}