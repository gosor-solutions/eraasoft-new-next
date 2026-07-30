import Image from "next/image";
import { Star, Clock, BookOpen, Code2 } from "lucide-react";

export default function CourseBanner({ course }) {
  const fullStars = Math.round(course?.rating || 0);

  return (
    <div className="relative w-full overflow-hidden min-h-[60vh]" dir="rtl">
      <Image
        src={course?.background_image}
        alt={course?.title || "course banner"}
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex flex-col justify-center min-h-[60vh] px-5 sm:px-8 lg:px-13">
        <div className="flex flex-col max-w-3xl py-8">
          <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug mb-4">
            {course?.title}
          </h1>

          <p className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed mb-5 line-clamp-2 sm:line-clamp-3">
            {course?.description}
          </p>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap mb-5">
            <div className="flex gap-0.5">
              {[...Array(5)]?.map((_, i) => (
                <Star
                  key={i}
                  className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5"
                  fill={i < fullStars ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-white font-bold text-base sm:text-lg">
              {course?.rating}
            </span>
            <span className="text-gray-300 text-sm sm:text-base">
              ({course?.reviews_count} تقييم)
            </span>
          </div>

          <div className="inline-flex divide-x divide-x-reverse divide-white/30 bg-black/20 backdrop-blur-md rounded-4xl border border-white/20 overflow-hidden w-fit">
            <StatItem
              icon={<Clock className="w-4 h-4 sm:w-5 sm:h-5" />}
              label="مده الكورس"
              value={`${course?.weeks_number} أسبوع`}
            />
            <StatItem
              icon={<BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />}
              label="عدد الساعات"
              value={`+${course?.hours_number} ساعة`}
            />
            <StatItem
              icon={<Code2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              label="المشاريع العملية"
              value={`+${course?.course_projects_number} مشاريع عملية`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4">
      <div className="text-white/70 shrink-0">{icon}</div>
      <div className="text-right">
        <p className="text-white font-semibold text-xs sm:text-sm">{label}</p>
        <p className="text-gray-300 text-xs sm:text-sm">{value}</p>
      </div>
    </div>
  );
}
