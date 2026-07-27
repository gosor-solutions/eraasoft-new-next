"use client";

import { useState } from "react";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import dynamic from "next/dynamic";
import { sendTrainingRequest } from "@/services/TrainingRequest";

const CustomSelect = dynamic(() => import("@/components/shared/CustomSelect"), { ssr: false });

const employeeRangeOptions = [
  { value: "1-10", label: "١ - ١٠ موظفين" },
  { value: "11-50", label: "١١ - ٥٠ موظفاً" },
  { value: "51-200", label: "٥١ - ٢٠٠ موظفاً" },
  { value: "200+", label: "أكثر من ٢٠٠ موظف" },
];

const schema = z.object({
  companyName: z.string().min(1, "اسم الشركة مطلوب").min(2, "اسم الشركة يجب أن يكون حرفين على الأقل"),
  companyEmail: z
    .string()
    .min(1, "البريد الالكتروني مطلوب")
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "صيغة البريد الالكتروني غير صحيحة"),
  phone: z
    .string()
    .min(1, "رقم التليفون مطلوب")
    .refine((v) => isValidPhoneNumber(v), "رقم التليفون غير صحيح"),
  employeeCount: z.string().min(1, "يرجى اختيار عدد الموظفين"),
  companyWebsite: z
    .string()
    .optional()
    .refine((v) => !v || /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w\-./?%&=]*)?$/.test(v), "صيغة الموقع الالكتروني غير صحيحة"),
});

function parseZodErrors(error) {
  const map = {};
  error.issues.forEach((e) => {
    const key = e.path[0];
    if (!map[key]) map[key] = e.message;
  });
  return map;
}

export default function TrainingServicesForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    phone: "",
    employeeCount: "",
    companyWebsite: "",
    honeypot: "",
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
      const res = await sendTrainingRequest({
        company_name: formData.companyName.trim(),
        email: formData.companyEmail.trim(),
        phone: formData.phone,
        employee_number: formData.employeeCount,
        website: formData.companyWebsite.trim() || null,
        honeypot: formData.honeypot,
      });

      if (res?.success) {
        toast.success(res.message || "تم إرسال طلبك بنجاح، سنتواصل معك قريباً!", {
          position: "top-center",
        });
        setFormData({
          companyName: "",
          companyEmail: "",
          phone: "",
          employeeCount: "",
          companyWebsite: "",
          honeypot: "",
        });
        setFieldErrors({});
      } else {
        toast.error(res?.message || "حدث خطأ، يرجى المحاولة مجدداً.", {
          position: "top-center",
        });
      }
    } catch {
      toast.error("حدث خطأ في الاتصال، يرجى المحاولة مجدداً.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#FAFAFA] px-5 lg:px-13 py-10" dir="rtl">
      <ToastContainer rtl />

      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-3">تدريب الشركات</h1>
          <p className="text-[#606060] text-sm sm:text-base leading-7">نقدم حلول تدريبية متخصصة تلبي احتياجات فريقك. أرسل بياناتك وسنتواصل معك لتصميم برنامج تدريبي مخصص لشركتك.</p>
        </div>

        <div className="shadow-md rounded-2xl p-5 sm:p-8 bg-white">
          <h2 className="text-xl font-bold mb-5">بيانات الشركة</h2>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Honeypot – hidden from real users, bots may fill it */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => setField("honeypot")(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ display: "none" }}
            />

            <Field label="اسم الشركة" error={fieldErrors.companyName}>
              <input type="text" placeholder="اسم الشركة" value={formData.companyName} onChange={(e) => setField("companyName")(e.target.value)} className={inputCls(fieldErrors.companyName)} />
            </Field>

            <Field label="البريد الالكتروني للشركة" error={fieldErrors.companyEmail}>
              <input
                type="email"
                placeholder="info@company.com"
                value={formData.companyEmail}
                onChange={(e) => setField("companyEmail")(e.target.value)}
                className={inputCls(fieldErrors.companyEmail)}
                dir="ltr"
              />
            </Field>

            <Field label="رقم تليفون المسؤل" error={fieldErrors.phone}>
              <div className={`border rounded-full bg-white overflow-hidden ${fieldErrors.phone ? "border-red-400" : "border-[#D2D2D2]"}`}>
                <PhoneInput defaultCountry="EG" value={formData.phone} onChange={(value) => setField("phone")(value ?? "")} />
              </div>
            </Field>

            <Field error={fieldErrors.employeeCount}>
              <CustomSelect
                label="عدد الموظفين"
                options={employeeRangeOptions}
                value={formData.employeeCount}
                placeholder="اختر عدد الموظفين"
                onChange={setField("employeeCount")}
                error={fieldErrors.employeeCount}
              />
            </Field>

            <Field label="الموقع الالكتروني للشركة (اختياري)" error={fieldErrors.companyWebsite}>
              <input
                type="url"
                placeholder="https://example.com"
                value={formData.companyWebsite}
                onChange={(e) => setField("companyWebsite")(e.target.value)}
                className={inputCls(fieldErrors.companyWebsite)}
                dir="ltr"
              />
            </Field>

            <button type="submit" disabled={loading} className="main_button w-full py-4 text-base sm:text-lg disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? "جاري الإرسال..." : "أرسل طلبك"}
            </button>
          </form>
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
  return ["outline-none border py-3 px-5 rounded-full bg-white text-sm sm:text-base transition-colors", error ? "border-red-400" : "border-[#D2D2D2] focus:border-[#2243A4]"].join(" ");
}
