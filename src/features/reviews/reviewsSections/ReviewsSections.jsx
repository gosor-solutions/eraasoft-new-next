import ReviewCard from "../reviewCard/ReviewCard";

export default function ReviewsSections({ testimonials = [] }) {
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
