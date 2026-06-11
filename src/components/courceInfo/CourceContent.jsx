"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";

export default function CourceContent({ content = [] }) {
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);

  if (!content?.length) return null;

  const activeSection = content[activeTab];

  return (
    <div className="mt-8" dir="rtl">
      <SectionTitle title="محتوي الكورس" />
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-3 gap-0 border-[#2243A4] rounded-2xl overflow-hidden">
        <div className="p-4 flex flex-col gap-2">
          {content.map((section, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`bg-white flex-row-reverse border-2 flex items-center justify-end gap-3 px-4 py-5 rounded-full w-full text-right transition-all duration-200 cursor-pointer ${
                activeTab === idx ? "border-2 border-[#2243A4] bg-[#EEF1FB]" : "border border-transparent hover:bg-gray-50"
              }`}>
              <span className="font-bold text-sm">{section.title}</span>
              <span className="text-xs font-semibold text-[#2243A4] ms-2">{String(idx + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        <div className="col-span-2 p-4 flex flex-col gap-2 divide-y divide-gray-100">
          {activeSection?.lessons?.map((lesson, idx) => (
            <div key={idx} className=" flex items-center justify-end gap-3 bg-white flex-row-reverse  px-4 py-5 rounded-full w-full text-right transition-all duration-200 cursor-pointer">
              <span className="font-semibold text-sm">{lesson}</span>
              <span className="text-xs font-semibold text-[#2243A4] ms-3 shrink-0">{String(idx + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Accordion Layout */}
      <div className="md:hidden flex flex-col gap-2">
        {content.map((section, idx) => {
          const isOpen = openAccordion === idx;
          return (
            <div key={idx} className={`border rounded-xl overflow-hidden transition-all duration-200 ${isOpen ? "border-[#2243A4]" : "border-gray-200"}`}>
              <button
                onClick={() => setOpenAccordion(isOpen ? null : idx)}
                className={`w-full flex items-center justify-between px-4 py-3 transition-colors duration-200 cursor-pointer ${isOpen ? "bg-[#EEF1FB]" : "bg-white hover:bg-gray-50"}`}>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-[#2243A4]">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="font-bold text-sm">{section.title}</span>
                </div>
                <ChevronDown size={18} className={`text-[#2243A4] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen && (
                <div className="flex flex-col divide-y divide-gray-100 px-4 pb-2 bg-white">
                  {section.lessons?.map((lesson, lessonIdx) => (
                    <div key={lessonIdx} className="flex items-center flex-row-reverse justify-end gap-3 py-3">
                      <span className="text-sm font-medium">{lesson}</span>
                      <span className="text-xs font-semibold text-[#2243A4] ms-3 shrink-0">{String(lessonIdx + 1).padStart(2, "0")}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
