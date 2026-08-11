"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Route-change feedback: jumps to the very top of the new page (fixing the
// mid-page scroll bug) and flashes a gold progress bar so slow navigations
// visibly respond the instant a link is followed — critical on mobile data.
export default function NavigationFeedback() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const first = useRef(true);

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
