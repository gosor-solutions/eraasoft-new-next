import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="hidden lg:block col-span-12 lg:col-span-6 order-2 lg:order-1 relative">
      <Image src="/new_hero.png" alt="Hero" width={1200} height={1200} priority sizes="50vw" className="absolute -bottom-6 w-full h-auto hero-image-float" />
    </div>
  );
}
