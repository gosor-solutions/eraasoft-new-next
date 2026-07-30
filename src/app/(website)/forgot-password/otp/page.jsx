"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { AlertCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "@/components/shared/AuthLayout";
import { sendPasswordOtp, verifyPasswordOtp } from "@/services/Auth";

export default function ForgotPasswordOtpPage() {
  const { client } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("reset_email");
      if (!storedEmail) {
        toast.error("يرجى إدخال البريد الإلكتروني أولاً.");
        router.push("/forgot-password");
      } else {
        setEmail(storedEmail);
      }
    }
  }, [router]);

  useEffect(() => {
    if (client) {
      const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const redirect = searchParams?.get("redirect");
      router.push(redirect || "/profile");
    }
  }, [client, router]);

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
    if (!email) return;
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await sendPasswordOtp({ email });
      toast.success(res?.message || "تم إعادة إرسال رمز التحقق بنجاح", { position: "top-center" });
      setResendTimer(60);
    } catch (err) {
      console.error(err);
      setError(err?.message || "حدث خطأ أثناء إعادة إرسال رمز التحقق.");
      toast.error(err?.message || "حدث خطأ أثناء إعادة إرسال رمز التحقق.", { position: "top-center" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!email) return;
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
      const res = await verifyPasswordOtp({ email, otp: otpCode });
      toast.success(res?.message || "تم التحقق من الرمز بنجاح", { position: "top-center" });
      sessionStorage.setItem("reset_otp", otpCode);

      const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const redirect = searchParams?.get("redirect");
      const resetUrl = redirect ? `/forgot-password/reset?redirect=${encodeURIComponent(redirect)}` : "/forgot-password/reset";
      router.push(resetUrl);
    } catch (err) {
      console.error(err);
      setError(err?.message || "رمز التحقق غير صحيح أو منتهي الصلاحية.");
      toast.error(err?.message || "رمز التحقق غير صحيح.", { position: "top-center" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (client || !email) return null;

  return (
    <AuthLayout>
      <ToastContainer rtl />

      <div className="flex flex-col items-center mb-4">
        <h3 className="text-xl font-bold text-[#111827]">التحقق من الرمز</h3>
        <p className="text-sm text-gray-500 mt-1 text-center">
          أرسلنا رمز تحقق إلى <span className="font-semibold text-gray-700">{email}</span>
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
          <div className="text-sm text-red-700 font-medium">{error}</div>
        </div>
      )}

      <form onSubmit={handleVerifyOtp} className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-[#111827]">
            اكتب رمز التحقق
          </label>
          <div className="flex justify-center gap-2 sm:gap-3" style={{ direction: "ltr" }}>
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-bold rounded-full text-white bg-[#2243A4] hover:bg-[#19327D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2243A4] disabled:opacity-75 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
        >
          {isSubmitting ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "التحقق والمتابعة"
          )}
        </button>

        <div className="flex justify-between items-center text-sm px-2">
          <button
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="text-gray-500 hover:text-gray-700 font-medium cursor-pointer"
          >
            تعديل البريد الالكتروني
          </button>

          {resendTimer > 0 ? (
            <span className="text-gray-400">إعادة الإرسال خلال {resendTimer} ثانية</span>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isSubmitting}
              className="text-[#2243A4] hover:text-[#19327D] font-bold cursor-pointer"
            >
              إعادة إرسال الرمز
            </button>
          )}
        </div>
      </form>
    </AuthLayout>
  );
}
