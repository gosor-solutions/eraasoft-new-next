import { BASE_URL } from "@/lib/api";

const getArticleDetails = async ({ slug }) => {
  const res = await fetch(`${BASE_URL}/articles/${slug}`, { cache: "no-store" });
  const json = await res.json();
  return json;
};

export default getArticleDetails;
