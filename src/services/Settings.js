import { cache } from "react";
import { BASE_URL } from "@/lib/api";

export const getSettings = async () => {
  try {
    const res = await fetch(`${BASE_URL}/settings`, {
      next: { cache: "no-store" },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const data = json.data ?? null;
    return data;
  } catch {
    return null;
  }
}

export const getMaintenance = async () => {
  try {
    const res = await fetch(`${BASE_URL}/maintenance`, {
      next: { cache: "no-store" },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}
