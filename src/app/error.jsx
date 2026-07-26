"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Error({ error, unstable_retry }) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <main
      dir="rtl"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/hero_sec.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#070d1f]/88" />

      {/* Ambient glow — blue */}
      <div
        className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,67,164,0.35) 0%, transparent 70%)",
        }}
      />
      {/* Ambient glow — gold */}
      <div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(230,194,56,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl w-full mx-auto gap-6">
        {/* Logo */}
        <Link href="/" className="mb-2">
          <Image src="/footer_logo.png" alt="Eraasoft" width={130} height={44} priority />
        </Link>

        {/* 500 number */}
        <div className="relative select-none leading-none">
          <span
            className="text-[10rem] sm:text-[13rem] font-black leading-none"
            style={{
              background: "linear-gradient(160deg, #BECBF2 0%, #2243a4 55%, #0C1739 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 40px rgba(34,67,164,0.6))",
            }}
          >
            500
          </span>
        </div>

        {/* Gold divider */}
        <div className="flex items-center gap-3 w-56">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#E6C238]" />
          <div className="w-2 h-2 rounded-full bg-[#E6C238] shadow-[0_0_8px_#E6C238]" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#E6C238]" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-snug">
          حدث خطأ غير متوقع!
        </h1>

        <p className="text-[#BECBF2] text-base sm:text-lg leading-relaxed max-w-sm mx-auto">
          نعتذر عن هذا الإزعاج. يمكنك المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.
        </p>

        {/* Error details */}
        {error?.message && (
          <div className="w-full bg-red-950/25 border border-red-500/25 rounded-2xl px-5 py-3">
            <p className="text-red-400 text-sm">{error.message}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <button onClick={() => unstable_retry()} className="main_button font-semibold text-base">
            حاول مرة أخرى
          </button>
          <Link
            href="/"
            className="border border-white/20 hover:border-[#BECBF2]/60 hover:bg-white/5 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 text-base"
          >
            الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </main>
  );
}
