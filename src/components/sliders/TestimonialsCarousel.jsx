import EmptyState from "@/components/shared/EmptyState";
import SectionTitle from "@/components/shared/SectionTitle";
import CarsoulComponent from "./CarsoulComponent";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsCarousel({ testimonials = [] }) {
  if (testimonials.length === 0) {
    return (
      <section className="my-10 px-5" dir="ltr">
        <EmptyState
          title="لا توجد آراء طلاب حالياً"
          subtitle="سيتم إضافة آراء الطلاب قريباً — ترقّب تجاربهم معنا"
        />
      </section>
    );
  }

  return (
    <section className="my-10 px-5 lg:px-15" dir="ltr">
      <SectionTitle title="آراء الطلاب" />
      <CarsoulComponent>
        {testimonials.map((item) => (
          <TestimonialCard key={item.id} item={item} />
        ))}
      </CarsoulComponent>
    </section>
  );
}
