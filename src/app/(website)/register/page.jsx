"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { AlertCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "@/components/shared/AuthLayout";
import PhoneInputField from "@/components/shared/PhoneInputField";
import { sendRegisterOtp } from "@/services/Auth";

export default function RegisterPage() {
  const { client, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OTP flow states
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (client) {
      const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    if (formData.password !== formData.password_confirmation) {
      setError("تأكيد كلمة المرور غير متطابق.");
      toast.error("تأكيد كلمة المرور غير متطابق.", { position: "top-center" });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await sendRegisterOtp(formData);
      toast.success(res?.message || "تم إرسال رمز التحقق إلى بريدك الإلكتروني بنجاح", { position: "top-center" });
      // Save data to sessionStorage to verify on the OTP page
      sessionStorage.setItem("register_formData", JSON.stringify(formData));
      const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const redirect = searchParams?.get("redirect");
      const otpUrl = redirect ? `/register/otp?redirect=${encodeURIComponent(redirect)}` : "/register/otp";
      router.push(otpUrl);
    } catch (err) {
      console.error(err);
      if (err?.errors) {
        setFieldErrors(err.errors);
      }
      setError(err?.message || "حدث خطأ أثناء إرسال رمز التحقق. يرجى المحاولة مرة أخرى.");
      toast.error(err?.message || "حدث خطأ أثناء إرسال رمز التحقق.", { position: "top-center" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (client) return null;

  return (
    <AuthLayout mode="register">
      <ToastContainer rtl />

      {error && (
        <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
          <div className="text-sm text-red-700 font-medium">{error}</div>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSendOtp}>
        {/* Name Fields (Side by Side on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="first_name" className="text-sm font-bold text-[#111827]">
              الاسم الأول
            </label>
            <div className="relative">
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                maxLength={100}
                value={formData.first_name}
                onChange={handleChange}
                className={`block w-full pr-5 pl-12 py-3.5 border ${fieldErrors.first_name ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-[#D2D2D2] focus:ring-blue-500 focus:border-blue-500"
                  } rounded-[24px]   focus:outline-none focus:ring-2 transition-all duration-200 text-sm`}
                placeholder="الاسم الأول"
              />
            </div>
            {fieldErrors.first_name && (
              <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.first_name[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="last_name" className="text-sm font-bold text-[#111827]">
              اسم العائلة
            </label>
            <div className="relative">
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                maxLength={100}
                value={formData.last_name}
                onChange={handleChange}
                className={`block w-full pr-5 pl-12 py-3.5 border ${fieldErrors.last_name ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-[#D2D2D2] focus:ring-blue-500 focus:border-blue-500"
                  } rounded-[24px]   focus:outline-none focus:ring-2 transition-all duration-200 text-sm`}
                placeholder="اسم العائلة"
              />
            </div>
            {fieldErrors.last_name && (
              <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.last_name[0]}</p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-bold text-[#111827]">
            البريد الإلكتروني
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`block w-full pr-5 pl-12 py-3.5 border ${fieldErrors.email ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-[#D2D2D2] focus:ring-blue-500 focus:border-blue-500"
                } rounded-[24px]   focus:outline-none focus:ring-2 transition-all duration-200 text-sm`}
              placeholder="البريد الإلكتروني"
            />
          </div>
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.email[0]}</p>
          )}
        </div>

        {/* Phone Field */}
        <PhoneInputField
          label="رقم التليفون"
          value={formData.phone}
          onChange={handlePhoneChange}
          error={fieldErrors.phone ? fieldErrors.phone[0] : null}
        />

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-bold text-[#111827]">
            كلمة المرور
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={"password"}
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              className={`block w-full pr-5 pl-12 py-3.5 border ${fieldErrors.password ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-[#D2D2D2] focus:ring-blue-500 focus:border-blue-500"
                } rounded-[24px]   focus:outline-none focus:ring-2 transition-all duration-200 text-sm`}
              placeholder="••••••••"
            />
          </div>
          {fieldErrors.password && (
            <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.password[0]}</p>
          )}
        </div>
        {/* Password Confirmation Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password_confirmation" className="text-sm font-bold text-[#111827]">
            تأكيد كلمة المرور
          </label>
          <div className="relative">
            <input
              id="password_confirmation"
              name="password_confirmation"
              type={"password"}
              required
              value={formData.password_confirmation}
              onChange={handleChange}
              className="block w-full pr-5 pl-12 py-3.5 border border-[#D2D2D2] rounded-[24px] focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 transition-all duration-200 text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || authLoading}
          className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-bold rounded-[24px] text-white bg-[#2243A4] hover:bg-[#19327D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2243A4] disabled:opacity-75 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer mt-6"
        >
          {isSubmitting || authLoading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "إنشاء حساب"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
