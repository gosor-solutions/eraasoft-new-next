import Link from "next/link";
import React from "react";

export default function MainButton({ text, icon, width }) {
  return (
    <Link href={"/courses"} className={`bg-[#2f4cb0] inline-block text-center hover:bg-[#253d8e] text-white font-medium py-3.5 px-8 rounded-full transition-colors text-lg ${width}`}>
      {text}
    </Link>
  );
}
