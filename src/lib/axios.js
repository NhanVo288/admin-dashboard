import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://26.100.40.164:8181/api",
    // withCredentials: false
    headers: {
    'Content-Type': 'application/json'
  }
  
})
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (userId) {
    config.headers["X-User-Id"] = userId;
  }

  return config;
});