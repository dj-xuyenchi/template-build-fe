import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { LoginRequest } from "@/model/login/LoginRequest";
import { LoginResponse } from "@/model/login/LoginResponse";
import { BtnRole } from "@/model/system/BtnRole";

export const authApi = {
  // getMedia: async (payload) => {
  //     const res = await axiosIns.get(`/auth-service/media/f?filename=${payload.fileName}`)
  //     return res.data;
  // },
  getBtnRole: async (): Promise<BtnRole> => {
    const res = await axiosClient.get(`${AUTHEN_SERVICE}/btn-role-by-user`);
    return res.data;
  },
  login: async (requestBody: LoginRequest): Promise<LoginResponse> => {
    const res = await axiosClient.post(`${AUTHEN_SERVICE}/login`, requestBody);
    return res.data;
  },
  getUserInformation: async (): Promise<LoginResponse> => {
    const res = await axiosClient.get(`${AUTHEN_SERVICE}/authentication/get-user-information`);
    return res.data;
  },
};
