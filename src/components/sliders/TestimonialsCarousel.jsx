"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import EmptyState from "@/components/shared/EmptyState";
import LineSvg from "@/components/shared/LineSvg";
import TestimonialCard from "./TestimonialCard";

function TestimonialsTitle() {
  return (
    <h2
      className="headStyle mt-6 mb-10 sm:mt-8 sm:mb-14 lg:mt-10 lg:mb-20 flex justify-center"
      dir="rtl"
    >
      آراء
      <span className="relative flex flex-col items-center justify-center">
        <span className="ms-2">الطلاب</span>
        <span className="absolute top-3 -right-5">
          <LineSvg
            colorOne={"#2243A4"}
            colorTwo={"#2243A4"}
            svgId={"paint_testimonials"}
            svgWidth="200"
            svgHeight="170"
            strokeWidth="8"
          />
        </span>
      </span>
    </h2>
  );
}

export default function TestimonialsCarousel({ testimonials = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })],
  );

  if (testimonials.length === 0) {
    return (
      <section className="my-10 px-5" dir="rtl">
        <EmptyState
          title="لا توجد آراء طلاب حالياً"
          subtitle="سيتم إضافة آراء الطلاب قريباً — ترقّب تجاربهم معنا"
        />
      </section>
    );
  }

  const pairs = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    pairs.push(testimonials.slice(i, i + 2));
  }

  let displayPairs = [...pairs];
  while (displayPairs.length < 12) {
    displayPairs = [...displayPairs, ...pairs];
  }

  const btnCls =
    "w-9 h-9 sm:w-11 sm:h-11 rounded-full pb-1 border border-(--primary-color) text-(--primary-color) text-xl sm:text-2xl font-bold flex items-center justify-center hover:bg-(--primary-color) hover:text-white transition-colors";

  return (
    <section className="my-10">
      <TestimonialsTitle />
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
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          ref={emblaRef}
          dir="ltr"
        >
          <div className="flex">
            {displayPairs?.map((pair, i) => (
              <div
                key={i}
                className="shrink-0 w-4/5 sm:w-1/2 lg:w-1/4 pl-5 flex flex-col gap-5"
              >
                {pair?.map((item) => (
                  <TestimonialCard key={item.id} item={item} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
