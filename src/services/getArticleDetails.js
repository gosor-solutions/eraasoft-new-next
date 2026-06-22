import { BASE_URL } from "@/lib/api";

const getArticleDetails = async ({ slug }) => {
  const res = await fetch(`${BASE_URL}/articles/${slug}`, { cache: "no-store" });
  return await res.json();
};

export default getArticleDetails;
