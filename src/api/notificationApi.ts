import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseResponse } from "@/model/BaseResponse";
import { GetNotificationRequest } from "@/model/push-noti/GetNotficationRequest";
import { NotificationDTO } from "@/model/push-noti/NotificationDTO";
import { ReadNotificationRequest } from "@/model/push-noti/ReadNotificationRequest";
export const notificationApi = {
  readNotification: async (
    params: ReadNotificationRequest,
  ): Promise<BaseResponse<boolean>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/notification/read-notification`,
      params,
    );
    return res.data;
  },
  getNotification: async (
    params: GetNotificationRequest,
  ): Promise<BaseResponse<NotificationDTO[]>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/notification/get-notification`,
      params,
    );
    return res.data;
  },
};
