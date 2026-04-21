import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import qs from "qs";
import { getMessageInstance } from "./push-noti-message/messageContext";
import {
  REFRESH_TOKEN_KEY,
  TOKEN_EXPIRED_KEY,
  TOKEN_KEY,
} from "@/constant/authen/authenConst";
import { notify } from "./push-noti-message/notifyContext";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { LOGIN_URL } from "@/util/common-home/link";
const ROOT_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const axiosClient = axios.create({
  baseURL: ROOT_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});
let refreshPromise: Promise<string> | null = null;

const refreshToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  const messageApi = getMessageInstance();
  if (!refreshToken) {
    throw new Error("Refresh Token không tồn tại!");
  }
  const call = axios.create({
    baseURL: ROOT_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await call.post(`${AUTHEN_SERVICE}/authentication/refresh`, {
    refreshToken,
  });
  if (res.data.code === "ERROR") {
    // refresh thất bại → logout
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRED_KEY);
    messageApi.warning(res.data.message);
    window.location.href = LOGIN_URL;
    throw new Error("Refresh token failed");
  }

  const newToken = res.data.data.accessToken;
  const accessTokenExpiredAt = res.data.data.accessTokenExpiredAt;

  // Cập nhật localStorage
  localStorage.setItem(TOKEN_KEY, newToken);
  localStorage.setItem(TOKEN_EXPIRED_KEY, accessTokenExpiredAt);
  // Bỏ hiển thị message nếu có, vì đây là thao tác refresh token ngầm
  // messageApi.success(res.data.message);
  console.info(res.data.message);

  return newToken;
};
// Interceptor cho request
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const SKIP_REFRESH_URLS = [
      "/authentication/login",
      "/authentication/refresh",
    ];

    // Nếu request hiện tại là login/refresh → bỏ qua refresh token
    if (config.url && SKIP_REFRESH_URLS.some((u) => config.url?.includes(u))) {
      return config;
    }
    let token = localStorage.getItem(TOKEN_KEY);
    const accessTokenExpiredAt = Number(
      localStorage.getItem(TOKEN_EXPIRED_KEY),
    );
    const rightNow = Date.now();
    const offset = accessTokenExpiredAt - rightNow;
    const BUFFER = 60 * 1000;
    if (offset < BUFFER) {
      // Token sắp hết hạn → refresh
      if (!refreshPromise) {
        refreshPromise = refreshToken().finally(() => {
          refreshPromise = null;
        });
      }

      try {
        token = await refreshPromise;
      } catch (err) {
        return Promise.reject(err); // refresh fail → reject request
      }
    }

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    switch (config.method?.toLocaleLowerCase()) {
      case "post": {
        // Cho phép upload file với content-type là multipart/form-data, nếu data là FormData thì không serialize
        if (config.data instanceof FormData) {
          break;
        }
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
      case 401:
      case 403: {
        const message = error.response?.data.message;
        messageApi.error(message);
        break;
      }
      case 406: {
        messageApi.warning("Vui lòng đăng nhập lại!");
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        setTimeout(() => {
          window.location.href = LOGIN_URL;
        }, 3000);
        break;
      }
      case 400:
      case 503:
      case 500: {
        const message =
          error.response?.data.message ||
          "Lỗi hệ thống vui lòng liên hệ quản trị viên!";
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
