import Image from "next/image";
import Link from "next/link";
import { Eye, User } from "lucide-react";

export default function ArticleListCard({ article }) {
  const date = article?.published_at ? new Date(article.published_at).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" }) : null;

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 min-[1400px]:col-span-3 border border-(--primary-color) rounded-xl">
      <div className="p-3 sm:p-4 rounded-xl bg-white h-full flex flex-col">
        {/* Image */}
        <div className="relative h-52 sm:h-60 rounded-xl overflow-hidden shrink-0">
          <Image src={article?.image} alt={article?.title} fill className="object-cover" />
          {date && (
            <div className="absolute top-3 left-3">
              <p className="bg-[#00000066] text-white rounded-3xl px-3 py-1.5 text-xs">{date}</p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 pt-4 pb-2" dir="rtl">
          <Link href={`/articles/${article.slug}`}>
            <h2 className="font-semibold text-base sm:text-lg lg:text-xl line-clamp-2 min-h-12 sm:min-h-14 mb-2 leading-snug text-[#0A0A0A]">{article?.title}</h2>
          </Link>

          <p className="text-[#7F7F7F] text-sm sm:text-base line-clamp-2 mb-4 leading-relaxed flex-1">{article?.excerpt}</p>

          {/* Author + Views */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-[#9CA3AF] mb-4">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 shrink-0" />
              {typeof article?.author === "string" ? article.author : article?.author?.name}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 shrink-0" />
              {article?.views ?? 0} مشاهدة
            </span>
          </div>

          <Link href={`/articles/${article?.slug}`} className="main_button block text-center text-sm sm:text-base py-3">
            قراءة المقال
          </Link>
        </div>
      </div>
    </div>
  );
}
