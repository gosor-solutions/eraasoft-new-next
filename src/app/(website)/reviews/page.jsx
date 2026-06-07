import ReviewsSections from "@/features/reviews/reviewsSections/ReviewsSections";
import JsonLd from "@/components/seo/JsonLd";
import HeroCarousel from "@/components/shared/HeroCarusel";
import { BASE_URL } from "@/lib/api";

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

export default async function ReviewsPage() {
  let testimonials = [];
  try {
    const res = await fetch(`${BASE_URL}/testimonials`);
    const data = await res.json();
    testimonials = data?.data || [];
  } catch {}

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <HeroCarousel head={"أراء طلابنا وتجاربهم مع إيراسوفت"} description={"نعتز بثقة طلابنا، ونسعى دائمًا لتقديم تجربة تعليمية مميزة تساهم في تطوير مهاراتهم وتحقيق أهدافهم المهنية."} />
      <ReviewsSections testimonials={testimonials} />
    </>
  );
}
