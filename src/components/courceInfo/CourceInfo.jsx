import CourseVideo from "./CourseVideo";
import CourceFeatures from "./CourceFeatures";

export default function CourceInfo({ course }) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-6 lg:col-span-7 ">
        <CourseVideo videoUrl={course?.video_preview_link} imageUrl={course?.image} heightClass="aspect-video" />
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-5 ">
        <CourceFeatures course={course} />
      </div>
    </div>
  );
}
