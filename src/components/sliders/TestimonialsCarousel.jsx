import EmptyState from "@/components/shared/EmptyState";
import CarsoulComponent from "./CarsoulComponent";
import TestimonialCard from "./TestimonialCard";

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
    <CarsoulComponent>
      {testimonials.map((item) => (
        <TestimonialCard key={item.id} item={item} />
      ))}
    </CarsoulComponent>
  );
}
