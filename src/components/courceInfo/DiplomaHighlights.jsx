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

const ICONS_POOL = [
  Code2,
  Briefcase,
  Award,
  ShieldCheck,
  Globe,
  GraduationCap,
  Sparkles,
];

function normalizeHighlights(rawItems) {
  if (!rawItems || !Array.isArray(rawItems) || rawItems.length === 0) {
    return [];
  }

  return rawItems.map((item, index) => {
    const defaultIcon = ICONS_POOL[index % ICONS_POOL.length];

    if (typeof item === "string") {
      return {
        icon: defaultIcon,
        title: item.trim(),
        description: "",
      };
    }

    if (typeof item === "object" && item !== null) {
      return {
        icon: item.icon || defaultIcon,
        title: item.title || item.name || item.feature || item.label || "",
        description:
          item.description || item.subtitle || item.details || item.text || "",
      };
    }

    return {
      icon: defaultIcon,
      title: String(item),
      description: "",
    };
  });
}

function HighlightCard({ icon: Icon, title, description }) {
  const IconComponent = Icon || Sparkles;

  return (
    <div className="group bg-white rounded-2xl p-5 sm:p-6 border border-slate-100/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-5px_rgba(34,67,164,0.12)] hover:border-blue-200 transition-all duration-300 flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm mt-0.5">
        <IconComponent className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <h3 className="text-[#0B1527] font-bold text-base sm:text-lg mb-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {description ? (
          <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function DiplomaHighlights({
  title = "ما الذي يميز هذه الدبلومة؟",
  subtitle,
  items,
  features,
  course,
}) {
  const rawFeatures = features || course?.features || items;
  const highlights = normalizeHighlights(rawFeatures);

  if (!highlights.length) return null;

  return (
    <section
      className="pt-24 sm:pt-28 md:pt-40 lg:pt-32 pb-16 px-5 sm:px-8 lg:px-13 bg-[#F1F5F9]"
      dir="rtl"
    >
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
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
