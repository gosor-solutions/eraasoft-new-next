"use client";

import Image from "next/image";
import { getVideoEmbedUrl } from "@/services/getVideoEmbedUrl";

export default function CourseMedia({ videoUrl, imageUrl, heightClass = "h-[500px]" }) {
  const hasVideo = videoUrl;
  const hasImage = imageUrl;

  const embedUrl = hasVideo ? getVideoEmbedUrl(videoUrl) : null;
  return (
    <div className={`relative w-full ${heightClass} rounded-xl overflow-hidden border`}>
      {hasVideo ? (
        <iframe
          loading="lazy"
          src={embedUrl}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : hasImage ? (
        <Image src={imageUrl} alt="Course Image" fill className="object-cover" priority />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">No preview available</div>
      )}
    </div>
  );
}
