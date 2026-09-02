import Image from "next/image";
import Link from "next/link";
import FadeInSection from "@/components/shared/FadeInSection";
import {
  formatWeeksCount,
  formatHoursCount,
  formatProjectsCount,
} from "@/lib/formatters";

export default function CourceCard({ course, delay = 0 }) {
  return (
    <FadeInSection
      delay={delay}
      className="col-span-12 md:col-span-6 lg:col-span-3 min-[1400px]:col-span-3 border border-(--primary-color) rounded-xl"
    >
      <div className="course_card p-3 sm:p-4 rounded-xl bg-white">
        <div className="image relative h-52 sm:h-64 md:h-72 lg:h-80 rounded-xl overflow-hidden">
          <Image src={course?.image} alt={course?.title || "صورة الكورس"} fill sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 25vw" className="object-cover object-center" />
          <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
            <p className="bg-[#00000056] text-white rounded-3xl px-3 py-2 text-xs sm:text-sm shadow-lg">{course?.category?.title}</p>
          </div>
        </div>

        <div className="pt-8 sm:pt-10 pb-3 sm:pb-5 relative">
          <div className="w-full flex justify-between absolute -top-5 sm:-top-7 bg-white shadow-lg px-2 sm:px-3 py-2 sm:py-3 rounded-2xl">
            <div className="flex items-center gap-1 sm:gap-2">
              <Image src="/tv_icon.png" alt="" width={24} height={24} className="w-4 h-4 sm:w-6 sm:h-6" />
              <p className="text-xs sm:text-sm whitespace-nowrap">
                {course?.weeks_number != null
                  ? formatWeeksCount(course.weeks_number)
                  : ""}
              </p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Image src="/clock_icon.png" alt="" width={24} height={24} className="w-4 h-4 sm:w-6 sm:h-6" />
              <p className="text-xs sm:text-sm whitespace-nowrap">
                {course?.hours_number != null
                  ? formatHoursCount(course.hours_number)
                  : ""}
              </p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Image src="/code_icon.png" alt="" width={24} height={24} className="w-4 h-4 sm:w-6 sm:h-6" />
              <p className="text-xs sm:text-sm">
                {course?.course_projects_number != null
                  ? formatProjectsCount(course.course_projects_number)
                  : ""}
              </p>
            </div>
          </div>

          {(course?.is_free || Number(course?.final_price) === 0 || !course?.final_price) && (
            <span className="inline-block bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3">
              مجاني
            </span>
          )}
          <Link
          dir="ltr"
            href={`/courses/${course?.slug}`}
            className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-[28px] max-h-6 sm:max-h-8 lg:max-h-10  line-clamp-2 leading-snug block after:absolute after:inset-0 after:z-10 course-card-title">
            {course?.title}
          </Link>

          {/* Description */}
          <p className="text-[#7F7F7F] text-sm sm:text-base md:text-[16px] line-clamp-2 mt-1">{course?.description}</p>

          {/* Price */}
          {!(course?.is_free || Number(course?.final_price) === 0 || !course?.final_price) ? (
            <p className="text-(--primary-color) text-2xl sm:text-3xl lg:text-[32px] font-bold mt-3 mb-6">{course?.final_price} ج.م</p>
          ) : (
            <div className="my-6 h-[48px] flex items-center"></div>
          )}

          {/* Actions */}
          <div className="flex gap-2 sm:gap-3">
            <Link href={`/booking/${course?.slug}`} className="main_button p-[1px] booking-btn grow cursor-pointer text-sm sm:text-base py-2 relative z-20">
              اشترك الآن
            </Link>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
