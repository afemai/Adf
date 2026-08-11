import { loadPublicData } from "@/lib/dataStore";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import SeasonalDecorations from "@/components/layout/SeasonalDecorations";
import MaintenanceScreen from "@/components/layout/MaintenanceScreen";

// Public site chrome (route group /(site)). Also the maintenance-mode guard.
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const data = await loadPublicData();

  if (data.settings.maintenanceMode) {
    return <MaintenanceScreen orgName={data.general.orgName} logo={data.general.logo} socials={data.general.socials} />;
  }

  return (
    <>
      <Navbar orgName={data.general.orgName} logo={data.general.logo} announcement={data.homepage.announcement} seasonalMode={data.settings.seasonal.mode} />
      <main className="flex-1">{children}</main>
      <Footer general={data.general} seasonalMode={data.settings.seasonal.mode} />
      <WhatsAppButton phone={data.general.socials.whatsapp || data.general.phones[0] || ""} />
      <SeasonalDecorations seasonal={data.settings.seasonal} />
    </>
  );
}