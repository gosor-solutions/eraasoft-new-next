"use client";

import { useState } from "react";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Check, AlertCircle } from "lucide-react";
import { enrollInCourse, verifyCoupon } from "@/services/Enrollment";
import { useAuth } from "@/providers/AuthProvider";

const CustomSelect = dynamic(() => import("../shared/CustomSelect"), { ssr: false });


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


export default function BookingCourse({ course }) {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
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

  const basePrice = course?.price ?? 0;
  const courseFinalPrice = course?.final_price ?? 0;
  const originalDiscount = basePrice - courseFinalPrice;
  
  let couponDiscountAmount = 0;
  if (verifiedCoupon) {
    couponDiscountAmount = Math.round(courseFinalPrice * (verifiedCoupon.discount_percent / 100));
  }

  const finalPrice = Math.max(0, courseFinalPrice - couponDiscountAmount);

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
        course_id: course?.id,
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
        router.push(`/booking/success?course=${encodeURIComponent(course?.title ?? "")}`);
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
    <div className="px-5 lg:px-15" dir="rtl">
      <ToastContainer rtl />

      <Link href={`/courses/${course?.slug}`} className="flex gap-1 items-center mb-5 w-fit">
        <ChevronRight size={20} />
        <span className="text-base sm:text-lg text-[#333333]">العودة إلى تفاصيل الكورس</span>
      </Link>

      <div className="grid grid-cols-12 gap-5 items-start">
        <div className="col-span-12 md:col-span-7">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 bg-[#2243A40D] p-6 sm:p-8 rounded-2xl">
            <div className="flex flex-col gap-1">
              <h2 className="text-[#0A0A0A] font-bold text-2xl sm:text-3xl">إتمام الاشتراك</h2>
              <p className="text-[#606060] text-sm sm:text-base">أكمل البيانات التالية لإتمام عملية الشراء</p>
            </div>

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

           
            <Field label="الاسم" error={fieldErrors.name}>
              <input type="text" placeholder="الاسم" value={formData.name} onChange={(e) => setField("name")(e.target.value)} className={inputCls(fieldErrors.name)} />
            </Field>

          
            <Field label="البريد الالكتروني" error={fieldErrors.email}>
              <input type="email" placeholder="البريد الالكتروني" value={formData.email} onChange={(e) => setField("email")(e.target.value)} className={inputCls(fieldErrors.email)} />
            </Field>

       
            <Field label="رقم التليفون" error={fieldErrors.phone}>
              <div className={`border rounded-full bg-white overflow-hidden ${fieldErrors.phone ? "border-red-400" : "border-[#D2D2D2]"}`}>
                <PhoneInput defaultCountry="EG" value={formData.phone} onChange={(value) => setField("phone")(value ?? "")} />
              </div>
            </Field>

         
            <Field error={fieldErrors.attendance_location}>
              <CustomSelect
                label="طريقة الحضور"
                options={attendanceOptions}
                value={formData.attendance_location}
                placeholder="اختر طريقة الحضور"
                onChange={(value) => {
                  setFormData((prev) => {
                    const next = { ...prev, attendance_location: value };
                    if (value === "ONLINE") {
                      next.branch = "ONLINE";
                    } else if (prev.branch === "ONLINE") {
                      next.branch = "";
                    }
                    return next;
                  });
                  setFieldErrors((prev) => ({
                    ...prev,
                    attendance_location: undefined,
                    branch: value === "ONLINE" ? undefined : prev.branch,
                  }));
                }}
                error={fieldErrors.attendance_location}
              />
            </Field>

            {formData.attendance_location !== "ONLINE" && (
              <Field error={fieldErrors.branch}>
                <CustomSelect
                  label="اختر الفرع المناسب ليك"
                  options={branchOptions.filter((opt) => opt.value !== "ONLINE")}
                  value={formData.branch}
                  placeholder="اختر الفرع المناسب ليك"
                  onChange={setField("branch")}
                  error={fieldErrors.branch}
                />
              </Field>
            )}

            <button type="submit" disabled={loading} className="main_button w-full py-4 text-base sm:text-lg disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? "جاري الحجز..." : "اتمام الحجز"}
            </button>
          </form>
        </div>

      
        <div className="col-span-12 md:col-span-5 md:sticky md:top-5">
          <div className="bg-white border border-(--primary-color) rounded-2xl p-5">
            <h3 className="font-bold text-(--primary-color) mb-3">{course?.category?.title || "الكورس"}</h3>

            <div className="bg-[#2243A41A] p-4 rounded-xl">
              <h4 className="mb-2 font-bold text-base sm:text-lg leading-7">{course?.title}</h4>
              <p className="text-sm text-[#606060] leading-7 line-clamp-4">{course?.description}</p>
            </div>

            {/* Coupon Code Section */}
            <div className="py-4 border-b border-[#BECBF2] my-3">
              <h5 className="font-bold text-sm text-gray-700 mb-2">هل لديك كوبون خصم؟</h5>
              {verifiedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-600" />
                    <span className="text-xs sm:text-sm font-semibold text-emerald-800">
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
                      className="grow outline-none border border-[#D2D2D2] focus:border-[#2243A4] py-2.5 px-4 rounded-full text-sm bg-white"
                    />
                    <button
                      type="button"
                      disabled={verifying || !couponCode.trim()}
                      onClick={handleVerifyCoupon}
                      className="bg-[#2243A4] hover:bg-[#19327D] text-white px-5 py-2.5 rounded-full text-xs font-semibold disabled:opacity-50 transition-colors shrink-0"
                    >
                      {verifying ? "جاري التحقق..." : "تطبيق"}
                    </button>
                  </div>
                  {couponError && (
                    <div className="flex items-center gap-1.5 text-xs text-red-500 pr-2">
                      <AlertCircle size={12} />
                      <span>{couponError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="py-4 border-b border-[#BECBF2] my-3 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h5 className="font-semibold text-[#4A5565] text-sm sm:text-base">سعر الاشتراك</h5>
                <p className="font-bold text-base sm:text-lg">{basePrice.toLocaleString("ar-EG")} ج.م</p>
              </div>
              {originalDiscount > 0 && (
                <div className="flex justify-between items-center">
                  <h5 className="text-[#BC9A18] text-sm sm:text-base">خصم الكورس</h5>
                  <p className="font-bold text-base sm:text-lg text-[#BC9A18]">- {originalDiscount.toLocaleString("ar-EG")} ج.م</p>
                </div>
              )}
              {couponDiscountAmount > 0 && (
                <div className="flex justify-between items-center">
                  <h5 className="text-emerald-600 text-sm sm:text-base">خصم الكوبون ({verifiedCoupon?.discount_percent}%)</h5>
                  <p className="font-bold text-base sm:text-lg text-emerald-600">- {couponDiscountAmount.toLocaleString("ar-EG")} ج.م</p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <h6 className="font-bold text-lg sm:text-xl">الإجمالي</h6>
              <p className="text-(--primary-color) text-lg sm:text-xl font-bold">{finalPrice.toLocaleString("ar-EG")} ج.m</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
