import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://realtimechat-app.up.railway.app/api",
  withCredentials: true,
});