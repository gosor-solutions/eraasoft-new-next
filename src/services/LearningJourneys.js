import { BASE_URL } from "@/lib/api";

export const getLearningJourneys = async () => {
  const res = await fetch(`${BASE_URL}/learning-journeys`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch learning journeys");
  }

  return res.json();
};
