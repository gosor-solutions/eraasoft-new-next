import { ArrowLeft } from "lucide-react";

export default function AboutEraa() {
  return (
    <div className="flex flex-col gap-4">
      {/* 01 */}
      <div className="flex gap-2 sm:gap-4" dir="rtl">
        <div className="hidden sm:block shrink-0 w-14 sm:w-18 md:w-22 xl:w-28">
          <p className="text-[55px] sm:text-[70px] md:text-[85px] xl:text-[108px] font-bold text-[#5f5f5f29] leading-none">01</p>
        </div>
        <FeatureCard title="محتوى تدريبي عملي" description="نقدم دورات تعتمد على التطبيق الفعلي لضمان اكتساب مهارات حقيقية يمكن استخدامها مباشرة في سوق العمل." />
      </div>

      {/* 02 */}
      <div className="flex gap-2 sm:gap-4" dir="rtl">
        <FeatureCard title="مدربون بخبرة احترافية" description="يتم تقديم الكورسات بواسطة نخبة من المتخصصين ذوي الخبرة العملية في مجالاتهم المختلفة." />
        <div className="hidden sm:block shrink-0 w-14 sm:w-18 md:w-22 xl:w-28">
          <p className="text-[55px] sm:text-[70px] md:text-[85px] xl:text-[108px] font-bold text-[#5f5f5f29] leading-none">02</p>
        </div>
      </div>

      {/* 03 */}
      <div className="flex gap-2 sm:gap-4" dir="rtl">
        <div className="hidden sm:block shrink-0 w-14 sm:w-18 md:w-22 xl:w-28">
          <p className="text-[55px] sm:text-[70px] md:text-[85px] xl:text-[108px] font-bold text-[#5f5f5f29] leading-none">03</p>
        </div>
        <FeatureCard title="مسارات تعليمية متكاملة" description="نوفر برامج تدريبية منظمة تساعدك على التدرج من المستوى المبتدئ إلى الاحترافي بخطوات واضحة." />
      </div>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="flex gap-3 sm:gap-4 items-center bg-white rounded-2xl p-4 sm:p-6 shadow-xl w-full">
      <div className="shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#2243A41A] flex justify-center items-center">
        <div className="w-7 h-7 sm:w-10 sm:h-10 border-l-3 rounded-2xl flex justify-center items-center border-[#0066FF]">
          <ArrowLeft className="text-[#2243A4] w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-base sm:text-lg lg:text-xl font-bold">{title}</h2>
        <p className="mt-1 text-sm sm:text-base text-[#606060] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
