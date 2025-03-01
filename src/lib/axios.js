"use client";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const axiosApi = axios.create({
  baseURL: "https://doctor-booking-backend-vltm.onrender.com/api/v1",
  // baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

axiosApi.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("error", error);
    return Promise.reject(error);
  }
);

export default axiosApi;
