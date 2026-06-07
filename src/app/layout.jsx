import "keen-slider/keen-slider.min.css";
import "./globals.css";
import { cairo } from "@/lib/font";
import QueryProvider from "@/providers/QueryProvider";
import { getSettings } from "@/services/Settings";
import Script from "next/script";
import JsonLd from "@/components/seo/JsonLd";

export async function generateMetadata() {
  try {
    const settings = await getSettings();

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
        images: [
          {
            url: settings.og_image,
            width: 1200,
            height: 630,
            alt: settings.site_name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: settings.meta_title,
        description: settings.meta_description,
        images: [settings.og_image],
      },
      icons: {
        icon: settings.site_favicon,
        shortcut: settings.site_favicon,
      },
      alternates: {
        canonical: settings.canonical_url,
        languages: settings.hreflang_regions,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch {
    return {
      title: {
        default: "إيراسوفت",
        template: "%s | إيراسوفت",
      },
      description: "إيراسوفت - منصة تعليمية رائدة في الشرق الأوسط",
    };
  }
}

export default async function RootLayout({ children }) {
  let gaId = null;
  let organizationSchema = null;
  let websiteSchema = null;

  try {
    const settings = await getSettings();
    gaId = settings.google_analytics_id;

    organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: settings.site_name,
      url: settings.canonical_url,
      logo: {
        "@type": "ImageObject",
        url: settings.site_logo,
      },
      email: settings.contact_email,
      telephone: settings.contact_phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: settings.address,
        addressCountry: "EG",
      },
      sameAs: Object.values(settings.social_links ?? {}),
    };

    websiteSchema = {
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
    };
  } catch {
    // settings unavailable
  }

  return (
    <html lang="ar" className={`${cairo.variable}`}>
      <body className={`${cairo.className}`}>
        <QueryProvider>{children}</QueryProvider>

        {organizationSchema && <JsonLd schema={organizationSchema} />}
        {websiteSchema && <JsonLd schema={websiteSchema} />}

        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
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
