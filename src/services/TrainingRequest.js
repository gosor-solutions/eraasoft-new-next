import { fetchWithAuth } from "@/lib/api";

export const sendTrainingRequest = async (data) => {
  return fetchWithAuth("/company-training", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};