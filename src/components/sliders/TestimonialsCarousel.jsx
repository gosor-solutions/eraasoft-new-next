import EmptyState from "@/components/shared/EmptyState";
import LineSvg from "@/components/shared/LineSvg";
import CarsoulComponent from "./CarsoulComponent";
import TestimonialCard from "./TestimonialCard";

function TestimonialsTitle() {
  return (
    <h2 className="headStyle mt-6 mb-10 sm:mt-8 sm:mb-14 lg:mt-10 lg:mb-20 flex justify-center" dir="rtl">
      آراء
      <span className="relative flex flex-col items-center justify-center">
        <span className="ms-2">الطلاب</span>
        <span className="absolute top-3 -right-5">
          <LineSvg colorOne={"#2243A4"} colorTwo={"#2243A4"} svgId={"paint_testimonials"} svgWidth="200" svgHeight="170" strokeWidth="8" />
        </span>
      </span>
    </h2>
  );
}

export default function TestimonialsCarousel({ testimonials = [] }) {
  if (testimonials.length === 0) {
    return (
      <section className="my-10 px-5" dir="rtl">
        <EmptyState
          title="لا توجد آراء طلاب حالياً"
          subtitle="سيتم إضافة آراء الطلاب قريباً — ترقّب تجاربهم معنا"
        />
      </section>
    );
  }

  return (
    <section className="my-10">
      <TestimonialsTitle />
      <CarsoulComponent>
        {testimonials.map((item) => (
          <TestimonialCard key={item.id} item={item} />
        ))}
      </CarsoulComponent>
    </section>
  );
}
