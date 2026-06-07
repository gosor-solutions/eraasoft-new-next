import { BASE_URL } from "@/lib/api";

export const getSettings = async () => {
  const res = await fetch(`${BASE_URL}/settings`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch settings");
  }

  const json = await res.json();
  return json.data;
};
