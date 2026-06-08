import EmptyState from "@/components/shared/EmptyState";
import ReviewCard from "../reviewCard/ReviewCard";

export default function ReviewsSections({ testimonials = [] }) {
  if (testimonials.length === 0) {
    return (
      <section className="px-15 my-8" dir="rtl">
        <EmptyState
          title="لا توجد آراء طلاب حالياً"
          subtitle="لم يتم إضافة آراء بعد — ترقّب تجارب طلابنا قريباً"
        />
      </section>
    );
  }

  return (
    <section className="px-15 my-8" dir="rtl">
      <div className="grid grid-cols-12 gap-3">
        {testimonials.map((testmonial) => (
          <ReviewCard item={testmonial} key={testmonial.id} />
        ))}
      </div>
    </section>
  );
}
