// auth/authService.ts
import axiosClient from "@/lib/axiosClient";

export async function login(email: string, password: string) {
  const res = await axiosClient.post("/auth/login", { email, password });
  return res.data; // { accessToken, refreshToken }
}

export async function register(email: string, password: string, fullName: string) {
  const res = await axiosClient.post("/auth/register", { email, password, fullName });
  return res.data;
}

export async function refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  const res = await axiosClient.post("/auth/refresh", { refreshToken });
  const { accessToken: newAccessToken } = res.data;
  localStorage.setItem("accessToken", newAccessToken);
  return newAccessToken;
}
