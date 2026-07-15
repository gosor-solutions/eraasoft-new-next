import React from "react";
import Image from "next/image";
import LineSvg from "@/components/shared/LineSvg";

export default function EducationalPartners() {
  return (
    <section className="px-5 sm:px-8 py-12 lg:py-16 bg-[#2243A4]" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-10 flex flex-col items-center justify-center text-center">
          <span className="relative flex flex-col items-center justify-center">
            <span>الشركاء التعليميون</span>
            <span className="absolute -bottom-10 w-full min-w-[200px]">
              <LineSvg 
                colorOne="#ffffff" 
                colorTwo="#ffffff" 
                svgId="educational_partners_path" 
                svgWidth="200" 
                svgHeight="60" 
                strokeWidth="8" 
              />
            </span>
          </span>
        </h2>

        {/* Full-width Image */}
        <div className="w-full relative rounded-2xl overflow-hidden mt-6 aspect-[21/9] ">
          <Image
            src="/education-partners.png"
            alt="الشركاء التعليميون - Educational Partners"
            fill
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-contain object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
}
