import React from "react";

export default function Loading({ minHeight = "min-h-[70vh]" }) {
  return (
    <div className={`flex ${minHeight} flex-col items-center justify-center gap-4`}>
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#2243A41A] border-t-[#2243A4]" />
        <div className="absolute inset-2 animate-spin rounded-full border-4 border-transparent border-b-[#E6C238]" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
      </div>
      <p className="text-sm font-medium text-[#2243A4] animate-pulse">جاري التحميل...</p>
    </div>
  );
}
