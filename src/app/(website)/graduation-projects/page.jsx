import HeroCarousel from "@/components/shared/HeroCarusel";
import CourseMedia from "@/components/courceInfo/CourseVideo";
import { getStudentProjects } from "@/services/StudentProjects";
import Pagination from "@/components/shared/Pagination";

export const metadata = {
  title: "مشاريع تخرج الطلاب",
  description: "استعرض مشاريع تخرج طلاب إيراسوفت وتعرّف على إنجازاتهم وأعمالهم البرمجية المتميزة.",
};

export default async function GraduationProjectsPage({ searchParams }) {
  const { page = "1" } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  let projects = [];
  let meta = null;
  try {
    const data = await getStudentProjects(currentPage);
    projects = data?.data || [];
    meta = data?.meta || null;
  } catch {}

  return (
    <>
      <HeroCarousel
        head={"مشاريع تخرج طلابنا"}
        description={"نفخر بإنجازات طلابنا ومشاريعهم المتميزة التي تعكس مستوى التدريب العالي الذي يحصلون عليه في إيراسوفت."}
      />
      <section className="container mx-auto px-4 py-10" dir="rtl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="rounded-xl overflow-hidden">
              <CourseMedia videoUrl={project.video_link} />
            </div>
          ))}
        </div>
        <Pagination currentPage={meta?.current_page ?? 1} lastPage={meta?.last_page ?? 1} />
      </section>
    </>
  );
}
