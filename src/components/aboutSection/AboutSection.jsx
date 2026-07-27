import Image from "next/image";
import React from "react";
import LineSvg from "../shared/LineSvg";

export default function AboutSection() {
  return (
    <section className="px-5 sm:px-8 my-8 lg:my-5" dir="rtl">
      <div className="grid grid-cols-12 gap-6 items-start">

        {/* Heading - full width */}
        <div className="col-span-12">
          <h2 className="headStyle text-center my-4 flex justify-center gap-2 flex-wrap">
            <span>ماذا عن</span>
            <span className="inline-flex flex-col items-center">
              <span>ايراسوفت</span>
              <LineSvg colorOne={"#2243A4"} colorTwo={"#2243A4"} svgId={"paint1_linear"} svgWidth="120" svgHeight="18" strokeWidth="6" />
            </span>
          </h2>
        </div>

        {/* Images column */}
        <div className="col-span-12 lg:col-span-4 order-2 lg:order-1">
          <div className="flex gap-2 sm:gap-3 items-start justify-center lg:justify-start">
            <Image
              src="/about_two.png"
              alt="فريق إيراسوفت"
              width={250}
              height={100}
              sizes="(max-width: 1024px) 50vw, 20vw"
              className="rounded-2xl w-1/2 lg:w-45 xl:w-62.5 h-auto"
            />
            <Image
              src="/about_one.png"
              alt="مقر إيراسوفت"
              width={200}
              height={200}
              sizes="(max-width: 1024px) 40vw, 16vw"
              className="rounded-2xl w-2/5 lg:w-37.5 xl:w-50 h-auto"
            />
          </div>
        </div>

        {/* Text column */}
        <div className="col-span-12 lg:col-span-8 order-1 lg:order-2">
          <h3 className="subHead flex justify-center lg:justify-start gap-2 flex-wrap relative">
            <span>عن</span>
            <span className="inline-flex flex-col items-center">
              <span>ايراسوفت</span>
              <LineSvg colorOne={"#2243A4"} colorTwo={"#2243A4"} svgId={"paint2_linear"} svgWidth="120" svgHeight="18" strokeWidth="6" />
            </span>
          </h3>
          <p className="mt-4 lg:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl leading-8 lg:leading-9 py-3 lg:py-5 text-[#606060]">
            إيراسوفت هي شركة متخصصة في تقديم الحلول البرمجية المتقدمة والتدريب التقني الاحترافي، تأسست بهدف تمكين الأفراد والشركات من مواكبة التطور السريع في مجالات البرمجة وعلوم الحاسوب. نعتمد في
            إيراسوفت على رؤية واضحة تقوم على أن التجربة العملية هي الأساس الحقيقي للاحتراف، لذلك نحرص على تقديم برامج تدريبية وتطويرية تعتمد على التطبيق الفعلي، بما يساهم في إعداد كوادر مؤهلة وقادرة
            على المنافسة بقوة في سوق العمل.
          </p>
        </div>

      </div>
    </section>
  );
}
