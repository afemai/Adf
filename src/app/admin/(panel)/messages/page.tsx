import { loadData } from "@/lib/dataStore";
import MessagesPanel from "@/components/admin/MessagesPanel";

export const dynamic = "force-dynamic";

export default async function MessagesAdminPage() {
  const data = await loadData();
  const messages = data.contact.messages ?? [];
  const unread = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-900">Messages</h1>
          <p className="mt-1 text-sm text-slate-500">
            {messages.length === 0
              ? "Contact-form submissions appear here."
              : `${messages.length} total · ${unread} unread`}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <MessagesPanel initialMessages={messages} />
      </div>
    </div>
  );
}