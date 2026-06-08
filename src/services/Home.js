import { BASE_URL } from "@/lib/api";

export const getHome = async () => {
  const res = await fetch(`${BASE_URL}/home`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch home data");
  }

  const home = await res.json();
  console.log(home?.data);

  return home;
};
