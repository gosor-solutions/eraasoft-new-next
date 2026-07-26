import CourceCard from "@/components/courcesSection/CourceCard";
import Pagination from "@/components/shared/Pagination";
import EmptyState from "@/components/shared/EmptyState";

export default function CourcesSection({ courses = [], meta }) {
  return (
    <section className="px-4 lg:px-15 my-8" dir="rtl">
      {courses.length > 0 ? (
        <>
          <div className="grid grid-cols-12 gap-3">
            {courses.map((course, index) => (
              <CourceCard course={course} key={course.id} delay={(index % 4) * 0.08} />
            ))}
          </div>
          <Pagination currentPage={meta?.current_page ?? 1} lastPage={meta?.last_page ?? 1} />
        </>
      ) : (
        <EmptyState title="لا توجد دورات متاحة حالياً" />
      )}
    </section>
  );
}
