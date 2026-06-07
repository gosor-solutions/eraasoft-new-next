import { BASE_URL } from "@/lib/api";

export const getArticles = async () => {
  const res = await fetch(`${BASE_URL}/articles`);
  return res.json();
};
