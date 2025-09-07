import axios from "axios";
import type {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Tạo instance với baseURL từ biến môi trường
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // đảm bảo headers tồn tại và dùng set thay vì overwrite
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Add a response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) =>
    response && response.data ? response.data : response,
  (error: AxiosError) =>
    error.response?.data ? error.response.data : Promise.reject(error)
);

export default instance;
