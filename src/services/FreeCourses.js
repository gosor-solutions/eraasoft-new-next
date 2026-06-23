import { BASE_URL } from "@/lib/api";

/**
 * Get paginated list of published free courses.
 * @param {Object} params - Query params (search, per_page, page).
 * @param {string} token - Client authentication token.
 */
export const getFreeCourses = async ({ search = "", perPage = 12, page = 1 } = {}, token) => {
  const url = new URL(`${BASE_URL}/free-courses`);
  if (search) url.searchParams.append("search", search);
  if (perPage) url.searchParams.append("per_page", perPage);
  if (page) url.searchParams.append("page", page);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
    },
    cache: "no-store",
  });

  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
};

/**
 * Get details of a single free course including videos and SEO metadata.
 * @param {string} slug - The course slug.
 * @param {string} token - Client authentication token.
 */
export const getFreeCourseDetail = async (slug, token) => {
  const res = await fetch(`${BASE_URL}/free-courses/${slug}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
    },
    cache: "no-store",
  });

  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
};
