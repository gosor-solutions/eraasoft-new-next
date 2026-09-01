"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Play, ArrowLeft, Clock, BookOpen, Trophy } from "lucide-react";
import { getVideoEmbedUrl } from "@/services/getVideoEmbedUrl";

export default function VideoModal({ isOpen, onClose, videoUrl, course }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      setIsPlaying(false);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const embedUrl = videoUrl ? getVideoEmbedUrl(videoUrl) : null;
  const courseTitle = course?.title || "UI/UX";
  const durationWeeks = course?.weeks_number || 16;
  const durationMonths = Math.max(1, Math.round(durationWeeks / 4));
  const totalHours = course?.hours_number || 40;
  const studentsCount = course?.reviews_count ? `+${course.reviews_count}` : "+500";

  const handleBrowseContent = () => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById("course-content");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm transition-opacity overflow-hidden"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl sm:max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl my-auto border border-gray-100 animate-in fade-in zoom-in-95 duration-200 max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Modal Header */}
        <div className="shrink-0 flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-gray-100 bg-white">
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-[#0B1527] font-bold text-sm sm:text-base">
            الفيديو التعريفي — مسار {courseTitle}
          </h3>
        </div>

        {/* Video Player / Thumbnail Area */}
        <div className="relative aspect-video w-full shrink-0 bg-slate-950 overflow-hidden group">
          {isPlaying && embedUrl ? (
            <iframe
              src={`${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
              {course?.image || course?.background_image ? (
                <Image
                  src={course?.image || course?.background_image}
                  alt={courseTitle}
                  fill
                  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-slate-900" />
              )}
              <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 group-hover:bg-white text-slate-900 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-slate-900 text-slate-900 translate-x-[-2px]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Info Body */}
        <div className="p-5 sm:p-7 flex flex-col items-start text-right overflow-y-auto flex-1">
          {/* Track Tag */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs sm:text-sm font-bold mb-3 border border-amber-200/60">
            <span>🎯</span>
            <span>مسار تعليمي متكامل — {courseTitle} Track</span>
          </div>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0B1527] mb-2">
            ابدأ رحلتك نحو الاحتراف في {courseTitle}
          </h2>

          {/* Description */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
            {course?.description ||
              `رحلة تعليمية متكاملة تبدأ من أساسيات ${courseTitle} وحتى تصميم منتجات رقمية احترافية، من خلال محتوى منظم، تطبيقات عملية، ومشاريع حقيقية.`}
          </p>

          {/* 3 Stats Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full mb-6">
            {/* Stat 1: Duration */}
            <div className="bg-[#F8FAFC] rounded-2xl p-3 sm:p-4 text-center border border-slate-100/90 flex flex-col items-center justify-center">
              <div className="text-lg sm:text-xl mb-1 text-slate-700">⏱️</div>
              <span className="text-sm sm:text-base font-bold text-[#0B1527]">
                {durationMonths} شهور
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                مدة المسار
              </span>
            </div>

            {/* Stat 2: Hours */}
            <div className="bg-[#F8FAFC] rounded-2xl p-3 sm:p-4 text-center border border-slate-100/90 flex flex-col items-center justify-center">
              <div className="text-lg sm:text-xl mb-1 text-slate-700">📚</div>
              <span className="text-sm sm:text-base font-bold text-[#0B1527]">
                +{totalHours} ساعة
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                محتوى تدريبي
              </span>
            </div>

            {/* Stat 3: Students */}
            <div className="bg-[#F8FAFC] rounded-2xl p-3 sm:p-4 text-center border border-slate-100/90 flex flex-col items-center justify-center">
              <div className="text-lg sm:text-xl mb-1 text-slate-700">🏆</div>
              <span className="text-sm sm:text-base font-bold text-[#0B1527]">
                {studentsCount} طالب
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                التحقوا بالمسار
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
            <Link
              href={`/booking/${course?.slug}`}
              className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-md shadow-primary/20 text-center"
            >
              ابدأ التعلم الآن
            </Link>

            <button
              type="button"
              onClick={handleBrowseContent}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-blue-50/50 border border-primary text-primary font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer"
            >
              <span>تصفّح المحتوى</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
