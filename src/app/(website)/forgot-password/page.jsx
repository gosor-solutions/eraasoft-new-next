"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { AlertCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "@/components/shared/AuthLayout";
import { sendPasswordOtp } from "@/services/Auth";

export default function ForgotPasswordPage() {
  const { client } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (client) {
      const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const redirect = searchParams?.get("redirect");
      router.push(redirect || "/profile");
    }
  }, [client, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const res = await sendPasswordOtp({ email });
      toast.success(res?.message || "تم إرسال رمز التحقق إلى بريدك الإلكتروني", { position: "top-center" });
      sessionStorage.setItem("reset_email", email);

      const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const redirect = searchParams?.get("redirect");
      const otpUrl = redirect ? `/forgot-password/otp?redirect=${encodeURIComponent(redirect)}` : "/forgot-password/otp";
      router.push(otpUrl);
    } catch (err) {
      console.error(err);
      if (err?.errors) {
        setFieldErrors(err.errors);
      }
      setError(err?.message || "فشل إرسال رمز التحقق. يرجى التأكد من البريد الإلكتروني.");
      toast.error(err?.message || "حدث خطأ أثناء إرسال رمز التحقق.", { position: "top-center" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (client) return null;

  return (
    <AuthLayout>
      <ToastContainer rtl />

      <div className="flex flex-col items-center mb-4">
        <h3 className="text-xl font-bold text-[#111827]">استعادة كلمة المرور</h3>
        <p className="text-sm text-gray-500 mt-1 text-center">
          أدخل بريدك الإلكتروني لإرسال رمز التحقق
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
          <div className="text-sm text-red-700 font-medium">{error}</div>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-bold text-[#111827]">
            البريد الالكتروني
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`block w-full pr-5 pl-4 py-3.5 border ${fieldErrors.email ? "border-red-300 focus:ring-red-500" : "border-[#D2D2D2] focus:ring-blue-500"
              } rounded-[24px] placeholder-gray-400 focus:outline-none focus:ring-2 text-sm`}
            placeholder="john@example.com"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.email[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-bold rounded-full text-white bg-[#2243A4] hover:bg-[#19327D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2243A4] disabled:opacity-75 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer mt-6"
        >
          {isSubmitting ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "إرسال رمز التحقق"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
