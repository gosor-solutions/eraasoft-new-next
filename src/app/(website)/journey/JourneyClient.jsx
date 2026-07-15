"use client";

import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import HeroCarousel from "@/components/shared/HeroCarusel";

export default function JourneyClient({ pageData, initialStages = [] }) {
  const STAGES = initialStages.length > 0 ? initialStages.map((stage) => {
    return {
      id: stage?.order || stage?.id,
      titleAr: stage?.title,
      image: stage?.image,
      sections: [
        {
          title: stage?.subtitle,
          points: stage?.points || []
        }
      ]
    };
  }) : [];
  // }) : DEFAULT_STAGES;

  const [activeStage, setActiveStage] = useState(1);
  const [hoveredStage, setHoveredStage] = useState(null);

  const activeData = STAGES.find(s => s.id === activeStage) || STAGES[0];

  const handleNext = () => {
    if (activeStage < STAGES.length) {
      setActiveStage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStage > 1) {
      setActiveStage(prev => prev - 1);
    }
  };

  const renderIcon = (stage, size = 40, className = "") => {
    if (!stage?.image) return null;
    return (
      <img 
        src={stage?.image} 
        alt={stage?.titleAr} 
        className={`object-contain ${className}`}
        style={{ width: size, height: size }} 
      />
    );
  };

  return (
    <div className=" min-h-screen text-white" dir="rtl">
      <HeroCarousel
        head={pageData?.title || "الرحلة التعليمية"}
        description={pageData?.description || "خطوات مدروسة بعناية نرافقك فيها من البداية وحتى إطلاق أولى خطواتك المهنية بنجاح في سوق العمل."}
        image={pageData?.image || null}
      />

      {/* Visual Educational Journey Flow Container */}
      <div className="py-12 px-4 md:pt-16 pb-4 relative overflow-hidden w-full bg-[#1b3583]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="w-full max-w-[95%] xl:max-w-[90%] mx-auto">
          {/* Main Headline */}
          <div className="relative z-10 text-center mb-12">
            <h2 className="text-white text-2xl md:text-4xl font-black inline-block border-b-4 border-yellow-500 pb-3 tracking-wide">
              مخطط الرحلة التعليمية
            </h2>
          </div>

          {/* Desktop Timeline Container with Arrows */}
          <div className="relative hidden lg:block my-16 md:mb-4 px-6">
            <div className="flex items-center justify-between w-full">
              {STAGES.map((stage, idx) => {
                const isActive = stage.id === activeStage;

                // Determine opacity class for transition & dimming effect
                let opacityClass = "opacity-100 scale-100";
                if (hoveredStage !== null) {
                  if (stage.id !== hoveredStage && !isActive) {
                    opacityClass = "opacity-30 scale-90";
                  } else {
                    opacityClass = "opacity-100 scale-110";
                  }
                } else if (activeStage !== null) {
                  if (!isActive) {
                    opacityClass = "opacity-50 scale-95";
                  } else {
                    opacityClass = "opacity-100 scale-110";
                  }
                }

                return (
                  <div key={stage.id} className="flex items-center flex-1 justify-center">
                    {/* Stage Button */}
                    <button
                      onClick={() => setActiveStage(stage.id)}
                      onMouseEnter={() => setHoveredStage(stage.id)}
                      onMouseLeave={() => setHoveredStage(null)}
                      className={`flex flex-col items-center justify-center focus:outline-none cursor-pointer transition-all duration-300 ${opacityClass}`}
                    >
                      {/* Circle Container */}
                      <div className={`
                        relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl
                        ${isActive 
                          ? 'bg-yellow-500 ring-4 ring-white shadow-yellow-500/40' 
                          : 'bg-white hover:bg-slate-100'
                        }
                      `}>
                        {renderIcon(stage, 44, isActive ? "brightness-0" : "")}
                        {/* Number Badge */}
                        <span className={`
                          absolute -top-2 right-1/2 translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shadow-md
                          ${isActive ? 'bg-white text-[#2243a4]' : 'bg-yellow-500 text-slate-955'}
                        `}>
                          {stage.id}
                        </span>
                      </div>

                      {/* Title */}
                      <span className={`
                        mt-5 text-sm xl:text-base font-black transition-colors duration-200 text-center h-20
                        ${isActive ? 'text-yellow-400' : 'text-white/80 group-hover:text-white'}
                      `}>
                        {stage?.titleAr}
                      </span>
                    </button>

                    {/* Arrow representation pointing Left (RTL Flow) */}
                    {idx < STAGES.length - 1 && (
                      <div className="flex-1 flex items-center justify-center text-yellow-500 font-extrabold text-4xl -mt-24 mx-3 animate-pulse">
                        ←
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile & Tablet Slider View */}
          <div className="lg:hidden flex flex-col items-center justify-center py-6">
            <div className="flex items-center gap-6 w-full justify-between max-w-md">
              <button 
                onClick={handleNext} 
                disabled={activeStage === STAGES.length}
                className="p-4 rounded-full bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                aria-label="التالي"
              >
                <ChevronRight size={28} />
              </button>

              <div className="flex flex-col items-center">
                {/* Circle Container */}
                <div className="relative w-32 h-32 rounded-full bg-yellow-500 text-slate-900 flex items-center justify-center shadow-2xl ring-4 ring-white animate-pulse">
                  {renderIcon(activeData, 52, "brightness-0")}
                  <span className="absolute -top-2 right-1/2 translate-x-1/2 w-9 h-9 rounded-full bg-white text-slate-955 flex items-center justify-center text-base font-black shadow-lg">
                    {activeStage}
                  </span>
                </div>
                <h3 className="text-yellow-400 font-black text-xl mt-5 text-center">
                  {activeData?.titleAr}
                </h3>
              </div>

              <button 
                onClick={handlePrev} 
                disabled={activeStage === 1}
                className="p-4 rounded-full bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                aria-label="السابق"
              >
                <ChevronLeft size={28} />
              </button>
            </div>

            {/* Mobile Progress Dots */}
            <div className="flex gap-3 mt-8">
              {STAGES.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${stage.id === activeStage ? 'bg-yellow-500 w-8' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Stage Detail Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 md:py-8">
        <div className="bg-[#1b3583] rounded-3xl p-8 md:p-16 shadow-2xl border border-white/10 relative overflow-hidden">
          {/* White Header Box with Yellow Dash */}
          <div className="bg-white text-[#2243a4] font-black text-xl md:text-3xl py-4 px-6 md:px-10 rounded-lg shadow-xl mb-12 inline-flex items-center gap-4 w-full md:w-auto">
            <span className="w-3 h-10 bg-yellow-500 rounded-sm shrink-0"></span>
            <span>{activeData?.titleAr}</span>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
            {/* Big & Bold Text Content */}
            <div className="flex-1 space-y-10">
              {activeData?.sections?.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-yellow-400 font-black text-2xl md:text-3xl tracking-wide">
                    {section?.title}
                  </h3>
                  {section?.paragraph && (
                    <p className="text-white font-extrabold text-base md:text-lg leading-relaxed">
                      {section?.paragraph}
                    </p>
                  )}
                  {section.points && section.points.length > 0 && (
                    <ul className="space-y-3">
                      {section.points.map((point, index) => (
                        <li key={index} className="flex items-start gap-3.5 text-white font-extrabold text-base md:text-lg leading-relaxed">
                          <span className="text-yellow-500 font-black text-xl mt-0.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Glowing Big Icon at the end */}
            <div className="shrink-0 flex items-center justify-center w-56 h-56 md:w-72 md:h-72 rounded-full bg-white/5 border-4 border-yellow-500/20 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent opacity-100 transition-opacity"></div>
              {renderIcon(activeData, 144, "")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DEFAULT_STAGES = [
  {
    "id": 1,
    "titleAr": "هيكل الدبلومة",
    "image": "https://panel.eraasoft.com/storage/learning-journeys/book-open.svg",
    "sections": [
      {
        "title": "تنظيم المحتوى والربط بالتطبيق العملي",
        "points": [
          "تقسيم الدبلومة إلى وحدات تعليمية متسلسلة تنتهي بورشة عمل تطبيقية.",
          "تسهيل تتبع الرحلة التعليمية وربط المفاهيم النظرية بالتطبيق الفعلي.",
          "إعداد الطالب بشكل تدريجي ومنظم للمراحل العملية المتقدمة."
        ]
      }
    ]
  },
  {
    "id": 2,
    "titleAr": "نظام التقييم الشامل",
    "image": "https://panel.eraasoft.com/storage/learning-journeys/clipboard-check.svg",
    "sections": [
      {
        "title": "قياس الأداء ومعايير الانتقال والقبول",
        "points": [
          "تقييم مستمر يركز على الحضور، تسليم المهام، والأداء في ورش العمل.",
          "تحديد أهلية الطالب للانتقال للمراحل العملية المتقدمة بناءً على أدائه.",
          "تطلب بعض المراحل المتقدمة الحصول على تقييم لا يقل عن 90%."
        ]
      }
    ]
  },
  {
    "id": 3,
    "titleAr": "ورش العمل",
    "image": "https://panel.eraasoft.com/storage/learning-journeys/users.svg",
    "sections": [
      {
        "title": "التطبيق العملي المباشر وحل المشكلات",
        "points": [
          "مساحة تفاعلية لبناء مشاريع حقيقية وتطبيق المفاهيم تحت إشراف الموجهين.",
          "تُعقد 4 مرات سنوياً للطلاب المؤهلين الحاصلين على تقييم 90% فأكثر.",
          "توفير تجربة حل المشكلات الفنية الواقعية لتعزيز الجاهزية لسوق العمل."
        ]
      }
    ]
  },
  {
    "id": 4,
    "titleAr": "معسكرات إيراسوفت",
    "image": "https://panel.eraasoft.com/storage/learning-journeys/flame.svg",
    "sections": [
      {
        "title": "المشاريع المتكاملة وتطوير العمل الجماعي",
        "points": [
          "معسكر عملي مكثف يركز على تنفيذ مشروع مستقل ومتكامل من البداية للنهاية.",
          "تطوير مهارات العمل الجماعي وتجربة آليات التنفيذ داخل الشركات البرمجية.",
          "تُعقد 3 مرات سنوياً للطلاب المتميزين الحاصلين على تقييم 90% فأكثر."
        ]
      }
    ]
  },
  {
    "id": 5,
    "titleAr": "محاكاة يوم العمل",
    "image": "https://panel.eraasoft.com/storage/learning-journeys/briefcase-business.svg",
    "sections": [
      {
        "title": "تجربة بيئة العمل الحقيقية داخل الشركات",
        "points": [
          "محاكاة كاملة لدورة العمل باستخدام أدوات إدارة المشاريع والاجتماعات التقييمية.",
          "العمل ضمن فرق برمجية ملتزمة بمهام محددة وعروض للمشاريع (Demo Sessions).",
          "تُعقد 6 مرات سنوياً للطلاب المؤهلين بنسبة تقييم تتراوح بين 90% إلى 100%."
        ]
      }
    ]
  },
  {
    "id": 6,
    "titleAr": "تأثير إيراسوفت (EraaSoft Impact)",
    "image": "https://panel.eraasoft.com/storage/learning-journeys/rocket.svg",
    "sections": [
      {
        "title": "التأهيل المهني والمهارات الشخصية لسوق العمل",
        "points": [
          "بناء سيرة ذاتية احترافية تتجاوز أنظمة الفرز التلقائي (ATS Score).",
          "تحسين حساب LinkedIn وبناء العلامة الشخصية لجذب مسؤولي التوظيف.",
          "التحضير للمقابلات الشخصية وتطوير مهارات التواصل بالإنجليزية في بيئة العمل."
        ]
      }
    ]
  },
  {
    "id": 7,
    "titleAr": "مشروع التخرج النهائي (EGP)",
    "image": "https://panel.eraasoft.com/storage/learning-journeys/trophy.svg",
    "sections": [
      {
        "title": "الحدث الختامي وعرض المشاريع لشركاء التوظيف",
        "points": [
          "المرحلة النهائية الكبرى وتشمل حفل التخرج ومناقشة المشاريع النهائية.",
          "لقاءات مباشرة مع الشركات والشركاء لتقديم فرص التوظيف والتدريب المتاحة.",
          "يشترط للاستفادة من الفرص الحصول على تقييم تراكمي من 90% إلى 100%."
        ]
      }
    ]
  },
  {
    "id": 8,
    "titleAr": "EraaSoft Community",
    "image": "https://panel.eraasoft.com/storage/learning-journeys/sparkles.svg",
    "sections": [
      {
        "title": "مجتمع تفاعلي مستمر لدعم النمو المهني والتوظيف",
        "points": [
          "ربط الطلاب والخريجين بشبكة واسعة من الشركات وأصحاب الأعمال لتسهيل التوظيف.",
          "تنظيم ملتقيات التوظيف واللقاءات السنوية لتوفير فرص تدريب وعمل حقيقية.",
          "تقديم توجيه مهني مستمر وجلسات إرشاد وتسهيل تبادل الخبرات."
        ]
      }
    ]
  }
];
