import EmptyState from "@/components/shared/EmptyState";
import LineSvg from "@/components/shared/LineSvg";
import CourceCard from "./CourceCard";

export default function CourcesSection({ courses = [] }) {
  return (
    <section className="px-5 lg:px-8 py-10 min-h-screen bg-[#2243A41A]" dir="rtl">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <h2 className="headStyle mt-6 mb-10 sm:mt-8 sm:mb-14 lg:mt-10 lg:mb-20 flex justify-center">
            تصفح
            <span className="relative flex flex-col items-center justify-center">
              <span className="ms-2">الكورسات</span>
              <span className="absolute top-3 -right-5">
                <LineSvg colorOne={"#2243A4"} colorTwo={"#2243A4"} svgId={"paint_courses"} svgWidth="200" svgHeight="170" strokeWidth="8" />
              </span>
            </span>
          </h2>
        </div>

        {courses.length === 0 ? (
          <div className="col-span-12">
            <EmptyState
              title="لا توجد دورات متاحة حالياً"
              subtitle="نعمل على إضافة دورات جديدة — تابعنا لمعرفة آخر الإضافات"
            />
          </div>
        ) : (
          // TODO: remove the reverse
          courses.reverse().map((course, index) => (
            <CourceCard course={course} key={`${course?.id} cource ID`} delay={(index % 4) * 0.08} />
          ))
        )}
      </div>
    </section>
  );
}
