import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-8xl font-bold text-gold-500">4😟4</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-navy-900">This page wandered off the farm</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
        The page you are looking for does not exist or has been moved. Let&apos;s get you back to solid ground.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy-800 px-7 py-3.5 text-sm font-bold text-cream-50 transition-colors hover:bg-navy-700"
      >
        <Home className="h-4 w-4" aria-hidden />
        Back to Home
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </section>
  );
}