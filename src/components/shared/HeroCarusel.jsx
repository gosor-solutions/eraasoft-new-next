import Image from "next/image";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";

export default function HeroCarousel({ head, description, image }) {
  const src = image || FALLBACK_IMAGE;
  return (
    <section dir="ltr" className="relative w-full h-75 md:h-100 lg:h-125 overflow-hidden">
      <Image src={src} alt={head || "صورة الصفحة"} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 flex items-center flex-col justify-center z-10 px-5">
        <h1 className="text-white text-lg md:text-2xl lg:text-5xl font-bold">{head}</h1>
        <p className="text-white text-center w-full md:w-[50%] lg:w-[50%] mt-6 text-lg md:text-xl lg:text-2xl leading-relaxed">{description}</p>
      </div>
    </section>
  );
}
