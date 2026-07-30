import { BASE_URL } from "@/lib/api";

const getCourceDetails = async ({ slug }) => {
  if (!slug) return null;
  try {
    const res = await fetch(`${BASE_URL}/courses/${slug}`, {
      headers: {
        "Accept": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`API error fetching course details for "${slug}": Status ${res.status}`);
      return null;
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    }

    console.error(`API response for "${slug}" is not JSON. Status: ${res.status}`);
    return null;
  } catch (error) {
    console.error(`Failed to fetch course details for "${slug}":`, error);
    return null;
  }
};

export default getCourceDetails;
