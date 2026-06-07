import Image from "next/image";
import LineSvg from "../shared/LineSvg";

export default function Features() {
  return (
    <>
      <section className="px-8 my-8" dir="rtl">
        <div className="grid grid-cols-12 gap-6 ">
          <div className="col-span-12">
            <h2 className="headStyle my-15 flex justify-center">
              ما الذي
              <span className="relative flex flex-col items-center justify-center">
                <span className="ms-2 ">يميزنا</span>
                <span className="absolute top-3 -right-5 ">
                  <LineSvg colorOne={"#2243A4"} colorTwo={"#2243A4"} svgId={"paint1_linear"} svgWidth="200" svgHeight="170" strokeWidth="8" />
                </span>
              </span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="group relative overflow-hidden p-10 rounded-[60px] bg-[#2243A41A] flex flex-col gap-2">
              <div
                className="
      absolute inset-0
      bg-[linear-gradient(#00000000,#091B4E),url('/bg_feture-1.jpg')]
      bg-cover
      bg-center
      opacity-0
      transition-all
      duration-500
      group-hover:opacity-100
    "
              />

              <div className="relative z-10 icon w-20 h-20 bg-(--primary-color) flex justify-center items-center rounded-full">
                <Image src="/content.png" alt="content icon" width={40} height={40} className="object-contain" />
              </div>

              <h2 className="relative z-10 text-[20px] font-bold transition-colors duration-500 group-hover:text-white">محتوى عملي 100%</h2>

              <p className="relative z-10 text-[16px] text-[#777777] transition-colors duration-500 group-hover:text-white">
                نركز على التطبيق العملي مش النظري بس، عشان تقدر تستخدم اللي اتعلمته فورًا في الشغل.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="group relative overflow-hidden p-10 rounded-[60px] bg-[#2243A41A] flex flex-col gap-2">
              <div
                className="
      absolute inset-0
      bg-[linear-gradient(#00000000,#091B4E),url('/bg_feture-1.jpg')]
      bg-cover
      bg-center
      opacity-0
      transition-all
      duration-500
      group-hover:opacity-100
    "
              />

              <div className="relative z-10 icon w-20 h-20 bg-(--primary-color) flex justify-center items-center rounded-full">
                <Image src="/content.png" alt="content icon" width={40} height={40} className="object-contain" />
              </div>

              <h2 className="relative z-10 text-[20px] font-bold transition-colors duration-500 group-hover:text-white">محتوى عملي 100%</h2>

              <p className="relative z-10 text-[16px] text-[#777777] transition-colors duration-500 group-hover:text-white">
                نركز على التطبيق العملي مش النظري بس، عشان تقدر تستخدم اللي اتعلمته فورًا في الشغل.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="group relative overflow-hidden p-10 rounded-[60px] bg-[#2243A41A] flex flex-col gap-2">
              <div
                className="
      absolute inset-0
      bg-[linear-gradient(#00000000,#091B4E),url('/bg_feture-1.jpg')]
      bg-cover
      bg-center
      opacity-0
      transition-all
      duration-500
      group-hover:opacity-100
    "
              />

              <div className="relative z-10 icon w-20 h-20 bg-(--primary-color) flex justify-center items-center rounded-full">
                <Image src="/content.png" alt="content icon" width={40} height={40} className="object-contain" />
              </div>

              <h2 className="relative z-10 text-[20px] font-bold transition-colors duration-500 group-hover:text-white">محتوى عملي 100%</h2>

              <p className="relative z-10 text-[16px] text-[#777777] transition-colors duration-500 group-hover:text-white">
                نركز على التطبيق العملي مش النظري بس، عشان تقدر تستخدم اللي اتعلمته فورًا في الشغل.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="group relative overflow-hidden p-10 rounded-[60px] bg-[#2243A41A] flex flex-col gap-2">
              <div
                className="
      absolute inset-0
      bg-[linear-gradient(#00000000,#091B4E),url('/bg_feture-1.jpg')]
      bg-cover
      bg-center
      opacity-0
      transition-all
      duration-500
      group-hover:opacity-100
    "
              />

              <div className="relative z-10 icon w-20 h-20 bg-(--primary-color) flex justify-center items-center rounded-full">
                <Image src="/content.png" alt="content icon" width={40} height={40} className="object-contain" />
              </div>

              <h2 className="relative z-10 text-[20px] font-bold transition-colors duration-500 group-hover:text-white">محتوى عملي 100%</h2>

              <p className="relative z-10 text-[16px] text-[#777777] transition-colors duration-500 group-hover:text-white">
                نركز على التطبيق العملي مش النظري بس، عشان تقدر تستخدم اللي اتعلمته فورًا في الشغل.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="group relative overflow-hidden p-10 rounded-[60px] bg-[#2243A41A] flex flex-col gap-2">
              <div
                className="
      absolute inset-0
      bg-[linear-gradient(#00000000,#091B4E),url('/bg_feture-1.jpg')]
      bg-cover
      bg-center
      opacity-0
      transition-all
      duration-500
      group-hover:opacity-100
    "
              />

              <div className="relative z-10 icon w-20 h-20 bg-(--primary-color) flex justify-center items-center rounded-full">
                <Image src="/content.png" alt="content icon" width={40} height={40} className="object-contain" />
              </div>

              <h2 className="relative z-10 text-[20px] font-bold transition-colors duration-500 group-hover:text-white">محتوى عملي 100%</h2>

              <p className="relative z-10 text-[16px] text-[#777777] transition-colors duration-500 group-hover:text-white">
                نركز على التطبيق العملي مش النظري بس، عشان تقدر تستخدم اللي اتعلمته فورًا في الشغل.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="group relative overflow-hidden p-10 rounded-[60px] bg-[#2243A41A] flex flex-col gap-2">
              <div
                className="
      absolute inset-0
      bg-[linear-gradient(#00000000,#091B4E),url('/bg_feture-1.jpg')]
      bg-cover
      bg-center
      opacity-0
      transition-all
      duration-500
      group-hover:opacity-100
    "
              />

              <div className="relative z-10 icon w-20 h-20 bg-(--primary-color) flex justify-center items-center rounded-full">
                <Image src="/content.png" alt="content icon" width={40} height={40} className="object-contain" />
              </div>

              <h2 className="relative z-10 text-[20px] font-bold transition-colors duration-500 group-hover:text-white">محتوى عملي 100%</h2>

              <p className="relative z-10 text-[16px] text-[#777777] transition-colors duration-500 group-hover:text-white">
                نركز على التطبيق العملي مش النظري بس، عشان تقدر تستخدم اللي اتعلمته فورًا في الشغل.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
