"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export default function ArticleFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentTag = searchParams.get("tag") || "";

  const [search, setSearch] = useState(currentSearch);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`/articles?${params.toString()}`);
  };

  const handleClear = () => {
    setSearch("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("category");
    params.delete("tag");
    params.set("page", "1");
    router.push(`/articles?${params.toString()}`);
  };

  const isFiltered = currentSearch || currentCategory || currentTag;

  return (
    <div className="mb-8 space-y-4">
      <form onSubmit={handleSearch} className="flex gap-3 items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="ابحث في المقالات..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3.5 pr-11 pl-4 bg-white border border-gray-200 focus:border-[#2243A4] rounded-2xl outline-none text-gray-800 text-sm shadow-sm transition-all"
          />
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <button
          type="submit"
          className="px-6 py-3.5 bg-[#2243A4] hover:bg-[#19327D] text-white font-bold rounded-2xl text-sm transition-colors shadow-sm shrink-0 cursor-pointer"
        >
          بحث
        </button>

        {isFiltered && (
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-2xl text-sm transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <X size={16} />
            <span>إلغاء التصفية</span>
          </button>
        )}
      </form>

      {/* Active Filters Indicators */}
      {(currentCategory || currentTag) && (
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {currentCategory && (
            <span className="px-3 py-1 bg-blue-50 text-[#2243A4] rounded-full border border-blue-100">
              التصنيف: {currentCategory}
            </span>
          )}
          {currentTag && (
            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-100">
              الوسم: {currentTag}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
