"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navItems } from "@/constants/navigation";
import { flagships } from "@/data/registry";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { StatusStamp } from "@/components/shared/status-stamp";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const SECTION_IDS = navItems.map((item) => item.href.slice(1));


export function Navbar(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [active, setActive] = useState<string>("");
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const closeTimer = useRef<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const requestClose = useCallback(() => {
    if (!open) return;
    setClosing(true);
    triggerRef.current?.focus();
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 160);
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setCondensed(y > 80);
        // Never hide while the menu is open or the visitor is near the top.
        if (!open && y > 160) {
          setHidden(y > lastY.current);
        } else {
          setHidden(false);
        }
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  /* Focus trap + escape + scroll lock for the mobile overlay. */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const overlay = overlayRef.current;
    const firstLink = overlay?.querySelector<HTMLAnchorElement>("a[href^='#']");
    firstLink?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose();
        return;
      }
      if (event.key !== "Tab" || !overlay) return;
      const focusables = overlay.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, requestClose]);

  const closeMenu = useCallback(() => {
    requestClose();
  }, [requestClose]);

  const strip = ["jobtasker", "marsa"]
    .map((slug) => flagships.find((p) => p.slug === slug))
    .filter((p) => p !== undefined);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-300 ease-standard",
        hidden ? "-translate-y-full" : "translate-y-0",
        condensed
          ? "border-b border-border-subtle bg-bg"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 lg:px-10"
      >
        <a
          href="#main-content"
          className="font-mono text-sm font-semibold tracking-widest text-primary"
          aria-label="Karim Tamer, back to top"
        >
          Karim<span className="text-accent">Tamer</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                className={cn(
                  "group relative inline-flex h-11 items-center gap-1.5 font-mono text-[13px] tracking-wide uppercase transition-colors",
                  active === item.href
                    ? "text-primary"
                    : "text-muted hover:text-secondary",
                )}
              >
                <span className="text-xs text-accent">{item.index}</span>
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 bottom-3 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-150 ease-standard group-hover:scale-x-100",
                    active === item.href && "scale-x-100",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.resumeUrl}
            download
            className="pressable hidden h-9 items-center rounded-md border border-border-default px-4 font-mono text-xs tracking-wider text-primary hover:border-primary sm:inline-flex"
          >
            RESUME ↓
          </a>
          <ThemeToggle />
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => {
              if (closeTimer.current !== null)
                window.clearTimeout(closeTimer.current);
              setClosing(false);
              setOpen(true);
            }}
            className="inline-flex h-11 cursor-pointer items-center rounded-md px-4 font-mono text-xs tracking-widest text-primary transition-colors hover:text-accent lg:hidden"
          >
            MENU
          </button>
        </div>
      </nav>

      {/* Mobile full-screen console */}
      {open ? (
        <>
          {/* Backdrop */}
          <div
            data-closing={closing ? "true" : undefined}
            className="menu-backdrop fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-closing={closing ? "true" : undefined}
            className="menu-overlay fixed inset-0 z-50 flex flex-col bg-bg px-6 pb-8 pt-5 lg:hidden"
          >
            <div className="flex h-14 shrink-0 items-center justify-between">
              <span className="font-mono text-sm tracking-widest text-primary">
                Karim <span className="text-accent">Tamer</span>
              </span>
              <button
                type="button"
                onClick={closeMenu}
                className="inline-flex h-11 cursor-pointer items-center rounded-md px-4 font-mono text-xs tracking-widest text-primary transition-colors hover:text-accent"
              >
                CLOSE ✕
              </button>
            </div>

            <nav
              aria-label="Mobile navigation"
              className="flex flex-1 bg-bg/85 dark:bg-surface/85 flex-col justify-center gap-2"
            >
              {navItems.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  style={{ animationDelay: `${i * 25}ms` }}
                  className="menu-item flex min-h-14 items-baseline gap-4 border-b border-border-subtle py-4 text-h1 text-primary transition-colors hover:text-accent"
                >
                  <span className="font-mono text-sm text-accent">
                    {item.index}
                  </span>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="shrink-0 space-y-6">
              <a
                href={siteConfig.resumeUrl}
                download
                className="inline-flex w-full h-11 items-center justify-center rounded-md border border-border-default px-5 font-mono bg-accent text-xs tracking-wider text-bg"
              >
                RESUME ↓
              </a>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
