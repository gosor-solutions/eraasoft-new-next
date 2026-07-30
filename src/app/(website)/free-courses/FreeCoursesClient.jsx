"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import {
  getFreeCourses,
  getMyFreeCourseEnrollments,
  enrollInFreeCourse,
} from "@/services/FreeCourses";
import { Search, AlertCircle, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EmptyState from "@/components/shared/EmptyState";
import HeroCarousel from "@/components/shared/HeroCarusel";
import Loading from "@/components/shared/Loading";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FreeCoursesClient({ pageData, discountPercent = 30 }) {
  const { token, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 300);

  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const enrollParam = searchParams?.get("enroll");

  const {
    data: responseData,
    isLoading: isDataLoading,
    error,
  } = useQuery({
    queryKey: ["free-courses", debouncedSearch, page],
    queryFn: () =>
      getFreeCourses({ search: debouncedSearch, page, perPage: 12 }, token),
  });

  const { data: enrollmentsRes, isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["free-course-enrollments", token],
    queryFn: () => getMyFreeCourseEnrollments(token),
    enabled: !!token,
  });

  const courses = responseData?.success ? responseData.data || [] : [];
  const meta = responseData?.success ? responseData.meta || null : null;
  const enrollments = enrollmentsRes?.success ? enrollmentsRes.data || [] : [];

  useEffect(() => {
    if (token && enrollParam && courses.length > 0) {
      const courseId = Number(enrollParam) || enrollParam;
      const alreadyEnrolled = enrollments.some(
        (e) => e.course?.id === courseId,
      );
      if (!alreadyEnrolled) {
        handleEnroll(courseId);
        // Clean URL params
        router.replace("/free-courses");
      }
    }
  }, [token, enrollParam, courses, enrollments]);

  const enrollMutation = useMutation({
    mutationFn: ({ courseId, couponCode }) =>
      enrollInFreeCourse(courseId, token, couponCode),
    onSuccess: (res, { courseId }) => {
      if (res.success) {
        toast.success("تم الاشتراك في الدورة بنجاح!");
        queryClient.invalidateQueries({
          queryKey: ["free-course-enrollments"],
        });

        // Find slug to redirect user inside
        const targetCourse = courses.find((c) => c.id === courseId);
        if (targetCourse) {
          router.push(`/free-courses/${targetCourse.slug}`);
        }
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error(err?.message || "حدث خطأ أثناء الاشتراك في الدورة.");
    },
  });

  const handleEnroll = (courseId) => {
    const targetCourse = courses.find((c) => c.id === courseId);
    if (!token) {
      const redirectPath = targetCourse
        ? `/free-courses?enroll=${targetCourse.id}`
        : "/free-courses";
      router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`);
      return;
    }
    if (enrollMutation.isPending) return;

    if (targetCourse) {
      const isFree =
        targetCourse.is_free ||
        Number(targetCourse.price || 0) === 0 ||
        !targetCourse.price;
      if (isFree) {
        enrollMutation.mutate({
          courseId,
          couponCode: targetCourse.coupon_code,
        });
      } else {
        router.push(`/free-courses/${targetCourse.slug}/preview`);
      }
    }
  };

  const isLoadingAll = isDataLoading || enrollmentsLoading;

  if (authLoading) {
    return <Loading minHeight="min-h-screen bg-gray-50" />;
  }

  return (
    <>
      <ToastContainer rtl />
      <HeroCarousel
        head={pageData?.title || "الدورات التعليمية المجانية"}
        description={
          pageData?.description ||
          "تعلم البرمجة وتطوير الويب من الصفر مجاناً عبر دروس مصورة عالية الجودة."
        }
        image={pageData?.image || null}
      />

      <section className="px-5 lg:px-13 py-10 bg-[#FAFAFA]" dir="rtl">
        {/* Promotion Banner */}
        <div className="max-w-7xl mx-auto mb-10 bg-[#f4f7ff] rounded-2xl p-6 md:p-8 lg:p-10 relative overflow-hidden shadow-sm border border-[#dbe4ff] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]">
            <Image
              src="/discount.png"
              alt="background"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Right (First in RTL JSX): EraaSoft Logo */}
          <div className="flex flex-col items-center justify-center z-10 h-16 md:h-20 md:w-1/5">
            <Image
              src="/logo-white.png"
              alt="شعار إيراسوفت"
              width={140}
              height={25}
              className="h-40 md:h-56 w-auto object-contain"
            />
          </div>

          {/* Middle: Promotion Text */}
          <div className="text-center z-10 flex-1">
            <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-6xl font-black mb-3 leading-tight tracking-wide flex flex-wrap justify-center items-center gap-2">
              <span className="text-[#f19a1a]">خصم </span>
              <span className="text-white">يصل إلى</span>
              <span className="text-[#f19a1a]">{discountPercent}%</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-3xl text-white font-medium">
              على أي دبلومة من دبلومات إيراسوفت
            </p>
          </div>

          {/* Left (Last in RTL JSX): Certificate Monitor & Start button */}
          <div className="flex flex-col items-center text-center z-10 w-full md:w-1/5">
            <div className="relative mb-3 group">
              {/* Glow */}
              <div className="absolute -inset-1.5 bg-yellow-400/20 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-500"></div>
              {/* Monitor wrapper */}
              <div className="relative flex items-center justify-center w-44 md:w-40">
                <Image
                  alt="certificate"
                  src={"/certificate-discount.png"}
                  width={200}
                  height={200}
                  className="object-contain w-full"
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-white mb-4 font-medium">
              عند إكمال الكورس المجاني
            </p>

            <button
              onClick={() => {
                const element =
                  document.getElementById("courses-list") ||
                  document.querySelector(".grid");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="cursor-pointer px-6 py-2 md:px-8 md:py-2.5 bg-[#2243A4] hover:bg-[#19327D] text-white font-bold rounded-full shadow-sm hover:shadow transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm"
            >
              ابدأ الآن
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10 relative">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="ابحث عن دورة مجانية..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="block w-full pr-11 pl-4 py-3.5 bg-white border border-[#D2D2D2] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-[#2243A4] focus:border-[#2243A4] transition-all duration-200 text-sm"
          />
        </div>

        {isLoadingAll && courses.length === 0 ? (
          <Loading minHeight="min-h-[30vh]" />
        ) : error ? (
          <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-xl flex items-start gap-3 max-w-lg mx-auto">
            <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
            <div className="text-sm text-red-700 font-medium">
              {error?.message ||
                "فشل تحميل الدورات المجانية. يرجى المحاولة مرة أخرى."}
            </div>
          </div>
        ) : courses.length > 0 ? (
          <>
            <div className="grid grid-cols-12 gap-5">
              {courses?.map((course) => {
                const isEnrolled =
                  course.is_enrolled ||
                  enrollments.some((e) => e.course?.id === course.id);
                const isFree =
                  course.is_free || Number(course.price) === 0 || !course.price;
                return (
                  <div
                    key={course.id}
                    className="col-span-12 md:col-span-6 lg:col-span-3 border border-[#2243A4] rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="course_card p-4 flex flex-col justify-between h-full">
                      <div>
                        {/* Image container matching standard course list card */}
                        <div className="image relative h-52 rounded-xl overflow-hidden mb-4">
                          {course.image ? (
                            <Image
                              src={course.image}
                              alt={course.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 25vw"
                              className="object-cover object-center"
                            />
                          ) : (
                            <div className="w-full h-full bg-blue-50 flex items-center justify-center text-[#2243A4]">
                              <Play size={40} />
                            </div>
                          )}
                          {course.is_featured && (
                            <div className="absolute top-3 left-3">
                              <p className="bg-orange-500 text-white rounded-3xl px-3 py-1.5 text-xs font-semibold shadow-lg">
                                مميز
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Header Title & Details */}
                        <div className="pt-2 pb-3">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-2 rounded-2xl w-fit">
                              <Image
                                src="/tv_icon.png"
                                alt=""
                                width={18}
                                height={18}
                                className="w-4 h-4"
                              />
                              <p className="text-xs text-gray-600 font-medium">
                                {course.videos_count ?? 0} درس تعليمي
                              </p>
                            </div>
                            {isFree ? (
                              <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                مجاني
                              </span>
                            ) : (
                              <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                مدفوع
                              </span>
                            )}
                          </div>

                          {isEnrolled ? (
                            <Link
                              href={`/free-courses/${course.slug}`}
                              className="font-semibold text-lg sm:text-xl line-clamp-2 min-h-[50px] leading-snug hover:underline hover:text-[#2243A4] transition-colors block"
                            >
                              {course.title}
                            </Link>
                          ) : (
                            <Link
                              href={`/free-courses/${course.slug}/preview`}
                              className="font-semibold text-lg sm:text-xl line-clamp-2 min-h-[50px] leading-snug hover:underline hover:text-[#2243A4] transition-colors block"
                            >
                              {course.title}
                            </Link>
                          )}

                          <p className="text-[#7F7F7F] text-sm line-clamp-2 mt-2 leading-relaxed">
                            {course.short_description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-50">
                        <div className="mb-3">
                          {isFree ? (
                            <span className="text-emerald-600 text-sm font-bold">
                              دورة مجانية
                            </span>
                          ) : (
                            <span className="text-[#2243A4] text-sm font-bold">
                              {Number(course.price || 0).toLocaleString(
                                "ar-EG",
                              )}{" "}
                              ج.م
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {isEnrolled ? (
                            <>
                              <Link
                                href={`/free-courses/${course.slug}`}
                                className="main_button grow cursor-pointer text-sm py-3 text-center rounded-[24px] bg-[#2243A4] text-white hover:bg-[#19327D] transition-colors font-semibold"
                              >
                                متابعة الدورة
                              </Link>
                            </>
                          ) : (
                            <Link
                              href={`/free-courses/${course.slug}/preview`}
                              className="main_button grow cursor-pointer text-sm py-3 text-center rounded-[24px] bg-emerald-600 hover:bg-emerald-700 text-white transition-colors font-semibold flex items-center justify-center"
                            >
                              عرض ومعاينة الدورة
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {meta && meta.last_page > 1 && (
              <div className="flex justify-center mt-10">
                <nav className="flex items-center gap-1.5">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 text-sm font-semibold rounded-xl bg-white border border-[#D2D2D2] text-gray-700 disabled:opacity-50 hover:bg-gray-50 disabled:cursor-not-allowed transition-colors"
                  >
                    السابق
                  </button>
                  {Array.from({ length: meta.last_page }, (_, i) => i + 1)?.map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                          page === p
                            ? "bg-[#2243A4] border-[#2243A4] text-white"
                            : "bg-white border-[#D2D2D2] text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}
                  <button
                    disabled={page >= meta.last_page}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 text-sm font-semibold rounded-xl bg-white border border-[#D2D2D2] text-gray-700 disabled:opacity-50 hover:bg-gray-50 disabled:cursor-not-allowed transition-colors"
                  >
                    التالي
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <EmptyState title="لا توجد دورات تعليمية مجانية متاحة حالياً." />
        )}
      </section>
    </>
  );
}
