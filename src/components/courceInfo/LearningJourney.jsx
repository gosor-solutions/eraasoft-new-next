"use client";

import Image from "next/image";
import React from "react";
import { Sparkles } from "lucide-react";

const PIN_COLORS = [
  "#FB7185", // Coral Pink (Stage 1)
  "#06B6D4", // Turquoise (Stage 2)
  "#A855F7", // Purple (Stage 3)
  "#EAB308", // Yellow / Amber (Stage 4)
  "#38BDF8", // Sky Blue (Stage 5)
  "#10B981", // Emerald Green
  "#F97316", // Orange
];

const DEFAULT_STAGES = [
  {
    number: 1,
    title: "هيكل الدبلومة",
    color: "#FB7185",
    items: [
      "تقسيم المحتوى إلى وحدات تعليمية متسلسلة ومترابطة تضمن بناء المعرفة بشكل تدريجي.",
      "ربط كل وحدة بتطبيقات عملية وورش عمل لترسيخ المفاهيم وتحويلها إلى مهارات قابلة للتنفيذ.",
      "الانتقال من الأساسيات إلى المشاريع المتقدمة وفق خطة واضحة تحاكي احتياجات سوق العمل.",
      "متابعة مستمرة لقياس التقدم وضمان الاستعداد للمراحل التالية من الرحلة التعليمية.",
    ],
  },
  {
    number: 2,
    title: "نظام التقييم الشامل",
    color: "#06B6D4",
    items: [
      "تقييم مستمر يركز على الحضور، الالتزام، تسليم الـ Tasks، وجودة التطبيق العملي.",
      "قياس مستوى الطالب بشكل دوري لتحديد مدى جاهزيته للانتقال إلى المراحل المتقدمة.",
      "يشترط في بعض الأنشطة والبرامج العملية تحقيق نسبة تقييم لا تقل عن 90% لضمان الاستفادة الكاملة من التجربة.",
      "تقديم Feedback مستمر يساعد الطالب على معرفة نقاط القوة وفرص التحسين خلال رحلته التعليمية.",
    ],
  },
  {
    number: 3,
    title: "ورش العمل",
    color: "#A855F7",
    items: [
      "تطبيق عملي على مشاريع وسيناريوهات تحاكي احتياجات الشركات وسوق العمل تحت إشراف مدربين خبراء في المجال.",
      "تُنظم بشكل دوري للطلاب المؤهلين والحاصلين على أكثر من 90% من التقييم، بهدف رفع مستوى التطبيق واكتساب خبرات عملية متقدمة.",
      "تنمية مهارات تحليل المشكلات، والعمل على حلول تقنية وفق أساليب احترافية.",
      "تعزيز الثقة في تنفيذ المشاريع والاستعداد للتعامل مع التحديات التي يواجهها المطورون في بيئة العمل.",
    ],
  },
  {
    number: 4,
    title: "محاكاة يوم العمل",
    color: "#EAB308",
    items: [
      "تقسيم المحتوى إلى وحدات تعليمية متسلسلة ومترابطة تضمن بناء المعرفة بشكل تدريجي.",
      "ربط كل وحدة بتطبيقات عملية وورش عمل لترسيخ المفاهيم وتحويلها إلى مهارات قابلة للتنفيذ.",
      "الانتقال من الأساسيات إلى المشاريع المتقدمة وفق خطة واضحة تحاكي احتياجات سوق العمل.",
      "متابعة مستمرة لقياس التقدم وضمان الاستعداد للمراحل التالية من الرحلة التعليمية.",
    ],
  },
  {
    number: 5,
    title: "مشروع التخرج النهائي (EGP)",
    color: "#38BDF8",
    items: [
      "عرض ومناقشة مشاريع التخرج أمام خبراء و seniors من شركات التكنولوجيا، مع الحصول على تقييم و Feedback احترافي يساعد على تطوير المشروع قبل الانطلاق لسوق العمل.",
      "جلسات ملهمة (Tech Talks) يقدمها مؤثرون وخبراء في مجالات البرمجة وتحليل البيانات والـ AI يشاركون خلالها خبراتهم العملية وأهم التحديات التي واجهوها وكيف وصلوا إلى النجاح.",
    ],
  },
];

function PinMarker({ number, color }) {
  return (
    <svg
      viewBox="0 0 52 64"
      className="w-12 h-14 sm:w-14 sm:h-16 drop-shadow-xl hover:scale-110 transition-transform duration-200"
    >
      <path
        d="M26 0 C11.64 0 0 11.64 0 26 C0 42 26 64 26 64 C26 64 52 42 52 26 C52 11.64 40.36 0 26 0 Z"
        fill={color}
      />
      <circle cx="26" cy="26" r="16" fill="#FFFFFF" />
      <text
        x="26"
        y="33"
        textAnchor="middle"
        fill="#0B1527"
        fontWeight="bold"
        fontSize="18"
        fontFamily="sans-serif"
      >
        {number}
      </text>
    </svg>
  );
}

function useWindowWidth() {
  const [width, setWidth] = React.useState(1440);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function LearningJourney({
  title = "الرحلة التعليمية",
  subtitle = "رحلة تعليمية متكاملة، مصممة بعناية ليك و من أول محاضرة وإحنا معاك في كل خطوة، هتتعلم، وتطبق بإيدك، وتنفذ مشاريع حقيقية، ومع المتابعة المستمرة هتبقى جاهز تدخل سوق العمل بثقة.",
  stages = DEFAULT_STAGES,
}) {
  const n = stages.length;
  const windowWidth = useWindowWidth();

  // Responsive breakpoint percentages for markers
  const getMarkerConfig = (w) => {
    if (w >= 1600) {
      return {
        leftSpread: 88,
        leftOffset: 6,
        topPeak: "31%",
        topValley: "61%",
      };
    } else if (w >= 1400) {
      return {
        leftSpread: 84,
        leftOffset: 8,
        topPeak: "32%",
        topValley: "60%",
      };
    } else if (w >= 1200) {
      return {
        leftSpread: 74,
        leftOffset: 13,
        topPeak: "34%",
        topValley: "58%",
      };
    } else {
      return {
        leftSpread: 76,
        leftOffset: 12,
        topPeak: "35%",
        topValley: "57%",
      };
    }
  };

  const { leftSpread, leftOffset, topPeak, topValley } =
    getMarkerConfig(windowWidth);

  // Coordinate geometry for scalable SVG wave across N stages
  const width = 1200;
  const height = 240;
  const yValley = 205; // Valley (Bottom curve)
  const yPeak = 35; // Peak (Top curve)

  // Generate pure mathematical continuous wave points from -3 cycles to n+2 cycles
  const extraCycles = 3;
  const allPoints = [];
  for (let k = -extraCycles; k <= n - 1 + extraCycles; k++) {
    const isValley = ((k % 2) + 2) % 2 === 0;
    const x = (k / (n - 1)) * (0.9 * width) + 0.05 * width;
    const y = isValley ? yValley : yPeak;
    allPoints.push({ x, y, isValley });
  }

  // Construct smooth cubic Bézier wave
  let pathD = `M ${allPoints[0].x} ${allPoints[0].y}`;
  for (let i = 0; i < allPoints.length - 1; i++) {
    const p0 = allPoints[i];
    const p1 = allPoints[i + 1];
    const segmentDx = p1.x - p0.x;
    const cp1x = p0.x + segmentDx * 0.5;
    const cp1y = p0.y;
    const cp2x = p0.x + segmentDx * 0.5;
    const cp2y = p1.y;
    pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
  }

  return (
    <section
      className="py-20 px-5 sm:px-8 lg:px-13 bg-[#F8FAFC] overflow-hidden relative"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-right max-w-4xl mb-16 sm:mb-44">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <Image
              src="/eraa_icon.png"
              alt="EraaSoft"
              width={36}
              height={36}
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0"
            />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1527] tracking-tight">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-[#64748B] text-sm sm:text-base lg:text-lg leading-relaxed mt-2">
              {subtitle}
            </p>
          )}
        </div>

        {/* Scalable Desktop Wavy Road Graphic (Visible on lg+) */}
        <div className="relative hidden lg:block my-28 min-h-[580px]">
          {/* Full-width continuous SVG Road spanning to edges */}
          <div className="absolute left-1/2 -translate-x-1/2 w-screen top-1/2 -translate-y-1/2 pointer-events-none overflow-visible">
            <svg
              viewBox={`-200 0 ${width + 400} ${height}`}
              className="w-full h-auto overflow-visible"
            >
              {/* Outer Navy Road Base */}
              <path
                d={pathD}
                fill="none"
                stroke="#0B1B4F"
                strokeWidth="42"
                strokeLinecap="butt"
                strokeLinejoin="round"
              />
              {/* Inner Road Accent */}
              <path
                d={pathD}
                fill="none"
                stroke="#122A75"
                strokeWidth="32"
                strokeLinecap="butt"
                strokeLinejoin="round"
              />
              {/* White Dashed Center Lane */}
              <path
                d={pathD}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="4"
                strokeDasharray="12 12"
                strokeLinecap="butt"
              />
            </svg>
          </div>

          {/* Scalable Stage Points (Pins & Content Cards) */}
          <div className="relative w-full h-[580px]">
            {stages.map((stage, i) => {
              const isPeak = i % 2 !== 0; // True for even numbers: 2, 4 (top)
              const leftPercent = (i / (n - 1)) * leftSpread + leftOffset;
              const topValue = isPeak ? topPeak : topValley;
              const color = stage.color || PIN_COLORS[i % PIN_COLORS.length];

              return (
                <div
                  key={i}
                  className="absolute -translate-x-1/2 flex flex-col items-center"
                  style={{
                    left: `${leftPercent}%`,
                    top: topValue,
                  }}
                >
                  {/* Pin sitting right on the road curve */}
                  <div className="relative z-20 cursor-pointer -translate-y-12">
                    <PinMarker number={stage.number || i + 1} color={color} />
                  </div>

                  {/* Content Card (Above on Peaks, Below on Valleys) */}
                  <div
                    className={`absolute w-60 sm:w-64 text-right transition-all duration-300 ${
                      isPeak
                        ? "bottom-[120px] pb-4"
                        : "top-[60px] right-[-70px] pt-4"
                    }`}
                  >
                    <h3 className="font-extrabold text-[#0B1527] text-base sm:text-lg mb-2.5">
                      {stage.title}
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                      {stage.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-slate-400 font-bold text-sm leading-none mt-0.5">
                            •
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Responsive Mobile / Tablet Vertical Roadmap (< lg) */}
        <div className="lg:hidden relative border-r-2 border-primary/30 mr-4 pr-7 space-y-12">
          {stages.map((stage, i) => {
            const color = stage.color || PIN_COLORS[i % PIN_COLORS.length];
            return (
              <div key={i} className="relative group">
                {/* Pin Node */}
                <div
                  className="absolute -right-[46px] top-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-base shadow-md border-2 border-white transition-transform group-hover:scale-110"
                  style={{ backgroundColor: color }}
                >
                  {stage.number || i + 1}
                </div>

                {/* Content Details */}
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-[#0B1527] text-base sm:text-lg mb-3">
                    {stage.title}
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {stage.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
