"use client";

import { useState } from "react";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { enrollInCourse, verifyCoupon } from "@/services/Enrollment";
import { useAuth } from "@/providers/AuthProvider";
import { Check, AlertCircle } from "lucide-react";

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
  const { token } = useAuth();
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

  // Coupon States
  const [couponCode, setCouponCode] = useState("");
  const [verifiedCoupon, setVerifiedCoupon] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [couponError, setCouponError] = useState("");

  const setField = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleVerifyCoupon = async () => {
    if (!couponCode.trim()) return;
    setVerifying(true);
    setCouponError("");
    try {
      const res = await verifyCoupon(couponCode.trim(), token);
      if (res?.success) {
        setVerifiedCoupon(res.data);
        toast.success("تم تطبيق الكوبون بنجاح!");
      } else {
        setCouponError(res?.message || "الكوبون غير صحيح");
      }
    } catch (err) {
      const msg = err?.errors?.coupon_code?.[0] || err?.errors?.coupon?.[0] || err?.message || "فشل التحقق من الكوبون";
      setCouponError(msg);
    } finally {
      setVerifying(false);
    }
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
        coupon_code: verifiedCoupon?.coupon_code || null,
        website: formData.website || null,
      }, token);

      if (res?.success) {
        router.push(`/booking/success?course=${encodeURIComponent(selectedCourseName)}`);
        return;
      } else {
        toast.error(res?.message || "حدث خطأ، يرجى المحاولة مجدداً.", { position: "top-center" });
      }
    } catch (err) {
      toast.error(err?.message || "حدث خطأ في الاتصال، يرجى المحاولة مجدداً.", { position: "top-center" });
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

          {/* Coupon Code Section */}
          <div className="flex flex-col gap-2">
            <label className="text-base sm:text-lg font-semibold">هل لديك كوبون خصم؟</label>
            {verifiedCoupon ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-800">
                    تم تطبيق الكوبون: <code className="font-bold">{verifiedCoupon.coupon_code}</code> ({verifiedCoupon.discount_percent}%)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setVerifiedCoupon(null);
                    setCouponCode("");
                  }}
                  className="text-xs text-red-500 hover:underline"
                >
                  حذف
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="أدخل كود الكوبون"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError("");
                    }}
                    className="grow outline-none border border-[#D2D2D2] focus:border-[#2243A4] py-3 px-5 rounded-full text-sm bg-white"
                  />
                  <button
                    type="button"
                    disabled={verifying || !couponCode.trim()}
                    onClick={handleVerifyCoupon}
                    className="bg-[#2243A4] hover:bg-[#19327D] text-white px-6 py-3 rounded-full text-sm font-semibold disabled:opacity-50 transition-colors shrink-0"
                  >
                    {verifying ? "جاري التحقق..." : "تطبيق"}
                  </button>
                </div>
                {couponError && (
                  <div className="flex items-center gap-1.5 text-xs text-red-500 pr-4">
                    <AlertCircle size={12} />
                    <span>{couponError}</span>
                  </div>
                )}
              </div>
            )}
          </div>

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
