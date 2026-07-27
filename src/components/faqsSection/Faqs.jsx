"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Faqs({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5" dir="rtl">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left cursor-pointer gap-3">
        <h3 className="text-(--primary-color) text-base sm:text-lg lg:text-xl font-bold text-right">{faq.question}</h3>

        <ChevronDown className={`shrink-0 transition duration-300 ${open ? "rotate-180" : ""} text-yellow-400`} />
      </button>

      <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className={`text-sm sm:text-base lg:text-lg font-semibold text-[#4A5565] leading-7 transition-all duration-300 ${open ? "pt-3 sm:pt-4" : "pt-0"}`}>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}
