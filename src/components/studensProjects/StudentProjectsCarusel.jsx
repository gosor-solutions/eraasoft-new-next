import EmptyState from "@/components/shared/EmptyState";
import CarsoulComponent from "../sliders/CarsoulComponent";
import StudentProjectCard from "./StudentProjectCard";

export default function StudentProjectsCarusel({ courceVideos }) {
  const videos = courceVideos ?? [];

  if (videos.length === 0) {
    return (
      <EmptyState
        title="لا توجد مشاريع طلاب لهذه الدورة"
        subtitle="سيتم إضافة مشاريع الطلاب بعد إتمام الدورة"
      />
    );
  }

  return (
    <CarsoulComponent>
      {videos.map((video) => (
        <StudentProjectCard key={video.id ?? video.url} video={video} />
      ))}
    </CarsoulComponent>
  );
}
