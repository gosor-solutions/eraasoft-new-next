import React from "react";
import MainButton from "../mainBtn/MainButton";
import MainInput from "../shared/MainInput";
import Image from "next/image";

export default function ContactPageSection() {
  return (
    <section className="bg-[#FAFAFA] px-5 lg:px-13 py-8" dir="rtl">
      <div className="grid grid-cols-12 gap-4 lg:gap-15 shadow-md rounded-lg p-5">
        {/* <div className="col-span-12 lg:col-span-5  min-h-50">
          <div className="bg-[#BECBF2] pt-5 min-h-full">
            <div className="relative">
              <Image src={"/mon_person.png"} width={450} height={100} alt="contect Image" className="absolute top-[72px] left-0" />
              <Image src={"/mob_frame.png"} width={200} height={100} alt="contect Image" className="absolute top-0 left-[140px] " />
            </div>
          </div>
        </div> */}
        <div className="col-span-full lg:col-span-7  min-h-50">
          <h2 className="text-2xl font-bold">تواصل معنا</h2>
          <form className="my-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <MainInput type={"text"} name={"الاسم الاول"} placeholder={"الاسم الاول"} label={"الاسم الاول"} htmlFor="fName" />
              <MainInput type={"text"} name={"اسم العائلة"} placeholder={"اسم العائلة"} label={"اسم العائلة"} htmlFor="lName" />
              <MainInput type={"text"} name={"الايميل"} placeholder={"الايميل"} label={"الايميل"} htmlFor="email" />
              <MainInput type={"text"} name={"رقم الهاتف"} placeholder={"رقم الهاتف"} label={"رقم الهاتف"} htmlFor="phone" />
              <div className="lg:col-span-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-lg font-semibold">
                    الرسالة
                  </label>
                  <textarea id="message" placeholder="اكتب رسالتك هنا" className="min-h-40 resize-none outline-0 border border-[#D2D2D2] py-3 px-5 rounded-2xl" />
                </div>
              </div>
              <div className="lg:col-span-2">
                <MainButton text={"تواصل معنا"} width={"w-full"} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
