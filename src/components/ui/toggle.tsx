"use client";

import { motion } from "framer-motion";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative flex items-center shrink-0 w-16 h-8 rounded-full border-2 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        checked 
          ? "bg-green-500 border-green-600 dark:border-green-400" 
          : "bg-gray-200 dark:bg-gray-800 border-gray-400 dark:border-gray-600"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {/* Inner shadow for depth */}
      <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] pointer-events-none" />
      
      {/* ON / OFF Text Labels */}
      <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
        <span 
          className={`text-[10px] font-extrabold tracking-wider transition-opacity duration-300 ${
            checked ? "opacity-100 text-white" : "opacity-0"
          }`}
        >
          ON
        </span>
        <span 
          className={`text-[10px] font-extrabold tracking-wider transition-opacity duration-300 ${
            !checked ? "opacity-100 text-gray-500 dark:text-gray-400" : "opacity-0"
          }`}
        >
          OFF
        </span>
      </div>

      {/* Animated Thumb */}
      <motion.div
        initial={false}
        animate={{ x: checked ? 34 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-6 h-6 bg-white rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.3)] z-10"
      />
    </button>
  );
}