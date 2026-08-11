import { cn } from "@/lib/utils";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.3em]",
            light ? "text-gold-400" : "text-gold-700"
          )}
        >
          {align === "center" && <span aria-hidden className="hidden h-px w-6 bg-gold-500/60 sm:block" />}
          {eyebrow}
          {align === "center" && <span aria-hidden className="hidden h-px w-6 bg-gold-500/60 sm:block" />}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-semibold leading-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", light ? "text-cream-100/80" : "text-slate-600")}>
          {description}
        </p>
      )}
      <div
        className={cn(
          "mt-6 h-1 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600",
          align === "center" ? "mx-auto w-24" : "w-24"
        )}
        aria-hidden
      />
    </div>
  );
}