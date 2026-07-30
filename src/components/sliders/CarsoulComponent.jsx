"use client";

import useEmblaCarousel from "embla-carousel-react";

export default function CarsoulComponent({ children }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const btnCls =
    "w-9 h-9 sm:w-11 sm:h-11 rounded-full pb-1 border border-(--primary-color) text-(--primary-color) text-xl sm:text-2xl font-bold flex items-center justify-center hover:bg-(--primary-color) hover:text-white transition-colors";

  return (
    <div className="px-5 sm:px-8 lg:px-15">
      <div className="flex flex-row-reverse items-center justify-start gap-2 mb-4 sm:mb-5">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous"
          className={btnCls}
        >
          →
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next"
          className={btnCls}
        >
          ←
        </button>
      </div>

      <div className="overflow-hidden" ref={emblaRef} dir="ltr">
        <div className="flex">
          {Array.isArray(children) ? (
            children?.map((child, i) => (
              <div key={i} className="shrink-0 w-full sm:w-1/2 lg:w-1/4 pl-5">
                {child}
              </div>
            ))
          ) : (
            <div className="shrink-0 w-full sm:w-1/2 lg:w-1/4 pl-5">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
