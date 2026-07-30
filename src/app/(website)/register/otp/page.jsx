"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { AlertCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import LineSvg from "@/components/shared/LineSvg";
import { sendRegisterOtp } from "@/services/Auth";

export default function RegisterOtpPage() {
  const { client, register, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState(null);
  const [otp, setOtp] = useState(["", "", "", ""]); // 4 digits
  const [resendTimer, setResendTimer] = useState(60);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRefs = useRef([]);

  // Load registration data from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("register_formData");
      if (!storedData) {
        toast.error("يرجى إدخال بيانات التسجيل أولاً.");
        router.push("/register");
      } else {
        setFormData(JSON.parse(storedData));
      }
    }
  }, [router]);

  // Redirect if already logged in
  useEffect(() => {
    if (client) {
      const searchParams =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : null;
      const redirect = searchParams?.get("redirect");
      router.push(redirect || "/profile");
    }
  }, [client, router]);

  // Resend OTP cooldown timer
  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleOtpChange = (value, index) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    if (!cleanValue) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = cleanValue.substring(cleanValue.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (index < 3 && cleanValue) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResendOtp = async () => {
    if (!formData) return;
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await sendRegisterOtp(formData);
      toast.success(res?.message || "تم إعادة إرسال رمز التحقق بنجاح", {
        position: "top-center",
      });
      setResendTimer(60);
    } catch (err) {
      console.error(err);
      setError(err?.message || "حدث خطأ أثناء إعادة إرسال رمز التحقق.");
      toast.error(err?.message || "حدث خطأ أثناء إعادة إرسال رمز التحقق.", {
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyAndRegister = async (e) => {
    if (e) e.preventDefault();
    if (!formData) return;
    setError(null);
    setIsSubmitting(true);

    const otpCode = otp.join("");
    if (otpCode.length < 4) {
      setError("يرجى إدخال رمز التحقق كاملاً المكون من 4 أرقام.");
      toast.error("يرجى إدخال رمز التحقق كاملاً.", { position: "top-center" });
      setIsSubmitting(false);
      return;
    }

    try {
      await register({ ...formData, otp: otpCode });
      toast.success("تم تسجيل الحساب بنجاح!", { position: "top-center" });
      sessionStorage.removeItem("register_formData");
    } catch (err) {
      console.error(err);
      setError(err?.message || "رمز التحقق غير صحيح أو منتهي الصلاحية.");
      toast.error(err?.message || "رمز التحقق غير صحيح.", {
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (client || !formData) return null;

  return (
    <main
      className="min-h-[95vh] flex items-center justify-center bg-[#F8FAFC] py-4 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <ToastContainer rtl />

      {/* Main card container */}
      <div className="max-w-[1100px] relative w-full bg-white rounded-[32px] shadow-sm border border-gray-100 p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row-reverse gap-8 items-stretch">
        {/* Left swirl shape */}
        <div className="absolute top-0 right-0 pointer-events-none">
          <Image
            src="/swirl.png"
            width={150}
            height={200}
            className="object-contain opacity-40"
            alt="Swirl Accent"
          />
        </div>

        {/* Form Panel (Stands on right/start in RTL) */}
        <div className="flex-1 flex flex-col justify-between py-6 px-2 md:px-6 lg:px-10 z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="شعار إيراسوفت"
              width={140}
              height={45}
              className="h-10 w-auto"
            />
          </div>

          <div className="space-y-6 my-auto">
            {/* Header Text with hand-drawn accent */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative pb-2">
                <h2 className="text-3xl font-extrabold text-[#111827] tracking-tight text-center relative z-10 flex items-center gap-1">
                  ارسال رمز التحقق
                  <span className="text-[#2243A4] animate-pulse">
                    <TitleIcon />
                  </span>
                </h2>
                <span className="absolute bottom-0 right-0 left-0 flex justify-center">
                  <LineSvg
                    colorOne={"#2243A4"}
                    colorTwo={"#2243A4"}
                    svgId={"paint_otp"}
                    svgWidth="130"
                    svgHeight="20"
                    strokeWidth="8"
                  />
                </span>
              </div>
              <p className="text-sm text-gray-500 text-center mt-4">
                أرسلنا رمز تحقق مكون من 4 أرقام إلى بريدك الإلكتروني
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle
                  className="text-red-500 shrink-0 mt-0.5"
                  size={18}
                />
                <div className="text-sm text-red-700 font-medium">{error}</div>
              </div>
            )}

            <form onSubmit={handleVerifyAndRegister} className="space-y-6">
              {/* Write OTP code label */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#111827] text-right">
                  اكتب رمز التحقق
                </label>

                {/* OTP Inputs container */}
                <div
                  className="flex justify-center gap-2 sm:gap-3"
                  style={{ direction: "ltr" }}
                >
                  {otp?.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      onFocus={(e) => e.target.select()}
                      className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold bg-[#F1F3F9] border-transparent rounded-[16px] focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all duration-200 text-gray-800"
                      required
                    />
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || authLoading}
                className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-bold rounded-full text-white bg-[#2243A4] hover:bg-[#19327D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2243A4] disabled:opacity-75 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                {isSubmitting || authLoading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "إرسال رمز التحقق"
                )}
              </button>

              {/* Footer Options */}
              <div className="flex justify-between items-center text-sm px-2">
                <Link
                  href="/register"
                  className="text-gray-500 hover:text-gray-700 transition-colors font-medium"
                >
                  تعديل البيانات
                </Link>

                {resendTimer > 0 ? (
                  <span className="text-gray-400">
                    إعادة الإرسال خلال {resendTimer} ثانية
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isSubmitting}
                    className="text-[#2243A4] hover:text-[#19327D] font-bold transition-colors"
                  >
                    إعادة إرسال الرمز
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Half: Side Illustration (Card with phone mock) */}
        <div className="hidden lg:flex w-[48%] relative bg-[#D5E1FB] rounded-[24px] overflow-hidden flex-col justify-between items-center p-8 min-h-[580px]">
          {/* Logo inside illustration */}
          <div className="w-full flex justify-center">
            <Image
              src="/logo.png"
              alt="EraaSoft Logo"
              width={140}
              height={45}
              className="h-10 w-auto"
            />
          </div>

          {/* Phone Frame and Smiling Man */}
          <div className="relative w-full flex-1 flex items-center justify-center mt-6">
            {/* Swirl graphic inside the background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <Image
                src="/swirl.png"
                fill
                className="object-contain"
                alt="Swirl background"
              />
            </div>

            {/* Mobile Phone Mock Container */}
            <div className="relative w-[280px] h-[450px] flex items-center justify-center">
              {/* Smartphone Outline Frame */}
              <div className="absolute inset-0 border-[8px] border-black rounded-[48px] bg-black shadow-2xl overflow-hidden z-10 flex items-center justify-center">
                {/* Screen background and Image of Person */}
                <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-[#D5E1FB]">
                  <Image
                    src="/mon_person.png"
                    fill
                    className="object-cover object-top"
                    alt="Instructor Representative"
                    priority
                  />

                  {/* Virtual Video Call Overlay Controls */}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4 z-20">
                    <button className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-all cursor-pointer">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                    <button className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-all cursor-pointer">
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 8l2 2m0 0l2 2m-2-2l-2 2m2-2l2-2M5 3a2 2 0 00-2 2v2a2 2 0 001.582 1.956l3.75 1.072a2 2 0 002.247-1.127l1.03-2.06c1.192-.61 2.378-.61 3.57 0l1.03 2.06a2 2 0 002.247 1.127l3.75-1.072A2 2 0 0021 7V5a2 2 0 00-2-2H5z"
                        />
                      </svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-all cursor-pointer">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Island Screen notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-end px-3 gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#1A1A1A]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#0D0D0D]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const TitleIcon = () => {
  return (
    <svg
      width="30"
      height="36"
      viewBox="0 0 30 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.55153 5.73017C3.23873 5.62769 3.7608 5.94248 4.18713 6.6322C4.62889 7.34691 4.89353 8.37549 4.98315 9.38958C5.12038 10.9425 5.13604 13.115 4.96668 14.9106C4.88159 15.8126 4.7526 16.5847 4.58379 17.1263C4.51015 17.3625 4.4357 17.526 4.37281 17.6308C4.29003 17.5537 4.18228 17.4286 4.05569 17.2397C3.75284 16.7877 3.42456 16.1081 3.09786 15.2895C2.44842 13.6622 1.85506 11.6175 1.49495 10.0855C1.26416 9.10356 1.16857 7.99427 1.34567 7.12976C1.4333 6.70198 1.57957 6.37409 1.7707 6.14798C1.95096 5.93482 2.19427 5.78354 2.55153 5.73017Z"
        stroke="#2243A4"
        strokeWidth="1.34366"
      />
      <path
        d="M25.7627 32.0815C25.5862 32.7535 25.0913 33.1094 24.2894 33.2296C23.4585 33.3542 22.4088 33.1924 21.4414 32.8754C19.9599 32.39 17.9568 31.5488 16.373 30.686C15.5774 30.2525 14.9185 29.8299 14.4872 29.4614C14.299 29.3007 14.1781 29.1679 14.1066 29.0688C14.2099 29.0231 14.3674 28.9733 14.5909 28.9313C15.1257 28.831 15.8796 28.7968 16.7607 28.8189C18.5123 28.8629 20.6254 29.1227 22.1755 29.3951C23.1689 29.5696 24.2262 29.9186 24.9511 30.4219C25.3098 30.6709 25.5536 30.9345 25.6861 31.1992C25.8111 31.4488 25.8543 31.7321 25.7627 32.0815Z"
        stroke="#2243A4"
        strokeWidth="1.34366"
      />
      <path
        d="M19.9114 2.79109C20.9664 3.48513 21.2576 4.55454 21.0216 5.87799C20.7803 7.23044 19.9928 8.73824 19.0343 10.0202C17.5821 11.9623 15.3502 14.4907 13.2914 16.3955C12.2589 17.3508 11.2952 18.1252 10.5121 18.5929C10.1184 18.828 9.80345 18.965 9.57104 19.0212C9.33163 19.079 9.28106 19.0292 9.30194 19.0429C9.31712 19.0531 9.25498 19.0258 9.21623 18.8018C9.17776 18.5792 9.18041 18.2524 9.24188 17.8158C9.36423 16.947 9.69681 15.8009 10.1664 14.5162C11.1019 11.9569 12.5316 8.98055 13.6995 6.83915C14.4575 5.44944 15.5188 4.02565 16.6703 3.17091C17.2421 2.74646 17.8035 2.48714 18.3344 2.41289C18.8487 2.34101 19.3724 2.43659 19.9114 2.79109Z"
        stroke="#2243A4"
        strokeWidth="1.34366"
      />
      <path
        d="M27.4611 17.0137C27.8302 17.8552 27.5957 18.6263 26.8982 19.3721C26.1804 20.1393 25.037 20.7876 23.8662 21.2192C22.083 21.8767 19.5346 22.5874 17.3684 22.9615C16.2811 23.1493 15.3247 23.2464 14.6219 23.2204C14.268 23.2072 14.0176 23.1638 13.8593 23.1081C13.8231 23.0954 13.797 23.0822 13.7775 23.0725C13.783 23.0543 13.7906 23.0306 13.803 23.0016C13.8647 22.8575 13.9959 22.6556 14.219 22.399C14.6621 21.8892 15.3624 21.2821 16.2199 20.6373C17.9267 19.3537 20.1397 18.0048 21.824 17.0935C22.9102 16.5058 24.1999 16.0306 25.2975 15.9612C25.8418 15.9269 26.2986 15.9949 26.6527 16.1601C26.9915 16.3183 27.271 16.5804 27.4611 17.0137Z"
        stroke="#2243A4"
        strokeWidth="1.34366"
      />
    </svg>
  );
};
