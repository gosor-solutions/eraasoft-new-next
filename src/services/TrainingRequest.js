import { BASE_URL } from "@/lib/api";

export const sendTrainingRequest = async (data) => {
  const res = await fetch(`${BASE_URL}/company-training`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
