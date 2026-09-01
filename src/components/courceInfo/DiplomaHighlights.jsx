import Image from "next/image";
import React from "react";
import {
  Code2,
  Briefcase,
  Award,
  ShieldCheck,
  Globe,
  GraduationCap,
  Sparkles,
} from "lucide-react";

const DEFAULT_HIGHLIGHTS = [
  {
    icon: Code2,
    title: "شرح نظري وتطبيق عملي",
    description: "كل مفهوم يُطبّق فوراً بمشاريع حقيقية.",
  },
  {
    icon: Briefcase,
    title: "مشاريع احترافية",
    description: "مشاريع فعلية بعد كل مرحلة أساسية.",
  },
  {
    icon: Award,
    title: "شهادة إتمام معتمدة",
    description: "شهادة رسمية من EraaSoft عند إكمال الدبلومة.",
  },
  {
    icon: ShieldCheck,
    title: "مناسب للمبتدئين",
    description: "صُمم خصيصاً لمن لا خبرة لديه في المجال.",
  },
  {
    icon: Globe,
    title: "تجهيز Portfolio",
    description: "تخرج بمشاريع جاهزة للتقديم على الوظائف.",
  },
  {
    icon: GraduationCap,
    title: "مشروع تخرج متكامل",
    description: "تنهي الدبلومة بمشروع ضخم يُضاف إلى Portfolio.",
  },
];

function HighlightCard({ icon: Icon, title, description }) {
  return (
    <div className="group bg-white rounded-2xl p-6 border border-slate-100/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-5px_rgba(34,67,164,0.12)] hover:border-blue-200 transition-all duration-300 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div>
        <h3 className="text-[#0B1527] font-bold text-lg sm:text-xl mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function DiplomaHighlights({
  title = "ما الذي يميز هذه الدبلومة؟",
  subtitle = "صُممت الدبلومة لتمنحك تجربة تعلم عملية، تبدأ من الأساسيات وتنتهي ببناء Portfolio احترافي ومشروع تخرج يؤهلك لسوق العمل.",
  items,
}) {
  const highlights = items?.length ? items : DEFAULT_HIGHLIGHTS;

  return (
    <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 px-5 sm:px-8 lg:px-13 bg-[#F1F5F9]" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-right max-w-3xl mb-12 sm:mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {highlights.map((item, index) => (
            <HighlightCard
              key={index}
              icon={item.icon || Code2}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
