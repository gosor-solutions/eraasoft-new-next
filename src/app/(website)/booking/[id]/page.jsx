import BookingCourse from "@/components/bookingCourse/BookingCourse";
import getCourceDetails from "@/services/CourceDetails";
import { BASE_URL } from "@/lib/api";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${BASE_URL}/courses`);
    const data = await res.json();
    return (data?.data || []).map((course) => ({ id: course.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const { id: slug } = await params;
    const course = await getCourceDetails({ slug });
    return { title: `اشترك في ${course?.data?.title ?? "الكورس"}` };
  } catch {
    return { title: "إتمام الاشتراك" };
  }
}

export default async function BookingPage({ params }) {
  const { id: slug } = await params;
  const course = await getCourceDetails({ slug });
  const courseData = course?.data;

  return (
    <section className="bg-[#FAFAFA] py-8">
      <BookingCourse course={courseData} />
    </section>
  );
}