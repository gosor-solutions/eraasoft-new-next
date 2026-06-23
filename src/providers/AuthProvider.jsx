"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  loginClient,
  registerClient,
  getClientProfile,
  updateClientProfile,
  logoutClient,
} from "@/services/Auth";

const AuthContext = createContext({
  client: null,
  token: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [client, setClient] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem("client_token");
        const storedClient = localStorage.getItem("client_data");

        if (storedToken) {
          setToken(storedToken);
          if (storedClient) {
            setClient(JSON.parse(storedClient));
          }

          // Fetch fresh profile to sync and validate token
          try {
            const profileRes = await getClientProfile(storedToken);
            if (profileRes.success && profileRes.data) {
              setClient(profileRes.data);
              localStorage.setItem("client_data", JSON.stringify(profileRes.data));
            }
          } catch (err) {
            console.error("Token verification failed, logging out", err);
            // If token is invalid or expired, clean up
            localStorage.removeItem("client_token");
            localStorage.removeItem("client_data");
            setToken(null);
            setClient(null);
          }
        }
      } catch (e) {
        console.error("Failed to initialize auth", e);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await loginClient({ email, password });
      if (res.success && res.data) {
        const { client: clientData, token: authToken } = res.data;
        setToken(authToken);
        setClient(clientData);
        localStorage.setItem("client_token", authToken);
        localStorage.setItem("client_data", JSON.stringify(clientData));
        router.push("/profile");
        return res;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data) => {
    setIsLoading(true);
    try {
      const res = await registerClient(data);
      if (res.success && res.data) {
        const { client: clientData, token: authToken } = res.data;
        setToken(authToken);
        setClient(clientData);
        localStorage.setItem("client_token", authToken);
        localStorage.setItem("client_data", JSON.stringify(clientData));
        router.push("/profile");
        return res;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (token) {
        await logoutClient(token);
      }
    } catch (e) {
      console.error("Logout request failed on server", e);
    } finally {
      setToken(null);
      setClient(null);
      localStorage.removeItem("client_token");
      localStorage.removeItem("client_data");
      setIsLoading(false);
      router.push("/login");
    }
  };

  const updateProfile = async (formData) => {
    if (!token) throw new Error("No authorization token");
    setIsLoading(true);
    try {
      const res = await updateClientProfile(formData, token);
      if (res.success && res.data) {
        setClient(res.data);
        localStorage.setItem("client_data", JSON.stringify(res.data));
        return res;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        client,
        token,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
