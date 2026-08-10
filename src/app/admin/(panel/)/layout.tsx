import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/admin-session";
import { loadData } from "@/lib/dataStore";
import AdminShell from "@/components/admin/AdminShell";

// Server-side auth gate for the whole admin panel (route group /admin/(panel)).
export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("adf_admin_session")?.value;
  const authed = await verifySessionToken(token);
  if (!authed) {
    redirect("/admin/login");
  }

  const data = await loadData();
  return <AdminShell orgName={data.general.orgName}>{children}</AdminShell>;
}

export const dynamic = "force-dynamic";