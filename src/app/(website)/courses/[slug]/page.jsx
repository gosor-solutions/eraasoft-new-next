import CourceInfo from "@/components/courceInfo/CourceInfo";
import CourceContent from "@/components/courceInfo/CourceContent";
import CourseBanner from "@/components/courceInfo/CourseBanner";
import getCourceDetails from "@/services/CourceDetails";
import Features from "@/components/featuresSection/Features";
import TestimonialsCarousel from "@/components/sliders/TestimonialsCarousel";
import EraaCertificate from "@/components/eraaCertificate/EraaCertificate";
import RelatedCources from "@/components/courceInfo/RelatedCources";
import StudentProjectsCarusel from "@/components/studensProjects/StudentProjectsCarusel";
import JsonLd from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/api";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${BASE_URL}/courses`);
    const data = await res.json();
    return (data?.data || []).map((course) => ({ slug: course.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const slug = await params;
    const cource = await getCourceDetails(slug);
    const details = cource?.data;
    return {
      title: details?.title,
      description: details?.description,
      keywords: details?.category?.title ? [details.category.title, "كورسات", "إيراسوفت"] : undefined,
      robots: { index: true, follow: true },
      alternates: { canonical: `https://eraasoft.com/courses/${slug.slug}` },
      openGraph: {
        title: details?.title,
        description: details?.description,
        images: details?.image ? [{ url: details.image, width: 1200, height: 630, alt: details.title }] : [],
      },
    };
  } catch {
    return { title: "تفاصيل الدورة" };
  }
}

export default async function CourseDetailPage({ params }) {
  const slug = await params;
  const [cource, testimonialsRes] = await Promise.all([
    getCourceDetails(slug),
    fetch(`${BASE_URL}/testimonials`)
      .then((r) => r.json())
      .catch(() => ({ data: [] })),
  ]);
  const courceDetails = cource.data;
  const testimonials = testimonialsRes?.data || [];

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: courceDetails?.title,
    description: courceDetails?.description,
    url: `https://eraasoft.com/courses/${slug.slug}`,
    image: courceDetails?.image,
    provider: {
      "@type": "Organization",
      name: "إيراسوفت",
      url: "https://eraasoft.com",
    },
    offers: courceDetails?.final_price
      ? {
          "@type": "Offer",
          price: courceDetails.final_price,
          priceCurrency: "EGP",
          availability: "https://schema.org/InStock",
          url: `https://eraasoft.com/courses/${slug.slug}`,
        }
      : undefined,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      inLanguage: "ar",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://eraasoft.com" },
      { "@type": "ListItem", position: 2, name: "الدورات", item: "https://eraasoft.com/courses" },
      { "@type": "ListItem", position: 3, name: courceDetails?.title, item: `https://eraasoft.com/courses/${slug.slug}` },
    ],
  };

  return (
    <>
      <JsonLd schema={courseSchema} />
      <JsonLd schema={breadcrumb} />
      <CourseBanner course={courceDetails} />
      <section dir="rtl" className="px-5 lg:px-13 py-5 bg-[#FAFAFA]">
        <CourceInfo course={courceDetails} />
        <CourceContent content={courceDetails?.content} />
        <StudentProjectsCarusel courceVideos={courceDetails?.projects_videos} />
        {/* <Features /> */}
      </section>
      <section className="py-5 bg-[#FAFAFA]">
        <TestimonialsCarousel testimonials={testimonials} />
        <EraaCertificate />
        <RelatedCources relatedCources={courceDetails?.related_courses} />
      </section>
    </>
  );
}
