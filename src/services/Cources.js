import { BASE_URL } from "@/lib/api";

export const getAllCources = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/courses?page=${page}`, { cache: "no-store" });
  return await res.json();
};
