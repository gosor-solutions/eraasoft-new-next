import React from "react";
import CourseMedia from "../courceInfo/CourseVideo";

export default function StudentProjectCard({ video }) {
  return (
    <div className="flex-[0_0_90%] sm:flex-[0_0_48%] lg:flex-[0_0_23%] rounded-xl overflow-hidden shrink-0">
      <CourseMedia videoUrl={video} heightClass="h-[400px]" />
    </div>
  );
}
