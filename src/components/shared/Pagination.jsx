import Link from "next/link";

function getPageNumbers(current, last) {
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);

  const core = new Set([1, last]);
  for (
    let p = Math.max(2, current - 1);
    p <= Math.min(last - 1, current + 1);
    p++
  )
    core.add(p);

  const sorted = [...core].sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("...");
    result.push(sorted[i]);
  }
  return result;
}

export default function Pagination({ currentPage, lastPage }) {
  if (!lastPage || lastPage <= 1) return null;

  const pages = getPageNumbers(currentPage, lastPage);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < lastPage;

  const activeBtn =
    "w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold bg-(--primary-color) text-white";
  const idleBtn =
    "w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold border border-(--primary-color) text-(--primary-color) hover:bg-(--primary-color) hover:text-white transition-colors";
  const navBtn =
    "px-4 sm:px-5 py-2 rounded-full text-sm font-medium border border-(--primary-color) text-(--primary-color) hover:bg-(--primary-color) hover:text-white transition-colors";
  const disabledNavBtn =
    "px-4 sm:px-5 py-2 rounded-full text-sm font-medium border border-[#D2D2D2] text-[#D2D2D2] cursor-not-allowed select-none";

  return (
    <div
      className="flex items-center justify-center gap-2 mt-10 flex-wrap"
      dir="rtl"
    >
      {hasPrev ? (
        <Link href={`?page=${currentPage - 1}`} scroll className={navBtn}>
          السابق
        </Link>
      ) : (
        <span className={disabledNavBtn}>السابق</span>
      )}

      {pages?.map((p, i) =>
        p === "..." ? (
          <span
            key={`dots-${i}`}
            className="w-8 text-center text-[#606060] text-sm select-none"
          >
            ...
          </span>
        ) : (
          <Link
            key={p}
            href={`?page=${p}`}
            scroll
            className={p === currentPage ? activeBtn : idleBtn}
          >
            {p}
          </Link>
        ),
      )}

      {hasNext ? (
        <Link href={`?page=${currentPage + 1}`} scroll className={navBtn}>
          التالي
        </Link>
      ) : (
        <span className={disabledNavBtn}>التالي</span>
      )}
    </div>
  );
}
