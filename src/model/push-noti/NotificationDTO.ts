export interface NotificationDTO {
  notificationId: string;
  userId: string;
  system: string;
  userName: string;
  objectContent: string;
  objectNotification: ObjectNotification;
  callbackFunction: string;
  callbackParams: string;
  createdAt: string;
  formatTime: string;
  sender: string;
  isRead: boolean;
}

export interface ObjectNotification {
  title: string;
  shortContent: string;
  fullContent: string;
  isHtml: boolean;
  typeNotification: string;
}

export const INFO = "INFO";
export const WARN = "WARN";
export const ERROR = "ERROR";
export const SUCCESS = "SUCCESS";
