"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Clock,
  BookOpen,
  ListChecks,
  Play,
  ArrowLeft,
  ChevronLeft,
} from "lucide-react";
import VideoModal from "./VideoModal";

export default function CourseBanner({ course }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const price = course?.final_price || course?.price || "15,000";
  const originalPrice = course?.price;
  const hasDiscount = originalPrice && Number(originalPrice) > Number(price);
  const discountPercent = hasDiscount
    ? Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100)
    : 20;

  const durationWeeks = course?.weeks_number || 12;
  const durationMonths = Math.max(1, Math.round(durationWeeks / 4));
  const totalHours = course?.hours_number || 120;
  const practicalHours = course?.practical_hours || Math.round(totalHours * 0.6) || 75;

  return (
    <section className="relative bg-[#070D24] text-white pt-6 pb-10 sm:pb-12" dir="rtl">
      {/* Background ambient lighting glows contained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-12 left-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-13 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 mb-8 sm:mb-12">
          <Link href="/" className="hover:text-white transition-colors">
            الرئيسية
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/courses" className="hover:text-white transition-colors">
            الدورات
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#FBBF24] font-medium truncate max-w-[200px] sm:max-w-none">
            {course?.category?.title ? `${course.category.title} ` : "دبلومة "}
            {course?.title}
          </span>
        </nav>

        {/* Hero Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Right Column: Course Info (in RTL) */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            {/* Discount Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold mb-5 shadow-sm">
              <span>خصم {discountPercent}%</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight sm:leading-snug mb-5 text-white">
              ابدأ رحلتك نحو الاحتراف في{" "}
              <span className="text-white block sm:inline">
                {course?.title || "UI/UX Design"}
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-2xl">
              {course?.description ||
                "ابدأ رحلتك من أساسيات تجربة المستخدم، وتعلّم كيفية تحليل المشكلات، وإجراء أبحاث المستخدم، وتصميم Wireframes و User Flow، ثم انتقل إلى تصميم واجهات احترافية باستخدام Figma، وبناء Portfolio قوي يبرز مهاراتك ويؤهلك للحصول على أول فرصة عمل."}
            </p>

            {/* Rating / Social Proof */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-slate-300 font-medium">
                موثق من اكثر من {course?.reviews_count || 1000} طالب
              </span>
            </div>

            {/* Price Box */}
            <div className="mb-8">
              <div className="inline-flex items-baseline gap-2 bg-gradient-to-r from-blue-950/80 to-slate-900/90 border border-blue-500/20 px-5 py-3 rounded-2xl">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FBBF24]">
                  {price}
                </span>
                <span className="text-sm sm:text-base text-slate-300 font-semibold">
                  جنيه مصري
                </span>
                {hasDiscount && (
                  <span className="text-xs sm:text-sm text-slate-400 line-through mr-2">
                    {originalPrice} ج.م
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 flex-wrap w-full sm:w-auto">
              <Link
                href={`/booking/${course?.slug}`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                ابدأ التعلم الآن
              </Link>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 border border-blue-500/30 text-white font-bold text-sm sm:text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>الفيديو التعريفي</span>
                <ArrowLeft className="w-4 h-4 text-blue-300" />
              </button>
            </div>
          </div>

          {/* Left Column: Graphic / Course Image (in RTL) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-lg aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-tr from-blue-900/40 via-indigo-900/30 to-purple-900/20 border border-blue-500/20 shadow-2xl p-3 sm:p-4 group">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                {course?.image || course?.background_image ? (
                  <Image
                    src={course?.image || course?.background_image}
                    alt={course?.title || "دورة تعليمية"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/80 text-slate-400 p-6 text-center">
                    <BookOpen className="w-16 h-16 text-blue-400/60 mb-3" />
                    <p className="font-semibold text-white">{course?.title}</p>
                  </div>
                )}
                {/* Play icon overlay button */}
                {course?.video_preview_link && (
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer border border-white/30 backdrop-blur-sm"
                    aria-label="مشاهدة الفيديو التعريفي"
                  >
                    <Play className="w-7 h-7 fill-white translate-x-[-1px]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating 3-card stats bar overlapping bottom */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-13 relative z-20 mt-12 sm:mt-16 -mb-20 sm:-mb-24 lg:-mb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Requirements */}
          <div className="bg-white text-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06)] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-medium text-slate-400 mb-1">
                المتطلبات
              </span>
              <span className="text-base sm:text-lg font-bold text-[#0B1527] mb-0.5">
                بدون خبرة سابقة
              </span>
              <span className="text-xs sm:text-sm text-slate-500">
                مناسب للمبتدئين
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
              <ListChecks className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Duration */}
          <div className="bg-white text-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06)] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-medium text-slate-400 mb-1">
                المدة
              </span>
              <span className="text-base sm:text-lg font-bold text-[#0B1527] mb-0.5">
                {durationMonths} شهور
              </span>
              <span className="text-xs sm:text-sm text-slate-500">
                {totalHours} ساعة شرح
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Practical Application */}
          <div className="bg-white text-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06)] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-medium text-slate-400 mb-1">
                التطبيق العملي
              </span>
              <span className="text-base sm:text-lg font-bold text-[#0B1527] mb-0.5">
                {practicalHours} ساعة
              </span>
              <span className="text-xs sm:text-sm text-slate-500">
                تطبيق عملي مع متخصص
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Preview */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={course?.video_preview_link}
        course={course}
      />
    </section>
  );
}
