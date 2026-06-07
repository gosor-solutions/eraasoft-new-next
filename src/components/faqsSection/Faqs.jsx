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

      {open && <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg font-semibold text-[#4A5565] leading-7">{faq.answer}</p>}
    </div>
  );
}
