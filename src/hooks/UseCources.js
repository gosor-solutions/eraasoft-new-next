"use client";

import { getAllCources } from "@/services/Cources";
import { useQuery } from "@tanstack/react-query";

export default function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: getAllCources,
  });
}
