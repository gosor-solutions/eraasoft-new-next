import { fetchWithAuth } from "@/lib/api";

/**
 * Enroll in a paid course.
 * @param {Object} payload - Enrollment details.
 * @param {string} [token] - Optional client auth token.
 */
export const enrollInCourse = async (payload, token) => {
  return fetchWithAuth("/enroll", {
    method: "POST",
    token,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

/**
 * Verify a coupon code.
 * @param {string} code - The coupon code to verify.
 * @param {string} token - Client authentication token.
 */
export const verifyCoupon = async (code, token) => {
  return fetchWithAuth("/coupons/verify", {
    method: "POST",
    token,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });
};
