"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import NavLinks from "./NavLinks";

export default function Navbar() {
  const pathName = usePathname();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <header className="  px-6 py-4 flex justify-between items-center bg-white shadow-sm sticky top-0 z-50">
        <button
          className="md:hidden p-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => setOpenModal(!openModal)}
          aria-label="toggle menu"
        >
          {openModal ? <X size={20} /> : <Menu size={20} />}
        </button>

        <NavLinks
          pathName={pathName}
          state={openModal}
          setOpenModal={setOpenModal}
        />

        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="شعار إيراسوفت" width={120} height={40} className="h-10 w-auto" />
        </Link>
      </header>

      {openModal && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpenModal(false)}
        />
      )}
    </>
  );
}
