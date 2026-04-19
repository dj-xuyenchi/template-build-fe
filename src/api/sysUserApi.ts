import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseFilter } from "@/model/BaseFilter";
import { BaseResponse } from "@/model/BaseResponse";
import { CreateSysUserRequest } from "@/model/cms/system-user/CreateSysUserRequest";
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
  lockUser: async (params: {
    ids: number[];
  }): Promise<BaseResponse<boolean>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/system-user/lock-user`,
      {
        params: params,
      },
    );
    return res.data;
  },
  unlockUser: async (params: {
    ids: number[];
  }): Promise<BaseResponse<boolean>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/system-user/unlock-user`,
      {
        params: params,
      },
    );
    return res.data;
  },
  archiveReopen: async (params: {
    ids: number[];
  }): Promise<BaseResponse<boolean>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/system-user/archive-reopen-user`,
      {
        params: params,
      },
    );
    return res.data;
  },
  createSysUser: async (
    params: CreateSysUserRequest,
  ): Promise<BaseResponse<boolean>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/system-user/create-user`,
      params,
    );
    return res.data;
  },
};
