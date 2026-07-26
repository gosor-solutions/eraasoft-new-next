import { Check, BookOpen, Phone, Rocket } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "تم الحجز بنجاح" };

export default async function BookingSuccessPage({ searchParams }) {
  const params = await searchParams;
  const courseName = params?.course ? decodeURIComponent(params.course) : null;

  return (
    <section className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-5 py-16" dir="rtl">
      <div className="w-full max-w-lg">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg px-8 py-12 sm:px-12 text-center">

          {/* Animated icon */}
          <div className="relative w-28 h-28 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-[#2243A4]/10 animate-ping" style={{ animationDuration: "2.5s" }} />
            <div className="relative w-28 h-28 rounded-full bg-[#2243A4]/10 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#2243A4]/20 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#2243A4] flex items-center justify-center shadow-lg shadow-[#2243A4]/30">
                  <Check size={28} className="text-white" strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-3">
            تم الحجز بنجاح!
          </h1>

          {/* Course name */}
          {courseName && (
            <div className="inline-block bg-[#2243A4]/8 text-[#2243A4] text-sm sm:text-base font-semibold px-5 py-2 rounded-full mb-4">
              {courseName}
            </div>
          )}

          <p className="text-[#606060] text-sm sm:text-base leading-7 mb-10">
            شكراً لك! تم استلام طلب الحجز بنجاح. سيتواصل معك فريقنا في أقرب وقت لتأكيد الاشتراك.
          </p>

          {/* Steps */}
          <div className="flex flex-col gap-4 mb-10 text-right">
            {[
              { icon: <Check size={16} />,    color: "bg-green-100 text-green-600",      text: "تم استلام طلبك بنجاح"                        },
              { icon: <Phone size={16} />,    color: "bg-[#2243A4]/10 text-[#2243A4]",   text: "سيتصل بك فريقنا خلال 24 ساعة لتأكيد الحجز" },
              { icon: <Rocket size={16} />,   color: "bg-amber-100 text-amber-600",      text: "ابدأ رحلتك التعليمية مع إيراسوفت"            },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#FAFAFA] rounded-2xl px-4 py-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${step.color}`}>
                  {step.icon}
                </div>
                <p className="text-sm sm:text-base text-[#333]">{step.text}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/courses"
              className="flex-1 main_button py-3.5 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <BookOpen size={18} />
              تصفح الكورسات
            </Link>
            <Link
              href="/"
              className="flex-1 py-3.5 text-sm sm:text-base border border-[#D2D2D2] rounded-2xl text-[#333] hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              الصفحة الرئيسية
            </Link>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-[#999] mt-6">
          إذا لم يتواصل معك أحد خلال 24 ساعة، يرجى التواصل معنا مباشرة عبر الواتساب
        </p>
      </div>
    </section>
  );
}
