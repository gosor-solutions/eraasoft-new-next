"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";

export default function HeroCarousel({ head, description }) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      containScroll: false,
    },
    [
      Fade(),
      Autoplay({
        delay: 1000,
        stopOnInteraction: false,
      }),
    ],
  );

  const slides = [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
  ];

  return (
    <section dir="ltr" className="relative w-full h-75 md:h-100 lg:h-125 overflow-hidden">
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
              <Image src={slide} alt={`Hero Image ${index + 1}`} fill priority={index === 0} className="object-cover" />

              {/* Layer */}
              <div className="absolute inset-0 bg-black/35" />

              <div className="absolute inset-0 flex items-center flex-col justify-center z-10 px-5">
                <h1 className="text-white text-lg md:text-2xl  lg:text-5xl font-bold">{head}</h1>
                <p className="text-white text-center w-full md:w-[50%] lg:w-[50%] mt-6 text-lg md:text-xl lg:text-2xl leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
