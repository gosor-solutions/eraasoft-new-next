"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";

function CourseSectionAccordion({ section }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left cursor-pointer gap-3"
      >
        <h3 className="text-[#2243A4] text-base sm:text-lg lg:text-xl font-bold text-left">
          {section.title}
        </h3>
        <ChevronDown
          className={`shrink-0 transition duration-300 ${open ? "rotate-180" : ""} text-yellow-400`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div
            className={`flex flex-col divide-y divide-gray-100 transition-all duration-300 ${open ? "pt-3 sm:pt-4" : "pt-0"}`}
          >
            {section.lessons?.map((lesson, lessonIdx) => (
              <div
                key={lessonIdx}
                className="flex items-center justify-start gap-3 py-3"
              >
                <span className="text-xs font-semibold text-[#2243A4] shrink-0">
                  {String(lessonIdx + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-[#4A5565]">
                  {lesson}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CourceContent({ content = [] }) {
  if (!content?.length) return null;
  return (
    <div className="mt-8 flex flex-col gap-4" dir="ltr">
      <SectionTitle title="محتوى الكورس" dir="rtl" />
      <div className="flex flex-col gap-3">
        {content?.map((section, idx) => (
          <CourseSectionAccordion key={idx} section={section} />
        ))}
      </div>
    </div>
  );
}
