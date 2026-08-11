import { FacebookIcon, InstagramIcon, XIcon } from "@/components/ui/SocialIcons";
import type { Socials } from "@/lib/types";

// Shown instead of the site while settings.maintenanceMode is on.
export default function MaintenanceScreen({ orgName, logo, socials }: { orgName: string; logo?: string; socials?: Socials }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-navy-900 px-6 text-center">
      <div className="rounded-full bg-gold-500/15 p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo || "/brand/logo.jpeg"} alt="" width={88} height={88} className="rounded-full" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-semibold text-white sm:text-4xl">{orgName}</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-100/80">
        We are carrying out a brief upgrade. The website will be back shortly — thank you for your
        patience.
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gold-400">Unity is Power</p>
      <div className="mt-8 flex gap-3">
        {/^https?:\/\/.+/.test(socials?.facebook || "") && (
          <a href={socials?.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-gold-500 hover:text-navy-900">
            <FacebookIcon className="h-5 w-5" />
          </a>
        )}
        {/^https?:\/\/.+/.test(socials?.instagram || "") && (
          <a href={socials?.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-gold-500 hover:text-navy-900">
            <InstagramIcon className="h-5 w-5" />
          </a>
        )}
        {/^https?:\/\/.+/.test(socials?.twitter || "") && (
          <a href={socials?.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-gold-500 hover:text-navy-900">
            <XIcon className="h-5 w-5" />
          </a>
        )}
      </div>
    </main>
  );
}