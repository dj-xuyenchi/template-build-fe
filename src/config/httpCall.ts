import { message } from "antd";
// src/api/axiosClient.ts
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import qs from "qs";
import { getMessageInstance } from "./push-noti-message/messageContext";
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from "@/constant/authen/authenConst";
import { notify } from "./push-noti-message/notifyContext";
const ROOT_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const FE_URL = process.env.NEXT_PUBLIC_FE_URL;
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
        };
        break;
      }
      case "get": {
        config.paramsSerializer = (params) =>
          qs.stringify(params, { arrayFormat: "repeat" });
        config.params = {
          ...(config.params || {}),
        };
        break;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor cho response
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const messageApi = getMessageInstance();
    const code = response.data.code;
    console.error(code);

    const isPushNotifyMessage = response.data.isPushNotifyMessage;
    const messNotify = response.data.messNotify;
    const type = response.data.type;
    const title = response.data.title;
    const message = response.data.message;
    if (isPushNotifyMessage) {
      if (messNotify == "NOTIFY") {
        switch (type) {
          case "SUCCESS": {
            notify.success(title, message);
            break;
          }
          case "ERROR": {
            notify.error(title, message);
            break;
          }
          case "WARN": {
            notify.warning(title, message);
            break;
          }
          case "INFO": {
            notify.info(title, message);
            break;
          }
        }
      } else {
        switch (type) {
          case "SUCCESS": {
            messageApi.success(message);
            break;
          }
          case "ERROR": {
            messageApi.error(message);
            break;
          }
          case "WARN": {
            messageApi.warning(message);
            break;
          }
          case "INFO": {
            messageApi.info(message);
            break;
          }
        }
      }
    }

    return response;
  },
  (error) => {
    const messageApi = getMessageInstance();
    const status = error.response?.status;
    const code = error.code;
    const fullUrl = window.location.href;

    if (code === "ERR_NETWORK") {
      messageApi.error("Kết nối đến máy chủ thất bại!");
      return Promise.reject(error);
    }
    switch (status) {
      case 403: {
        let message =
          error.response?.data.message || error.response?.data.error;
        if (!message) {
          message = "Lỗi!";
        }
        messageApi.error(message);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        if (fullUrl == FE_URL + "/login") {
          return;
        } else {
          setTimeout(() => {
            window.location.href = FE_URL + "/login";
          }, 5000);
        }
        break;
      }
      case 400:
      case 401:
      case 503:
      case 500: {
        const message = error.response?.data.message;
        messageApi.error(message);
        break;
      }
      default: {
        messageApi.error(error);
        return;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
