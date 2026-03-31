import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseFilter } from "@/model/BaseFilter";
import { BaseResponse } from "@/model/BaseResponse";
import { AuditBtnRequest } from "@/model/cms/btn/AuditBtnRequest";
import { BtnDTO } from "@/model/cms/btn/ButtonDTO";
export interface GetBtnFilter extends BaseFilter {}
export const btnApi = {
  getBtn: async (
    params: GetBtnFilter,
    signal?: AbortSignal,
  ): Promise<BaseResponse<BtnDTO[]>> => {
    const res = await axiosClient.post(`${AUTHEN_SERVICE}/button/get-btn`, {
      params: params,
      signal: signal,
    });
    return res.data;
  },
  audit: async (
    params: AuditBtnRequest,
    signal?: AbortSignal,
  ): Promise<BaseResponse<BtnDTO[]>> => {
    const res = await axiosClient.post(`${AUTHEN_SERVICE}/button/audit-btn`, {
      params: params,
      signal: signal,
    });
    return res.data;
  },
  inactiveActive: async (
    params: { ids: number[] },
    signal?: AbortSignal,
  ): Promise<BaseResponse<BtnDTO[]>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/button/active-inactive-btn`,
      {
        params: params,
        signal: signal,
      },
    );
    return res.data;
  },
};
