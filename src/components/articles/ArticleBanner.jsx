import Image from "next/image";
import { Calendar, User, Eye } from "lucide-react";

export default function ArticleBanner({ article }) {
  const date = article?.published_at
    ? new Date(article.published_at).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <div className="relative w-full min-h-[50vh] sm:min-h-[60vh] overflow-hidden" dir="rtl">
      <Image src={article?.image} alt={article?.title || "صورة المقال"} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex flex-col justify-center min-h-[50vh] sm:min-h-[60vh] px-5 sm:px-8 lg:px-13 py-12">
        <div className="max-w-3xl">

          {/* Category badges */}
          {article?.categories?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.categories.map((cat) => (
                <span key={cat.id} className="inline-block bg-(--primary-color) text-white text-xs sm:text-sm px-4 py-1.5 rounded-full">
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug mb-4">
            {article?.title}
          </h1>

          {/* Excerpt */}
          <p className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed mb-5 line-clamp-3">
            {article?.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-gray-300 text-xs sm:text-sm">
            {article?.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 shrink-0" />
                {typeof article.author === "string" ? article.author : article.author?.name}
              </span>
            )}
            {date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 shrink-0" />
                {date}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 shrink-0" />
              {article?.views ?? 0} مشاهدة
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
