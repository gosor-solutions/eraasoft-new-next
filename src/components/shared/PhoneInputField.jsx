"use client";

import React from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function PhoneInputField({ label, value, onChange, error }) {
  return (
    <div className="w-full flex flex-col gap-2" dir="rtl">
      {label && (
        <label className="text-sm font-bold text-[#111827]">
          {label}
        </label>
      )}
      <div className="w-full dir-ltr">
        <PhoneInput
          defaultCountry="eg"
          value={value}
          onChange={onChange}
          className="flex items-center gap-3 w-full border-0 bg-transparent"
          inputClassName="!w-full !border !border-[#D2D2D2] !rounded-[24px] !outline-none !py-3.5 !px-5 !bg-white !h-[52px] !text-sm text-[#111827] focus:!border-[#2243A4] transition-all"
          countrySelectorStyleProps={{
            buttonClassName: "!border !border-[#D2D2D2] !rounded-[24px] !bg-white !h-[52px] !py-3.5 !px-5 !flex !items-center !gap-2 hover:!bg-gray-50 focus-within:!border-[#2243A4] transition-all",
          }}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}
