import HeroCarousel from "@/components/shared/HeroCarusel";

export const metadata = {
  title: "سياسة الخصوصية وسياسة الاسترجاع",
  description:
    "تعرف على سياسة الخصوصية وسياسة الاسترجاع الخاصة بـ EraaSoft — كيف نحمي بياناتك وما هي شروط استرجاع الرسوم الدراسية.",
};

const sections = [
  {
    id: "privacy",
    title: "سياسة الخصوصية",
    intro:
      "في EraaSoft، نلتزم بالحفاظ على سرية وأمان بيانات مستخدمينا، سواء كانوا عملاء تطوير برمجيات أو متدربين في برامجنا التعليمية.",
    subsections: [
      {
        title: "المعلومات التي نقوم بجمعها",
        items: [
          "معلومات شخصية مثل الاسم، البريد الإلكتروني، ورقم الهاتف.",
          "معلومات تتعلق بالخدمة المطلوبة (برنامج تدريبي، مشروع برمجي، أو استشارة).",
          "ملاحظاتك وتقييماتك لتحسين جودة الخدمة المقدمة.",
        ],
      },
      {
        title: "كيفية استخدام المعلومات",
        items: [
          "تحسين الخدمات التعليمية والتقنية لدينا.",
          "تقديم الدعم الفني والتواصل عند الحاجة.",
          "إرسال التحديثات والمحتوى المرتبط بخدماتنا، بموافقتك المسبقة.",
        ],
      },
    ],
    note: "نؤكد أننا لا نشارك بياناتك مع أي طرف ثالث بدون موافقتك، ونستخدم تقنيات حماية متقدمة للحفاظ على أمان المعلومات.",
  },
  {
    id: "refund",
    title: "سياسة الاسترجاع",
    intro:
      "في EraaSoft، نُقدّر التزام المتدربين معنا ونسعى لتوفير تجربة مريحة وعادلة للجميع. لذلك، نسمح باسترجاع الرسوم الدراسية وفقًا للضوابط التالية:",
    subsections: [
      {
        title: "شروط الاسترجاع",
        items: [
          "يُسمح بتقديم طلب استرجاع فقط قبل بدء الدبلومة.",
          "يجب أن يتم تقديم طلب الاسترجاع قبل 7 أيام على الأقل من تاريخ بدء الدبلومة المُعلن.",
          "لا يُقبل أي طلب استرجاع بعد هذه الفترة أو بعد بدء البرنامج التدريبي.",
        ],
      },
      {
        title: "آلية الاسترجاع",
        items: [
          "يتم إرسال طلب الاسترجاع عبر البريد الإلكتروني الرسمي أو من خلال نموذج التواصل على الموقع.",
          "تُراجع الطلبات خلال 3 أيام عمل، ويتم إشعار المتقدم بالقرار.",
          "في حال الموافقة، يتم رد المبلغ المدفوع بالكامل خلال 10 أيام عمل بنفس وسيلة الدفع المستخدمة.",
        ],
      },
    ],
    note: null,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAFAFA]" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {sections?.map((section) => (
          <section key={section.id} className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1 h-8 rounded-full bg-[#2243A4] shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0C1739]">
                {section.title}
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-base sm:text-lg">
              {section.intro}
            </p>

            <div className="flex flex-col gap-6">
              {section.subsections?.map((sub) => (
                <div
                  key={sub.title}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                >
                  <h3 className="text-lg font-bold text-[#2243A4] mb-4">
                    {sub.title}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {sub.items?.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-700 text-sm sm:text-base leading-relaxed"
                      >
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2243A4] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {section.note && (
              <div className="mt-6 bg-[#EEF2FF] border border-[#2243A4]/20 rounded-2xl p-5">
                <p className="text-[#2243A4] font-semibold text-sm sm:text-base leading-relaxed">
                  {section.note}
                </p>
              </div>
            )}
          </section>
        ))}

        <div className="bg-[#0C1739] rounded-2xl p-6 sm:p-8 text-center">
          <h3 className="text-[#BECBF2] text-lg font-bold mb-2">
            للتواصل معنا
          </h3>
          <p className="text-white text-sm sm:text-base mb-4">
            لأي استفسارات تتعلق بالخصوصية أو الاسترجاع، يرجى التواصل عبر البريد
            الإلكتروني:
          </p>
          <a
            href="mailto:info@eraasoft.com"
            className="inline-block bg-[#2243A4] text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm sm:text-base"
          >
            info@eraasoft.com
          </a>
        </div>
      </div>
    </div>
  );
}
