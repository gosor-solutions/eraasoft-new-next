import { getPageBySlug, getPages } from "@/services/getPages";
import JsonLd from "@/components/seo/JsonLd";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const res = await getPages();
    return (res?.data || []).map((page) => ({ slug: page.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const res = await getPageBySlug(slug);
    const page = res?.data;
    return {
      title: page?.seo?.meta_title || page?.title,
      description: page?.seo?.meta_description || page?.description,
      keywords: page?.seo?.meta_keywords,
      robots: {
        index: page?.seo?.robots_index ?? true,
        follow: page?.seo?.robots_follow ?? true,
      },
      alternates: {
        canonical: page?.seo?.canonical_url || undefined,
      },
      openGraph: {
        title: page?.seo?.og_title || page?.title,
        description: page?.seo?.og_description || page?.description,
        images: page?.seo?.og_image ? [{ url: page.seo.og_image }] : [],
      },
    };
  } catch {
    return { title: "الصفحة" };
  }
}

export default async function PageDetailPage({ params }) {
  const { slug } = await params;
  const res = await getPageBySlug(slug);
  const page = res?.data;

  if (!page) notFound();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://eraasoft.com" },
      { "@type": "ListItem", position: 2, name: page.title, item: `https://eraasoft.com/pages/${slug}` },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumb} />

      <section className="bg-[#FAFAFA] py-10 sm:py-14 px-5 sm:px-8 lg:px-13" dir="rtl">
        <div className="max-w-4xl mx-auto">
          {page.image && (
            <img
              src={page.image}
              alt={page.title}
              className="w-full rounded-xl mb-8 object-cover max-h-80"
            />
          )}

          <h1 className="text-2xl sm:text-3xl font-bold text-(--primary-color) mb-4">
            {page.title}
          </h1>

          {page.description && (
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              {page.description}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
