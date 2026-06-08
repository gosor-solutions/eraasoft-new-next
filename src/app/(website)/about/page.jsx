import AboutCarousel from "@/components/aboutSection/AboutCarousel";
import AboutEraa from "@/components/aboutSection/AboutEraa";
import AboutSection from "@/components/aboutSection/AboutSection";
import Parteners from "@/components/partners/Parteners";
import HeroCarousel from "@/components/shared/HeroCarusel";
import JsonLd from "@/components/seo/JsonLd";
import CompanyTeam from "@/components/companyTean/CompanyTeam";
import { getHome } from "@/services/Home";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://eraasoft.com" },
    { "@type": "ListItem", position: 2, name: "من نحن", item: "https://eraasoft.com/about" },
  ],
};

export const metadata = {
  title: "من نحن",
  description: "تعرف على إيراسوفت — شركة متخصصة في تقديم الحلول البرمجية المتقدمة والتدريب التقني الاحترافي.",
};

export default async function AboutPage() {
  let data = {};
  try {
    const homeData = await getHome();
    data = homeData?.data || {};
  } catch {}
  const team = data?.team || [];

  return (
    <div className="bg-[#FAFAFA]">
      <JsonLd schema={breadcrumb} />
      <HeroCarousel
        head={"من نحن"}
        description={"إيراسوفت منصة تعليمية وتقنية تهدف إلى تمكين الأفراد من اكتساب مهارات عملية تواكب متطلبات سوق العمل، من خلال محتوى تدريبي متطور وحلول رقمية مبتكرة."}
      />
      <AboutSection />
      <div className="my-4 p-8 md:py-0 md:px-15">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-5">
            <AboutCarousel />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <AboutEraa />
          </div>
        </div>
      </div>
      <CompanyTeam employees={team} />
      <Parteners />
    </div>
  );
}
