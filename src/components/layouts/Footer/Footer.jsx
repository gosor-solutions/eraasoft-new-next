import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const liClass = `
  relative
  pr-6
  before:content-['']
  before:absolute
  before:right-0
  before:top-1/2
  before:-translate-y-1/2
  before:w-2.5
  before:h-2.5
  before:rounded-full
  before:bg-linear-to-b
  before:from-[#FAF3D7]
  before:to-[#2243A4]
`;

export default function Footer() {
  return (
    <footer className="px-4 sm:px-10 lg:px-20 py-8 sm:py-12 bg-[#0C1739] overflow-x-hidden" dir="rtl">
      <div className="grid grid-cols-12 gap-6 sm:gap-8 justify-between items-start">
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <Image src={"/footer_logo.png"} alt="Footer Logo" width={130} height={44} />
          <p className="text-sm font-semibold text-white leading-relaxed mt-3">
            ايراسوفت هي شركة رائدة في مجال الحلول البرمجية المتقدمة والتدريب المتخصص، تأسست بهدف تقديم خدمات شاملة ومبتكرة تلبي احتياجات الأفراد والشركات في عالم البرمجة وعلوم الكمبيوتر.
          </p>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <h3 className="text-[#BECBF2] text-base sm:text-lg font-bold mb-4">تصفح</h3>
          <ul className="flex flex-col gap-3">
            <li className={liClass}>
              <Link href="/" className="text-white text-sm sm:text-base font-semibold">
                الدورات
              </Link>
            </li>
            <li className={liClass}>
              <Link href={"/reviews"} className="text-white text-sm sm:text-base font-semibold">
                اراء الطلاب
              </Link>
            </li>
            <li className={liClass}>
              <Link href={"/about"} className="text-white text-sm sm:text-base font-semibold">
                عن ايراسوفت
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <h3 className="text-[#BECBF2] text-base sm:text-lg font-bold mb-4">تصفح</h3>
          <ul className="flex flex-col gap-3">
            <li className={liClass}>
              <Link href="/" className="text-white text-sm sm:text-base font-semibold">
                الدورات
              </Link>
            </li>
            <li className={liClass}>
              <Link href={"/reviews"} className="text-white text-sm sm:text-base font-semibold">
                اراء الطلاب
              </Link>
            </li>
            <li className={liClass}>
              <Link href={"/about"} className="text-white text-sm sm:text-base font-semibold">
                عن ايراسوفت
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <h3 className="text-[#BECBF2] text-base sm:text-lg font-bold mb-4">تصفح</h3>
          <ul className="flex flex-col gap-3">
            <li className={liClass}>
              <Link href="/" className="text-white text-sm sm:text-base font-semibold">
                الدورات
              </Link>
            </li>
            <li className={liClass}>
              <Link href={"/reviews"} className="text-white text-sm sm:text-base font-semibold">
                اراء الطلاب
              </Link>
            </li>
            <li className={liClass}>
              <Link href={"/about"} className="text-white text-sm sm:text-base font-semibold">
                عن ايراسوفت
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-12">
          <div className="flex flex-col md:flex-row my-3 items-center w-full gap-5">
            <div className="flex gap-3 shrink-0 self-start md:self-auto">
              <Link href={"https://facebook.com"} className="bg-(--primary-color) rounded-xl p-2.5 text-xl text-white">
                <FaFacebook />
              </Link>
              <Link href={"https://youtube.com"} className="bg-(--primary-color) rounded-xl p-2.5 text-xl text-white">
                <FaYoutube />
              </Link>
              <Link href={"https://linkedin.com"} className="bg-(--primary-color) rounded-xl p-2.5 text-xl text-white">
                <FaLinkedin />
              </Link>
              <Link href={"https://instgram.com"} className="bg-(--primary-color) rounded-xl p-2.5 text-xl text-white">
                <FaInstagram />
              </Link>
            </div>
            <form className="flex flex-col md:flex-row md:gap-2 md:items-center w-full md:flex-1 md:max-w-150 md:mr-auto gap-1.5">
              <label htmlFor="subscribe" className="text-sm font-bold text-[#BECBF2] whitespace-nowrap">
                اخر الاخبار
              </label>
              <div className="flex flex-wrap items-center bg-white py-1.5 px-2 grow gap-2 rounded-[30px]">
                <input type="text" id="subscribe" placeholder="البريد الالكتروني" className="grow outline-0 min-w-0 text-sm" />
                <button className="main_button">اشترك</button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-span-12">
          <p className="text-center text-white text-sm">EraaSoft &copy; 2026. All Copy Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
