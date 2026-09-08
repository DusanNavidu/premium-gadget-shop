import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-3 rounded-xl glass-clay-inset text-foreground bg-transparent placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";