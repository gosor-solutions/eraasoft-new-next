import { BASE_URL } from "@/lib/api";

/**
 * Register a new client account.
 * @param {Object} data - Registration fields.
 */
export const registerClient = async (data) => {
  const res = await fetch(`${BASE_URL}/client/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
};

/**
 * Send OTP for email verification before registration.
 * @param {Object} data - Registration fields (excluding otp).
 */
export const sendRegisterOtp = async (data) => {
  const res = await fetch(`${BASE_URL}/client/register/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
};


/**
 * Authenticate client.
 * @param {Object} data - Credentials (email, password).
 */
export const loginClient = async (data) => {
  const res = await fetch(`${BASE_URL}/client/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
};

/**
 * Get authenticated client profile.
 * @param {string} token - Sanctum token.
 */
export const getClientProfile = async (token) => {
  const res = await fetch(`${BASE_URL}/client/profile`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
    },
  });

  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
};

/**
 * Update authenticated client profile.
 * @param {FormData} formData - Multipart form data.
 * @param {string} token - Sanctum token.
 */
export const updateClientProfile = async (formData, token) => {
  formData.append("_method", "PUT");
  const res = await fetch(`${BASE_URL}/client/profile`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
    },
    body: formData,
  });

  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
};

/**
 * Revoke client API token.
 * @param {string} token - Sanctum token.
 */
export const logoutClient = async (token) => {
  const res = await fetch(`${BASE_URL}/client/logout`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
    },
  });

  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
};

/**
 * Send OTP for resetting client password.
 * @param {Object} data - { email }
 */
export const sendPasswordOtp = async (data) => {
  const res = await fetch(`${BASE_URL}/client/password/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
};

/**
 * Verify OTP for resetting client password.
 * @param {Object} data - { email, otp }
 */
export const verifyPasswordOtp = async (data) => {
  const res = await fetch(`${BASE_URL}/client/password/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
};

/**
 * Reset client password using OTP and new password.
 * @param {Object} data - { email, otp, password, password_confirmation }
 */
export const resetPassword = async (data) => {
  const res = await fetch(`${BASE_URL}/client/password/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
};

