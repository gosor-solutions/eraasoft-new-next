"use client";

import { useState } from "react";
import { 
  BookOpen, 
  ClipboardCheck, 
  Users, 
  Flame, 
  Briefcase, 
  Sparkles, 
  Trophy, 
  Rocket,
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import HeroCarousel from "@/components/shared/HeroCarusel";



export default function JourneyPage() {
  const [activeStage, setActiveStage] = useState(1);
  const [hoveredStage, setHoveredStage] = useState(null);

  const activeData = STAGES.find(s => s.id === activeStage) || STAGES[0];
  const IconComponent = activeData.icon;

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

  return (
    <div className=" min-h-screen text-white" dir="rtl">
      <HeroCarousel
        head="الرحلة التعليمية"
        description="خطوات مدروسة بعناية نرافقك فيها من البداية وحتى إطلاق أولى خطواتك المهنية بنجاح في سوق العمل."
        image={null}
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
                const StageIcon = stage.icon;
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
                          ? 'bg-yellow-500 text-slate-900 ring-4 ring-white shadow-yellow-500/40' 
                          : 'bg-white text-[#2243a4] hover:bg-slate-100'
                        }
                      `}>
                        <StageIcon size={40} />
                        {/* Number Badge */}
                        <span className={`
                          absolute -top-2 right-1/2 translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shadow-md
                          ${isActive ? 'bg-white text-[#2243a4]' : 'bg-yellow-500 text-slate-950'}
                        `}>
                          {stage.id}
                        </span>
                      </div>

                      {/* Title */}
                      <span className={`
                        mt-5 text-sm xl:text-base font-black transition-colors duration-200 text-center h-20
                        ${isActive ? 'text-yellow-400' : 'text-white/80 group-hover:text-white'}
                      `}>
                        {stage.titleAr}
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
                  <IconComponent size={48} />
                  <span className="absolute -top-2 right-1/2 translate-x-1/2 w-9 h-9 rounded-full bg-white text-slate-950 flex items-center justify-center text-base font-black shadow-lg">
                    {activeStage}
                  </span>
                </div>
                <h3 className="text-yellow-400 font-black text-xl mt-5 text-center">
                  {activeData.titleAr}
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
            <span>{activeData.titleAr}</span>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
            {/* Big & Bold Text Content */}
            <div className="flex-1 space-y-10">
              {activeData.sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-yellow-400 font-black text-2xl md:text-3xl tracking-wide">
                    {section.title}
                  </h3>
                  {section.paragraph && (
                    <p className="text-white font-extrabold text-base md:text-lg leading-relaxed">
                      {section.paragraph}
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
              <IconComponent className="w-28 h-28 md:w-36 md:h-36 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}



const STAGES = [
  {
    "id": 1,
    "titleAr": "هيكل الدبلومة",
    icon: BookOpen,
    "sections": [
      {
        "title": "الفكرة",
        "paragraph": "تُقسم كل دبلومة إلى وحدات تعليمية متسلسلة. تنتهي كل وحدة بورشة عمل تساعد الطالب على تحويل المفاهيم النظرية إلى تطبيق عملي."
      },
      {
        "title": "لماذا توجد هذه المرحلة؟",
        "points": [
          "لتنظيم المحتوى.",
          "لربط التعلم بالتطبيق.",
          "لتسهيل متابعة الرحلة على الطالب.",
          "لإعداد الطالب للمراحل العملية القادمة."
        ]
      }
    ]
  },
  {
    "id": 2,
    "titleAr": "نظام التقييم الشامل",
    icon: ClipboardCheck,
    "sections": [
      {
        "title": "ماذا يقيس؟",
        "paragraph": "يعتمد التقييم على ثلاثة ركائز أساسية:",
        "points": [
          "الحضور والالتزام.",
          "تسليم المهام.",
          "الأداء في ورش العمل."
        ]
      },
      {
        "title": "لماذا هو مهم؟",
        "points": [
          "يساعد في تتبع أداء الطالب وتحديد أهليته للانتقال إلى المراحل التالية."
        ]
      },
      {
        "title": "مبدأ الأهلية",
        "paragraph": "بعض المراحل متاحة لجميع الطلاب. ومراحل أخرى تتطلب تلبية معايير أداء محديدة، وتحديداً الحصول على تقييم يتراوح بين 90% و100%. ينطبق هذا على:",
        "points": [
          "ورش العمل.",
          "معسكرات إيراسوفت.",
          "محاكاة يوم العمل.",
          "مناقشات مشروع التخرج (EGP) والفرص المتاحة."
        ]
      }
    ]
  },
  {
    "id": 3,
    "titleAr": "ورش العمل",
    icon: Users,
    "sections": [
      {
        "title": "ما هي؟",
        "paragraph": "مساحة للتطبيق العملي المباشر، حيث يشاهد الطالب المدرب وهو يبني حلولاً ومشاريع حقيقية، ويشارك في تنفيذ أجزاء من المشروع تحت إشراف المدرب والموجهين (Mentors)."
      },
      {
        "title": "لماذا هي مهمة؟",
        "points": [
          "تحويل المفاهيم إلى تطبيق عملي.",
          "تنفيذ أجزاء من مشاريع حقيقية.",
          "تطوير مهارات حل المشكلات.",
          "تعزيز الاستعداد العملي."
        ]
      },
      {
        "title": "المواعيد والأهلية",
        "paragraph": "تُعقد أربع مرات سنوياً. المشاركة متاحة للطلاب الذين يحققون تقييماً يتراوح بين 90% و100%.",
        "points": [
          "الأسبوع الأول من شهر مارس.",
          "الأسبوع الأول من شهر يونيو.",
          "الأسبوع الأول من شهر سبتمبر.",
          "الأسبوع الأول من شهر ديسمبر."
        ]
      }
    ]
  },
  {
    "id": 4,
    "titleAr": "معسكرات إيراسوفت",
    icon: Flame,
    "sections": [
      {
        "title": "ما هي؟",
        "paragraph": "مرحلة عملية يعمل فيها الطلاب المؤهلون على مشروع مستقل ومتكامل، يختلف عن المشاريع الأساسية للدبلومة."
      },
      {
        "title": "لماذا توجد هذه المرحلة؟",
        "points": [
          "لتنفيذ مشروع كامل من البداية إلى النهاية.",
          "لتطوير مهارات العمل الجماعي.",
          "لمحاكاة متطلبات الشركات.",
          "لإعداد الطالب للمراحل النهائية من الرحلة."
        ]
      },
      {
        "title": "المواعيد والأهلية",
        "paragraph": "تُعقد ثلاث مرات سنوياً. المشاركة متاحة للطلاب الذين يحققون تقييماً يتراوح بين 90% و100%.",
        "points": [
          "مارس.",
          "أغسطس.",
          "نوفمبر."
        ]
      }
    ]
  },
  {
    "id": 5,
    "titleAr": "محاكاة يوم العمل",
    icon: Briefcase,
    "sections": [
      {
        "title": "ما هي؟",
        "paragraph": "تجربة تحاكي بيئة العمل الفعلية داخل شركات البرمجيات."
      },
      {
        "title": "تتضمن:",
        "points": [
          "أدوات إدارة المشاريع.",
          "تخطيط دورات العمل (Sprint Planning).",
          "فرق التطوير.",
          "المهام والمواعيد النهائية.",
          "مراجعة العمل.",
          "جلسة العرض (Demo Session).",
          "الاجتماع التقييمي (Retrospective Meeting).",
          "جلسة المهارات الشخصية."
        ]
      },
      {
        "title": "المواعيد والأهلية",
        "paragraph": "تُعقد ست مرات سنوياً. المشاركة متاحة للطلاب الذين يحققون تقييماً يتراوح بين 90% و100%.",
        "points": [
          "فبراير.",
          "أبريل.",
          "يونيو.",
          "أغسطس.",
          "أكتوبر.",
          "ديسمبر."
        ]
      }
    ]
  },
{
      "id": 6,
      "titleAr": "تأثير إيراسوفت (EraaSoft Impact)",
      icon: Rocket,
      "sections": [
        {
          "title": "ما هو EraaSoft Impact؟",
          "paragraph": "هو برنامج مخصص لطلاب EraaSoft، هدفه تجهيزك بالمهارات المطلوبة لسوق العمل وجعلك مستعداً لأول وظيفة أو أول عميل Freelance. نحن لا نركز على الجانب التقني فقط، بل نساعدك في بناء كل الأدوات التي تبحث عنها الشركات والعملاء."
        },
        {
          "title": "ماذا ستتعلم؟ - السيرة الذاتية (Professional CV)",
          "points": [
            "كتابة CV احترافي.",
            "تحسين الـ ATS Score.",
            "تجنب الأخطاء الشائعة.",
            "تخصيص الـ CV لكل وظيفة."
          ]
        },
        {
          "title": "ماذا ستتعلم؟ - تحسين لينكد إن (LinkedIn Optimization)",
          "points": [
            "إنشاء بروفايل احترافي.",
            "بناء العلامة التجارية الشخصية (Personal Branding).",
            "بناء شبكة علاقات.",
            "التقديم على الوظائف.",
            "التواصل مع مسؤولي التوظيف (Recruiters)."
          ]
        },
        {
          "title": "ماذا ستتعلم؟ - أساسيات العمل الحر (Freelancing Essentials)",
          "points": [
            "اختيار منصة العمل المناسبة.",
            "إنشاء معرض أعمال (Portfolio).",
            "كتابة عرض احترافي (Proposal).",
            "التسعير.",
            "الحصول على أول عميل."
          ]
        },
        {
          "title": "ماذا ستتعلم؟ - الإنجليزية للنجاح المهني (English for Career Success)",
          "points": [
            "تقديم نفسك باحترافية.",
            "اللغة الإنجليزية للمقابلات الشخصية (English for Interviews).",
            "التواصل في بيئة العمل (Workplace Communication).",
            "كتابة رسائل البريد الإلكتروني (Emails) والرسائل الاحترافية."
          ]
        },
        {
          "title": "ماذا ستتعلم؟ - التحضير للمقابلات (Interview Preparation)",
          "points": [
            "مقابلات الموارد البشرية (HR Interview).",
            "المقابلات التقنية (Technical Interview).",
            "الأسئلة السلوكية (Behavioral Questions).",
            "كيفية الإجابة بثقة.",
            "أخطاء يجب تجنبها."
          ]
        },
        {
          "title": "ماذا ستتعلم؟ - بناء العلامة الشخصية والتواصل (Personal Branding & Networking)",
          "points": [
            "بناء البراند الشخصي.",
            "صناعة المحتوى على LinkedIn.",
            "توسيع شبكة العلاقات.",
            "الوصول إلى فرص العمل."
          ]
        },
        {
          "title": "ماذا ستحقق؟",
          "paragraph": "بعد إنهاء EraaSoft Impact ستكون قادرًا على:",
          "points": [
            "كتابة CV احترافي.",
            "بناء حساب LinkedIn يجذب مسؤولي التوظيف.",
            "التقديم على الوظائف بطريقة صحيحة.",
            "اجتياز مقابلات العمل بثقة.",
            "التواصل باللغة الإنجليزية داخل بيئة العمل.",
            "الحصول على أول وظيفة أو أول عميل Freelance."
          ]
        },
        {
          "title": "لماذا EraaSoft Impact؟",
          "paragraph": "لأن النجاح في سوق العمل لا يعتمد على المهارات التقنية فقط. في EraaSoft نؤمن أن المهندس الناجح يحتاج إلى:",
          "points": [
            "مهارة تقنية قوية.",
            "شخصية احترافية.",
            "تواصل فعال.",
            "شبكة علاقات.",
            "استعداد حقيقي لسوق العمل."
          ]
        },
        {
          "title": "متاح مع كل دبلومة",
          "paragraph": "ولهذا صممنا EraaSoft Impact ليكون الخطوة التي تربط بين التعلم والنجاح المهني. هذا البرنامج متاح كميزة إضافية لجميع طلاب الدبلومات في EraaSoft، ليضمن أن كل طالب لا يكتسب المعرفة التقنية فقط، بل يمتلك أيضًا الأدوات التي تساعده على الانطلاق في مسيرته المهنية."
        }
      ]
    },  {
    "id": 7,
    "titleAr": "مشروع التخرج النهائي (EGP)",
    icon: Trophy,
    "sections": [
      {
        "title": "ما هو؟",
        "paragraph": "المرحلة النهائية من الرحلة التعليمية، ويُعد من أكبر الأحداث داخل النظام التعليمي في أكاديمية إيراسوفت."
      },
      {
        "title": "يتضمن:",
        "points": [
          "حفل التخرج.",
          "جلسات سوق العمل.",
          "ملتقى التوظيف.",
          "مناقشات المشاريع النهائية.",
          "لقاءات مع الشركات والشركاء."
        ]
      },
      {
        "title": "الحضور والفرص",
        "paragraph": "الحضور العام متاح لجميع طلاب الأكاديمية. أما الفرص فتخضع لمعايير الاختيار والشراكات المعتمدة.",
        "points": [
          "الحفاظ على تقييم يتراوح بين 90% و100%.",
          "استيفاء متطلبات المشاركة في ورش العمل، ومعسكرات إيراسوفت، ومحاكاة يوم العمل."
        ]
      }
    ]
  },
  {
    "id": 8,
    "titleAr": "EraaSoft Community",
    icon: Sparkles,
    "sections": [
      {
        "title": "ما هو مجتمع إيراسوفت؟",
        "paragraph": "بيئة تفاعلية تربط الطلاب والخريجين بشبكة واسعة من الشركات الشريكة وأصحاب الأعمال لتوفير فرص التدريب والتوظيف والدعم المهني المستمر."
      },
      {
        "title": "فرص العمل والتوظيف",
        "points": [
          "توفير فرص تدريب وتوظيف حقيقية بالتعاون مع شركاء النجاح.",
          "ربط الخريجين المتميزين بأصحاب الأعمال مباشرة.",
          "المشاركة الفعالة في ملتقيات التوظيف السنوية واللقاءات الوظيفية."
        ]
      },
      {
        "title": "الشراكات والنمو المستمر",
        "points": [
          "الاستفادة من الشراكات المعتمدة والاتفاقيات مع كبرى شركات البرمجيات.",
          "جلسات إرشاد وتوجيه مستمر لدعم نموك المهني بعد التخرج.",
          "تسهيل سبل التواصل مع مجتمع الخريجين لتبادل الخبرات والمشاريع المشتركة."
        ]
      }
    ]
  }
];