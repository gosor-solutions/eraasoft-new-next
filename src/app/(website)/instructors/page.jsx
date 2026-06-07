import InstructorSection from "@/features/instructors/InstructorSection";
import JsonLd from "@/components/seo/JsonLd";
import HeroCarousel from "@/components/shared/HeroCarusel";
import { BASE_URL } from "@/lib/api";

export const metadata = {
  title: "المدربون",
  description: "تعرف على نخبة مدربي إيراسوفت من المتخصصين ذوي الخبرة العملية في مجالات البرمجة والتقنية.",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://eraasoft.com" },
    { "@type": "ListItem", position: 2, name: "المدربون", item: "https://eraasoft.com/instructors" },
  ],
};

export default async function InstructorsPage() {
  let team = [];
  try {
    const res = await fetch(`${BASE_URL}/team`);
    const data = await res.json();
    team = data?.data || [];
  } catch {}

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <HeroCarousel
        head={"مدربون يصنعون الفارق في رحلتك التعليمية"}
        description={"نختار مدربينا بعناية ليكونوا أكثر من مجرد مقدّمي محتوى، بل مرشدين يشاركونك خبراتهم العملية ويساعدونك على تحقيق تقدم ملموس في مسارك المهني."}
      />
      <InstructorSection team={team} />
    </>
  );
}
