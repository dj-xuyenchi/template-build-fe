import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseResponse } from "@/model/BaseResponse";
import { GetUserInformationFilter } from "@/model/login/GetUserInformationFilter";
import { LoginRequest } from "@/model/login/LoginRequest";
import { AuthResponse } from "@/model/login/LoginResponse";
import { UserInformation } from "@/model/login/UserInformation";

export const authApi = {
  // getMedia: async (payload) => {
  //     const res = await axiosIns.get(`/auth-service/media/f?filename=${payload.fileName}`)
  //     return res.data;
  // },

  login: async (requestBody: LoginRequest): Promise<BaseResponse<AuthResponse>> => {
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
};
