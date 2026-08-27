"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


export function ThemeToggle(): React.ReactElement {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={
        mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-surface-muted"
    >
      <Moon
        className="hidden h-5 w-5 text-accent [.dark_&]:block"
        aria-hidden
      />
      <Sun
        className="block h-5 w-5 text-primary [.dark_&]:hidden"
        aria-hidden
      />
    </button>
  );
}
