import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import qs from "qs";
import { getMessageInstance } from "./push-noti-message/messageContext";
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from "@/constant/authen/authenConst";
import { notify } from "./push-noti-message/notifyContext";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { FailedQueueItem } from "@/types/FailedQueueItem";
const ROOT_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const FE_URL = process.env.NEXT_PUBLIC_FE_URL;
const axiosClient = axios.create({
  baseURL: ROOT_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});
let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};
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
      case 401: {
        const originalRequest = error.config;
        if (originalRequest._retry) {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(REFRESH_TOKEN_KEY);
          window.location.href = FE_URL + "/login";
          return Promise.reject(error);
        }

        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = "Bearer " + token;
              return axiosClient(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(async (resolve, reject) => {
          try {
            const res = await refreshToken();

            if (res.data.code == "ERROR") {
              messageApi.error(res.data.message);
              setTimeout(() => {
                window.location.href = FE_URL + "/login";
              }, 3000);
              return;
            }

            const newToken = res.data.data.accessToken;

            localStorage.setItem(TOKEN_KEY, newToken);
            messageApi.success(res.data.message);
            axiosClient.defaults.headers.common["Authorization"] =
              "Bearer " + newToken;

            processQueue(null, newToken);

            originalRequest.headers["Authorization"] = "Bearer " + newToken;
            resolve(axiosClient(originalRequest));
          } catch (err) {
            messageApi.error("Lỗi!");
            console.error(err);

            processQueue(err, null);
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            window.location.href = FE_URL + "/login";
            reject(err);
          } finally {
            isRefreshing = false;
          }
        });
      }
      case 406: {
        messageApi.warning("Vui lòng đăng nhập lại!");
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        setTimeout(() => {
          window.location.href = FE_URL + "/login";
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
const refreshToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  const call = axios.create({
    baseURL: ROOT_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = call.post(`${AUTHEN_SERVICE}/authentication/refresh`, {
    refreshToken,
  });
  return res;
};
export default axiosClient;
