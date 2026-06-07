import React from "react";
import CarsoulComponent from "../sliders/CarsoulComponent";
import StudentProjectCard from "./StudentProjectCard";

export default function StudentProjectsCarusel({ courceVideos }) {
  console.log(courceVideos);
  console.log(courceVideos);
  return (
    <CarsoulComponent>
      {courceVideos?.map((video) => (
        <StudentProjectCard video={video} />
      ))}
    </CarsoulComponent>
  );
}
