import Image from "next/image";
import React from "react";

export default function InstructorCard({ employee }) {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4">
      <div className=" relative">
        <Image src={`${employee?.image}`} alt={employee.name} width={200} height={200} className="w-full h-140 object-cover rounded-xl" />
        <div className="flex flex-col gap-1 absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%] text-center px-6 py-5 rounded-2xl  bg-[#00000033] backdrop-blur-xs border border-white/20 shadow-xl">
          <h3 className="text-[#BECBF2] text-3xl font-bold">{employee?.name}</h3>
          <p className="text-2xl font-semibold text-white/80"> {employee?.position}</p>
          <p className="text-lg font-semibold text-white leading-relaxed min-h-15"> {employee?.bio}</p>
        </div>
      </div>
    </div>
  );
}
