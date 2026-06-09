"use client";

import { getPages } from "@/services/getPages";
import { useQuery } from "@tanstack/react-query";

export default function usePages() {
  return useQuery({
    queryKey: ["pages"],
    queryFn: getPages,
  });
}
