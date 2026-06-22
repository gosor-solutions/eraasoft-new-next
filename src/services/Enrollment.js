import { BASE_URL } from "@/lib/api";

export const enrollInCourse = async (payload) => {
  const res = await fetch(`${BASE_URL}/enroll`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await res.json();
};
