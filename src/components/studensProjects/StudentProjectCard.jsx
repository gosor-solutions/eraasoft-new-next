import React from "react";
import CourseMedia from "../courceInfo/CourseVideo";

export default function StudentProjectCard({ video }) {
    console.log(video , "video ")
  return (
    <div className="rounded-xl overflow-hidden">
      <CourseMedia videoUrl={video} />
    </div>
  );
}
