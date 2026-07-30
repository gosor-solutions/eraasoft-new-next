"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import LineSvg from "@/components/shared/LineSvg";
import { getPartners } from "@/services/Partners";

export default function EducationalPartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPartners({ per_page: 12, type: "EDUCATIONAL" })
      .then((res) => {
        if (res && res.data) {
          setPartners(res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch educational partners:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

        {loading ? (
          <div className="grid grid-cols-12 gap-6 w-full mt-6">
            {Array.from({ length: 12 })?.map((_, idx) => (
              <div key={idx} className="col-span-6 md:col-span-4 lg:col-span-3">
                <div className="bg-white/10 rounded-xl p-4 flex items-center justify-center h-44 sm:h-48 animate-pulse">
                  <div className="w-40 h-24 bg-white/20 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : partners.length > 0 ? (
          <div className="grid grid-cols-12 gap-6 w-full mt-6">
            {partners?.map((partner) => (
              <div
                key={partner.id}
                className="col-span-6 md:col-span-4 lg:col-span-3"
              >
                <div className="bg-white rounded-xl p-4 flex items-center justify-center h-44 sm:h-48 hover:-translate-y-4 transition-all duration-300">
                  <Image
                    src={partner.image}
                    alt={partner.name || "Partner Logo"}
                    width={300}
                    height={150}
                    className="object-contain max-h-40 w-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full relative rounded-2xl overflow-hidden mt-6 aspect-[21/9]">
            <Image
              src="/education-partners.png"
              alt="الشركاء التعليميون - Educational Partners"
              fill
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-contain object-center"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
