"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { getFreeCoursePreview } from "@/services/FreeCourses";
import {
  Play,
  Clock,
  ChevronRight,
  FileText,
  ListVideo,
  Lock,
  BookOpen,
  Star,
  LogIn,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/shared/Loading";

function getYouTubeId(url) {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function PreviewYouTubePlayer({ videoUrl }) {
  const containerId = "yt-preview-player";
  const playerRef = useRef(null);

  useEffect(() => {
    const videoId = getYouTubeId(videoUrl);
    if (!videoId) return;

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    let player;
    const initializePlayer = () => {
      player = new window.YT.Player(containerId, {
        videoId: videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
        },
      });
      playerRef.current = player;
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previousCallback) previousCallback();
        initializePlayer();
      };
    }

    return () => {
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        playerRef.current.destroy();
      }
    };
  }, [videoUrl]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div id={containerId} className="w-full h-full" />
    </div>
  );
}

export default function FreeCoursePreviewPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { token, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    data: previewDataRes,
    isLoading: previewLoading,
    error,
  } = useQuery({
    queryKey: ["free-course-preview", slug],
    queryFn: () => getFreeCoursePreview(slug),
    enabled: !!slug,
  });

  const course = previewDataRes?.success ? previewDataRes.data : null;

  // Set document title
  useEffect(() => {
    if (course?.seo?.meta_title) {
      document.title = course.seo.meta_title;
    } else if (course?.title) {
      document.title = `${course.title} - معاينة الدورة`;
    }
  }, [course]);

  if (authLoading || previewLoading || !isMounted) {
    return <Loading minHeight="min-h-screen bg-gray-50" />;
  }

  if (error || !course) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gray-50"
        dir="rtl"
      >
        <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-sm border border-gray-250">
          <p className="text-lg font-bold text-red-500">
            حدث خطأ أو الدورة غير موجودة.
          </p>
          <Link href="/free-courses" className="main_button px-6 py-2">
            العودة للدورات المجانية
          </Link>
        </div>
      </div>
    );
  }

  const videosCount = course.videos_count || course.videos?.length || 0;
  const displayVideos = (course.videos && course.videos.length > 0)
    ? [...course.videos].sort((a, b) => (a.order || 0) - (b.order || 0))
    : Array.from({ length: videosCount }, (_, idx) => ({
        id: idx + 1,
        title: `المحاضرة ${idx + 1}`,
        duration: null,
      }));

  const handleEnrollClick = () => {
    if (token) {
      // If logged in, go to main course detail page to enroll/play
      router.push(`/free-courses/${slug}`);
    } else {
      router.push(
        `/login?redirect=${encodeURIComponent(`/free-courses/${slug}`)}`,
      );
    }
  };

  return (
    <div dir="rtl" className="bg-[#FAFAFA] min-h-screen">
      {/* Course Header */}
      <div className="relative w-full overflow-hidden min-h-[40vh]">
        {course.background_image ? (
          <Image
            src={course.background_image}
            alt={course.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-950" />
        )}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col justify-center min-h-[40vh] px-5 sm:px-8 lg:px-13">
          <div className="flex flex-col max-w-3xl py-8">
            <div className="flex items-center gap-2 text-sm text-gray-300 font-medium mb-4">
              <Link
                href="/free-courses"
                className="hover:text-white transition-colors"
              >
                الدورات المجانية
              </Link>
              <ChevronRight size={14} />
              <span className="text-white font-semibold line-clamp-1">
                {course.title}
              </span>
            </div>

            <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug mb-4">
              {course.title}
            </h1>

            <p className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 line-clamp-3">
              {course.short_description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex divide-x divide-x-reverse divide-white/20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden w-fit">
                <div className="flex items-center gap-2 px-4 py-2.5">
                  <BookOpen className="text-white/75 w-4 h-4" />
                  <span className="text-gray-300 text-xs font-medium">
                    {videosCount} درس
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5">
                  <Star
                    className="text-yellow-400 w-4 h-4"
                    fill="currentColor"
                  />
                  <span className="text-emerald-400 text-xs font-bold">
                    معاينة مجانية
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <section className="px-5 lg:px-13 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Playlist Structure / Locked indicator */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ListVideo size={18} className="text-[#2243A4]" />
                  <h2 className="font-bold text-gray-900 text-base">
                    دروس الدورة ({videosCount})
                  </h2>
                </div>
              </div>

              <div className="max-h-[500px] overflow-y-auto divide-y divide-gray-100 opacity-80">
                {displayVideos.map((video, idx) => (
                  <div
                    key={video.id || idx}
                    className="p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold bg-gray-100 text-gray-500">
                      <Lock size={12} className="text-gray-400" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="text-sm font-semibold text-gray-700 leading-snug">
                        {video.title}
                      </p>
                      {video.duration && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
                          <Clock size={10} />
                          {video.duration} دقيقة
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-blue-50/50 border-t border-gray-100">
                <button
                  onClick={handleEnrollClick}
                  className="w-full cursor-pointer py-3 bg-[#2243A4] hover:bg-[#19327D] text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <LogIn size={16} />
                  <span>سجل الآن لمشاهدة الدورة كاملة</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Preview Video Player & Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-black border border-gray-100">
                {course.video_preview_link ? (
                  <PreviewYouTubePlayer videoUrl={course.video_preview_link} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-900">
                    <p className="text-sm">لا يتوفر فيديو معاينة لهذه الدورة</p>
                  </div>
                )}
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-250 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs font-semibold text-[#2243A4] bg-blue-55 px-2.5 py-1 rounded-md">
                    فيديو المعاينة
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2">
                    مقدمة وتعريف بالدورة
                  </h3>
                </div>
                <button
                  onClick={handleEnrollClick}
                  className="main_button px-6 py-3 text-sm font-bold flex items-center gap-2"
                >
                  <span>اشترك بالدورة مجاناً</span>
                </button>
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
                <FileText size={20} className="text-[#2243A4]" />
                تفاصيل الدورة
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
