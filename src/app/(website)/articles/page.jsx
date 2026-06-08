import ArticleListCard from "@/components/articles/ArticleListCard";
import HeroCarousel from "@/components/shared/HeroCarusel";
import Pagination from "@/components/shared/Pagination";
import EmptyState from "@/components/shared/EmptyState";
import { getArticles } from "@/services/getArticles";

export const metadata = {
  title: "المقالات",
  description: "اكتشف أحدث المقالات والمحتوى التقني من خبراء إيراسوفت",
};

export default async function ArticlesPage({ searchParams }) {
  const { page = "1" } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  const data = await getArticles(currentPage);
  const articles = data?.data || [];
  const meta = data?.meta || null;

  return (
    <div className="bg-[#FAFAFA]">
      <HeroCarousel
        head="المقالات"
        description="اكتشف أحدث المقالات والمحتوى التقني من خبراء إيراسوفت"
      />
      <section className="px-5 sm:px-8 lg:px-13 py-10 sm:py-14" dir="rtl">
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
