import ArticleListCard from "@/components/articles/ArticleListCard";
import HeroCarousel from "@/components/shared/HeroCarusel";
import { getArticles } from "@/services/getArticles";

export const metadata = {
  title: "المقالات",
  description: "اكتشف أحدث المقالات والمحتوى التقني من خبراء إيراسوفت",
};

export default async function ArticlesPage() {
  const data = await getArticles();
  const articles = data?.data || [];

  return (
    <div className="bg-[#FAFAFA]">
      <HeroCarousel
        head="المقالات"
        description="اكتشف أحدث المقالات والمحتوى التقني من خبراء إيراسوفت"
      />
      <section className="px-5 sm:px-8 lg:px-13 py-10 sm:py-14" dir="rtl">
        <div className="grid grid-cols-12 gap-6">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleListCard key={article.id} article={article} />
            ))
          ) : (
            <div className="col-span-12 text-center py-20 text-[#7F7F7F] text-lg">
              لا توجد مقالات حالياً
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
