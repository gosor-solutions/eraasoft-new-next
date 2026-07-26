import JsonLd from "@/components/seo/JsonLd";
import { getPageBySlug } from "@/services/getPages";
import { getLearningJourneys } from "@/services/LearningJourneys";
import JourneyClient from "./JourneyClient";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://eraasoft.com" },
    { "@type": "ListItem", position: 2, name: "الرحلة التعليمية", item: "https://eraasoft.com/journey" },
  ],
};

export async function generateMetadata() {
  try {
    const res = await getPageBySlug("journey");
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
    return { title: "الرحلة التعليمية" };
  }
}

export default async function JourneyPage() {
  let pageData = null;
  let stages = [];
  try {
    const [pageRes, journeysRes] = await Promise.all([
      getPageBySlug("journey"),
      getLearningJourneys()
    ]);
    pageData = pageRes?.data || null;
    stages = journeysRes?.success ? (journeysRes.data || []) : [];
  } catch {}

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <JourneyClient pageData={pageData} initialStages={stages} />
    </>
  );
}