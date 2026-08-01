import BookingCourse from "@/components/bookingCourse/BookingCourse";
import getCourceDetails from "@/services/CourceDetails";
import { BASE_URL } from "@/lib/api";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

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

  if (!courseData) {
    notFound();
  }

  return (
    <section className="bg-[#FAFAFA] py-8">
      <BookingCourse course={courseData} />
    </section>
  );
}
