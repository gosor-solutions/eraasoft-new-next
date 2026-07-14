import React from "react";
import Image from "next/image";
import LineSvg from "@/components/shared/LineSvg";

export default function SyndicateSection() {
  return (
    <section className="px-5 sm:px-8 my-12 lg:my-16" dir="rtl">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Right side: Text details */}
        <div className="col-span-12 lg:col-span-7 order-1">
          <div className="flex flex-col gap-3">
            <span className="text-[#2243A4] font-semibold text-sm sm:text-base tracking-wider uppercase">
              اعتماد رسمي موثق
            </span>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] leading-tight flex flex-wrap gap-2 items-center">
              <span>نحن معتمدون من</span>
              <span className="inline-flex flex-col items-center relative">
                <span className="text-[#2243A4]">نقابة المهندسين</span>
                <div className="absolute -bottom-6 w-full">
                  <LineSvg colorOne="#2243A4" colorTwo="#2243A4" svgId="syndicate_path" svgWidth="160" svgHeight="24" strokeWidth="6" />
                </div>
              </span>
            </h2>

            <h3 className="text-lg sm:text-xl font-medium text-[#444444] mt-4 lg:mt-6">
              خطوتك الموثوقة نحو التميز المهني والاعتراف الرسمي
            </h3>

            <p className="mt-2 text-base sm:text-lg md:text-xl text-[#606060] leading-relaxed">
              يسعدنا في إيراسوفت تقديم برامج تدريبية معتمدة رسمياً من نقابة المهندسين المصرية. يتيح لك هذا الاعتماد الحصول على شهادات موثقة تحمل الختم الرسمي للنقابة، مما يمنح سيرتك الذاتية قيمة مضافة ويعزز من فرص قبولك وتطورك المهني في مختلف المؤسسات والشركات الكبرى داخل مصر وخارجها.
            </p>
          </div>
        </div>

        {/* Left side: Image of certificate */}
        <div className="col-span-12 lg:col-span-5 order-2 relative w-full h-full rounded-xl overflow-hidden">
          <Image 
            src="/certificate.png" 
            alt="اعتماد نقابة المهندسين المصرية" 
            fill 
            className="object-contain object-center"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
