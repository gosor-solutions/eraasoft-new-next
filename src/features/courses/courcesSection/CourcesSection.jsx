import CourceCard from "@/components/courcesSection/CourceCard";

export default function CourcesSection({ courses = [] }) {
  return (
    <section className="px-4 lg:px-15 my-8" dir="rtl">
      <div className="grid grid-cols-12 gap-3">
        {courses.map((course) => (
          <CourceCard course={course} key={course.id} />
        ))}
      </div>
    </section>
  );
}
