"use client";

// 🎥 Detect platform + convert to embed URL
export function getVideoEmbedUrl(url) {
  if (!url) return "";

  // ---------------- YouTube ----------------
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const match = url.match(/(?:youtu\.be\/|v=|\/embed\/)([a-zA-Z0-9_-]{11})/);
    const videoId = match?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }

  // ---------------- Facebook ----------------
  if (url.includes("facebook.com")) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560`;
  }

  // ---------------- Vimeo ----------------
  if (url.includes("vimeo.com")) {
    const match = url.match(/vimeo\.com\/(\d+)/);
    const videoId = match?.[1];
    return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
  }

  // ---------------- Google Drive ----------------
  if (url.includes("drive.google.com")) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    const fileId = match?.[1];
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : url;
  }

  return url;
}
