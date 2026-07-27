import ContactPageSection from "@/components/contactSection/ContactPageSection";
import HeroCarousel from "@/components/shared/HeroCarusel";
import JsonLd from "@/components/seo/JsonLd";
import { getPageBySlug } from "@/services/getPages";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://eraasoft.com" },
    { "@type": "ListItem", position: 2, name: "تواصل معنا", item: "https://eraasoft.com/contact" },
  ],
};

export async function generateMetadata() {
  try {
    const res = await getPageBySlug("contact");
    const page = res?.data;
    return {
      title: page?.seo?.meta_title ? { absolute: page.seo.meta_title } : page?.title,
      description: page?.seo?.meta_description || page?.description,
      keywords: page?.seo?.meta_keywords,
      robots: {
        index: page?.seo?.robots_index ?? true,
        follow: page?.seo?.robots_follow ?? true,
      },
      alternates: { canonical: page?.seo?.canonical_url || undefined },
      openGraph: {
        title: page?.seo?.og_title || page?.title,
        description: page?.seo?.og_description || page?.description,
        images: page?.seo?.og_image ? [{ url: page.seo.og_image }] : [],
      },
    };
  } catch {
    return { title: "تواصل معنا" };
  }
}

export default async function ContactPage() {
  let pageData = null;
  try {
    const res = await getPageBySlug("contact");
    pageData = res?.data || null;
  } catch {}

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <HeroCarousel
        head={pageData?.title || "تواصل معنا"}
        description={pageData?.description || ""}
        image={pageData?.image || null}
      />
      <ContactPageSection />
    </>
  );
}
