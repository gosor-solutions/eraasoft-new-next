"use client";

import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "الدورات", href: "/courses" },
  { label: "اراء الطلاب", href: "/reviews" },
  { label: "المدربون", href: "/instructors" },
  { label: "المقالات", href: "/articles" },
  { label: "من نحن", href: "/about" },
  { label: "تواصل معنا", href: "/contact" },
];

export default function NavLinks({ pathName, state, setOpenModal }) {
  return (
    <>
      <nav className="hidden md:block">
        <ul className="flex gap-6 flex-row-reverse">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`text-[16px] font-medium transition-colors hover:text-[--primary-color] ${
                  pathName === link.href
                    ? "text-[--primary-color] font-semibold"
                    : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          state ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <button
            onClick={() => setOpenModal(false)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="close menu"
          >
            <X size={20} />
          </button>
          <Image
            src="/logo.png"
            alt="EraaSoft"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpenModal(false)}
                  className={`flex items-center justify-end px-4 py-3 rounded-lg text-[15px] font-medium transition-all hover:bg-blue-50 hover:text-[--primary-color] ${
                    pathName === link.href
                      ? "bg-blue-50 text-[--primary-color] font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
