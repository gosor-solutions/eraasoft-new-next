"use client";

import { useState } from "react";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { enrollInCourse } from "@/services/Enrollment";

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

  const discount = (course?.price ?? 0) - (course?.final_price ?? 0);

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
      const res = await enrollInCourse({
        course_id: course?.id,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
        attendance_location: formData.attendance_location,
        branch: formData.branch,
        payment_method: "CASH",
        website: formData.website,
      });

      if (res?.success) {
        router.push(`/booking/success?course=${encodeURIComponent(course?.title ?? "")}`);
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

            <div className="py-4 border-b border-[#BECBF2] my-3 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h5 className="font-semibold text-[#4A5565] text-sm sm:text-base">سعر الاشتراك</h5>
                <p className="font-bold text-base sm:text-lg">{course?.price?.toLocaleString("ar-EG")} ج.م</p>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center">
                  <h5 className="text-[#BC9A18] text-sm sm:text-base">قيمة الخصم</h5>
                  <p className="font-bold text-base sm:text-lg text-[#BC9A18]">- {discount.toLocaleString("ar-EG")} ج.م</p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <h6 className="font-bold text-lg sm:text-xl">الإجمالي</h6>
              <p className="text-(--primary-color) text-lg sm:text-xl font-bold">{course?.final_price?.toLocaleString("ar-EG")} ج.م</p>
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
