import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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

const navLinks = [
  { href: "/courses", label: "الدورات" },
  { href: "/enroll", label: "سجّل الآن" },
  { href: "/reviews", label: "آراء الطلاب" },
  { href: "/about", label: "عن إيراسوفت" },
];

const navLinks2 = [
  { href: "/instructors", label: "فريق العمل " },
  { href: "/articles", label: "المقالات" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Footer({ settings = null }) {
  const logo = settings?.site_info?.site_logo ?? "/footer_logo.png";
  const social = settings?.social_links ?? {};
  const siteName = settings?.site_info?.site_name ?? "EraaSoft";
  const description =
    settings?.seo?.meta_description ??
    "ايراسوفت هي شركة رائدة في مجال الحلول البرمجية المتقدمة والتدريب المتخصص، تأسست بهدف تقديم خدمات شاملة ومبتكرة تلبي احتياجات الأفراد والشركات في عالم البرمجة وعلوم الكمبيوتر.";

  const socialIcons = [
    { href: social.facebook, icon: <FaFacebook />, label: "فيسبوك" },
    { href: social.youtube, icon: <FaYoutube />, label: "يوتيوب" },
    { href: social.linkedin, icon: <FaLinkedin />, label: "لينكدإن" },
    { href: social.instagram, icon: <FaInstagram />, label: "إنستجرام" },
    // { href: social.x, icon: <FaXTwitter />, label: "إكس" },
  ].filter((s) => Boolean(s.href));

  return (
    <footer
      className="px-4 sm:px-10 lg:px-20 py-8 sm:py-12 bg-[#0C1739] overflow-x-hidden"
      dir="rtl"
    >
      <div className="grid grid-cols-12 gap-6 sm:gap-8 justify-between items-start">
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <Image
            src={logo}
            alt={`شعار ${siteName}`}
            width={130}
            height={44}
            unoptimized={logo.startsWith("http")}
          />
          <p className="text-sm font-semibold text-white leading-relaxed mt-3">
            {description}
          </p>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <h3 className="text-[#BECBF2] text-base sm:text-lg font-bold mb-4">
            تصفح
          </h3>
          <ul className="flex flex-col gap-3">
            {navLinks?.map(({ href, label }) => (
              <li key={href} className={liClass}>
                <Link
                  href={href}
                  className="text-white text-sm sm:text-base font-semibold"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <h3 className="text-[#BECBF2] text-base sm:text-lg font-bold mb-4">
            روابط سريعة
          </h3>
          <ul className="flex flex-col gap-3">
            {navLinks2?.map(({ href, label }) => (
              <li key={href} className={liClass}>
                <Link
                  href={href}
                  className="text-white text-sm sm:text-base font-semibold"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <h3 className="text-[#BECBF2] text-base sm:text-lg font-bold mb-4">
            تواصل معنا
          </h3>
          <ul className="flex flex-col gap-3">
            {settings?.contact?.email && (
              <li className="text-white text-sm sm:text-base font-semibold break-all">
                <a
                  href={`mailto:${settings.contact.email}`}
                  className="hover:text-[#BECBF2] transition-colors"
                >
                  {settings.contact.email}
                </a>
              </li>
            )}
            {settings?.contact?.phone && (
              <li className="text-white text-sm sm:text-base font-semibold">
                <a
                  href={`tel:${settings.contact.phone}`}
                  className="hover:text-[#BECBF2] transition-colors"
                >
                  {settings.contact.phone}
                </a>
              </li>
            )}
            {settings?.contact?.address && (
              <li className="text-white text-sm sm:text-base font-semibold">
                {settings.contact.address}
              </li>
            )}
            {!settings && (
              <li className="text-white text-sm sm:text-base font-semibold">
                <a
                  href="mailto:info@eraasoft.com"
                  className="hover:text-[#BECBF2] transition-colors"
                >
                  info@eraasoft.com
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="col-span-12">
          <div className="flex flex-col md:flex-row my-3 items-center w-full gap-5">
            {socialIcons.length > 0 && (
              <div className="flex gap-3 shrink-0 self-start md:self-auto flex-wrap">
                {socialIcons?.map(({ href, icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="bg-(--primary-color) rounded-xl p-2.5 text-xl text-white hover:opacity-80 transition-opacity"
                  >
                    {icon}
                  </Link>
                ))}
              </div>
            )}
            <form className="flex flex-col md:flex-row md:gap-2 md:items-center w-full md:flex-1 md:max-w-150 md:mr-auto gap-1.5">
              <label
                htmlFor="subscribe"
                className="text-sm font-bold text-[#BECBF2] whitespace-nowrap"
              >
                آخر الأخبار
              </label>
              <div className="flex flex-wrap items-center bg-white py-1.5 px-2 grow gap-2 rounded-[30px]">
                <input
                  type="email"
                  id="subscribe"
                  placeholder="البريد الإلكتروني"
                  className="grow outline-0 min-w-0 text-sm"
                />
                <button type="submit" className="main_button">
                  اشترك
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-span-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-3">
            <p className="text-center text-white text-sm">
              {siteName} &copy; {new Date().getFullYear()}. All Rights Reserved
            </p>
            <span className="hidden sm:inline text-white/40">|</span>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy-policy"
                className="text-[#BECBF2] text-sm hover:text-white transition-colors"
              >
                سياسة الخصوصية
              </Link>
              <span className="text-white/40">|</span>
              <Link
                href="/terms"
                className="text-[#BECBF2] text-sm hover:text-white transition-colors"
              >
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
