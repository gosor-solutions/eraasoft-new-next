import "keen-slider/keen-slider.min.css";
import "./globals.css";
import { cairo } from "@/lib/font";
import QueryProvider from "@/providers/QueryProvider";
import { getSettings, getMaintenance } from "@/services/Settings";
import Script from "next/script";
import JsonLd from "@/components/seo/JsonLd";
import MaintenancePage from "@/components/maintenance/MaintenancePage";

export async function generateMetadata() {
  const settings = await getSettings();

  if (!settings) {
    return {
      title: { default: "إيراسوفت", template: "%s | إيراسوفت" },
      description: "إيراسوفت - منصة تعليمية رائدة في الشرق الأوسط",
    };
  }

  return {
    metadataBase: new URL(settings.canonical_url ?? "https://eraasoft.com"),
    title: {
      default: settings.meta_title,
      template: `%s | ${settings.site_name}`,
    },
    description: settings.meta_description,
    keywords: settings.meta_keywords?.split(",").map((k) => k.trim()),
    openGraph: {
      type: "website",
      siteName: settings.site_name,
      title: settings.meta_title,
      description: settings.meta_description,
      images: [{ url: settings.og_image, width: 1200, height: 630, alt: settings.site_name }],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.meta_title,
      description: settings.meta_description,
      images: [settings.og_image],
    },
    icons: { icon: settings.site_favicon, shortcut: settings.site_favicon },
    alternates: { canonical: settings.canonical_url, languages: settings.hreflang_regions },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export default async function RootLayout({ children }) {
  const [settings, maintenance] = await Promise.all([getSettings(), getMaintenance()]);

  const gaId = settings?.google_analytics_id ?? null;
  const gtmId = settings?.google_tag_manager_id ?? null;

  const organizationSchema = settings
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: settings.site_name,
        url: settings.canonical_url,
        logo: { "@type": "ImageObject", url: settings.site_logo },
        email: settings.contact_email,
        telephone: settings.contact_phone,
        address: { "@type": "PostalAddress", addressLocality: settings.address, addressCountry: "EG" },
        sameAs: Object.values(settings.social_links ?? {}),
      }
    : null;

  const websiteSchema = settings
    ? {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: settings.site_name,
        url: settings.canonical_url,
        inLanguage: "ar",
        potentialAction: {
          "@type": "SearchAction",
          target: `${settings.canonical_url}/courses?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }
    : null;

  if (maintenance?.is_maintenance) {
    return (
      <html lang="ar" className={`${cairo.variable}`}>
        <body className={`${cairo.className}`}>
          <MaintenancePage settings={settings} message={maintenance.message} />
        </body>
      </html>
    );
  }

  return (
    <html lang="ar" className={`${cairo.variable}`}>
      <body className={`${cairo.className}`}>
        {gtmId && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
          </noscript>
        )}

        <QueryProvider>{children}</QueryProvider>

        {organizationSchema && <JsonLd schema={organizationSchema} />}
        {websiteSchema && <JsonLd schema={websiteSchema} />}

        {gtmId && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}

        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
