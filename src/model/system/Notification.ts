import { File } from "./File";

export interface Notification {
  title: string;
  shortContent: string;
  fullContent?: string;
  sendTime: string;
  isHtmlContent: boolean;
  listFile?: File[];
  clickActionType: string;
  otherParam?: string;
  isRead: boolean;
}
