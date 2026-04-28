import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseResponse } from "@/model/BaseResponse";
import { GetUserInformationFilter } from "@/model/login/GetUserInformationFilter";
import { GlobalSystemConfig } from "@/model/login/GlobalSystemConfig";
import { LoginRequest } from "@/model/login/LoginRequest";
import { AuthResponse } from "@/model/login/LoginResponse";
import { SignInFirebaseTokenRequest } from "@/model/login/SignInFirebaseToken";
import { UserInformation } from "@/model/login/UserInformation";
import { GetNotificationRequest } from "@/model/push-noti/GetNotficationRequest";
import { NotificationDTO } from "@/model/push-noti/NotificationDTO";
export interface GetGlobalSystemConfigFilter {
  channel: string;
  system: string;
}
export const authApi = {
  testNoti: async (r: string): Promise<BaseResponse<AuthResponse>> => {
    const res = await axiosClient.get(`${AUTHEN_SERVICE}/authentication/test`);
    return res.data;
  },

  login: async (
    requestBody: LoginRequest,
  ): Promise<BaseResponse<AuthResponse>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/authentication/login`,
      requestBody,
    );
    return res.data;
  },
  getUserInformation: async (
    filter: GetUserInformationFilter,
  ): Promise<BaseResponse<UserInformation>> => {
    const res = await axiosClient.get(
      `${AUTHEN_SERVICE}/authentication/get-user-information`,
      {
        params: filter,
      },
    );
    return res.data;
  },
  getGlobalSystemConfig: async (
    filter: GetGlobalSystemConfigFilter,
  ): Promise<BaseResponse<GlobalSystemConfig>> => {
    const res = await axiosClient.get(
      `${AUTHEN_SERVICE}/authentication/get-global-system-config`,
      {
        params: filter,
      },
    );
    return res.data;
  },
  signInFirebaseToken: async (
    params: SignInFirebaseTokenRequest,
  ): Promise<BaseResponse<boolean>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/authentication/sign-in-token-firebase`,
      {
        params: params,
      },
    );
    return res.data;
  },
 
};
