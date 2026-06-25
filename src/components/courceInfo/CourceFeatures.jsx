import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CourceFeatures({ course }) {
  return (
    <div className="bg-white border border-(--primary-color) rounded-3xl p-4">
      <div className="flex gap-3 justify-center items-center mb-3 text-center">
        <h2 className="text-center font-bold text-(--primary-color) text-3xl" dir="ltr">
          {course?.final_price}
        </h2>
        <span className="text-[#4A5565] text-xl">جنيه مصري</span>
      </div>
      {course?.final_price !== course?.price && (
        <div className="flex justify-center items-center mb-3">
          <p className="relative w-fit text-[#6A7282]">
            <span>{course?.price}</span>
            <span>جنيه مصري</span>
            <span className="absolute left-0 right-0 top-1/2 h-0.5 bg-[#6A7282] w-full"></span>
          </p>
        </div>
      )}
      <Link href={`/booking/${course?.slug}`} className="main_button w-full text-center block">
        اشترك الآن
      </Link>
      <h3 className="text-(--primary-color) font-bold mt-6 mb-3">المدرب</h3>
      <div className="flex gap-3 items-center justify-start bg-[#2243A41A] p-5 rounded-2xl">
        <div className="relative w-15 h-15 rounded-full overflow-hidden border">
          <Image src={course?.instructor?.image} alt={course?.instructor?.name || "صورة المدرب"} fill className="object-cover object-center" />
        </div>
        <div>
          <h4 className="font-bold text-lg">{course?.instructor?.name}</h4>
          <p className="text-sm text-[#606060]">{course?.instructor?.position}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <h5 className="font-bold text-lg my-3">تشمل هذه الدورة:</h5>
        {course?.features?.map((feature) => (
          <div dir="ltr" className="flex flex-row items-start gap-3" key={feature}>
            <div className="w-10 h-10 shrink-0 bg-[#2243A41A] text-(--primary-color) rounded-full flex justify-center items-center">
              <Check />
            </div>
            <p>{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
}