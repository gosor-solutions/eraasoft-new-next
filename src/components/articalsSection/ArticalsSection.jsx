"use client";

import EmptyState from "@/components/shared/EmptyState";
import LineSvg from "@/components/shared/LineSvg";
import React, { useState } from "react";
import ArticleCard from "./ArticleCard";
import MobileArticleCard from "./MobileArticleCard";

export default function ArticalsSection({ articles = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (articles.length === 0) {
    return (
      <section className="py-12 sm:py-16 px-5 sm:px-6 lg:px-8" dir="rtl">
        <h2 className="headStyle mt-6 mb-10 sm:mt-8 sm:mb-14 lg:mt-10 lg:mb-20 flex justify-center">
          أحدث
          <span className="relative flex flex-col items-center justify-center">
            <span className="ms-2">المقالات</span>
            <span className="absolute top-3 -right-5">
              <LineSvg
                colorOne={"#2243A4"}
                colorTwo={"#2243A4"}
                svgId={"paint_articles"}
                svgWidth="200"
                svgHeight="170"
                strokeWidth="8"
              />
            </span>
          </span>
        </h2>
        <EmptyState
          title="لا توجد مقالات متاحة حالياً"
          subtitle="سيتم نشر مقالات جديدة قريباً — تابعنا للاطلاع على أحدث المحتوى"
        />
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 px-5 sm:px-6 lg:px-8" dir="rtl">
      <h2 className="headStyle mt-6 mb-10 sm:mt-8 sm:mb-14 lg:mt-10 lg:mb-20 flex justify-center">
        أحدث
        <span className="relative flex flex-col items-center justify-center">
          <span className="ms-2">المقالات</span>
          <span className="absolute top-3 -right-5">
            <LineSvg
              colorOne={"#2243A4"}
              colorTwo={"#2243A4"}
              svgId={"paint_articles"}
              svgWidth="200"
              svgHeight="170"
              strokeWidth="8"
            />
          </span>
        </span>
      </h2>

      {/* Mobile & Tablet: grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {articles?.map((article, index) => (
          <MobileArticleCard key={article.slug || index} {...article} />
        ))}
      </div>

      {/* Desktop: accordion hover */}
      <div
        className="hidden lg:flex flex-row gap-3 w-full"
        onMouseLeave={() => setOpenIndex(0)}
      >
        {articles?.map((article, index) => (
          <ArticleCard
            key={article.slug || index}
            {...article}
            isOpen={openIndex === index}
            onHover={() => setOpenIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
