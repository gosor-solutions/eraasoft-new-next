import ArticleBanner from "@/components/articles/ArticleBanner";
import ArticleShare from "@/components/articles/ArticleShare";
import getArticleDetails from "@/services/getArticleDetails";
import { getArticles } from "@/services/getArticles";
import ArticleListCard from "@/components/articles/ArticleListCard";
import JsonLd from "@/components/seo/JsonLd";
import { Tag } from "lucide-react";
import { BASE_URL } from "@/lib/api";

export const dynamic = "force-dynamic";

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

  // Fetch related articles
  let relatedArticles = [];
  try {
    const categorySlug = article?.categories?.[0]?.slug;
    const articlesRes = await getArticles({
      category: categorySlug || undefined,
      per_page: 4,
    });
    relatedArticles = (articlesRes?.data || [])
      .filter((item) => item.id !== article?.id)
      .slice(0, 3);

    if (relatedArticles.length < 3) {
      const fallbackRes = await getArticles({ per_page: 6 });
      const fallbackList = (fallbackRes?.data || [])
        .filter(
          (item) =>
            item.id !== article?.id &&
            !relatedArticles.some((r) => r.id === item.id)
        );
      relatedArticles = [...relatedArticles, ...fallbackList].slice(0, 3);
    }
  } catch (err) {
    console.error("Failed to fetch related articles:", err);
  }

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

          {/* Social Share Section */}
          <div className="mb-8">
            <ArticleShare
              title={article?.title}
              description={article?.excerpt}
              variant="inline"
            />
          </div>

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

      {/* Related Articles Section */}
      {relatedArticles?.length > 0 && (
        <section className="bg-white py-12 px-5 sm:px-8 lg:px-13 border-t border-gray-100" dir="rtl">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">مقالات ذات صلة</h3>
            <div className="grid grid-cols-12 gap-6">
              {relatedArticles.map((item) => (
                <ArticleListCard key={item.id} article={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

