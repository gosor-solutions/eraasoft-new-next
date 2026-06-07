import React from "react";
import InstructorCard from "./InstructorCard";

export default function InstructorSection({ team = [] }) {
  return (
    <section className="my-5 px-8 lg:px-15" dir="rtl">
      <div className="grid grid-cols-12 gap-3">
        {team.map((member) => (
          <InstructorCard employee={member} key={member.id} />
        ))}
      </div>
    </section>
  );
}
