import HeroCarousel from "@/components/shared/HeroCarusel";

export const metadata = {
  title: "الشروط والأحكام",
  description: "اقرأ الشروط والأحكام الخاصة باستخدام خدمات EraaSoft التعليمية والتقنية.",
};

const terms = [
  {
    title: "القبول بالشروط",
    items: [
      "باستخدامك لموقع EraaSoft أو التسجيل في أي من برامجنا التدريبية، فإنك توافق على الالتزام بهذه الشروط والأحكام.",
      "إذا كنت لا توافق على هذه الشروط، يُرجى عدم استخدام خدماتنا.",
      "تحتفظ EraaSoft بحق تعديل هذه الشروط في أي وقت، وسيتم إشعارك بأي تغييرات جوهرية.",
    ],
  },
  {
    title: "استخدام الخدمات",
    items: [
      "يجب أن يكون عمرك 16 عامًا على الأقل للتسجيل في برامجنا التدريبية.",
      "أنت مسؤول عن الحفاظ على سرية بيانات حسابك وعدم مشاركتها مع أطراف أخرى.",
      "يُحظر استخدام المنصة لأي أغراض غير مشروعة أو مخالفة للقوانين المعمول بها.",
      "يُمنع إعادة نشر أو توزيع المحتوى التعليمي المقدم دون إذن كتابي مسبق من EraaSoft.",
    ],
  },
  {
    title: "حقوق الملكية الفكرية",
    items: [
      "جميع المحتويات التعليمية من مقاطع فيديو ومواد ومشاريع هي ملك حصري لـ EraaSoft.",
      "يُمنح المتدرب ترخيصًا شخصيًا غير قابل للتحويل لاستخدام المواد لأغراض التعلم الشخصي فقط.",
      "أي انتهاك لحقوق الملكية الفكرية يُعرض صاحبه للمساءلة القانونية.",
    ],
  },
  {
    title: "التسجيل والرسوم",
    items: [
      "تُعتبر عملية التسجيل مكتملة فقط عند استلام رسوم الالتحاق كاملةً وتأكيد الحجز.",
      "تخضع الرسوم الدراسية لسياسة الاسترجاع المنصوص عليها في صفحة سياسة الخصوصية والاسترجاع.",
      "تحتفظ EraaSoft بحق تغيير الرسوم والجداول الزمنية مع إشعار مسبق للمتدربين المسجلين.",
    ],
  },
  {
    title: "السلوك والالتزام",
    items: [
      "يلتزم المتدرب باحترام المدربين وزملائه خلال جميع جلسات التدريب.",
      "يُمنع التصوير أو التسجيل خلال الجلسات الحية دون إذن صريح من إدارة EraaSoft.",
      "تحتفظ EraaSoft بحق إلغاء تسجيل أي متدرب يخالف قواعد السلوك دون رد المبالغ المدفوعة.",
    ],
  },
  {
    title: "إخلاء المسؤولية",
    items: [
      "تسعى EraaSoft لتقديم محتوى تعليمي دقيق ومحدث، غير أنها لا تضمن تحقيق نتائج وظيفية أو مهنية محددة.",
      "EraaSoft غير مسؤولة عن أي انقطاع في الخدمة ناتج عن أسباب خارجة عن إرادتها.",
      "تُقدم الخدمات التقنية والاستشارية كما هي (as-is)، ويتحمل العميل مسؤولية تقييم مدى ملاءمتها لاحتياجاته.",
    ],
  },
  {
    title: "القانون المطبق",
    items: [
      "تخضع هذه الشروط وتُفسر وفقًا للقوانين المعمول بها في جمهورية مصر العربية.",
      "في حال نشوء أي نزاع، يُلجأ أولًا إلى التسوية الودية، وفي حال تعذّرها تُحال القضية إلى الجهات القضائية المختصة.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="bg-[#FAFAFA]" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-[#EEF2FF] border border-[#2243A4]/20 rounded-2xl p-5 mb-10">
          <p className="text-[#2243A4] font-semibold text-sm sm:text-base leading-relaxed">آخر تحديث: يونيو 2025 — باستخدامك لخدمات EraaSoft فإنك توافق على جميع البنود الواردة في هذه الوثيقة.</p>
        </div>

        <div className="flex flex-col gap-8">
          {terms.map((term, index) => (
            <section key={term.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2243A4] text-white text-sm font-bold shrink-0">{index + 1}</span>
                <h2 className="text-lg sm:text-xl font-bold text-[#0C1739]">{term.title}</h2>
              </div>
              <ul className="flex flex-col gap-3">
                {term.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2243A4] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="bg-[#0C1739] rounded-2xl p-6 sm:p-8 text-center mt-10">
          <h3 className="text-[#BECBF2] text-lg font-bold mb-2">هل لديك استفسار؟</h3>
          <p className="text-white text-sm sm:text-base mb-4">للتواصل بخصوص أي بند من هذه الشروط، يرجى مراسلتنا على:</p>
          <a href="mailto:info@eraasoft.com" className="inline-block bg-[#2243A4] text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm sm:text-base">
            info@eraasoft.com
          </a>
        </div>
      </div>
    </div>
  );
}
