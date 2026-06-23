"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { AlertCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "@/components/shared/AuthLayout";

export default function LoginPage() {
  const { client, login, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (client) {
      router.push("/profile");
    }
  }, [client, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      await login(email, password);
      toast.success("تم تسجيل الدخول بنجاح!", { position: "top-center" });
    } catch (err) {
      console.error(err);
      if (err?.errors) {
        setFieldErrors(err.errors);
      }
      setError(err?.message || "فشل تسجيل الدخول. يرجى التحقق من البيانات.");
      toast.error(err?.message || "حدث خطأ أثناء تسجيل الدخول.", { position: "top-center" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (client) return null;

  return (
    <AuthLayout mode="login" welcomeTitle="مرحباً بعودتك!">
      <ToastContainer rtl />

      {error && (
        <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
          <div className="text-sm text-red-700 font-medium">{error}</div>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-bold text-[#111827]">
            البريد الالكتروني
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`block w-full pr-5 pl-12 py-3.5 border ${fieldErrors.email ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-[#D2D2D2] focus:ring-blue-500 focus:border-blue-500"
                } rounded-[24px]   placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 text-sm`}
              placeholder="البريد الالكتروني"
            />
            {/* <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Mail size={18} />
            </div> */}
          </div>
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.email[0]}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-bold text-[#111827]">
            كلمة المرور
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pr-5 pl-12 py-3.5 border border-[#D2D2D2] rounded-[24px]   placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
              placeholder="كلمة المرور"
            />
            {/* <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button> */}
          </div>
          {fieldErrors.password && (
            <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.password[0]}</p>
          )}
        </div>

        {/* Checkbox and Forgot Password */}
        <div className="flex items-center justify-between text-sm mt-2 px-1">
          <label className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-[#D2D2D2] text-[#2243A4] focus:ring-[#2243A4] w-4 h-4 cursor-pointer"
            />
            <span>تذكرني</span>
          </label>
          {/* <Link href="/forgot-password" className="text-[#2243A4] underline font-bold text-xs sm:text-sm">
            نسيت كلمة المرور؟
          </Link> */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || authLoading}
          className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-bold rounded-full text-white bg-[#2243A4] hover:bg-[#19327D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2243A4] disabled:opacity-75 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer mt-6"
        >
          {isSubmitting || authLoading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "تسجيل الدخول"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
