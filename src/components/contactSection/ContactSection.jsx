import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LineSvg from "@/components/shared/LineSvg";

export default function ContactSection() {
  return (
    <section className="my-16 sm:my-20 lg:my-30 px-5 sm:px-8 lg:px-13" dir="rtl">
      <h2 className="headStyle mt-6 mb-10 sm:mt-8 sm:mb-14 lg:mt-10 lg:mb-20 flex justify-center">
        تواصل
        <span className="relative flex flex-col items-center justify-center">
          <span className="ms-2">معنا</span>
          <span className="absolute top-3 -right-5">
            <LineSvg colorOne={"#2243A4"} colorTwo={"#2243A4"} svgId={"paint_contact"} svgWidth="200" svgHeight="170" strokeWidth="8" />
          </span>
        </span>
      </h2>

      {/* ── Mobile & Tablet (< lg) ── */}
      <div className="block lg:hidden bg-(--primary-color) text-white rounded-3xl py-10 px-6 sm:px-10 text-center">
        <h2 className="font-bold text-2xl sm:text-3xl mb-3">مستقبلك يبدأ بسؤال</h2>
        <p className="font-semibold text-base sm:text-lg mb-6 text-white/90">
          تواصل معنا الآن ودعنا نساعدك في اختيار المسار الصحيح.
        </p>
        <Link
          href="/contact"
          className="inline-flex gap-2 items-center border border-white/60 hover:bg-white/10 transition-colors px-6 py-3 rounded-full"
        >
          <span>تواصل معنا الآن</span>
          <ArrowLeft size={18} />
        </Link>
      </div>

      {/* ── Desktop (lg+) ── */}
      <div className="hidden lg:block bg-(--primary-color) text-white py-15 min-h-70 rounded-[40px] w-[90%] mx-auto relative overflow-visible">
        {/* Arabic shape decoration */}
        <Image
          src="/arabic_shape.png"
          width={200}
          height={150}
          className="absolute right-0.5 top-0 object-cover"
          alt="Arabic Shape"
        />

        {/* Text block */}
        <div className="flex flex-col gap-4 absolute left-[65%] -translate-x-1/2 -translate-y-1/2 top-1/2">
          <h2 className="font-bold text-4xl">مستقبلك يبدأ بسؤال</h2>
          <p className="font-semibold text-[26px]">تواصل معنا الآن ودعنا نساعدك في اختيار المسار الصحيح.</p>
          <Link href="/contact" className="flex gap-2 items-center border w-fit px-6 py-4 rounded-4xl hover:bg-white/10 transition-colors">
            <span>تواصل معنا الآن</span>
            <ArrowLeft />
          </Link>
        </div>

        {/* Person + phone image */}
        <div className="absolute left-0 -top-18">
          <Image src="/mon_person.png" width={350} height={500} alt="Person Contact Image" />
          <div className="absolute left-[30%] -top-5">
            <Image src="/mob_frame.png" width={200} height={500} alt="Frame Contact Image" />
          </div>
        </div>
      </div>

    </section>
  );
}
