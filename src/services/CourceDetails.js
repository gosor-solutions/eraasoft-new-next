import { BASE_URL } from "@/lib/api";

const getCourceDetails = async ({ slug }) => {
  const res = await fetch(`${BASE_URL}/courses/${slug}`, { cache: "no-store" });

  return await res.json()
};

export default getCourceDetails;
