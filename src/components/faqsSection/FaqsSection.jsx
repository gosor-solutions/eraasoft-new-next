import LineSvg from "@/components/shared/LineSvg";
import Faqs from "./Faqs";

export default function FaqsSection({ faqs = [] }) {
  if (faqs.length === 0) return null;

  return (
    <section className="my-8 sm:my-10 lg:my-5 px-5 sm:px-8 lg:px-13" dir="rtl">
      <h2 className="headStyle mt-6 mb-10 sm:mt-8 sm:mb-14 lg:mt-10 lg:mb-20 flex justify-center">
        الأسئلة
        <span className="relative flex flex-col items-center justify-center">
          <span className="ms-2">الشائعة</span>
          <span className="absolute top-3 -right-5">
            <LineSvg colorOne={"#2243A4"} colorTwo={"#2243A4"} svgId={"paint_faqs"} svgWidth="200" svgHeight="170" strokeWidth="8" />
          </span>
        </span>
      </h2>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-10 lg:col-start-2 flex flex-col gap-4">
          {faqs.map((faq) => (
            <Faqs key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
