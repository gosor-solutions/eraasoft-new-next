import { BASE_URL } from "@/lib/api";

export const getTestimonials = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/testimonials?page=${page}`, { cache: "no-store" });
  return res.json();
};
