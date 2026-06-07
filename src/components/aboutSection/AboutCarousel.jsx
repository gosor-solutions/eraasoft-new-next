"use client";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}
export default function AboutCarousel() {
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
  });
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)],
  );
  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        <div className="keen-slider__slide number-slide1">
          <Image src={"/about_slide_one.png"} alt="slide image one" width={800} height={100} className="rounded-lg" />
        </div>
        <div className="keen-slider__slide number-slide2">
          <Image src={"/about_slide_two.png"} alt="slide image two" width={800} height={100} className="rounded-lg" />
        </div>
        <div className="keen-slider__slide number-slide3">
          <Image src={"/about_slide_three.png"} alt="slide image three" width={800} height={100} className="rounded-lg" />
        </div>
        <div className="keen-slider__slide number-slide4">
          <Image src={"/about_slide_four.png"} alt="slide image four" width={800} height={100} className="rounded-lg" />
        </div>
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail mt-3">
        <div className="keen-slider__slide number-slide1">
          <Image src={"/about_slide_one.png"} alt="slide image one" width={200} height={200} className="rounded-lg" />
        </div>
        <div className="keen-slider__slide number-slide2">
          <Image src={"/about_slide_two.png"} alt="slide image two" width={200} height={200} className="rounded-lg" />
        </div>
        <div className="keen-slider__slide number-slide3">
          <Image src={"/about_slide_three.png"} alt="slide image three" width={200} height={200} className="rounded-lg" />
        </div>
        <div className="keen-slider__slide number-slide4">
          <Image src={"/about_slide_four.png"} alt="slide image four" width={200} height={200} className="rounded-lg" />
        </div>
      </div>
    </>
  );
}
