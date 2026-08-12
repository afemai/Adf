import { loadData } from "@/lib/dataStore";
import ContentEditor, { type SectionDef } from "@/components/admin/ContentEditor";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

export const dynamic = "force-dynamic";

const SECTIONS: SectionDef[] = [
  {
    title: "Site behaviour",
    path: "settings",
    fields: [
      { key: "maintenanceMode", label: "Maintenance mode", help: "Shows a 'site under maintenance' page to visitors", type: "toggle" },
      { key: "allowContactForm", label: "Accept contact messages", help: "Turn off to stop the contact form from submitting", type: "toggle" },
    ],
  },
];

export default async function SettingsAdminPage() {
  const data = await loadData();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Behaviour toggles and the admin password.</p>
      </div>
      <ContentEditor sections={SECTIONS} initialData={data} />
      <section className="max-w-2xl rounded-3xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-5 border-b border-navy-100 pb-4">
          <h2 className="font-display text-xl font-semibold text-navy-900">Change admin password</h2>
          <p className="mt-1 text-sm text-slate-500">Use a strong password you haven&apos;t used elsewhere. You&apos;ll need it to sign in next time.</p>
        </div>
        <ChangePasswordForm />
      </section>
    </div>
  );
}