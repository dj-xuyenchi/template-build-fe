import axiosClient from "@/config/httpCall";
import { AUTH_SERVICE } from "@/constant/serviceUrl";
import { LoginRequest } from "@/model/login/LoginRequest";
import { LoginResponse } from "@/model/login/LoginResponse";
import { BtnRole } from "@/model/system/BtnRole";

export const authApi = {
  // getMedia: async (payload) => {
  //     const res = await axiosIns.get(`/auth-service/media/f?filename=${payload.fileName}`)
  //     return res.data;
  // },
  getBtnRole: async (): Promise<BtnRole> => {
    // const res = await axiosClient.get(`${AUTH_SERVICE}/get-btn-role`);
    // return res.data;
    return []
  },
  login: async (requestBody: LoginRequest): Promise<LoginResponse> => {
    const res = await axiosClient.post(`${AUTH_SERVICE}/login`, requestBody);
    return res.data;
  },
};
