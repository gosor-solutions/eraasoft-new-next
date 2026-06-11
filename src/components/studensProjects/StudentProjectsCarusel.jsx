import EmptyState from "@/components/shared/EmptyState";
import SectionTitle from "@/components/shared/SectionTitle";
import CarsoulComponent from "../sliders/CarsoulComponent";
import StudentProjectCard from "./StudentProjectCard";

export default function StudentProjectsCarusel({ courceVideos }) {
  console.log(courceVideos);
  const videos = (courceVideos ?? []).filter(Boolean);

  return (
    <section className="px-5 lg:px-15 py-6" dir="ltr">
      <SectionTitle title="مشاريع الطلاب" />
      {videos.length === 0 ? (
        <EmptyState title="لا توجد مشاريع طلاب لهذه الدورة حاليا" />
      ) : (
        <CarsoulComponent>
          {videos.map((video, idx) => (
            <StudentProjectCard key={video ?? idx} video={video} />
          ))}
        </CarsoulComponent>
      )}
    </section>
  );
}
