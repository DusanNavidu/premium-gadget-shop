"use client";

import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import type { TrackingStep } from "@/data/orders";

export function TrackingTimeline({ steps }: { steps: TrackingStep[] }) {
  return (
    <div className="relative pl-2">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <div key={step.label} className="relative flex gap-4 pb-8 last:pb-0">
            {/* connector line */}
            {!isLast && (
              <div
                className="absolute left-3.75 top-8 bottom-0 w-0.5"
                style={{
                  backgroundColor: step.completed ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.1)",
                }}
              />
            )}

            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${
                step.completed ? "bg-primary text-primary-foreground" : "bg-foreground/[0.06] text-muted-foreground"
              }`}
            >
              {step.completed ? <Check className="w-4 h-4" /> : <Circle className="w-3 h-3" />}
            </motion.div>

            <div className="pt-1">
              <p className={`text-sm font-semibold ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                {step.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{step.date}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}