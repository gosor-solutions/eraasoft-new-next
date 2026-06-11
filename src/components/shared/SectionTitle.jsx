import React from "react";

export default function SectionTitle({ title }) {
  return (
    <div className="mb-6" dir="rtl">
      <h2 className="text-2xl font-bold text-[#2243A4]">{title}</h2>
      {/* <div className="w-14 h-[3px] bg-[#2243A4] mt-2 rounded-full" /> */}
    </div>
  );
}
