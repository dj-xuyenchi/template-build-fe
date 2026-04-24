export interface NotificationDTO {
    title: string;
    shortContent: string;
    fullContent: string;
    sendDate: Date;
    sender: string;
    forwardPage: string;
    callbackFunction: string;
    typeNotification: string;
    isHtml: boolean;
    isRead: boolean;
}

export const INFO = "INFO";
export const WARN = "WARN";
export const ERROR = "ERROR";
export const SUCCESS = "SUCCESS";