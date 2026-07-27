"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getPartners } from "@/services/Partners";
import LineSvg from "@/components/shared/LineSvg";

export default function Parteners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPartners({ per_page: 12, type: "GENERAL" })
      .then((res) => {
        if (res && res.data) {
          setPartners(res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch partners:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="px-5 md:px-8 lg:px-13 py-13">
        <div className="grid grid-cols-12 gap-6">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className="col-span-6 md:col-span-4 lg:col-span-3">
              <div className="bg-white rounded-xl p-4 flex items-center justify-center h-44 sm:h-48 animate-pulse">
                <div className="w-40 h-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!partners.length) {
    return null;
  }

  return (
    <section className="px-5 md:px-8 lg:px-13 py-13">
      <h2 className="headStyle mt-6 mb-10 sm:mt-8 sm:mb-14 lg:mt-10 lg:mb-20 flex justify-center">
        <span className="inline-flex flex-col items-center">
          <span>شركاء النجاح</span>
          <div className="-translate-x-16">
            <LineSvg colorOne="#2243A4" colorTwo="#2243A4" svgId="paint_partners_success" svgWidth="160" svgHeight="40" strokeWidth="6" />
          </div> 
          </span>
      </h2>
      <div className="grid grid-cols-12 gap-6">
        {partners.map((partner) => (
          <div key={partner.id} className="col-span-6 md:col-span-4 lg:col-span-3">
            <div className="bg-white rounded-xl p-4 flex items-center justify-center h-44 sm:h-48 grayscale hover:grayscale-0 transition-all duration-300">
              <Image
                src={partner.image}
                alt={partner.name || "Partner Logo"}
                width={300}
                height={150}
                className="object-contain max-h-32 w-auto"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

