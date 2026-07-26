"use client";

import { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { sendContactMessage } from "@/services/Contact";

const schema = z.object({
  name: z.string().min(1, "الاسم مطلوب").min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  email: z
    .string()
    .min(1, "البريد الالكتروني مطلوب")
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "صيغة البريد الالكتروني غير صحيحة"),
  phone: z
    .string()
    .min(1, "رقم التليفون مطلوب")
    .refine((v) => isValidPhoneNumber(v), "رقم التليفون غير صحيح"),
  message: z
    .string()
    .min(1, "الرسالة مطلوبة")
    .min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
});

function parseZodErrors(error) {
  const map = {};
  error.issues.forEach((e) => {
    const key = e.path[0];
    if (!map[key]) map[key] = e.message;
  });
  return map;
}

export default function ContactPageSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const setField = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = schema.safeParse(formData);
    if (!result.success) {
      setFieldErrors(parseZodErrors(result.error));
      return;
    }

    setLoading(true);
    try {
      const res = await sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
        message: formData.message.trim(),
        website: formData.website,
      });

      if (res?.success) {
        toast.success(res.message || "تم إرسال رسالتك بنجاح!", { position: "top-center" });
        setFormData({ name: "", email: "", phone: "", message: "", website: "" });
        setFieldErrors({});
      } else {
        toast.error(res?.message || "حدث خطأ، يرجى المحاولة مجدداً.", { position: "top-center" });
      }
    } catch {
      toast.error("حدث خطأ في الاتصال، يرجى المحاولة مجدداً.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#FAFAFA] px-5 lg:px-13 py-8" dir="rtl">
      <ToastContainer rtl />
      <div className="shadow-md rounded-xl overflow-hidden max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">

        {/* Form */}
        <div className="p-5 sm:p-8">
          <h2 className="text-2xl font-bold mb-5">تواصل معنا</h2>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={(e) => setField("website")(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ display: "none" }}
            />

            <Field label="الاسم" error={fieldErrors.name}>
              <input
                type="text"
                placeholder="الاسم"
                value={formData.name}
                onChange={(e) => setField("name")(e.target.value)}
                className={inputCls(fieldErrors.name)}
              />
            </Field>

            <Field label="البريد الالكتروني" error={fieldErrors.email}>
              <input
                type="email"
                placeholder="البريد الالكتروني"
                value={formData.email}
                onChange={(e) => setField("email")(e.target.value)}
                className={inputCls(fieldErrors.email)}
              />
            </Field>

            <Field label="رقم التليفون" error={fieldErrors.phone}>
              <div className={`border rounded-full bg-white overflow-hidden ${fieldErrors.phone ? "border-red-400" : "border-[#D2D2D2]"}`}>
                <PhoneInput
                  defaultCountry="EG"
                  value={formData.phone}
                  onChange={(value) => setField("phone")(value ?? "")}
                />
              </div>
            </Field>

            <Field label="الرسالة" error={fieldErrors.message}>
              <textarea
                placeholder="اكتب رسالتك هنا"
                value={formData.message}
                onChange={(e) => setField("message")(e.target.value)}
                className={`min-h-40 resize-none outline-none border py-3 px-5 rounded-2xl bg-white text-sm sm:text-base transition-colors ${
                  fieldErrors.message ? "border-red-400" : "border-[#D2D2D2] focus:border-[#2243A4]"
                }`}
              />
            </Field>

            <button
              type="submit"
              disabled={loading}
              className="main_button w-full py-4 text-base sm:text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "جاري الإرسال..." : "تواصل معنا"}
            </button>
          </form>
        </div>

        {/* Image */}
        <div className="relative h-72 lg:h-full min-h-0">
          <Image
            src="/contact_us.png"
            alt="تواصل معنا"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-base sm:text-lg font-semibold">{label}</label>}
      {children}
      {error && <p className="text-red-500 text-xs pr-4">{error}</p>}
    </div>
  );
}

function inputCls(error) {
  return [
    "outline-none border py-3 px-5 rounded-full bg-white text-sm sm:text-base transition-colors",
    error ? "border-red-400" : "border-[#D2D2D2] focus:border-[#2243A4]",
  ].join(" ");
}
