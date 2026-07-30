import EnrollForm from "@/components/enrollForm/EnrollForm";
import HeroCarousel from "@/components/shared/HeroCarusel";
import { getAllCources } from "@/services/Cources";

export const metadata = {
  title: "سجّل الآن",
  description: "سجّل في الكورس المناسب ليك وابدأ رحلتك التعليمية مع إيراسوفت.",
};

export default async function EnrollPage() {
  let courses = [];
  try {
    const result = await getAllCources();
    courses = (result?.data || [])?.map((c) => ({ value: String(c.id), label: c.title }));
  } catch {}

  return (
    <>
      <HeroCarousel
        head={"سجّل الآن وابدأ رحلتك"}
        description={"اختر الكورس الذي يناسبك وأكمل بياناتك لنتواصل معك في أقرب وقت."}
      />
      <section className="bg-[#FAFAFA] py-12 px-5 min-h-[60vh] flex items-center" dir="rtl">
        <div className="w-full max-w-2xl mx-auto">
          <EnrollForm courses={courses} />
        </div>
      </section>
    </>
  );
}
