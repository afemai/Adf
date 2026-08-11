// Subtle repeating palm-frond pattern used as a faint background layer on
// hero bands — ties the visual language to the coconut/plantation story
// without competing with the content. Opacity is kept very low (4-6%).
export default function HeritagePattern({ id = "adf-palms", className }: { id?: string; className?: string }) {
  return (
    <svg className={className} aria-hidden>
      <defs>
        <pattern id={id} width="120" height="120" patternUnits="userSpaceOnUse">
          {/* palm trunk arc */}
          <path
            d="M20 100 Q 55 70 100 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* fronds fanning from the trunk top */}
          <path d="M55 70 Q 60 40 92 52" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M55 70 Q 52 38 20 44" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M55 70 Q 70 45 78 22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M55 70 Q 40 48 30 26" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          {/* coconuts */}
          <circle cx="53" cy="76" r="2.2" fill="currentColor" />
          <circle cx="59" cy="77" r="2.2" fill="currentColor" />
          {/* second, smaller palm mirrored in the tile */}
          <path d="M104 8 Q 92 26 96 44" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M92 26 Q 98 14 110 18" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
          <path d="M92 26 Q 86 15 76 20" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}