import ArticleBanner from "@/components/articles/ArticleBanner";
import getArticleDetails from "@/services/getArticleDetails";
import JsonLd from "@/components/seo/JsonLd";
import { Tag } from "lucide-react";
import { BASE_URL } from "@/lib/api";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${BASE_URL}/articles`);
    const data = await res.json();
    return (data?.data || [])?.map((article) => ({ slug: article.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const res = await getArticleDetails({ slug });
    const article = res?.data;
    return {
      title: article?.seo?.meta_title || article?.title,
      description: article?.seo?.meta_description || article?.excerpt,
      keywords: article?.seo?.keywords,
      robots: {
        index: article?.seo?.robots_index ?? true,
        follow: article?.seo?.robots_follow ?? true,
      },
      alternates: {
        canonical: article?.seo?.canonical_url || undefined,
      },
      openGraph: {
        title: article?.title,
        description: article?.excerpt,
        images: article?.image ? [{ url: article.image }] : [],
      },
    };
  } catch {
    return { title: "مقال" };
  }
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;
  const res = await getArticleDetails({ slug });
  const article = res?.data;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article?.title,
    description: article?.excerpt,
    image: article?.image,
    author: { "@type": "Person", name: article?.author },
    datePublished: article?.published_at,
    publisher: {
      "@type": "Organization",
      name: "إيراسوفت",
      url: "https://eraasoft.com",
    },
    url: `https://eraasoft.com/articles/${slug}`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://eraasoft.com" },
      { "@type": "ListItem", position: 2, name: "المقالات", item: "https://eraasoft.com/articles" },
      { "@type": "ListItem", position: 3, name: article?.title, item: `https://eraasoft.com/articles/${slug}` },
    ],
  };

  return (
    <>
      <JsonLd schema={articleSchema} />
      <JsonLd schema={breadcrumb} />

      {/* Banner */}
      <ArticleBanner article={article} />

      {/* Content */}
      <section className="bg-[#FAFAFA] py-10 sm:py-14 px-5 sm:px-8 lg:px-13" dir="rtl">
        <div className="max-w-4xl mx-auto">

          {/* Tags */}
          {article?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags?.map((tag) => (
                <span
                  key={tag?.id ?? tag}
                  className="flex items-center gap-1 text-xs sm:text-sm bg-[#2243A41A] text-(--primary-color) px-3 py-1.5 rounded-full font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {typeof tag === "string" ? tag : tag?.name}
                </span>
              ))}
            </div>
          )}

          {/* HTML content */}
          {article?.content && (
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}

        </div>
      </section>
    </>
  );
}
