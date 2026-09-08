"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-8 h-8 md:w-9 md:h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center hover:bg-[hsl(var(--foreground))]/10 transition-colors"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Moon className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]" />
      ) : (
        <Sun className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]" />
      )}
    </button>
  );
}