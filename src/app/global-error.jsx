"use client";

import { useEffect } from "react";
import { cairo } from "@/lib/font";

export default function GlobalError({ error, unstable_retry }) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="ar" className={cairo.variable}>
      <body className={cairo.className}>
        <main
          dir="rtl"
          className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
          style={{
            backgroundImage: "url('/hero_sec.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#070d1f]/88" />

          <div
            className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(34,67,164,0.35) 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(230,194,56,0.15) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl w-full mx-auto gap-6">
            <a href="/" className="mb-2">
              <img src="/footer_logo.png" alt="Eraasoft" width={130} height={44} />
            </a>

            <span
              className="text-[10rem] sm:text-[13rem] font-black leading-none select-none"
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

            <div className="flex items-center gap-3 w-56">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #E6C238)" }} />
              <div className="w-2 h-2 rounded-full" style={{ background: "#E6C238", boxShadow: "0 0 8px #E6C238" }} />
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #E6C238)" }} />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-snug">
              حدث خطأ غير متوقع!
            </h1>

            <p className="text-[#BECBF2] text-base sm:text-lg leading-relaxed max-w-sm mx-auto">
              نعتذر عن هذا الإزعاج. يمكنك المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.
            </p>

            {error?.message && (
              <div className="w-full rounded-2xl px-5 py-3" style={{ background: "rgba(127,29,29,0.25)", border: "1px solid rgba(239,68,68,0.25)" }}>
                <p className="text-red-400 text-sm">{error.message}</p>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <button
                onClick={() => unstable_retry()}
                style={{ backgroundColor: "#2243a4", color: "#fff", borderRadius: "16px", padding: "16px 24px", cursor: "pointer", fontWeight: 600 }}
              >
                حاول مرة أخرى
              </button>
              <a
                href="/"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontWeight: 500, padding: "16px 24px", borderRadius: "16px" }}
              >
                الصفحة الرئيسية
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
