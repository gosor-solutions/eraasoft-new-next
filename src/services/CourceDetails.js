import { BASE_URL } from "@/lib/api";

const getCourceDetails = async ({ slug }) => {
  const res = await fetch(`${BASE_URL}/courses/${slug}`, { cache: "no-store" });
  const couceDetails = await res.json();
  return couceDetails;
};

export default getCourceDetails;
