"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { getFreeCourses } from "@/services/FreeCourses";
import { Search, AlertCircle, Eye, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EmptyState from "@/components/shared/EmptyState";
import HeroCarousel from "@/components/shared/HeroCarusel";
import Loading from "@/components/shared/Loading";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

export default function FreeCoursesPage() {
  const { token, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 300);

  useEffect(() => {
    if (!authLoading && !token) {
      router.push("/login");
    }
  }, [token, authLoading, router]);

  const { data: responseData, isLoading: isDataLoading, error } = useQuery({
    queryKey: ["free-courses", debouncedSearch, page],
    queryFn: () => getFreeCourses({ search: debouncedSearch, page, perPage: 12 }, token),
    enabled: !!token && !authLoading,
  });

  const courses = responseData?.success ? (responseData.data || []) : [];
  const meta = responseData?.success ? (responseData.meta || null) : null;

  if (authLoading) {
    return <Loading minHeight="min-h-screen bg-gray-50" />;
  }

  if (!token) return null;

  return (
    <>
      <HeroCarousel
        head="الدورات التعليمية المجانية"
        description="تعلم البرمجة وتطوير الويب من الصفر مجاناً عبر دروس مصورة عالية الجودة."
        image={null}
      />

      <section className="px-5 lg:px-13 py-10 bg-[#FAFAFA]" dir="rtl">
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

        {isDataLoading && courses.length === 0 ? (
          <Loading minHeight="min-h-[30vh]" />
        ) : error ? (
          <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-xl flex items-start gap-3 max-w-lg mx-auto">
            <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
            <div className="text-sm text-red-700 font-medium">{error?.message || "فشل تحميل الدورات المجانية. يرجى المحاولة مرة أخرى."}</div>
          </div>
        ) : courses.length > 0 ? (
          <>
            <div className="grid grid-cols-12 gap-5">
              {courses.map((course) => (
                <div key={course.id} className="col-span-12 md:col-span-6 lg:col-span-3 border border-[#2243A4] rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
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
                            <p className="bg-orange-500 text-white rounded-3xl px-3 py-1.5 text-xs font-semibold shadow-lg">مميز</p>
                          </div>
                        )}
                      </div>

                      {/* Header Title & Details */}
                      <div className="pt-2 pb-3">
                        <div className="flex items-center gap-2 mb-3 bg-gray-50 border border-gray-100 px-3 py-2 rounded-2xl w-fit">
                          <Image src="/tv_icon.png" alt="" width={18} height={18} className="w-4 h-4" />
                          <p className="text-xs text-gray-600 font-medium">{course.videos_count ?? 0} درس تعليمي</p>
                        </div>

                        <Link
                          href={`/free-courses/${course.slug}`}
                          className="font-semibold text-lg sm:text-xl line-clamp-2 min-h-[50px] leading-snug hover:underline hover:text-[#2243A4] transition-colors block"
                        >
                          {course.title}
                        </Link>

                        <p className="text-[#7F7F7F] text-sm line-clamp-2 mt-2 leading-relaxed">{course.short_description}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-50">
                      {/* Price Section styled exactly like standard price but with Free Badge */}
                      <p className="text-[#22C55E] text-2xl font-bold mb-3">مجاني</p>

                      <div className="flex gap-2">
                        <Link href={`/free-courses/${course.slug}`} className="main_button grow cursor-pointer text-sm py-3 text-center rounded-[24px] bg-[#2243A4] text-white hover:bg-[#19327D] transition-colors font-semibold">
                          شاهد الآن
                        </Link>
                        <Link href={`/free-courses/${course.slug}`} className="bg-[#2243A41A] h-11 w-11 rounded-full flex justify-center items-center cursor-pointer shrink-0">
                          <Eye className="text-[#2243A4] w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {meta && meta.last_page > 1 && (
              <div className="flex justify-center mt-10">
                <nav className="flex items-center gap-1.5" dir="ltr">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 text-sm font-semibold rounded-xl bg-white border border-[#D2D2D2] text-gray-700 disabled:opacity-50 hover:bg-gray-50 disabled:cursor-not-allowed transition-colors"
                  >
                    السابق
                  </button>
                  {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-colors ${page === p
                          ? "bg-[#2243A4] border-[#2243A4] text-white"
                          : "bg-white border-[#D2D2D2] text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      {p}
                    </button>
                  ))}
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
