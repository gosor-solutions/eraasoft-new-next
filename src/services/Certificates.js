import { fetchWithAuth } from "@/lib/api";

/**
 * Verify a certificate by serial number (Public).
 * @param {string} serialNumber - The certificate's serial number.
 */
export const verifyCertificate = async (serialNumber) => {
  return fetchWithAuth(`/certificates/verify/${serialNumber}`, {
    method: "GET",
  });
};

/**
 * Get certificates earned by the authenticated user.
 * @param {string} token - Client authentication token.
 */
export const getMyCertificates = async (token) => {
  return fetchWithAuth(`/certificates/my-certificates`, {
    method: "GET",
    token,
  });
};
