"use client";

import { useState } from "react";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { enrollInCourse } from "@/services/Enrollment";

const CustomSelect = dynamic(() => import("@/components/shared/CustomSelect"), { ssr: false });

const branchOptions = [
  { value: "DOKKI", label: "الدقي" },
  { value: "NASR_CITY", label: "مدينة نصر" },
  { value: "ONLINE", label: "اونلاين" },
  { value: "ALEXANDRIA", label: "اسكندريه" },
];

const attendanceOptions = [
  { value: "ONLINE", label: "اونلاين" },
  { value: "OFFLINE", label: "اوفلاين" },
];

const schema = z.object({
  course_id: z.string().min(1, "يرجى اختيار الكورس"),
  name: z.string().min(1, "الاسم مطلوب").min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  email: z
    .string()
    .min(1, "البريد الالكتروني مطلوب")
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "صيغة البريد الالكتروني غير صحيحة"),
  phone: z
    .string()
    .min(1, "رقم التليفون مطلوب")
    .refine((v) => isValidPhoneNumber(v), "رقم التليفون غير صحيح"),
  branch: z.string().min(1, "يرجى اختيار الفرع"),
  attendance_location: z.string().min(1, "يرجى اختيار طريقة الحضور"),
});

function parseZodErrors(error) {
  const map = {};
  error.issues.forEach((e) => {
    const key = e.path[0];
    if (!map[key]) map[key] = e.message;
  });
  return map;
}

export default function EnrollForm({ courses = [] }) {
  const [formData, setFormData] = useState({
    course_id: "",
    name: "",
    email: "",
    phone: "",
    branch: "",
    attendance_location: "",
    website: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const setField = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const selectedCourseName = courses.find((c) => c.value === formData.course_id)?.label ?? "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = schema.safeParse(formData);
    if (!result.success) {
      setFieldErrors(parseZodErrors(result.error));
      return;
    }

    setLoading(true);
    try {
      const res = await enrollInCourse({
        course_id: Number(formData.course_id),
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
        attendance_location: formData.attendance_location,
        branch: formData.branch,
        payment_method: "CASH",
        website: formData.website,
      });

      if (res?.success) {
        router.push(`/booking/success?course=${encodeURIComponent(selectedCourseName)}`);
        return;
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
    <>
      <ToastContainer rtl />

      <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-2">سجّل الآن</h1>
          <p className="text-[#606060] text-sm sm:text-base leading-7">
            اختر الكورس المناسب ليك وأكمل بياناتك لنتواصل معك في أقرب وقت.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {/* Honeypot – hidden from real users, bots may fill it */}
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

          <Field error={fieldErrors.course_id}>
            <CustomSelect
              label="الكورس"
              options={courses}
              value={formData.course_id}
              placeholder="اختر الكورس"
              onChange={setField("course_id")}
              error={fieldErrors.course_id}
            />
          </Field>

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

          <Field error={fieldErrors.attendance_location}>
            <CustomSelect
              label="طريقة الحضور"
              options={attendanceOptions}
              value={formData.attendance_location}
              placeholder="اختر طريقة الحضور"
              onChange={setField("attendance_location")}
              error={fieldErrors.attendance_location}
            />
          </Field>

          <Field error={fieldErrors.branch}>
            <CustomSelect
              label="اختر الفرع المناسب ليك"
              options={branchOptions}
              value={formData.branch}
              placeholder="اختر الفرع المناسب ليك"
              onChange={setField("branch")}
              error={fieldErrors.branch}
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="main_button w-full py-4 text-base sm:text-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "جاري الإرسال..." : "سجّل الآن"}
          </button>
        </form>
      </div>
    </>
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
