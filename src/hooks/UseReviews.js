"use client";

import { BASE_URL } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useReviews() {
  return useQuery({
    queryKey: ["reveiews"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/testimonials`);
      if (!res.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const testimonials = await res.json();
      console.log(testimonials);
      return testimonials;
    },
  });
}
