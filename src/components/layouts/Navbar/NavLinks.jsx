"use client";

import { X, User, LogOut, BookOpen, Settings, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

const defaultTitles = {
  home: "الرئيسية",
  courses: "الدورات",
  learning_journey: "الرحلة التعليمية",
  testimonials: "اراء الطلاب",
  free_courses: "الدورات المجانية",
  articles: "المقالات",
  about_us: "من نحن",
  contact_us: "تواصل معنا",
  training_services: "تدريب الشركات",
};

export default function NavLinks({ pathName, state, setOpenModal, navbarTitles }) {
  const { client, logout } = useAuth();

  const links = [
    { label: navbarTitles?.home || defaultTitles.home, href: "/" },
    { label: navbarTitles?.courses || defaultTitles.courses, href: "/courses" },
    { label: navbarTitles?.learning_journey || defaultTitles.learning_journey, href: "/journey" },
    { label: navbarTitles?.testimonials || defaultTitles.testimonials, href: "/reviews" },
    { label: navbarTitles?.free_courses || defaultTitles.free_courses, href: "/free-courses" },
    { label: navbarTitles?.training_services || defaultTitles.training_services, href: "/training-services" },
    { label: navbarTitles?.articles || defaultTitles.articles, href: "/articles" },
    { label: navbarTitles?.about_us || defaultTitles.about_us, href: "/about" },
    { label: navbarTitles?.contact_us || defaultTitles.contact_us, href: "/contact" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex gap-6 flex-row">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-[16px] font-medium transition-colors hover:text-(--primary-color) ${pathName === link.href ? "text-(--primary-color) font-semibold" : "text-gray-700"
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out md:hidden ${state ? "translate-x-0" : "translate-x-full"
          }`}
        dir="rtl"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Image src="/logo.png" alt="EraaSoft" width={120} height={40} className="object-contain" />
          <button onClick={() => setOpenModal(false)} className="p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer" aria-label="close menu">
            <X size={20} />
          </button>
        </div>

        {/* User profile section in mobile menu */}
        {client && (
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border border-gray-100 shrink-0">
              {client.avatar ? (
                <Image src={client.avatar} alt={client.full_name} fill className="object-cover" />
              ) : (
                <User size={24} className="text-gray-500" />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-800 text-sm truncate">{client.full_name}</p>
              <p className="text-xs text-gray-500 truncate">{client.email}</p>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpenModal(false)}
                  className={`flex items-center justify-start gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all hover:bg-blue-50 hover:text-(--primary-color) ${pathName === link.href ? "bg-blue-50 text-(--primary-color) font-semibold" : "text-gray-700"
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <div className="h-px bg-gray-100 my-2" />
            <li>
              <Link
                href="/free-courses"
                onClick={() => setOpenModal(false)}
                className={`flex items-center justify-start gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all hover:bg-blue-50 hover:text-(--primary-color) ${pathName === "/free-courses" ? "bg-blue-50 text-(--primary-color) font-semibold" : "text-gray-700"
                  }`}
              >
                <BookOpen size={18} className="text-gray-400" />
                <span>الدورات المجانية</span>
              </Link>
            </li>
            {client && (
              <>
                <li>
                  <Link
                    href="/profile"
                    onClick={() => setOpenModal(false)}
                    className={`flex items-center justify-start gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all hover:bg-blue-50 hover:text-(--primary-color) ${pathName === "/profile" ? "bg-blue-50 text-(--primary-color) font-semibold" : "text-gray-700"
                      }`}
                  >
                    <Settings size={18} className="text-gray-400" />
                    <span>الملف الشخصي</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Sidebar Footer (Login / Logout) */}
        <div className="p-4 border-t border-gray-100">
          {client ? (
            <button
              onClick={() => {
                setOpenModal(false);
                logout();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
            >
              <LogOut size={18} />
              <span>تسجيل الخروج</span>
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpenModal(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold text-white bg-(--primary-color) hover:bg-blue-700 transition-colors"
            >
              <LogIn size={18} />
              <span>تسجيل الدخول</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
