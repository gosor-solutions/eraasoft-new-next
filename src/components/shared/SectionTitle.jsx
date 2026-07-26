import React from "react";

export default function SectionTitle({ title, dir = "rtl" }) {
  return (
    <div className="mb-6" dir={dir}>
      <h2 className="text-2xl font-bold text-[#2243A4]">{title}</h2>
    </div>
  );
}
