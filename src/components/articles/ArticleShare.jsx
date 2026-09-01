"use client";

import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa6";
import { Link2, Check, Share2 } from "lucide-react";

export default function ArticleShare({
  title = "",
  url = "",
  description = "",
  variant = "inline", // "inline" | "banner"
}) {
  const [currentUrl, setCurrentUrl] = useState(url);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    } else if (url) {
      setCurrentUrl(url);
    }

    if (typeof navigator !== "undefined" && !!navigator.share) {
      setCanNativeShare(true);
    }
  }, [url]);

  const encodedUrl = encodeURIComponent(currentUrl || "");
  const encodedTitle = encodeURIComponent(title || "");
  const encodedText = encodeURIComponent(
    `${title}${description ? ` - ${description}` : ""}`
  );

  const shareLinks = [
    {
      name: "Facebook",
      label: "مشاركة على فيسبوك",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FaFacebookF className="w-4 h-4" />,
      bgHover: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
    },
    {
      name: "X",
      label: "مشاركة على تويتر / إكس",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <FaXTwitter className="w-4 h-4" />,
      bgHover: "hover:bg-[#000000] hover:text-white hover:border-[#000000]",
    },
    {
      name: "LinkedIn",
      label: "مشاركة على لينكدإن",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <FaLinkedinIn className="w-4 h-4" />,
      bgHover: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
    },
    {
      name: "WhatsApp",
      label: "مشاركة عبر واتساب",
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      icon: <FaWhatsapp className="w-4 h-4" />,
      bgHover: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
    },
    {
      name: "Telegram",
      label: "مشاركة عبر تيليجرام",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <FaTelegram className="w-4 h-4" />,
      bgHover: "hover:bg-[#229ED9] hover:text-white hover:border-[#229ED9]",
    },
  ];

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: description || title,
          url: currentUrl,
        });
      }
    } catch {
      // Ignore user cancellation
    }
  };

  if (variant === "banner") {
    return (
      <div className="flex items-center gap-2 flex-wrap" dir="rtl">
        <span className="text-gray-300 text-xs sm:text-sm font-medium ml-1">
          مشاركة:
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {shareLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              title={item.label}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {item.icon}
            </a>
          ))}
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label="نسخ الرابط"
            title="نسخ الرابط"
            className="flex items-center gap-1.5 px-3 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400">تم النسخ</span>
              </>
            ) : (
              <>
                <Link2 className="w-3.5 h-3.5" />
                <span>نسخ الرابط</span>
              </>
            )}
          </button>
          {canNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              aria-label="مشاركة سريعة"
              title="مشاركة سريعة"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 sm:hidden cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-5 sm:p-6 bg-white border border-gray-100 rounded-2xl shadow-xs"
      dir="rtl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#2243A41A] text-(--primary-color) flex items-center justify-center shrink-0">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm sm:text-base">
              شارك المقال
            </h4>
            <p className="text-gray-500 text-xs mt-0.5">
              انشر المعرفة وشارك المقال مع أصدقائك وزملائك
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {shareLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              title={item.label}
              className={`w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 ${item.bgHover}`}
            >
              {item.icon}
            </a>
          ))}

          <button
            type="button"
            onClick={handleCopyLink}
            aria-label="نسخ رابط المقال"
            title="نسخ الرابط"
            className="flex items-center gap-1.5 px-3.5 h-9 rounded-xl bg-gray-50 hover:bg-(--primary-color) hover:text-white border border-gray-200 hover:border-(--primary-color) text-gray-700 text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-semibold">تم النسخ!</span>
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4" />
                <span>نسخ الرابط</span>
              </>
            )}
          </button>

          {canNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              aria-label="مشاركة سريعة"
              title="مشاركة سريعة"
              className="w-9 h-9 rounded-xl bg-(--primary-color) text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 sm:hidden cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
