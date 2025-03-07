import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Bu, cross-origin isteklerde bile cookie'lerin gönderilmesini sağlar
});

export default axiosInstance;
