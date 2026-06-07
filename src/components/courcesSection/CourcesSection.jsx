import CourceCard from "./CourceCard";

export default function CourcesSection({ courses = [] }) {
  return (
    <section className=" my-20 px-5 lg:px-8 py-10 min-h-screen bg-[#2243A41A] " dir="rtl">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 text-center">
          <h2 className="headStyle">الكورسات </h2>
        </div>
        {courses.map((course) => (
          <CourceCard course={course} key={`${course?.id} cource ID`} />
        ))}
      </div>
    </section>
  );
}
