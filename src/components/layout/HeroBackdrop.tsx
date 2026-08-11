"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// Full-bleed background video for page heroes. Muted, looping, autoplay;
// starts at poster + navy overlay so the hero reads perfectly even on slow
// networks — the footage fades in only once it can actually play.
export default function HeroBackdrop({ src, poster }: { src: string; poster?: string }) {
  const [ready, setReady] = useState(false);

  return (
    <>
      <video
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
          ready ? "opacity-40" : "opacity-0"
        )}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        onCanPlay={() => setReady(true)}
      />
      {/* Navy overlay keeps the headline legible over the footage */}
      <div aria-hidden className="absolute inset-0 bg-navy-900/60" />
    </>
  );
}
