// src/config/notification.ts
import { App } from "antd";

import type { NotificationInstance } from "antd/es/notification/interface";
import type { ArgsProps } from "antd/es/notification";
let notificationApi: NotificationInstance | null = null;

export const NotifyContextHolder = () => {
  const { notification } = App.useApp();
  notificationApi = notification;
  return null;
};

const baseConfig = (config: ArgsProps): ArgsProps => ({
  placement: "bottomRight",
  duration: 3,
  ...config,
});

export const notify = {
  success: (title?: string, description?: string) => {
    if (!notificationApi) return;
    notificationApi.success(
      baseConfig({
        message: title,
        description,
      }),
    );
  },

  error: (title?: string, description?: string) => {
    if (!notificationApi) return;
    notificationApi.error(
      baseConfig({
        message: title,
        description,
      }),
    );
  },

  info: (title?: string, description?: string) => {
    if (!notificationApi) return;
    notificationApi.info(
      baseConfig({
        message: title,
        description,
      }),
    );
  },

  warning: (title?: string, description?: string) => {
    if (!notificationApi) return;
    notificationApi.warning(
      baseConfig({
        message: title,
        description,
      }),
    );
  },
};
