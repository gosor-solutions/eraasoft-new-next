"use client";

import { Menu, X, User, LogOut, BookOpen, Settings as SettingsIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import NavLinks from "./NavLinks";
import { useAuth } from "@/providers/AuthProvider";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Navbar({ logo = null, contactPhone = null }) {
  const pathName = usePathname();
  const [openModal, setOpenModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { client, logout } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="px-6 py-4 flex justify-between items-center bg-white shadow-sm sticky top-0 z-50" dir="rtl">
        {/* اليمين: اللوجو */}
        <Link href="/" className="flex items-center">
          <Image src={logo ?? "/logo.png"} alt="شعار إيراسوفت" width={120} height={40} className="h-10 w-auto" />
        </Link>

        {/* الوسط: اللينكات */}
        <NavLinks pathName={pathName} state={openModal} setOpenModal={setOpenModal} />

        {/* اليسار: أدوات العميل والتواصل */}
        <div className="flex items-center gap-3">
          {contactPhone && (
            <a
              href={`https://wa.me/${contactPhone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-[1100px]:flex items-center gap-2 main_button whats_app-button py-2 px-4 text-sm"
              aria-label="تواصل معنا على واتساب"
            >
              <WhatsAppIcon />
              <span>واتساب</span>
            </a>
          )}

          {/* ملف العميل الشخصي أو تسجيل الدخول */}
          <div className="relative" ref={dropdownRef}>
            {client ? (
              <div className="hidden md:block">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 border border-gray-200 hover:border-[--primary-color] rounded-full p-1 pl-3 pr-1 transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {client.avatar ? (
                      <Image
                        src={client.avatar}
                        alt={client.full_name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User size={18} className="text-gray-500" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {client.first_name}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-gray-50">
                      <p className="text-xs text-gray-400">مرحباً بك</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">{client.full_name}</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <SettingsIcon size={16} className="text-gray-400" />
                      <span>الملف الشخصي</span>
                    </Link>
                    <Link
                      href="/free-courses"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <BookOpen size={16} className="text-gray-400" />
                      <span>الدورات المجانية</span>
                    </Link>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-50 mt-1 cursor-pointer"
                    >
                      <LogOut size={16} />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:block">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-[--primary-color] text-[--primary-color] hover:bg-[--primary-color] hover:text-white transition-all duration-300 font-medium text-sm"
                >
                  تسجيل الدخول
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => setOpenModal(!openModal)}
            aria-label="toggle menu"
          >
            {openModal ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {openModal && <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setOpenModal(false)} />}
    </>
  );
}
