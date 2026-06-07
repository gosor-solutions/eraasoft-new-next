import Image from "next/image";
import Link from "next/link";

export default function MobileArticleCard({ title, excerpt, image, slug }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
      <div className="relative w-full h-40 sm:h-48">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed">
          {excerpt}
        </p>
        <Link
          href={`/articles/${slug}`}
          className="flex items-center gap-1 text-xs sm:text-sm text-(--primary-color) font-semibold w-fit hover:underline"
        >
          مشاهدة المقال
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
