import Image from "next/image";
import LineSvg from "../shared/LineSvg";

const features = [
  {
    image: "/content.png",
    title: "محتوى عملي 100%",
    description:
      "نركز على التطبيق العملي مش النظري بس، عشان تقدر تستخدم اللي اتعلمته فورًا في الشغل.",
  },
  {
    image: "/instructors_icon.png",
    title: "مدربون خبراء",
    description:
      "يتم إعداد وتقديم الدورات بواسطة خبراء يمتلكون خبرة عملية واسعة في مجالاتهم.",
  },
  {
    image: "/content.png",
    title: "مسارات تعليم واضحة",
    description:
      "نوفر مسارات تعليمية واضحة ومتكاملة تساعدك على التدرج من المستوى المبتدئ إلى الاحترافي.",
  },
  {
    image: "/instructors_icon.png",
    title: "شهادات معتمدة",
    description:
      "احصل على شهادات معتمدة تُثبت كفاءتك وتفتح أمامك فرص عمل أوسع في السوق.",
  },
  {
    image: "/content.png",
    title: "شهادات معتمدة",
    description:
      "احصل على شهادات موثوقة بعد إتمام الدورات لدعم مسيرتك المهنية.",
  },
  {
    image: "/instructors_icon.png",
    title: "شراكات موثوقة",
    description:
      "نحرص على بناء علاقات تعاون مع شركاء موثوقين لتقديم تجربة تعليمية متكاملة تلبي احتياجات المتعلمين.",
  },
  {
    image: "/content.png",
    title: "دعم مستمر",
    description:
      "فريق دعم متخصص لمساعدتك والإجابة على استفساراتك خلال رحلتك التعليمية.",
  },
  {
    image: "/instructors_icon.png",
    title: "منتور شخصي متخصص",
    description:
      "يرافقك منتور متخصص طوال فترة الدبلومة، جاهز للإجابة على أسئلتك وتوجيهك نحو تحقيق أهدافك التعليمية والمهنية.",
  },
];

export default function Features() {
  return (
    <>
      <section className="px-8 my-8" dir="rtl">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <h2 className="headStyle my-15 flex justify-center">
              ما الذي
              <span className="relative flex flex-col items-center justify-center">
                <span className="ms-2">يميزنا</span>
                <span className="absolute top-3 -right-5">
                  <LineSvg
                    colorOne={"#2243A4"}
                    colorTwo={"#2243A4"}
                    svgId={"paint1_linear"}
                    svgWidth="200"
                    svgHeight="170"
                    strokeWidth="8"
                  />
                </span>
              </span>
            </h2>
          </div>
          {features?.map((feature, index) => {
            const isPrimary = index % 2 !== 0;
            return (
              <div
                key={index}
                className="col-span-12 md:col-span-6 lg:col-span-3 flex"
              >
                <div
                  className={`group relative overflow-hidden p-10 rounded-[60px] flex flex-col gap-2 h-full w-full ${isPrimary ? "bg-(--primary-color) text-white" : "bg-[#2243A41A]"}`}
                >
                  <div
                    className="
                      absolute inset-0
                      bg-[linear-gradient(#00000000,#091B4E),url('/bg_feture-1.jpg')]
                      bg-cover bg-center
                      opacity-0 transition-all duration-500
                      group-hover:opacity-100
                    "
                  />
                  <div
                    className={`relative z-10 w-20 h-20 flex justify-center items-center rounded-full ${isPrimary ? "bg-white" : "bg-(--primary-color)"}`}
                  >
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h2 className="relative z-10 text-[20px] font-bold transition-colors duration-500 group-hover:text-white">
                    {feature.title}
                  </h2>
                  <p
                    className={`relative z-10 text-[16px] transition-colors duration-500 group-hover:text-white ${isPrimary ? "text-white" : "text-[#777777]"}`}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
