import HeroCarousel from "@/components/shared/HeroCarusel";
import CourcesSection from "@/features/courses/courcesSection/CourcesSection";
import JsonLd from "@/components/seo/JsonLd";
import { getAllCources } from "@/services/Cources";

export const metadata = {
  title: "الدورات",
  description: "استعرض جميع دورات إيراسوفت في البرمجة والذكاء الاصطناعي والتصميم وطور مهاراتك مع أفضل المدربين.",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://eraasoft.com" },
    { "@type": "ListItem", position: 2, name: "الدورات", item: "https://eraasoft.com/courses" },
  ],
};

export default async function CoursesPage() {
  let courses = [];
  try {
    courses = (await getAllCources()) || [];
  } catch {}

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <HeroCarousel
        head={"ابدأ رحلتك نحو الاحتراف"}
        description={"سواء كنت في بداية طريقك أو تسعى لتطوير مهاراتك، توفر لك إيراسوفت محتوى تعليمي عالي الجودة يعتمد على التطبيق العملي ويمنحك الأدوات التي تحتاجها للتميز في مجالك."}
      />
      <CourcesSection courses={courses} />
    </>
  );
}
