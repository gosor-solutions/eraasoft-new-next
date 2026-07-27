import InstructorSection from "@/features/instructors/InstructorSection";
import JsonLd from "@/components/seo/JsonLd";
import HeroCarousel from "@/components/shared/HeroCarusel";
import { BASE_URL } from "@/lib/api";
import { getPageBySlug } from "@/services/getPages";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://eraasoft.com" },
    { "@type": "ListItem", position: 2, name: "المدربون", item: "https://eraasoft.com/instructors" },
  ],
};

export async function generateMetadata() {
  try {
    const res = await getPageBySlug("team");
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
    return { title: "المدربون" };
  }
}

export default async function InstructorsPage() {
  let team = [];
  let pageData = null;
  try {
    const [teamRes, pageRes] = await Promise.all([
      fetch(`${BASE_URL}/team`).then((r) => r.json()),
      getPageBySlug("team"),
    ]);
    team = teamRes?.data || [];
    pageData = pageRes?.data || null;
  } catch {}

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <HeroCarousel
        head={pageData?.title || "المدربون"}
        description={pageData?.description || ""}
        image={pageData?.image || null}
      />
      <InstructorSection team={team} />
    </>
  );
}
