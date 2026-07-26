import AboutCarousel from "@/components/aboutSection/AboutCarousel";
import AboutEraa from "@/components/aboutSection/AboutEraa";
import AboutSection from "@/components/aboutSection/AboutSection";
import Parteners from "@/components/partners/Parteners";
import HeroCarousel from "@/components/shared/HeroCarusel";
import JsonLd from "@/components/seo/JsonLd";
import CompanyTeam from "@/components/companyTean/CompanyTeam";
import { getHome } from "@/services/Home";
import { getPageBySlug } from "@/services/getPages";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://eraasoft.com" },
    { "@type": "ListItem", position: 2, name: "من نحن", item: "https://eraasoft.com/about" },
  ],
};

export async function generateMetadata() {
  try {
    const res = await getPageBySlug("about");
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
    return { title: "من نحن" };
  }
}

export default async function AboutPage() {
  let data = {};
  let pageData = null;
  try {
    const [homeData, pageRes] = await Promise.all([getHome(), getPageBySlug("about")]);
    data = homeData?.data || {};
    pageData = pageRes?.data || null;
  } catch {}
  const team = data?.team || [];

  return (
    <div className="bg-[#FAFAFA]">
      <JsonLd schema={breadcrumb} />
      <HeroCarousel head={pageData?.title || "من نحن"} description={pageData?.description || ""} image={pageData?.image || null} />
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
