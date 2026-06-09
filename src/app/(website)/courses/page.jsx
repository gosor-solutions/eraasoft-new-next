import HeroCarousel from "@/components/shared/HeroCarusel";
import CourcesSection from "@/features/courses/courcesSection/CourcesSection";
import JsonLd from "@/components/seo/JsonLd";
import { getAllCources } from "@/services/Cources";
import { getPageBySlug } from "@/services/getPages";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://eraasoft.com" },
    { "@type": "ListItem", position: 2, name: "الكورسات", item: "https://eraasoft.com/courses" },
  ],
};

export async function generateMetadata() {
  try {
    const res = await getPageBySlug("courses");
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
    return { title: "الكورسات" };
  }
}

export default async function CoursesPage({ searchParams }) {
  const { page = "1" } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  let courses = [];
  let meta = null;
  let pageData = null;
  try {
    const [result, pageRes] = await Promise.all([getAllCources(currentPage), getPageBySlug("courses")]);
    courses = result?.data || [];
    meta = result?.meta || null;
    pageData = pageRes?.data || null;
  } catch {}

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <HeroCarousel
        head={pageData?.title || "الكورسات"}
        description={pageData?.description || ""}
        image={pageData?.image || null}
      />
      <CourcesSection courses={courses} meta={meta} />
    </>
  );
}
