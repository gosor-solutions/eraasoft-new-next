import Footer from "@/components/layouts/Footer/Footer";
import Navbar from "@/components/layouts/Navbar/Navbar";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { getSettings } from "@/services/Settings";

export default async function WebsiteLayout({ children }) {
  const settings = await getSettings();

  return (
    <>
      <Navbar logo={settings?.site_logo ?? null} contactPhone={settings?.contact_phone ?? null} />
      {children}
      <Footer settings={settings} />
      <ScrollToTop contactPhone={settings?.contact_phone ?? null} />
    </>
  );
}
