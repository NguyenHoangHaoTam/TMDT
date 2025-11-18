import axios from "axios";
import ApiEndPoint from "./api";
import { useAuthStore } from "@/store/use-auth.store";

const API_PUBLIC = import.meta.env.VITE_API_PUBLIC as string;

export const publicApi = axios.create({
  baseURL: API_PUBLIC,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const api = axios.create({
  baseURL: API_PUBLIC,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token; // ✅ Lấy trực tiếp từ Zustand
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        const res = await axios.post(
          `${API_PUBLIC}${ApiEndPoint.REFRESH_TOKEN}`,
          { refreshToken },
          { withCredentials: true }
        );
        const newToken = res.data?.data?.token;
        if (!newToken) return;

        useAuthStore.getState().setToken(newToken);
        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);
        useAuthStore.getState().clearAuth();
      }
    }
    return Promise.reject(error);
  }
);
