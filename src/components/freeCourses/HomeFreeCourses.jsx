"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, BookOpen, ArrowLeft } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

export default function HomeFreeCourses({ freeCourses = [] }) {
  const { client } = useAuth();

  if (!freeCourses || freeCourses.length === 0) return null;

  return (
    <section className="px-4 lg:px-15 my-16 py-12 bg-gradient-to-b from-blue-50/20 via-white to-transparent rounded-3xl" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div className="space-y-2">
          <span className="text-sm font-bold text-[--primary-color] tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
            تعلم مجاناً
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">الدورات المجانية</h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl">
            تعلم البرمجة وتطوير الويب من الصفر مجاناً عبر سلسلة دروس مميزة وعالية الجودة.
          </p>
        </div>
        <Link
          href="/free-courses"
          className="inline-flex items-center gap-2 font-bold text-sm text-[--primary-color] hover:text-blue-700 transition-colors group cursor-pointer"
        >
          <span>عرض جميع الدورات المجانية</span>
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freeCourses.slice(0, 6).map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all duration-300"
          >
            {/* Cover Image */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-50">
              {course.image ? (
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-50 text-[--primary-color]">
                  <BookOpen size={48} />
                </div>
              )}
              {course.is_featured && (
                <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  مميز
                </span>
              )}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center text-[--primary-color] shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Play size={20} fill="currentColor" className="mr-0.5" />
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-[--primary-color] transition-colors line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                  {course.short_description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">
                  {course.videos_count ?? 0} درس تعليمي
                </span>
                <Link
                  href={client ? `/free-courses/${course.slug}` : "/login"}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[--primary-color] hover:text-blue-700 transition-colors"
                >
                  شاهد الآن
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
