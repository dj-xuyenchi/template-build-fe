import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseResponse } from "@/model/BaseResponse";
import { GetUserInformationFilter } from "@/model/login/GetUserInformationFilter";
import { GlobalSystemConfig } from "@/model/login/GlobalSystemConfig";
import { LoginRequest } from "@/model/login/LoginRequest";
import { AuthResponse } from "@/model/login/LoginResponse";
import { UserInformation } from "@/model/login/UserInformation";
export interface GetGlobalSystemConfigFilter {
  channel: string;
  system: string;
}
export const authApi = {
  testNoti: async (r: string): Promise<BaseResponse<AuthResponse>> => {
    const res = await axiosClient.get(
      `${AUTHEN_SERVICE}/authentication/test-noti?token=${r}`,
    );
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
};
