"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { AlertCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "@/components/shared/AuthLayout";
import { resetPassword } from "@/services/Auth";

export default function ResetPasswordPage() {
  const { client } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("reset_email");
      const storedOtp = sessionStorage.getItem("reset_otp");

      if (!storedEmail || !storedOtp) {
        toast.error("يرجى إكمال خطوات التحقق أولاً.");
        router.push("/forgot-password");
      } else {
        setEmail(storedEmail);
        setOtp(storedOtp);
      }
    }
  }, [router]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    if (password !== passwordConfirmation) {
      setError("تأكيد كلمة المرور غير متطابق.");
      toast.error("تأكيد كلمة المرور غير متطابق.", { position: "top-center" });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await resetPassword({
        email,
        otp,
        password,
        password_confirmation: passwordConfirmation,
      });

      toast.success(
        res?.message ||
          "تم إعادة تعيين كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول.",
        { position: "top-center" },
      );
      sessionStorage.removeItem("reset_email");
      sessionStorage.removeItem("reset_otp");

      const searchParams =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : null;
      const redirect = searchParams?.get("redirect");
      const loginUrl = redirect
        ? `/login?redirect=${encodeURIComponent(redirect)}`
        : "/login";
      router.push(loginUrl);
    } catch (err) {
      console.error(err);
      if (err?.errors) {
        setFieldErrors(err.errors);
      }
      setError(err?.message || "فشل إعادة تعيين كلمة المرور.");
      toast.error(err?.message || "حدث خطأ أثناء إعادة تعيين كلمة المرور.", {
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (client || !email || !otp) return null;

  return (
    <AuthLayout>
      <ToastContainer rtl />

      <div className="flex flex-col items-center mb-4">
        <h3 className="text-xl font-bold text-[#111827]">
          تعيين كلمة مرور جديدة
        </h3>
        <p className="text-sm text-gray-500 mt-1 text-center">
          أدخل كلمة المرور الجديدة لحسابك
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
          <label
            htmlFor="password"
            className="text-sm font-bold text-[#111827]"
          >
            كلمة المرور الجديدة
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`block w-full pr-5 pl-4 py-3.5 border ${
              fieldErrors.password
                ? "border-red-300 focus:ring-red-500"
                : "border-[#D2D2D2] focus:ring-blue-500"
            } rounded-[24px] placeholder-gray-400 focus:outline-none focus:ring-2 text-sm`}
            placeholder="••••••••"
          />
          {fieldErrors.password && (
            <p className="mt-1 text-xs text-red-600 font-medium">
              {fieldErrors.password[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password_confirmation"
            className="text-sm font-bold text-[#111827]"
          >
            تأكيد كلمة المرور الجديدة
          </label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            required
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className={`block w-full pr-5 pl-4 py-3.5 border ${
              fieldErrors.password_confirmation
                ? "border-red-300 focus:ring-red-500"
                : "border-[#D2D2D2] focus:ring-blue-500"
            } rounded-[24px] placeholder-gray-400 focus:outline-none focus:ring-2 text-sm`}
            placeholder="••••••••"
          />
          {fieldErrors.password_confirmation && (
            <p className="mt-1 text-xs text-red-600 font-medium">
              {fieldErrors.password_confirmation[0]}
            </p>
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
            "حفظ كلمة المرور"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
