
import axiosClient from "@/lib/axiosClient";

/**
 * Kullanıcı girişi için servis.
 * @param email Kullanıcının e-posta adresi
 * @param password Kullanıcının şifresi
 * @returns Sunucudan dönen token bilgileri (örneğin: { accessToken, refreshToken })
 */
export async function login(email: string, password: string) {
  const res = await axiosClient.post("/auth/login", { email, password });
  return res.data;
}

/**
 * Kullanıcı kayıt işlemi için servis.
 * @param email Kullanıcının e-posta adresi
 * @param password Kullanıcının belirlediği şifre
 * @param fullName Kullanıcının tam adı
 * @returns Sunucudan dönen token bilgileri (örneğin: { accessToken, refreshToken })
 */
export async function register(email: string, password: string, fullName: string) {
  const res = await axiosClient.post("/auth/register", { email, password, fullName });
  return res.data;
}

/**
 * Refresh token ile yeni access token alma işlemi.
 * localStorage'dan refreshToken alınır, sunucuya gönderilir,
 * yeni accessToken alınır ve localStorage'da güncellenir.
 * @returns Yeni access token string'i veya null (refreshToken yoksa)
 */
export async function refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  const res = await axiosClient.post("/auth/refresh", { refreshToken });
  const { accessToken: newAccessToken } = res.data;
  localStorage.setItem("accessToken", newAccessToken);
  return newAccessToken;
}
