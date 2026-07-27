import { fetchWithAuth } from "@/lib/api";

/**
 * Get paginated list of published free courses.
 * @param {Object} params - Query params (search, per_page, page).
 * @param {string} token - Client authentication token.
 */
export const getFreeCourses = async ({ search = "", perPage = 12, page = 1 } = {}, token) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (perPage) params.append("per_page", perPage);
  if (page) params.append("page", page);

  return fetchWithAuth(`/recorded-courses?${params.toString()}`, {
    method: "GET",
    token,
  });
};

/**
 * Get details of a single free course including videos and SEO metadata.
 * @param {string} slug - The course slug.
 * @param {string} token - Client authentication token.
 */
export const getFreeCourseDetail = async (slug, token) => {
  return fetchWithAuth(`/recorded-courses/${slug}`, {
    method: "GET",
    token,
  });
};

/**
 * Get public preview metadata and intro video link of a free course.
 * @param {string} slug - The course slug.
 */
export const getFreeCoursePreview = async (slug) => {
  return fetchWithAuth(`/recorded-courses/${slug}/preview`, {
    method: "GET",
  });
};

/**
 * Get or unlock coupon for a completed free course.
 * @param {number|string} freeCourseId - The ID of the free course.
 * @param {string} token - Client authentication token.
 */
export const getFreeCourseCoupon = async (freeCourseId, token) => {
  return fetchWithAuth(`/recorded-courses/${freeCourseId}/coupon`, {
    method: "GET",
    token,
  });
};

/**
 * Enroll in a free course.
 * @param {number|string} freeCourseId - The ID of the free course.
 * @param {string} token - Client authentication token.
 * @param {string} [couponCode] - Optional coupon code for paid courses.
 */
export const enrollInFreeCourse = async (freeCourseId, token, couponCode) => {
  const options = {
    method: "POST",
    token,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ coupon_code: couponCode || "" }),
  };
  return fetchWithAuth(`/recorded-courses/${freeCourseId}/enroll`, options);
};

/**
 * Get enrolled free courses for the authenticated user.
 * @param {string} token - Client authentication token.
 */
export const getMyFreeCourseEnrollments = async (token) => {
  return fetchWithAuth(`/recorded-courses/my-enrollments`, {
    method: "GET",
    token,
  });
};

/**
 * Update video progress inside a free course.
 * @param {number|string} freeCourseId - The ID of the free course.
 * @param {number|string} videoId - The ID of the video watched.
 * @param {string} token - Client authentication token.
 */
export const updateVideoProgress = async (freeCourseId, videoId, token) => {
  return fetchWithAuth(`/recorded-courses/${freeCourseId}/progress/${videoId}`, {
    method: "POST",
    token,
  });
};
