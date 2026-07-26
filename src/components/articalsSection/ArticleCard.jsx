import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({ title, excerpt, image, slug, isOpen, onHover }) {
  return (
    <div
      className={`flex overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-500 ease-in-out cursor-pointer h-64 ${isOpen ? "flex-[2.5]" : "flex-1"}`}
      onMouseEnter={onHover}>
      {/* Image */}
      <div className="relative shrink-0 w-80 h-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Text - only visible when open */}
      <div className={`flex-col justify-center px-5 py-4 transition-all duration-300 whitespace-nowrap ${isOpen ? "flex opacity-100 delay-200 w-full" : "hidden opacity-0 w-0"}`}>
        <Link href={`/articles/${slug}`} className="text-2xl font-bold text-gray-900 leading-snug mb-2 line-clamp-2 whitespace-normal hover:underline block">{title}</Link>
        <p className="text-xl font-semibold text-gray-500 leading-relaxed mb-4 line-clamp-3 whitespace-normal">{excerpt}</p>
        <Link href={`/articles/${slug}`} className="flex items-center gap-1 text-sm font-semibold  text-(--primary-color) w-fit hover:underline">
          مشاهدة المقال
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
