import EmptyState from "@/components/shared/EmptyState";
import SectionTitle from "@/components/shared/SectionTitle";
import CarsoulComponent from "../sliders/CarsoulComponent";
import StudentProjectCard from "./StudentProjectCard";

export default function StudentProjectsCarusel({ courceVideos }) {
  const videos = (courceVideos ?? []).filter(Boolean);

  if (videos.length === 0) return null;

  return (
    <section className="px-5 lg:px-15 py-6" dir="rtl">
      <SectionTitle title="مشاريع الطلاب" />
      <CarsoulComponent>
        {videos?.map((video, idx) => (
          <StudentProjectCard key={"index" + idx} video={video} />
        ))}
      </CarsoulComponent>
    </section>
  );
}
