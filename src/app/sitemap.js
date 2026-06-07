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

export default async function sitemap() {
  const lastModified = new Date();

  let courseRoutes = [];
  try {
    const res = await fetch(`${BASE_URL}/courses`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const json = await res.json();
      courseRoutes = (json.data ?? []).map((course) => ({
        url: `${SITE_URL}/courses/${course.slug}`,
        lastModified,
        priority: 0.8,
        changeFrequency: "weekly",
      }));
    }
  } catch {
    // courses unavailable — skip dynamic routes
  }

  return [
    ...staticRoutes.map((r) => ({ ...r, lastModified })),
    ...courseRoutes,
  ];
}
