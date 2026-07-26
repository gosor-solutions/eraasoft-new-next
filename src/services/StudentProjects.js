import { BASE_URL } from "@/lib/api";

export const getStudentProjects = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/student-projects?page=${page}`, { cache: "no-store" });
  return await res.json();
};
