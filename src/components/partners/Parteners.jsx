"use client";

import Image from "next/image";

const partenersImages = [
  {
    imageSrc: "/partener_one.png",
    alt: "Partener One",
  },
  {
    imageSrc: "/Partener_two.png",
    alt: "Partener Two",
  },
  {
    imageSrc: "/Partener_three.png",
    alt: "Partener Three",
  },
  {
    imageSrc: "/Partener_four.png",
    alt: "Partener Four",
  },
  {
    imageSrc: "/Partener_five.png",
    alt: "Partener Five",
  },
  {
    imageSrc: "/Partener_six.png",
    alt: "Partener Six",
  },
  {
    imageSrc: "/Partener_seven.png",
    alt: "Partener Seven",
  },
];
export default function Parteners() {
  return (
    <section className="px-5 md:px-8 lg:px-13 py-13">
      <div className="grid grid-cols-14 gap-4">
        {partenersImages.map((image) => (
          <div key={image.alt} className="col-span-7 md:col-span-3 lg:col-span-2 m-h-120">
            <div className="bg-white rounded-xl p-8 flex items-center justify-center h-full">
              <Image src={image.imageSrc} alt={image.alt} width={80} height={0} className="object-contain" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
