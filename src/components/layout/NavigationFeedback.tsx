"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Route-change feedback:
// 1. The gold bar starts the instant a same-origin link is tapped (capture
//    phase) — mobile users see a response before the network even answers.
// 2. On arrival the bar flashes, then fades; the page is scrolled to the very
//    top (fixes the mid-page scroll bug).
export default function NavigationFeedback() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    const onTap = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="/"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === pathname || href.startsWith("/api/")) return;
      setLoading(true);
    };
    // Capture phase: fires before Next's own navigation handlers.
    document.addEventListener("click", onTap, true);
    return () => document.removeEventListener("click", onTap, true);
  }, [pathname]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setLoading(true);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div
      aria-hidden
      className={`fixed left-0 top-0 z-[100] h-0.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 shadow-[0_0_8px_rgba(242,183,5,0.7)] transition-all duration-300 ${
        loading ? "w-full opacity-100" : "w-0 opacity-0"
      }`}
    />
  );
}
