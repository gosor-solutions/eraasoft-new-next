"use client";

import { useQuery } from "@tanstack/react-query";
import { getBranches } from "@/services/Branches";

export default function useBranches() {
  const query = useQuery({
    queryKey: ["branches"],
    queryFn: getBranches,
  });

  const branches = query.data?.data || [];
  const branchOptions = branches
    .filter((b) => b.is_active)
    .map((b) => ({
      value: b.name,
      label: b.label,
    }));

  return {
    ...query,
    branches,
    branchOptions,
  };
}
