"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import LineSvg from "./LineSvg";

export default function AuthLayout({ mode, children }) {
  return (
    <main className="min-h-[95vh] flex items-center justify-center bg-[#F8FAFC] py-4 px-4 sm:px-6 lg:px-8" dir="rtl">
      {/* Main card container */}

      <div className="max-w-[1100px] relative w-full bg-white rounded-[32px] shadow-sm border border-gray-100 p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row-reverse gap-8 items-stretch">
        <div className="absolute top-0 left-0">
          <Image
            src="/swirl.png"
            width={150}
            height={200}
            className="object-contain"
            alt="Representative"
          />
        </div>

        {/* Right Half: Form Panel (stands on left/start in RTL) */}
        <div className="flex-1 flex flex-col justify-between py-4 px-2 md:px-6 lg:px-10">

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <Image src="/logo.png" alt="شعار إيراسوفت" width={140} height={45} className="h-10 w-auto" />
          </div>

          <div className="space-y-6">
            {/* Splash Header */}
            <div className="flex flex-col items-center mb-10">
              <div className="relative">
                <h2 className="text-3xl font-extrabold text-[#2243A4] tracking-tight text-center relative z-10">
                  مرحبا
                  <span className="text-[#111827]">{` ${mode === "login" ? "بك!" : "بعودتك!"}`}</span>
                </h2>
                {/* Underline accent shape */}
                <span className="absolute -right-2">
                  <LineSvg colorOne={"#2243A4"} colorTwo={"#2243A4"} svgId={"paint_faqs"} svgWidth="100" svgHeight="40" strokeWidth="12" />
                </span>

                {/* Floating splash shape */}
                <span className="absolute -top-4 -right-6 text-2xl animate-pulse">
                  <TitleIcon />
                </span>
              </div>
            </div>

            {/* Toggle Switcher */}
            <div className="bg-[#EAEFFD] p-1.5 rounded-full flex max-w-[340px] mx-auto mb-8 relative border border-[#D5E1FB]">
              <Link
                href="/login"
                className={`flex-1 text-center py-2.5 px-6 rounded-full text-sm font-semibold transition-all duration-300 ${mode === "login"
                  ? "bg-[#2243A4] text-white shadow-md"
                  : "text-[#4B5563] hover:text-[#111827]"
                  }`}
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/register"
                className={`flex-1 text-center py-2.5 px-6 rounded-full text-sm font-semibold transition-all duration-300 ${mode === "register"
                  ? "bg-[#2243A4] text-white shadow-md"
                  : "text-[#4B5563] hover:text-[#111827]"
                  }`}
              >
                انشاء حساب
              </Link>
            </div>

            {/* The actual form fields and actions */}
            {children}
          </div>
        </div>

        {/* Left Half: Side Illustration (stands on right/end in RTL, hidden on mobile/tablet) */}
        <div className="hidden lg:flex w-[48%] relative overflow-hidden flex-col justify-center items-center min-h-[580px]">
          {/* Person */}
          <div className="w-[85%] h-auto">
            <Image
              src="/auth.png"
              width={900}
              height={1300}
              className="object-contain"
              alt="Representative"
              priority
            />
          </div>

        </div>

      </div>
    </main>
  );
}


const TitleIcon = () => {
  return (
    <svg width="30" height="36" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.55153 5.73017C3.23873 5.62769 3.7608 5.94248 4.18713 6.6322C4.62889 7.34691 4.89353 8.37549 4.98315 9.38958C5.12038 10.9425 5.13604 13.115 4.96668 14.9106C4.88159 15.8126 4.7526 16.5847 4.58379 17.1263C4.51015 17.3625 4.4357 17.526 4.37281 17.6308C4.29003 17.5537 4.18228 17.4286 4.05569 17.2397C3.75284 16.7877 3.42456 16.1081 3.09786 15.2895C2.44842 13.6622 1.85506 11.6175 1.49495 10.0855C1.26416 9.10356 1.16857 7.99427 1.34567 7.12976C1.4333 6.70198 1.57957 6.37409 1.7707 6.14798C1.95096 5.93482 2.19427 5.78354 2.55153 5.73017Z" stroke="#2243A4" strokeWidth="1.34366" />
      <path d="M25.7627 32.0815C25.5862 32.7535 25.0913 33.1094 24.2894 33.2296C23.4585 33.3542 22.4088 33.1924 21.4414 32.8754C19.9599 32.39 17.9568 31.5488 16.373 30.686C15.5774 30.2525 14.9185 29.8299 14.4872 29.4614C14.299 29.3007 14.1781 29.1679 14.1066 29.0688C14.2099 29.0231 14.3674 28.9733 14.5909 28.9313C15.1257 28.831 15.8796 28.7968 16.7607 28.8189C18.5123 28.8629 20.6254 29.1227 22.1755 29.3951C23.1689 29.5696 24.2262 29.9186 24.9511 30.4219C25.3098 30.6709 25.5536 30.9345 25.6861 31.1992C25.8111 31.4488 25.8543 31.7321 25.7627 32.0815Z" stroke="#2243A4" strokeWidth="1.34366" />
      <path d="M19.9114 2.79109C20.9664 3.48513 21.2576 4.55454 21.0216 5.87799C20.7803 7.23044 19.9928 8.73824 19.0343 10.0202C17.5821 11.9623 15.3502 14.4907 13.2914 16.3955C12.2589 17.3508 11.2952 18.1252 10.5121 18.5929C10.1184 18.828 9.80345 18.965 9.57104 19.0212C9.33163 19.079 9.28106 19.0292 9.30194 19.0429C9.31712 19.0531 9.25498 19.0258 9.21623 18.8018C9.17776 18.5792 9.18041 18.2524 9.24188 17.8158C9.36423 16.947 9.69681 15.8009 10.1664 14.5162C11.1019 11.9569 12.5316 8.98055 13.6995 6.83915C14.4575 5.44944 15.5188 4.02565 16.6703 3.17091C17.2421 2.74646 17.8035 2.48714 18.3344 2.41289C18.8487 2.34101 19.3724 2.43659 19.9114 2.79109Z" stroke="#2243A4" strokeWidth="1.34366" />
      <path d="M27.4611 17.0137C27.8302 17.8552 27.5957 18.6263 26.8982 19.3721C26.1804 20.1393 25.037 20.7876 23.8662 21.2192C22.083 21.8767 19.5346 22.5874 17.3684 22.9615C16.2811 23.1493 15.3247 23.2464 14.6219 23.2204C14.268 23.2072 14.0176 23.1638 13.8593 23.1081C13.8231 23.0954 13.797 23.0822 13.7775 23.0725C13.783 23.0543 13.7906 23.0306 13.803 23.0016C13.8647 22.8575 13.9959 22.6556 14.219 22.399C14.6621 21.8892 15.3624 21.2821 16.2199 20.6373C17.9267 19.3537 20.1397 18.0048 21.824 17.0935C22.9102 16.5058 24.1999 16.0306 25.2975 15.9612C25.8418 15.9269 26.2986 15.9949 26.6527 16.1601C26.9915 16.3183 27.271 16.5804 27.4611 17.0137Z" stroke="#2243A4" strokeWidth="1.34366" />
    </svg>
  );
}