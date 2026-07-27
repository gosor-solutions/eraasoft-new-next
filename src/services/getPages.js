import { BASE_URL } from "@/lib/api";

export const getPages = async () => {
  const res = await fetch(`${BASE_URL}/pages`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch pages data");
  }

  const json = await res.json();
  return json
};

export const getPageBySlug = async (slug) => {
  const res = await fetch(`${BASE_URL}/pages/${slug}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch page data");
  }

  const json = await res.json();
  return json
};
