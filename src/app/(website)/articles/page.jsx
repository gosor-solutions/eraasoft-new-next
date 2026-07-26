import ArticleListCard from "@/components/articles/ArticleListCard";
import ArticleFilterBar from "@/components/articles/ArticleFilterBar";
import HeroCarousel from "@/components/shared/HeroCarusel";
import Pagination from "@/components/shared/Pagination";
import EmptyState from "@/components/shared/EmptyState";
import { getArticles } from "@/services/getArticles";
import { getPageBySlug } from "@/services/getPages";

export async function generateMetadata() {
  try {
    const res = await getPageBySlug("articles");
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
    return { title: "المقالات" };
  }
}

export default async function ArticlesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const { page = "1", search, category, tag, per_page } = resolvedSearchParams || {};
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  let articles = [];
  let meta = null;
  let pageData = null;

  try {
    const [data, pageRes] = await Promise.all([
      getArticles({
        page: currentPage,
        search,
        category,
        tag,
        per_page,
      }),
      getPageBySlug("articles"),
    ]);
    articles = data?.data || [];
    meta = data?.meta || null;
    pageData = pageRes?.data || null;
  } catch {}

  return (
    <div className="bg-[#FAFAFA]">
      <HeroCarousel
        head={pageData?.title || "المقالات"}
        description={pageData?.description || ""}
        image={pageData?.image || null}
      />
      <section className="px-5 sm:px-8 lg:px-13 py-10 sm:py-14" dir="rtl">
        <ArticleFilterBar />

        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-12 gap-6">
              {articles.map((article) => (
                <ArticleListCard key={article.id} article={article} />
              ))}
            </div>
            <Pagination currentPage={meta?.current_page ?? 1} lastPage={meta?.last_page ?? 1} />
          </>
        ) : (
          <EmptyState title="لا توجد مقالات حالياً" />
        )}
      </section>
    </div>
  );
}
