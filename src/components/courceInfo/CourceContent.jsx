"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  BookOpen,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

export function formatSectionsCount(count) {
  const n = Math.abs(parseInt(count, 10)) || 0;
  if (n === 0) return "0 قسم";
  if (n === 1) return "قسم واحد";
  if (n === 2) return "قسمان";
  if (n >= 3 && n <= 10) return `${n} أقسام`;
  return `${n} قسم`;
}

function SubTopicCard({ index, subTopic }) {
  return (
    <div className="bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 border border-slate-100/90 hover:border-blue-200 transition-all text-left h-auto">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-7 h-7 rounded-lg bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
          {String(index + 1).padStart(2, "0")}
        </div>
        <h4 className="font-bold text-sm sm:text-base text-[#0B1527]">
          {subTopic.title}
        </h4>
      </div>
      <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
        {subTopic.items?.map((item, itemIdx) => (
          <li key={itemIdx} className="flex items-start gap-2">
            <span className="text-primary font-bold text-sm leading-none mt-0.5">
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CourseStatsCard({ totalSessions, durationWeeks, totalHours }) {
  return (
    <div
      className="shrink-0 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
      dir="rtl"
    >
      <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs sm:text-sm text-slate-600">
        <span>إجمالي السيشنات</span>
        <span className="font-bold text-[#0B1527] text-sm sm:text-base">
          {totalSessions}
        </span>
      </div>
      <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs sm:text-sm text-slate-600">
        <span>مدة الدبلومة</span>
        <span className="font-bold text-[#0B1527] text-sm sm:text-base">
          {durationWeeks} أسبوع
        </span>
      </div>
      <div className="flex items-center justify-between pt-3 text-xs sm:text-sm">
        <span className="font-bold text-primary">إجمالي الساعات</span>
        <span className="font-black text-primary text-sm sm:text-base">
          {totalHours} ساعة
        </span>
      </div>
    </div>
  );
}

export default function CourceContent({ content = [], course }) {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [openMobileIndex, setOpenMobileIndex] = useState(0);

  const modules =
    content && content.length > 0
      ? content.map((section, idx) => {
          const lessons = section.lessons || [];
          // Group lessons into 2-3 items per sub-topic card
          const subTopics = [];
          for (let i = 0; i < lessons.length; i += 2) {
            subTopics.push({
              title: section.title || `القسم ${Math.floor(i / 2) + 1}`,
              items: lessons
                .slice(i, i + 2)
                .map((l) => (typeof l === "string" ? l : l.title || l.name)),
            });
          }
          if (subTopics.length === 0) {
            subTopics.push({
              title: section.title || "المحتوى",
              items: ["تطبيق عملي وتدريبات شاملة على موضوعات القسم"],
            });
          }

          return {
            phase: section.phase || `المرحلة ${idx + 1}`,
            title: section.title || `Module ${idx + 1}`,
            lessons_count: lessons.length || 4,
            sessions_count:
              section.sessions_count || Math.max(lessons.length * 2, 6),
            sub_topics: subTopics,
          };
        })
      : defaultModules;

  const activeModule = modules[activeModuleIndex] || modules[0];

  const totalSessions =
    course?.sessions_count ||
    modules.reduce((acc, m) => acc + (m.sessions_count || 0), 0) ||
    67;
  const durationWeeks = course?.weeks_number || 33;
  const totalHours = course?.hours_number || 500;

  return (
    <section
      id="course-content"
      className="py-16 px-5 sm:px-8 lg:px-13 bg-[#F8FAFC] scroll-mt-20"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-right max-w-4xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <Image
              src="/eraa_icon.png"
              alt="EraaSoft"
              width={36}
              height={36}
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0"
            />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1527] tracking-tight">
              ماذا ستتعلم؟
            </h2>
          </div>
          <p className="text-[#64748B] text-sm sm:text-base lg:text-lg leading-relaxed mt-2">
            منهج تدريبي مصمم بعناية لينقلك من الأساسيات إلى الاحتراف، من خلال
            Modules مترابطة تغطي جميع جوانب UX Research و UI Design و
            Prototyping و Design Systems ومشروع التخرج.
          </p>
        </div>

        {/* Mobile View: Single-Column Accordion */}
        <div className="flex lg:hidden flex-col gap-3">
          {modules.map((m, idx) => {
            const isOpen = openMobileIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-primary/40 shadow-sm"
                    : "border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenMobileIndex(isOpen ? null : idx)}
                  className="w-full p-4 flex items-center justify-between gap-3 text-left cursor-pointer"
                  dir="ltr"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-primary text-white shadow-md"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="min-w-0">
                      <span
                        dir="rtl"
                        className="text-[11px] font-semibold text-primary block truncate"
                      >
                        {m.phase}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-[#0B1527] truncate">
                        {m.title.replace(/^Module \d+:\s*/, "")}
                      </h4>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {/* Accordion Content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-4 pt-0 border-t border-slate-100 flex flex-col gap-3">
                      {/* Badges */}
                      <div
                        className="flex items-center gap-2 pt-3"
                        dir="rtl"
                      >
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50/80 text-primary text-xs font-semibold border border-blue-100">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{formatSectionsCount(m.lessons_count || 5)}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50/80 text-primary text-xs font-semibold border border-blue-100">
                          <span>{m.sessions_count || 10} سيشن</span>
                        </span>
                      </div>

                      {/* Sub-Topics List */}
                      <div className="flex flex-col gap-3 mt-1" dir="ltr">
                        {m.sub_topics?.map((subTopic, sIdx) => (
                          <SubTopicCard
                            key={sIdx}
                            index={sIdx}
                            subTopic={subTopic}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="mt-2">
            <CourseStatsCard
              totalSessions={totalSessions}
              durationWeeks={durationWeeks}
              totalHours={totalHours}
            />
          </div>
        </div>

        {/* Desktop View: 2-Column Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4 flex flex-col gap-4 h-fit">
            {/* Modules List Stack */}
            <div
              className="overflow-y-auto flex flex-col gap-2.5 max-h-[440px] pr-1"
              dir="ltr"
            >
              {modules.map((m, idx) => {
                const isActive = idx === activeModuleIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveModuleIndex(idx);
                      setIsExpanded(true);
                    }}
                    className={`w-full p-4 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between text-left shrink-0 ${
                      isActive
                        ? "bg-white border-2 border-primary shadow-md shadow-primary/5 text-[#0B1527]"
                        : "bg-white border border-slate-200/70 hover:border-slate-300 hover:bg-slate-50/50 text-slate-700"
                    }`}
                    dir="ltr"
                  >
                    <div>
                      <div
                        dir="rtl"
                        className={`text-[11px] sm:text-xs font-semibold block mb-0.5 ${isActive ? "text-primary" : "text-primary/80"}`}
                      >
                        {m.phase}
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-[#0B1527]">
                        {m.title.replace(/^Module \d+:\s*/, "")}
                      </h4>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {idx + 1}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Stats Card */}
            <CourseStatsCard
              totalSessions={totalSessions}
              durationWeeks={durationWeeks}
              totalHours={totalHours}
            />
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-200/80 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col h-fit max-h-[640px] overflow-hidden">
              {/* Module Header Bar */}
              <div className="shrink-0 flex items-start justify-between gap-4 mb-5">
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="طي أو توسيع"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                <div className="flex items-end gap-4 text-left" dir="ltr">
                  <div className="w-11 h-11 rounded-2xl bg-primary text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-md">
                    {String(activeModuleIndex + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-primary tracking-wide block mb-0.5">
                      {activeModule.phase}
                    </span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0B1527]">
                      {activeModule.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Module Badges */}
              <div
                className="shrink-0 flex items-center justify-start gap-3 mb-5"
                dir="rtl"
              >
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-blue-50/80 text-primary text-xs sm:text-sm font-semibold border border-blue-100">
                  <BookOpen className="w-4 h-4" />
                  <span>{formatSectionsCount(activeModule.lessons_count || 5)}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-sm bg-blue-50/80 text-primary text-xs sm:text-sm font-semibold border border-blue-100">
                  <span>{activeModule.sessions_count || 10} سيشن</span>
                </span>
              </div>

              {/* Sub-Topics 2x2 Grid */}
              {isExpanded && (
                <div
                  className="overflow-y-auto flex-1 pr-1 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200"
                  dir="ltr"
                >
                  {activeModule.sub_topics?.map((subTopic, idx) => (
                    <SubTopicCard key={idx} index={idx} subTopic={subTopic} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const defaultModules = [
  {
    phase: "Phase 1 — UX Foundations",
    title: "Module 1: Design Thinking",
    lessons_count: 5,
    sessions_count: 10,
    sub_topics: [
      {
        title: "Design Thinking",
        items: [
          "Intro to Python, Variables & Data Types, Type Casting, Operators",
          "Conditional Statements, for/while Loops, break/continue/pass",
        ],
      },
      {
        title: "Design Thinking",
        items: [
          "Lists, Tuples, Dictionaries, Sets",
          "Functions: Parameters, Return Values, Lambda, Scope",
        ],
      },
      {
        title: "Design Thinking",
        items: [
          "Error Handling (try/except/finally), Custom Exceptions",
          "File Handling: Reading/Writing, CSV & JSON files",
        ],
      },
      {
        title: "Design Thinking",
        items: [
          "Searching Algorithms (Linear, Binary), Sorting (Bubble Sort), Recursion",
          "OOP: Classes & Objects, Inheritance, Polymorphism",
        ],
      },
    ],
  },
  {
    phase: "Phase 1 — UX Foundations",
    title: "Module 2: User Research & Analysis",
    lessons_count: 4,
    sessions_count: 8,
    sub_topics: [
      {
        title: "User Research Basics",
        items: [
          "Qualitative & Quantitative Research Methods",
          "Conducting User Interviews & Surveys",
        ],
      },
      {
        title: "Personas & Empathy Maps",
        items: [
          "Creating User Personas & Empathy Mapping",
          "User Journey Mapping & Pain Point Identification",
        ],
      },
    ],
  },
  {
    phase: "Phase 2 — UI Design",
    title: "Module 3: Wireframing & Prototyping",
    lessons_count: 6,
    sessions_count: 12,
    sub_topics: [
      {
        title: "Low & High Fidelity Wireframes",
        items: [
          "Information Architecture & Sitemap Creation",
          "Figma Component Systems & Auto-layout",
        ],
      },
      {
        title: "Interactive Prototyping",
        items: [
          "Smart Animate & Micro-interactions",
          "Usability Testing & Iteration Loops",
        ],
      },
    ],
  },
  {
    phase: "Phase 2 — UI Design",
    title: "Module 4: Design Systems",
    lessons_count: 5,
    sessions_count: 10,
    sub_topics: [
      {
        title: "Design Tokens & Variables",
        items: [
          "Color Palettes, Typography Scales, Grid Systems",
          "Design Tokens Architecture & Variables in Figma",
        ],
      },
      {
        title: "Component Libraries",
        items: [
          "Creating Reusable Master Components & Variants",
          "Documentation & Handoff to Developers",
        ],
      },
    ],
  },
  {
    phase: "Phase 3 — Final Project",
    title: "Module 5: Portfolio & Graduation Project",
    lessons_count: 4,
    sessions_count: 12,
    sub_topics: [
      {
        title: "Case Study Creation",
        items: [
          "Storytelling & UX Case Study Structuring",
          "Showcasing Process on Behance & Portfolio",
        ],
      },
      {
        title: "Final Review & Defense",
        items: [
          "Comprehensive Project Defense with Industry Mentors",
          "CV & Interview Preparation for UX/UI Roles",
        ],
      },
    ],
  },
];
