import { BASE_URL } from "@/lib/api";

export const dynamic = "force-static";

const SITE_URL = "https://eraasoft.com";

const staticRoutes = [
  { url: SITE_URL, priority: 1.0, changeFrequency: "daily" },
  { url: `${SITE_URL}/courses`, priority: 0.9, changeFrequency: "daily" },
  { url: `${SITE_URL}/about`, priority: 0.8, changeFrequency: "monthly" },
  { url: `${SITE_URL}/reviews`, priority: 0.7, changeFrequency: "weekly" },
  { url: `${SITE_URL}/instructors`, priority: 0.7, changeFrequency: "monthly" },
  { url: `${SITE_URL}/articles`, priority: 0.7, changeFrequency: "weekly" },
  { url: `${SITE_URL}/contact`, priority: 0.6, changeFrequency: "monthly" },
];

async function fetchCourseRoutes(lastModified) {
  try {
    const res = await fetch(`${BASE_URL}/courses`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data ?? []).map((course) => ({
      url: `${SITE_URL}/courses/${course.slug}`,
      lastModified,
      priority: 0.8,
      changeFrequency: "weekly",
    }));
  } catch {
    return [];
  }
}

async function fetchArticleRoutes(lastModified) {
  try {
    const res = await fetch(`${BASE_URL}/articles`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data ?? []).map((article) => ({
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: article.updated_at ? new Date(article.updated_at) : lastModified,
      priority: 0.7,
      changeFrequency: "weekly",
    }));
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const lastModified = new Date();

  const [courseRoutes, articleRoutes] = await Promise.all([
    fetchCourseRoutes(lastModified),
    fetchArticleRoutes(lastModified),
  ]);

  return [
    ...staticRoutes.map((r) => ({ ...r, lastModified })),
    ...courseRoutes,
    ...articleRoutes,
  ];
}
