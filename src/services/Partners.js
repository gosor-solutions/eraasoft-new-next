import { BASE_URL } from "@/lib/api";

export const getPartners = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = `${BASE_URL}/partners${query ? `?${query}` : ""}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch partners");
  }
  return await res.json();
};
