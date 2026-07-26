"use client";

import { getHome } from "@/services/Home";
import { useQuery } from "@tanstack/react-query";

export default function useHome() {
  return useQuery({
    queryKey: ["home"],
    queryFn: getHome,
  });
}
