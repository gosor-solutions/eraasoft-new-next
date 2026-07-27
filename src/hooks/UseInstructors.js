"use client";
import { BASE_URL } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useInstructor() {
  return useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/team`);
      if (!res.ok) {
        throw new Error("Failed to fetch instructors");
      }
      const team = await res.json();
      return team;
    },
  });
}
