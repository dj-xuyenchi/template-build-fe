import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseFilter } from "@/model/BaseFilter";
import { BaseResponse } from "@/model/BaseResponse";
import { SystemUserDTO } from "@/model/cms/system-user/SystemUserDTO";
export interface GetSystemUserFilter extends BaseFilter {
  userId?: number;
  userName?: string;
}
export const sysUserApi = {
  getUser: async (
    params: GetSystemUserFilter,
    signal?: AbortSignal,
  ): Promise<BaseResponse<SystemUserDTO[]>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/system-user/get-user`,
      {
        params: params,
        signal: signal,
      },
    );
    return res.data;
  },
};
