"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import {
  getFreeCourseDetail,
  getMyFreeCourseEnrollments,
  updateVideoProgress,
  getFreeCourseCoupon,
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
  Gift,
  Copy,
  Check,
  Award,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CertificateViewer from "@/components/eraaCertificate/CertificateViewer";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/shared/Loading";

function getYouTubeId(url) {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function YouTubePlayer({ videoUrl, onProgress, activeVideoId, isCompleted }) {
  const containerId = `yt-player-${activeVideoId}`;
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const isCompletedRef = useRef(isCompleted);
  const onProgressRef = useRef(onProgress);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    isCompletedRef.current = isCompleted;
    if (isCompleted && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [isCompleted]);

  useEffect(() => {
    const videoId = getYouTubeId(videoUrl);
    if (!videoId) return;

    let player;

    const initializePlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      // Clean up previous player instance on this element if any
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
      }

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
            if (event.data === 1 && !isCompletedRef.current) {
              // 1 is PLAYING
              if (intervalRef.current) clearInterval(intervalRef.current);
              intervalRef.current = setInterval(() => {
                if (player && typeof player.getCurrentTime === "function") {
                  const currentTime = player.getCurrentTime();
                  const duration = player.getDuration();
                  const progressRatio = currentTime / (duration || 1);
                  if (duration > 0) {
                    onProgressRef.current(progressRatio);
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

    const checkAndInit = () => {
      if (window.YT && window.YT.Player) {
        initializePlayer();
      } else if (window.YT && typeof window.YT.ready === "function") {
        window.YT.ready(initializePlayer);
      }
    };

    if (!window.YT) {
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previousCallback) previousCallback();
        checkAndInit();
      };

      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    } else {
      checkAndInit();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
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
                    {(course.is_free || Number(course.price || 0) === 0 || !course.price) ? "مجاني بالكامل" : `مدفوع (${Number(course.price || 0).toLocaleString("ar-EG")} ج.م)`}
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
                    style={{
                      width: `${Math.min((overallProgress / 60) * 100, 100)}%`,
                    }}
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
  isEnrollmentActive = true,
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
        {!isEnrollmentActive && (
          <div className="absolute inset-0 z-30 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 space-y-3">
            <AlertCircle size={48} className="text-amber-500 animate-bounce" />
            <h3 className="text-white text-lg font-bold">
              الاشتراك غير مفعل حالياً
            </h3>
            <p className="text-gray-300 text-sm max-w-md">
              هذا الكورس غير مفعل حالياً. لا يمكنك مشاهدة هذا الفيديو في الوقت
              الحالي.
            </p>
          </div>
        )}
        <YouTubePlayer
          videoUrl={activeVideo.url}
          activeVideoId={activeVideo.id}
          isCompleted={isCompleted}
          onProgress={(ratio) => {
            if (
              isEnrollmentActive &&
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
  const [unlockedCoupon, setUnlockedCoupon] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [copied, setCopied] = useState(false);

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
  const isEnrollmentActive = matchedEnrollment
    ? matchedEnrollment.is_active !== false
    : true;
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

  useEffect(() => {
    setHasMarkedWatched(false);
  }, [activeVideo?.id]);

  useEffect(() => {
    if (isEnrolled && overallProgress >= 60 && token && course?.id) {
      getFreeCourseCoupon(course.id, token)
        .then((couponRes) => {
          if (couponRes.success) {
            setUnlockedCoupon(couponRes.data);
          }
        })
        .catch(() => {});
    }
  }, [isEnrolled, overallProgress, token, course?.id]);

  useEffect(() => {
    if (!authLoading && !token) {
      router.push(
        `/login?redirect=${encodeURIComponent(`/free-courses/${slug}`)}`,
      );
    }
  }, [token, authLoading, router, slug]);

  // Mutations
  const updateProgressMutation = useMutation({
    mutationFn: (videoId) => updateVideoProgress(course.id, videoId, token),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ["free-course-enrollments"],
        });
        queryClient.invalidateQueries({
          queryKey: ["free-course-detail", slug],
        });

        // Query the coupon endpoint to check if coupon is now unlocked
        getFreeCourseCoupon(course.id, token)
          .then((couponRes) => {
            if (couponRes.success && couponRes.data?.coupon_code) {
              setUnlockedCoupon(couponRes.data);
              if (typeof window !== "undefined") {
                const shownCoupons = JSON.parse(
                  localStorage.getItem("shown_coupons") || "{}",
                );
                if (!shownCoupons[course.id]) {
                  setShowCelebration(true);
                  shownCoupons[course.id] = true;
                  localStorage.setItem(
                    "shown_coupons",
                    JSON.stringify(shownCoupons),
                  );
                }
              }
            }
          })
          .catch((err) => {
            console.log("Coupon eligibility check completed.");
          });
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error(err?.message || "هذا الكورس غير مفعل حالياً", {
        position: "top-center",
      });
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
        {!isEnrollmentActive && (
          <div className="mb-6 bg-amber-50 border-r-4 border-amber-500 p-4 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-amber-600 shrink-0" size={22} />
              <div>
                <h4 className="font-bold text-amber-900 text-sm">
                  الاشتراك غير مفعل حالياً
                </h4>
                <p className="text-amber-700 text-xs mt-0.5">
                  هذا الكورس غير مفعل حالياً. لا يمكنك مشاهدة الدروس أو تسجيل
                  التقدم.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-amber-200/80 text-amber-900 text-xs font-bold rounded-full shrink-0">
              غير مفعل
            </span>
          </div>
        )}

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
              isEnrollmentActive={isEnrollmentActive}
            />

            {/* Coupon Unlock/Status Section */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
                <Gift size={20} className="text-[#2243A4]" />
                كوبون خصم الدورة المجانية
              </h2>
              {overallProgress >= 60 ? (
                unlockedCoupon ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="space-y-1">
                      <p className="text-emerald-800 font-bold text-base">
                        مبروك! لقد حصلت على كوبون خصم{" "}
                        {unlockedCoupon.discount_percent}%
                      </p>
                      <p className="text-gray-600 text-sm">
                        استخدم الكود التالي عند حجز أي كورس مدفوع للاستفادة من
                        الخصم:
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-emerald-300 rounded-lg px-4 py-2 w-full sm:w-auto justify-between sm:justify-start">
                      <code className="text-[#2243A4] font-mono font-bold text-lg select-all">
                        {unlockedCoupon.coupon_code}
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            unlockedCoupon.coupon_code,
                          );
                          setCopied(true);
                          toast.success("تم نسخ كود الكوبون!");
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="text-gray-500 hover:text-emerald-700 transition-colors p-1"
                        title="نسخ الكود"
                      >
                        {copied ? (
                          <Check size={16} className="text-emerald-600" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-5">
                    <div>
                      <p className="text-[#2243A4] font-bold">
                        جاري تحميل الكوبون الخاص بك...
                      </p>
                    </div>
                  </div>
                )
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="space-y-1">
                    <p className="text-gray-700 font-bold text-sm sm:text-base">
                      احصل على كوبون خصم مميز
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      شاهد 60% من محاضرات الدورة المجانية لفتح الكوبون تلقائياً.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-24 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full"
                        style={{
                          width: `${Math.min((overallProgress / 60) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-gray-600">
                      {Math.round(overallProgress)}% / 60%
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Certificate Section */}
            {(overallProgress === 100 || matchedEnrollment?.certificate) && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <Award size={20} className="text-[#2243A4]" />
                  شهادة إتمام الدورة
                </h2>
                <CertificateViewer
                  studentName={
                    matchedEnrollment?.certificate?.student_name || "اسم الطالب"
                  }
                  courseName={course?.title || "اسم الدورة التدريبية"}
                  serialNumber={
                    matchedEnrollment?.certificate?.serial_number ||
                    "ERA-FC-XXXX-XXXXXXXX"
                  }
                  issuedDate={
                    matchedEnrollment?.certificate?.formatted_issued_date || ""
                  }
                />
              </div>
            )}

            {/* Outcomes Section */}
            {course.out_comes && course.out_comes.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <CheckCircle2 size={20} className="text-[#2243A4]" />
                  مخرجات التعلم
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.out_comes.map((outcome, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-gray-700 text-sm sm:text-base"
                    >
                      <CheckCircle2 className="text-emerald-600 shrink-0 mt-1 w-4 h-4" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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

      {/* Celebration Modal */}
      {showCelebration && unlockedCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-gray-100 shadow-2xl text-center space-y-6 animate-scale-up relative">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setShowCelebration(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <Gift className="text-emerald-600 w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-gray-900">
                تهانينا الحارة! 🎉
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                لقد أنجزت مشاهدة 60% من محاضرات الدورة بنجاح. تقديراً لجهودك، تم
                فتح كوبون خصم بقيمة{" "}
                <span className="font-bold text-emerald-600 text-lg">
                  {unlockedCoupon.discount_percent}%
                </span>
                !
              </p>
            </div>

            <div className="bg-gray-50 border border-dashed border-emerald-300 rounded-2xl p-4 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-bold">
                كود الكوبون:
              </span>
              <div className="flex items-center gap-2">
                <code className="text-[#2243A4] font-mono font-bold text-xl select-all">
                  {unlockedCoupon.coupon_code}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(unlockedCoupon.coupon_code);
                    setCopied(true);
                    toast.success("تم نسخ كود الكوبون!");
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="text-gray-500 hover:text-emerald-700 transition-colors p-1"
                >
                  {copied ? (
                    <Check size={16} className="text-emerald-600" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowCelebration(false)}
              className="w-full py-3.5 bg-[#2243A4] hover:bg-[#19327D] text-white font-bold rounded-2xl text-sm transition-colors"
            >
              متابعة التعلم
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
