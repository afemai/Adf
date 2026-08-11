"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Maximize2 } from "lucide-react";

// Silent autoplay while the video is on screen. The factory footage carries
// an AI voice-over, so sound is deliberately removed (no toggle) — visitors
// see the industrial process, not the narration. Pauses when scrolled away.
export default function AutoplayVideo({
  src,
  label,
  className = "aspect-video w-full bg-navy-950 object-cover",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const v = ref.current;
        if (!v) return;
        if (entries[0].isIntersecting) {
          v.muted = true;
          void v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "120px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <div ref={wrapRef} className="group relative overflow-hidden">
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={`${className} cursor-pointer transition-transform duration-700 group-hover:scale-[1.02]`}
        aria-label={label}
      />

      {/* paused overlay */}
      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label={`Play ${label}`}
          className="absolute inset-0 flex items-center justify-center bg-navy-950/35 transition-colors hover:bg-navy-950/15"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-navy-900 shadow-xl transition-transform hover:scale-110">
            <Play className="ml-0.5 h-6 w-6" aria-hidden />
          </span>
        </button>
      )}

      {/* fullscreen only — sound is intentionally removed */}
      <div className="absolute right-3 top-3 flex gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            void ref.current?.requestFullscreen?.();
          }}
          aria-label="Fullscreen"
          className="rounded-full bg-navy-950/70 p-2 text-white backdrop-blur transition-colors hover:bg-navy-900"
        >
          <Maximize2 className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}