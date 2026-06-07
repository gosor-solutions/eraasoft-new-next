import ContactPageSection from "@/components/contactSection/ContactPageSection";
import HeroCarousel from "@/components/shared/HeroCarusel";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "تواصل معنا",
  description: "تواصل مع فريق إيراسوفت للإجابة على جميع استفساراتك ومساعدتك في اختيار المسار الصحيح.",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://eraasoft.com" },
    { "@type": "ListItem", position: 2, name: "تواصل معنا", item: "https://eraasoft.com/contact" },
  ],
};

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={breadcrumb} />
      <HeroCarousel head={"أبدا تواصلك معنا اليوم"} description={"فريق إيراسوفت جاهز لدعمك والإجابة على جميع استفساراتك لمساعدتك في اتخاذ الخطوة القادمة بثقة."} />
      <ContactPageSection />
    </>
  );
}
