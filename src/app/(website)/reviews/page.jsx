import ReviewsSections from "@/features/reviews/reviewsSections/ReviewsSections";
import JsonLd from "@/components/seo/JsonLd";
import HeroCarousel from "@/components/shared/HeroCarusel";
import { getTestimonials } from "@/services/Testimonials";

export const metadata = {
  title: "آراء الطلاب",
  description: "اقرأ آراء وتقييمات طلاب إيراسوفت وتعرّف على تجاربهم مع الدورات التدريبية.",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://eraasoft.com" },
    { "@type": "ListItem", position: 2, name: "آراء الطلاب", item: "https://eraasoft.com/reviews" },
  ],
};

export default async function ReviewsPage({ searchParams }) {
  const { page = "1" } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  let testimonials = [];
  let meta = null;
  try {
    const result = await getTestimonials(currentPage);
    testimonials = result?.data || [];
    meta = result?.meta || null;
  } catch {}

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <HeroCarousel head={"أراء طلابنا وتجاربهم مع إيراسوفت"} description={"نعتز بثقة طلابنا، ونسعى دائمًا لتقديم تجربة تعليمية مميزة تساهم في تطوير مهاراتهم وتحقيق أهدافهم المهنية."} />
      <ReviewsSections testimonials={testimonials} meta={meta} />
    </>
  );
}
