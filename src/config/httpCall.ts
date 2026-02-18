// src/api/axiosClient.ts
import { getUserDeviceInfo } from "@/util/authen-service/baseRequestHandle";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import qs from "qs";
import { getMessageInstance } from "./messageContext";
const ROOT_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const axiosClient = axios.create({
  baseURL: ROOT_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho request

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("_t");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    switch (config.method?.toLocaleLowerCase()) {
      case "post": {
        const { params, ...rest } = config.data || {};

        config.data = {
          ...rest,
          ...params,
          ...getUserDeviceInfo(),
        };
        break;
      }
      case "get": {
        config.paramsSerializer = (params) =>
          qs.stringify(params, { arrayFormat: "repeat" });
        config.params = {
          ...(config.params || {}),
          ...getUserDeviceInfo(),
        };
        break;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor cho response
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error(error);

    const messageApi = getMessageInstance();
    const status = error.response?.status;
    const errorMess = error.response?.data.error;
    const code = error.code;
    if (code === "ERR_NETWORK") {
      messageApi.error("Kết nối đến máy chủ thất bại!");
      return Promise.reject(error);
    }
    switch (status) {
      case 400: {
        messageApi.error(errorMess);
        break;
      }
      case 403: {
        messageApi.error(errorMess);
        break;
      }
      case 401: {
        break;
      }
      case 503: {
        messageApi.error("Ứng dụng đang bảo trì!");
        break;
      }
      case 500: {
        messageApi.error("Ứng dụng đang bảo trì!");
        break;
      }
    }
    // window.location.href = "http://localhost:3000/";
    return Promise.reject(error);
  }
);

export default axiosClient;
