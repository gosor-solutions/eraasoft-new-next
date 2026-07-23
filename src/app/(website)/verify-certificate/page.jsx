"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Search, ShieldCheck } from "lucide-react";

export default function CertificateSearchPage() {
  const [serial, setSerial] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!serial.trim()) return;
    router.push(`/verify-certificate/${encodeURIComponent(serial.trim())}`);
  };

  return (
    <div dir="rtl" className="bg-[#FAFAFA] min-h-screen py-16 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xl">
        <div className="text-center space-y-3">
          <div className="inline-flex p-4 bg-blue-50 rounded-full text-[#2243A4] mb-2">
            <Award size={40} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            التحقق من صحة الشهادة
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            أدخل الرقم التسلسلي للشهادة (Serial Number) للتحقق من موثوقيتها وصحتها.
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="مثال: ERA-FC-2026-X8K9P2M4"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              className="w-full py-4 pr-5 pl-12 bg-gray-50 border border-gray-200 focus:border-[#2243A4] rounded-2xl outline-none text-gray-800 text-sm sm:text-base font-mono transition-all"
              required
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-[#2243A4] hover:bg-[#19327D] text-white rounded-xl transition-colors cursor-pointer"
            >
              <Search size={18} />
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#2243A4] hover:bg-[#19327D] text-white font-bold rounded-2xl text-base transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck size={20} />
            <span>التحقق من الشهادة</span>
          </button>
        </form>
      </div>
    </div>
  );
}
