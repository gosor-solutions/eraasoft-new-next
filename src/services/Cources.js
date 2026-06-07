import { BASE_URL } from "@/lib/api";

export const getAllCources = async () => {
  const res = await fetch(`${BASE_URL}/courses`);
  const cources = await res.json();
  // console.log(cources.data);
  return cources?.data;
};
