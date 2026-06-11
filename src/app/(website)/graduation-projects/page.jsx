import HeroCarousel from "@/components/shared/HeroCarusel";
import CourseMedia from "@/components/courceInfo/CourseVideo";

export const metadata = {
  title: "مشاريع تخرج الطلاب",
  description: "استعرض مشاريع تخرج طلاب إيراسوفت وتعرّف على إنجازاتهم وأعمالهم البرمجية المتميزة.",
};

const GRADUATION_PROJECTS = [
  "https://www.youtube.com/embed/S_4ZzIq0CRs",
  "https://www.youtube.com/embed/S_4ZzIq0CRs",
  "https://www.youtube.com/embed/S_4ZzIq0CRs",
  "https://www.youtube.com/embed/S_4ZzIq0CRs",
  "https://www.youtube.com/embed/S_4ZzIq0CRs",
  "https://www.youtube.com/embed/S_4ZzIq0CRs",
  "https://www.youtube.com/embed/S_4ZzIq0CRs",
  "https://www.youtube.com/embed/S_4ZzIq0CRs",
];

export default function GraduationProjectsPage() {
  return (
    <>
      <HeroCarousel
        head={"مشاريع تخرج طلابنا"}
        description={"نفخر بإنجازات طلابنا ومشاريعهم المتميزة التي تعكس مستوى التدريب العالي الذي يحصلون عليه في إيراسوفت."}
      />
      <section className="container mx-auto px-4 py-10" dir="rtl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GRADUATION_PROJECTS.map((url, index) => (
            <div key={index} className="rounded-xl overflow-hidden">
              <CourseMedia videoUrl={url} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
