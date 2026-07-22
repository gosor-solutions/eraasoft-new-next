import JsonLd from "@/components/seo/JsonLd";
import { getPageBySlug } from "@/services/getPages";
import FreeCoursesClient from "./FreeCoursesClient";
import { getSettings } from "@/services/Settings";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "الرئيسية",
      item: "https://eraasoft.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "الدورات المجانية",
      item: "https://eraasoft.com/free-courses",
    },
  ],
};

export async function generateMetadata() {
  try {
    const res = await getPageBySlug("free-courses");
    const page = res?.data;
    return {
      title: page?.seo?.meta_title
        ? { absolute: page.seo.meta_title }
        : page?.title,
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
    return { title: "الدورات المجانية" };
  }
}

export default async function FreeCoursesPage() {
  let pageData = null;
  let settings = null;
  try {
    const [res, settingsRes] = await Promise.all([
      getPageBySlug("free-courses"),
      getSettings(),
    ]);
    pageData = res?.data || null;
    settings = settingsRes || null;
  } catch {}

  const discountPercent =
    settings?.site_info?.free_course_discount_percent ?? 30;

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <FreeCoursesClient
        pageData={pageData}
        discountPercent={discountPercent}
      />
    </>
  );
}
