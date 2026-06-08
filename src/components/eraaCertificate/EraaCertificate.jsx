import React from "react";
import Image from "next/image";

export default function EraaCertificate() {
  return (
    <section className="px-5 lg:px-15 py-10" dir="rtl">
      <div className="grid grid-cols-12 gap-3 ">
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <h2 className="text-3xl font-semibold text-(--primary-color) mb-4">الشهادات</h2>
          <p className="text-2xl text-[#333333] leading-13">
            هذه الدورة التدريبية معتمدة رسمياً من نقابة المهندسين المصرية. يحصل المتدرب في نهايتها على شهادة حضور وإتمام موثقة، تحمل توقيع الجهة المنظمة وختم النقابة. يمكن استخدام الشهادة ضمن السيرة
            الذاتية أو عند التقديم للوظائف أو الترقية المهنية.
          </p>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <div className="relative aspect-4/3 sm:aspect-3/2 rounded-lg overflow-hidden">
            <Image src="/certificate.png" alt="شهادة إيراسوفت المعتمدة من نقابة المهندسين" fill className="object-contain object-center" />
          </div>
        </div>
      </div>
    </section>
  );
}
