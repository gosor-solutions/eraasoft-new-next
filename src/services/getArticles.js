import { BASE_URL } from "@/lib/api";

export const getArticles = async (options = {}) => {
  let paramsObj = {};
  if (typeof options === "number" || typeof options === "string") {
    paramsObj = { page: options };
  } else {
    paramsObj = options || {};
  }

  const { search, category, tag, perPage, per_page, page = 1 } = paramsObj;
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (tag) params.append("tag", tag);
  if (perPage || per_page) params.append("per_page", perPage || per_page);
  if (page) params.append("page", page);

  const url = `${BASE_URL}/articles?${params.toString()}`;
  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json();
  return json;
};
