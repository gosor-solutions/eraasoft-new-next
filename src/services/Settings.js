import { cache } from "react";
import { BASE_URL } from "@/lib/api";

export const getSettings = cache(async () => {
  try {
    const res = await fetch(`${BASE_URL}/settings`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
});

export const getMaintenance = cache(async () => {
  try {
    const res = await fetch(`${BASE_URL}/maintenance`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
});
