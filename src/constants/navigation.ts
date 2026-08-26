import type { NavItem } from "@/types";

export const navItems: readonly NavItem[] = [
  { index: "01", label: "Work", href: "#work" },
  { index: "02", label: "Experience", href: "#experience" },
  { index: "03", label: "Teaching", href: "#teaching" },
  { index: "04", label: "About", href: "#about" },
  { index: "05", label: "Contact", href: "#contact" },
] as const;
