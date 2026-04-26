import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseFilter } from "@/model/BaseFilter";
import { BaseResponse } from "@/model/BaseResponse";
import { AuditApiRequest } from "@/model/cms/cat-api/AuditApiRequest";
import { CatApiDTO } from "@/model/cms/cat-api/CatApiDTO";
import { InactiveApiRequest } from "@/model/cms/cat-api/InactiveApiRequest";
import { SignInFirebaseTokenRequest } from "@/model/login/SignInFirebaseToken";
export interface GetApiFilter extends BaseFilter {
  isTakeSystemName?: boolean;
  apiName?: string;
  apiCode?: string;
  uri?: string;
  service?: string;
  method?: string;
}
export const apiApi = {
  getApi: async (
    params: GetApiFilter,
    signal?: AbortSignal,
  ): Promise<BaseResponse<CatApiDTO[]>> => {
    const res = await axiosClient.post(`${AUTHEN_SERVICE}/cat-api/get-api`, {
      params: params,
      signal: signal,
    });
    return res.data;
  },
  audit: async (
    params: AuditApiRequest,
  ): Promise<BaseResponse<CatApiDTO[]>> => {
    const res = await axiosClient.post(`${AUTHEN_SERVICE}/cat-api/audit-api`, {
      params: params,
    });
    return res.data;
  },
  inactiveApi: async (
    params: InactiveApiRequest,
  ): Promise<BaseResponse<CatApiDTO[]>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/cat-api/inactive-api`,
      {
        params: params,
      },
    );
    return res.data;
  },
  activeApi: async (
    params: InactiveApiRequest,
  ): Promise<BaseResponse<CatApiDTO[]>> => {
    const res = await axiosClient.post(`${AUTHEN_SERVICE}/cat-api/active-api`, {
      params: params,
    });
    return res.data;
  }
};
