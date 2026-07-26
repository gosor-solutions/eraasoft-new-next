import ReviewsSections from "@/features/reviews/reviewsSections/ReviewsSections";
import JsonLd from "@/components/seo/JsonLd";
import HeroCarousel from "@/components/shared/HeroCarusel";
import { getTestimonials } from "@/services/Testimonials";
import { getPageBySlug } from "@/services/getPages";

// export const metadata = {
//   title: "آراء الطلاب",
//   description: "اقرأ آراء وتقييمات طلاب إيراسوفت وتعرّف على تجاربهم مع الدورات التدريبية.",
// };

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://eraasoft.com" },
    { "@type": "ListItem", position: 2, name: "آراء الطلاب", item: "https://eraasoft.com/reviews" },
  ],
};

export async function generateMetadata() {
  try {
    const res = await getPageBySlug("testimonials");
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
    return { title: "آراء الطلاب" };
  }
}

export default async function ReviewsPage({ searchParams }) {
  const { page = "1" } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  let testimonials = [];
  let meta = null;
  let pageData = null;
  try {
    const [result, pageRes] = await Promise.all([
      getTestimonials(currentPage),
      getPageBySlug("testimonials"),
    ]);
    testimonials = result?.data || [];
    meta = result?.meta || null;
    pageData = pageRes?.data || null;
  } catch { }

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <HeroCarousel
        head={pageData?.title || "أراء طلابنا وتجاربهم مع إيراسوفت"}
        description={
          pageData?.description ||
          "نعتز بثقة طلابنا، ونسعى دائمًا لتقديم تجربة تعليمية مميزة تساهم في تطوير مهاراتهم وتحقيق أهدافهم المهنية."
        }
        image={pageData?.image || null}
      />
      <ReviewsSections testimonials={testimonials} meta={meta} />
    </>
  );
}
