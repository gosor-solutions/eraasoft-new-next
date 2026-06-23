"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { getFreeCourseDetail } from "@/services/FreeCourses";
import { getVideoEmbedUrl } from "@/services/getVideoEmbedUrl";
import { Play, Clock, ChevronRight, FileText, ListVideo, AlertCircle, BookOpen, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FreeCourseDetailPage() {
  const { token, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug;

  const [course, setCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchCourseDetail = async () => {
      setIsDataLoading(true);
      setError(null);
      try {
        const res = await getFreeCourseDetail(slug, token);
        if (res.success && res.data) {
          const courseData = res.data;
          setCourse(courseData);

          const sortedVideos = courseData.videos ? [...courseData.videos].sort((a, b) => a.order - b.order) : [];
          if (sortedVideos.length > 0) {
            setActiveVideo(sortedVideos[0]);
          }

          if (courseData.seo && courseData.seo.meta_title) {
            document.title = courseData.seo.meta_title;
          }
        }
      } catch (err) {
        console.error(err);
        setError("فشل تحميل تفاصيل الدورة أو الدورة غير موجودة.");
      } finally {
        setIsDataLoading(false);
      }
    };

    if (slug) {
      fetchCourseDetail();
    }
  }, [token, authLoading, slug, router]);

  if (!token) return null;

  const sortedVideos = course.videos ? [...course.videos].sort((a, b) => a.order - b.order) : [];

  return (
    <div dir="rtl">
      {/* Dynamic Header Banner (Matching CourseBanner design) */}
      <div className="relative w-full overflow-hidden min-h-[50vh]">
        {course.background_image ? (
          <Image src={course.background_image} alt={course.title} fill className="object-cover" priority />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-950" />
        )}
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 flex flex-col justify-center min-h-[50vh] px-5 sm:px-8 lg:px-13">
          <div className="flex flex-col max-w-3xl py-8">
            {/* Breadcrumbs inside banner */}
            <div className="flex items-center gap-2 text-sm text-gray-300 font-medium mb-4">
              <Link href="/free-courses" className="hover:text-white transition-colors">
                الدورات المجانية
              </Link>
              <ChevronRight size={14} />
              <span className="text-white font-semibold line-clamp-1">{course.title}</span>
            </div>

            <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug mb-4">
              {course.title}
            </h1>

            <p className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 line-clamp-3">
              {course.short_description}
            </p>

            <div className="inline-flex divide-x divide-x-reverse divide-white/30 bg-white/10 backdrop-blur-md rounded-4xl border border-white/20 overflow-hidden w-fit">
              <div className="flex items-center gap-2 px-5 py-3.5">
                <BookOpen className="text-white/70 w-5 h-5" />
                <div>
                  <p className="text-white font-semibold text-xs sm:text-sm">محتوى الدورة</p>
                  <p className="text-gray-300 text-xs sm:text-sm">{sortedVideos.length} درس تعليمي</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-5 py-3.5">
                <Star className="text-yellow-400 w-5 h-5" fill="currentColor" />
                <div>
                  <p className="text-white font-semibold text-xs sm:text-sm">سعر الدورة</p>
                  <p className="text-emerald-400 text-xs sm:text-sm font-bold">متاح مجاناً</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Matching CourceInfo & CourceContent grid theme) */}
      <section className="px-5 lg:px-13 py-10 bg-[#FAFAFA]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Right Area: Playlist Index & Details */}
          <div className="lg:col-span-1 space-y-6 lg:order-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-fit">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <ListVideo size={18} className="text-[#2243A4]" />
                <h2 className="font-bold text-gray-900 text-base">دروس الدورة ({sortedVideos.length})</h2>
              </div>

              <div className="max-h-[480px] overflow-y-auto divide-y divide-gray-100">
                {sortedVideos.map((video, idx) => {
                  const isActive = activeVideo?.id === video.id;
                  return (
                    <button
                      key={video.id}
                      onClick={() => setActiveVideo(video)}
                      className={`w-full text-right p-4 transition-all duration-150 flex items-start gap-3 hover:bg-gray-50 cursor-pointer ${isActive ? "bg-blue-50/60 border-r-4 border-[#2243A4]" : ""
                        }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${isActive
                          ? "bg-[#2243A4] text-white"
                          : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {idx + 1}
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <p className={`text-sm font-semibold leading-snug truncate ${isActive ? "text-[#2243A4]" : "text-gray-700"}`}>
                          {video.title}
                        </p>
                        {video.duration && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                            <Clock size={10} />
                            {video.duration}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Left Area: Video Player & Description text */}
          <div className="lg:col-span-2 space-y-8 lg:order-1">
            {activeVideo ? (
              <div className="space-y-5">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-black border border-gray-100">
                  <iframe
                    src={getVideoEmbedUrl(activeVideo.url)}
                    title={activeVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#2243A4]">
                    <Play size={12} fill="currentColor" />
                    <span>الدرس الحالي: {activeVideo.order + 1} من {sortedVideos.length}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{activeVideo.title}</h2>
                  {activeVideo.duration && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium pt-1">
                      <Clock size={12} />
                      <span>مدة الدرس: {activeVideo.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="aspect-video rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                <div className="text-center space-y-2">
                  <AlertCircle size={48} className="mx-auto text-gray-300" />
                  <p className="text-sm font-medium">لا توجد دروس متوفرة في هذه الدورة حالياً.</p>
                </div>
              </div>
            )}

            {/* Course Description Card (matching CourceContent content layout) */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
                <FileText size={20} className="text-[#2243A4]" />
                عن الدورة التعليمية
              </h2>
              <div
                className="text-gray-600 text-sm sm:text-base leading-relaxed space-y-4 prose max-w-none prose-blue"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
