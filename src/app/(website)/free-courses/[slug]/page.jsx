"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import {
  getFreeCourseDetail,
  getMyFreeCourseEnrollments,
  updateVideoProgress,
} from "@/services/FreeCourses";
import {
  Play,
  Clock,
  ChevronRight,
  FileText,
  ListVideo,
  AlertCircle,
  BookOpen,
  Star,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/shared/Loading";

function getYouTubeId(url) {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function YouTubePlayer({ videoUrl, onProgress, activeVideoId }) {
  const containerId = `yt-player-${activeVideoId}`;
  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const videoId = getYouTubeId(videoUrl);
    if (!videoId) return;

    // Load YouTube API
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
        events: {
          onStateChange: (event) => {
            if (event.data === 1) {
              // 1 is PLAYING
              if (intervalRef.current) clearInterval(intervalRef.current);
              intervalRef.current = setInterval(() => {
                if (player && typeof player.getCurrentTime === "function") {
                  const currentTime = player.getCurrentTime();
                  const duration = player.getDuration();
                  const progressRatio = currentTime / (duration || 1);
                  if (duration > 0) {
                    onProgress(progressRatio);
                  }
                }
              }, 1000);
            } else {
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
            }
          },
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
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        playerRef.current.destroy();
      }
    };
  }, [videoUrl, activeVideoId]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div id={containerId} className="w-full h-full" />
    </div>
  );
}

// --- Subcomponents ---

function CourseHeader({ course, sortedVideos, overallProgress, isEnrolled }) {
  return (
    <div className="relative w-full overflow-hidden min-h-[45vh]">
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

      <div className="relative z-10 flex flex-col justify-center min-h-[45vh] px-5 sm:px-8 lg:px-13">
        <div className="flex flex-col max-w-3xl py-8">
          <div className="flex items-center gap-2 text-sm text-gray-305 font-medium mb-4">
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
                <div>
                  <p className="text-gray-300 text-xs font-medium">
                    {sortedVideos.length} درس
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5">
                <Star className="text-yellow-400 w-4 h-4" fill="currentColor" />
                <div>
                  <p className="text-emerald-400 text-xs font-bold">
                    مجاني بالكامل
                  </p>
                </div>
              </div>
            </div>

            {isEnrolled && (
              <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-3 text-white text-xs">
                <span className="font-semibold text-gray-355">تقدمك:</span>
                <div className="w-24 bg-white/20 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#22C55E] h-full rounded-full animate-pulse"
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
                <span className="font-bold text-[#22C55E]">
                  {Math.round(overallProgress)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaylistSidebar({
  sortedVideos,
  activeVideo,
  completedVideoIds,
  onVideoSelect,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-fit">
      <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListVideo size={18} className="text-[#2243A4]" />
          <h2 className="font-bold text-gray-900 text-base">
            دروس الدورة ({sortedVideos.length})
          </h2>
        </div>
      </div>

      <div className="max-h-[480px] overflow-y-auto divide-y divide-gray-100">
        {sortedVideos.map((video, idx) => {
          const isActive = activeVideo?.id === video.id;
          const isCompleted = completedVideoIds.includes(video.id);

          return (
            <button
              key={video.id}
              onClick={() => onVideoSelect(video)}
              className={`w-full text-right p-4 transition-all duration-150 flex items-start gap-3 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                isActive ? "bg-blue-50/60 border-r-4 border-[#2243A4]" : ""
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-[#2243A4] text-white"
                    : isCompleted
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 size={14} className="text-emerald-600" />
                ) : (
                  idx + 1
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={`text-sm font-semibold leading-snug truncate ${
                      isActive ? "text-[#2243A4]" : "text-gray-700"
                    }`}
                  >
                    {video.title}
                  </p>
                </div>
                {video.duration && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                    <Clock size={10} />
                    {video.duration} دقيقة
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function VideoPlayerSection({
  activeVideo,
  sortedVideos,
  completedVideoIds,
  hasMarkedWatched,
  setHasMarkedWatched,
  updateProgressMutation,
}) {
  if (!activeVideo) {
    return (
      <div className="aspect-video rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
        <div className="text-center space-y-2">
          <AlertCircle size={48} className="mx-auto text-gray-300" />
          <p className="text-sm font-medium">لا توجد دروس متوفرة حالياً.</p>
        </div>
      </div>
    );
  }

  const isCompleted = completedVideoIds.includes(activeVideo.id);

  return (
    <div className="space-y-5">
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-black border border-gray-100">
        <YouTubePlayer
          videoUrl={activeVideo.url}
          activeVideoId={activeVideo.id}
          onProgress={(ratio) => {
            if (
              ratio >= 0.6 &&
              !hasMarkedWatched &&
              !isCompleted &&
              !updateProgressMutation.isPending
            ) {
              setHasMarkedWatched(true);
              updateProgressMutation.mutate(activeVideo.id);
            }
          }}
        />
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2243A4]">
            <Play size={12} fill="currentColor" />
            <span>
              الدرس الحالي: {activeVideo.order + 1} من {sortedVideos.length}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {activeVideo.title}
          </h2>
          {activeVideo.duration && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <Clock size={12} />
              <span>مدة الدرس: {activeVideo.duration}</span>
            </div>
          )}
        </div>

        {isCompleted ? (
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
            <CheckCircle2 size={14} />
            <span>مكتمل</span>
          </span>
        ) : (
          <div className="group relative inline-block">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200 cursor-help">
              <AlertCircle size={14} />
              <span>غير مكتمل</span>
            </span>
            <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-48 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-gray-900 text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-md text-center leading-normal">
              يجب مشاهدة 60% من الفيديو على الأقل لإكمال الدرس تلقائياً
              <div className="absolute top-full left-1/2 -mt-1 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FreeCourseDetailPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { token, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug;
  const queryClient = useQueryClient();

  const [activeVideo, setActiveVideo] = useState(null);
  const [hasMarkedWatched, setHasMarkedWatched] = useState(false);

  useEffect(() => {
    setHasMarkedWatched(false);
  }, [activeVideo?.id]);

  useEffect(() => {
    if (!authLoading && !token) {
      router.push(
        `/login?redirect=${encodeURIComponent(`/free-courses/${slug}`)}`,
      );
    }
  }, [token, authLoading, router, slug]);

  // Query: Course detail
  const { data: courseDataRes, isLoading: courseLoading } = useQuery({
    queryKey: ["free-course-detail", slug],
    queryFn: () => getFreeCourseDetail(slug, token),
    enabled: !!slug && !!token && !authLoading,
  });

  const course = courseDataRes?.success ? courseDataRes.data : null;

  // Query: My enrollments to check progress
  const { data: enrollmentsRes, isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["free-course-enrollments"],
    queryFn: () => getMyFreeCourseEnrollments(token),
    enabled: !!token && !authLoading,
  });
  const enrollments = enrollmentsRes?.success ? enrollmentsRes.data || [] : [];

  const matchedEnrollment = course
    ? enrollments.find((e) => e.course?.id === course.id)
    : null;
  const isEnrolled = !!(course?.is_enrolled || matchedEnrollment);
  const overallProgress = matchedEnrollment?.progress_percent || 0;

  const sortedVideos = course?.videos
    ? [...course.videos].sort((a, b) => a.order - b.order)
    : [];

  const completedVideoIds = sortedVideos
    .filter((v) => v.is_completed || v.completed || v.is_watched || v.watched)
    .map((v) => v.id);

  // Set initial active video and document title on course load
  useEffect(() => {
    if (course) {
      const sorted = course.videos
        ? [...course.videos].sort((a, b) => a.order - b.order)
        : [];
      if (sorted.length > 0 && !activeVideo) {
        setActiveVideo(sorted[0]);
      }
      if (course.seo && course.seo.meta_title) {
        document.title = course.seo.meta_title;
      }
    }
  }, [course, activeVideo]);

  // Mutations
  const updateProgressMutation = useMutation({
    mutationFn: (videoId) => updateVideoProgress(course.id, videoId, token),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("تم إكمال الدرس وتحديث تقدمك!");
        queryClient.invalidateQueries({
          queryKey: ["free-course-enrollments"],
        });
        queryClient.invalidateQueries({
          queryKey: ["free-course-detail", slug],
        });
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error("فشل تحديث تقدم الدرس.");
    },
  });

  // Enforce enrollment: Redirect if not enrolled
  useEffect(() => {
    if (!authLoading && !courseLoading && !enrollmentsLoading && course) {
      if (!isEnrolled) {
        router.push("/free-courses");
      }
    }
  }, [
    authLoading,
    courseLoading,
    enrollmentsLoading,
    course,
    isEnrolled,
    router,
  ]);

  if (
    authLoading ||
    courseLoading ||
    enrollmentsLoading ||
    !course ||
    !isEnrolled ||
    !isMounted
  ) {
    return <Loading minHeight="min-h-screen bg-gray-50" />;
  }

  if (!token) return null;

  return (
    <div dir="rtl" className="bg-[#FAFAFA] min-h-screen">
      <ToastContainer rtl position="top-center" />

      <CourseHeader
        course={course}
        sortedVideos={sortedVideos}
        overallProgress={overallProgress}
        isEnrolled={isEnrolled}
      />

      {/* Main Content Layout */}
      <section className="px-5 lg:px-13 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Right Area: Playlist Index */}
          <div className="lg:col-span-1 space-y-6">
            <PlaylistSidebar
              sortedVideos={sortedVideos}
              activeVideo={activeVideo}
              completedVideoIds={completedVideoIds}
              onVideoSelect={setActiveVideo}
            />
          </div>

          {/* Left Area: Video Player */}
          <div className="lg:col-span-2 space-y-8 lg:order-1">
            <VideoPlayerSection
              activeVideo={activeVideo}
              sortedVideos={sortedVideos}
              completedVideoIds={completedVideoIds}
              hasMarkedWatched={hasMarkedWatched}
              setHasMarkedWatched={setHasMarkedWatched}
              updateProgressMutation={updateProgressMutation}
            />

            {/* Course Description */}
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
