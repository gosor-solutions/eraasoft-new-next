import React from "react";
import CourceCard from "../courcesSection/CourceCard";
import SectionTitle from "@/components/shared/SectionTitle";

export default function RelatedCources({ relatedCources }) {
  if (!relatedCources?.length) return null;
  return (
    <section dir="rtl" className="px-5 lg:px-15">
      <SectionTitle title="دورات ذات صلة" />
      <div className="grid grid-cols-12 gap-4">
        {relatedCources?.map((course) => (
          <CourceCard course={course} key={course.id} />
        ))}
      </div>
    </section>
  );
}
