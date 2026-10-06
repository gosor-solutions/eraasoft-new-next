import { fetchWithAuth } from "@/lib/api";

/**
 * Fetch all active branches.
 */
export const getBranches = async () => {
  return fetchWithAuth("/branches", {
    method: "GET",
  });
};
