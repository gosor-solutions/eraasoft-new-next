import { BASE_URL } from "@/lib/api";

export const getPartners = async () => {
  const res = await fetch(`${BASE_URL}/partners?per_page=12`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch partners");
  }
  return await res.json();
};
