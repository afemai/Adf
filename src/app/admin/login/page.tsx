import { ShieldCheck } from "lucide-react";
import LoginForm from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return { title: "Admin Login", robots: { index: false, follow: false } };
}

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy-900 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white p-8 shadow-2xl sm:p-10">
          <div className="text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo.jpeg"
              alt="Afemhai Descendant Forum logo"
              className="mx-auto h-20 w-20 rounded-full object-cover ring-4 ring-gold-500/50"
              width={80}
              height={80}
            />
            <h1 className="mt-5 font-display text-2xl font-semibold text-navy-900">Admin Panel</h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to manage the Afemhai Descendant Forum website.
            </p>
          </div>
          <LoginForm />
          <p className="mt-6 text-center text-[11px] leading-relaxed text-slate-400">
            Authorised personnel only. Unauthorized access attempts are logged and rate-limited.
          </p>
        </div>
      </div>
    </main>
  );
}