"use client";

import { useRef, useState } from "react";
import { Play, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Clip {
  src: string;
  poster: string;
  label: string;
  caption: string;
}

const CLIPS: Clip[] = [
  {
    src: "/videos/plantation-drone.mp4",
    poster: "/images/poster-plantation-drone.jpg",
    label: "Aerial plantation",
    caption: "Rows of coconut palms reaching the horizon",
  },
  {
    src: "/videos/coconut-sunset.mp4",
    poster: "/images/poster-coconut-sunset.jpg",
    label: "Palms at sunset",
    caption: "The grove glowing in golden hour light",
  },
  {
    src: "/videos/coconut-jungle.mp4",
    poster: "/images/poster-coconut-jungle.jpg",
    label: "Deep in the grove",
    caption: "Between the trunks — the farm from the ground",
  },
  {
    src: "/videos/coconut-palm-wind.mp4",
    poster: "/images/poster-coconut-palm-wind.jpg",
    label: "Wind through the leaves",
    caption: "Fronds swaying above the plantation floor",
  },
];

function VideoCard({ clip, index }: { clip: Clip; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

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
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-navy-950 shadow-lg ring-1 ring-navy-100",
        index === 0 ? "sm:col-span-2" : ""
      )}
    >
      <video
        ref={ref}
        src={clip.src}
        poster={clip.poster}
        muted={muted}
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={toggle}
        className="aspect-video w-full cursor-pointer object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        aria-label={clip.label}
      />

      {/* play / pause overlay */}
      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label={`Play ${clip.label}`}
          className="absolute inset-0 flex items-center justify-center bg-navy-950/35 transition-colors hover:bg-navy-950/15"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-navy-900 shadow-xl transition-transform hover:scale-110">
            <Play className="ml-1 h-7 w-7" aria-hidden />
          </span>
        </button>
      )}

      {/* caption */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/95 via-navy-950/50 to-transparent p-5 pt-14">
        <p className="font-display text-lg font-semibold text-white">{clip.label}</p>
        <p className="mt-0.5 text-xs text-cream-100/75">{clip.caption}</p>
      </div>

      {/* controls */}
      {playing && (
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
      )}
    </div>
  );
}

export default function PlantationShowcase() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {CLIPS.map((clip, i) => (
        <VideoCard key={clip.src} clip={clip} index={i} />
      ))}
    </div>
  );
}