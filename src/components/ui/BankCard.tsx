import { Landmark } from "lucide-react";
import CopyButton from "./CopyButton";
import type { BankAccount } from "@/lib/types";

// Premium bank-detail card — gold gradient frame, brand colors, copy buttons.
export default function BankCard({ account, compact = false }: { account: BankAccount; compact?: boolean }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-navy-800 p-6 ring-1 ring-gold-500/30 transition-all hover:shadow-[0_12px_40px_-12px_rgba(242,183,5,0.25)] hover:ring-gold-500/60">
      {/* gold corner glow */}
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-500/10 blur-2xl transition-opacity group-hover:opacity-150" />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-400 ring-1 ring-gold-500/30">
            <Landmark className="h-3.5 w-3.5" />
            {account.bank}
          </span>
          <CopyButton text={account.number} />
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cream-100/50">Account name</p>
        <p className="mt-0.5 text-sm font-semibold text-cream-50">{account.accountName}</p>

        <div className="mt-3 flex items-end justify-between gap-3 border-t border-navy-600/60 pt-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cream-100/50">Account number</p>
            <p className="mt-0.5 font-mono text-xl font-bold tracking-[0.14em] text-gold-400">{account.number}</p>
          </div>
          {!compact && account.note && <p className="max-w-[45%] text-right text-xs text-cream-100/60">{account.note}</p>}
        </div>
      </div>
    </div>
  );
}
