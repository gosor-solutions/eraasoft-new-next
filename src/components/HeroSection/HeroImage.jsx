import Image from "next/image";
import Styles from "./HeroSection.module.css";

export default function HeroImage() {
  return (
    <div className="hidden lg:block col-span-12 lg:col-span-6 order-2 lg:order-1">
      <div className="flex items-center justify-center lg:justify-start min-h-95 sm:min-h-110 md:min-h-125 lg:min-h-screen py-6 lg:py-0">
        <div className={Styles.roketImageLayer}>
          {/* Reviews badge */}
          <div className={`${Styles.blur} ${Styles.reviews} hidden sm:block`}>
            <Image
              src="/rev_hero.png"
              alt="reviews"
              width={130}
              height={44}
              className="object-contain"
            />
          </div>

          {/* نسبة نجاح badge */}
          <div className={`${Styles.blur} ${Styles.mark} hidden sm:flex gap-2 items-center`}>
            <p className="text-white text-sm md:text-base whitespace-nowrap">نسبة نجاح ٩٨٪</p>
            <Image
              src="/mark.png"
              alt="mark"
              width={40}
              height={40}
              className="object-contain md:w-12.5 md:h-12.5"
            />
          </div>

          {/* Eraa icon badge */}
          <div className={`${Styles.blur} ${Styles.eraaIcon} hidden sm:block`}>
            <Image
              src="/eraa_icon.png"
              alt="eraa icon"
              width={42}
              height={42}
              className="object-contain md:w-12.5 md:h-12.5"
            />
          </div>

          {/* Main hero image */}
          <div className={Styles.roket_image}>
            <Image
              src="/eraa_hero.png"
              alt="Hero"
              width={800}
              height={800}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
