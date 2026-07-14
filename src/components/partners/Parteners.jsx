"use client";

import Image from "next/image";

const partenersImages = [
  {
    imageSrc: "/partners/active4web.png",
    alt: "Partener One",
    width: 100
  },
  {
    imageSrc: "/partners/afk.webp",
    alt: "Partener Two",
    width: 200
  },
  {
    imageSrc: "/partners/alborg-labs.png",
    alt: "Partener Three",
    width: 100
  },
  {
    imageSrc: "/partners/english-capsuls.jpg",
    alt: "Partener Four",
    width: 200
  },
  {
    imageSrc: "/partners/mega-trust-group.jpg",
    alt: "Partener Five",
    width: 100
  },
  {
    imageSrc: "/partners/orange.png",
    alt: "Partener Six",
    width: 200
  },
  {
    imageSrc: "/partners/out-of-the-box.jpeg",
    alt: "Partener Seven",
    width: 200
  },
];
export default function Parteners() {
  return (
    <section className="px-5 md:px-8 lg:px-13 py-13">
      <div className="grid grid-cols-14 gap-4">
        {partenersImages.map((image) => (
          <div key={image.alt} className="col-span-7 md:col-span-3 lg:col-span-2">
            <div className="bg-white rounded-xl p-8 flex items-center justify-center h-full grayscale hover:grayscale-0 transition-all duration-300">
              <Image src={image.imageSrc} alt={image.alt} width={image.width} height={0} className="object-contain" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
