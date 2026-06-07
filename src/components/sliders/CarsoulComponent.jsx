"use client";

import useEmblaCarousel from "embla-carousel-react";

export default function CarsoulComponent({ children }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  return (
    <div className="relative px-8 sm:px-12 lg:px-15 rtl">
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="
          absolute left-1 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10
          w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full
          border border-(--primary-color) text-(--primary-color)
          text-2xl lg:text-3xl font-bold
          flex items-center justify-center
        "
      >
        ←
      </button>

      <button
        onClick={() => emblaApi?.scrollNext()}
        className="
          absolute right-1 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10
          w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full
          border border-(--primary-color) text-(--primary-color)
          text-2xl lg:text-3xl font-bold
          flex items-center justify-center
        "
      >
        →
      </button>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">{children}</div>
      </div>
    </div>
  );
}
