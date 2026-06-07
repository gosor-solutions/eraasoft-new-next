import React from "react";
import CourceCard from "../courcesSection/CourceCard";

export default function RelatedCources({ relatedCources }) {
  console.log(relatedCources);
  return (
    <section dir="rtl" className="px-5 lg:px-15">
      <div className="grid grid-cols-12 gap-4">
        {relatedCources?.map((course) => (
          <CourceCard course={course} key={course.id} />
        ))}
      </div>
    </section>
  );
}
