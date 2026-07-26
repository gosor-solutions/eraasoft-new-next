import Link from "next/link";
import LineSvg from "@/components/shared/LineSvg";
import EmptyState from "@/components/shared/EmptyState";
import CarsoulComponent from "@/components/sliders/CarsoulComponent";
import CourseMedia from "@/components/courceInfo/CourseVideo";

function GraduationProjectsTitle() {
  return (
    <h2 className="headStyle mt-6 mb-7 sm:mt-8 sm:mb-14 lg:mt-10 lg:mb-8 flex justify-center" dir="rtl">
      مشاريع تخرج
      <span className="relative flex flex-col items-center justify-center">
        <span className="ms-2">طلابنا</span>
        <span className="absolute top-3 -right-5">
          <LineSvg colorOne={"#2243A4"} colorTwo={"#2243A4"} svgId={"paint_graduation"} svgWidth="200" svgHeight="170" strokeWidth="8" />
        </span>
      </span>
    </h2>
  );
}

export default function GraduationProjectsSection({ projects = [] }) {
  if (projects.length === 0) {
    return null;
    // return (
    //   <section className="my-10 px-5" dir="rtl">
    //     <EmptyState
    //       title="لا توجد مشاريع تخرج حالياً"
    //       subtitle="سيتم إضافة مشاريع الطلاب قريباً — ترقّب أعمالهم المميزة"
    //     />
    //   </section>
    // );
  }

  return (
    <section className="my-10">
      <GraduationProjectsTitle />
      <CarsoulComponent >
        {projects?.map((project) => (
          <div key={project.id} className="rounded-xl overflow-hidden flex-[0_0_90%] sm:flex-[0_0_48%] lg:flex-[0_0_23%]">
            <CourseMedia videoUrl={project.video_link} />
          </div>
        ))}
      </CarsoulComponent>
      <div className="flex justify-center mt-8">
        <Link
          href="/graduation-projects"
          className="flex items-center gap-3 px-8 py-3 rounded-full border-2 border-[#2243A4] text-[#2243A4] font-bold text-base hover:bg-[#2243A4] hover:text-white transition-colors duration-300"
          dir="rtl">
          مشاهده المزيد من مشاريع التخرج
          <span>←</span>
        </Link>
      </div>
    </section>
  );
}
