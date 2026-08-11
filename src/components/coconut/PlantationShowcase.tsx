"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlantationClip } from "@/lib/types";

function VideoCard({ clip, index }: { clip: PlantationClip; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Autoplay (muted, looping) while the card is on screen; pause when scrolled away.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setVisible(entry.isIntersecting);
        const v = ref.current;
        if (!v) return;
        if (entry.isIntersecting) {
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
      v.muted = false;
      void v.play();
      setMuted(false);
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <div
      ref={wrapRef}
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-navy-950 shadow-lg ring-1 ring-navy-100",
        index === 0 ? "sm:col-span-2" : ""
      )}
    >
      <video
        ref={ref}
        src={clip.src}
        poster={clip.poster}
        muted
        loop
        playsInline
        preload="metadata"
        autoPlay={visible}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={toggle}
        className="aspect-video w-full cursor-pointer object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        aria-label={clip.label}
      />

      {/* paused overlay — tap to play with sound */}
      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label={`Play ${clip.label} with sound`}
          className="absolute inset-0 flex items-center justify-center bg-navy-950/35 transition-colors hover:bg-navy-950/15"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-navy-900 shadow-xl transition-transform hover:scale-110">
            <Play className="ml-0.5 h-6 w-6" aria-hidden />
          </span>
        </button>
      )}

      {/* caption */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/95 via-navy-950/50 to-transparent p-5 pt-14">
        <p className="font-display text-lg font-semibold text-white">{clip.label}</p>
        <p className="mt-0.5 text-xs text-cream-100/75">{clip.caption}</p>
      </div>

      {/* controls */}
      <div className="absolute right-3 top-3 flex gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMuted((m) => !m);
            if (ref.current) ref.current.muted = !ref.current.muted;
          }}
          aria-label={muted ? "Unmute" : "Mute"}
          className="rounded-full bg-navy-950/70 p-2 text-white backdrop-blur transition-colors hover:bg-navy-900"
        >
          {muted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
        </button>
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

export default function PlantationShowcase({ clips }: { clips: PlantationClip[] }) {
  if (!clips.length) return null;
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {clips.map((clip, i) => (
        <VideoCard key={clip.id || clip.src} clip={clip} index={i} />
      ))}
    </div>
  );
}