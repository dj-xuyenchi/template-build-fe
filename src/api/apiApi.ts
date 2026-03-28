import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseFilter } from "@/model/BaseFilter";
import { BaseResponse } from "@/model/BaseResponse";
import { AuditApiRequest } from "@/model/cms/cat-api/AuditApiRequest";
import { CatApiDTO } from "@/model/cms/cat-api/CatApiDTO";
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
    signal?: AbortSignal,
  ): Promise<BaseResponse<CatApiDTO[]>> => {
    const res = await axiosClient.post(`${AUTHEN_SERVICE}/cat-api/audit`, {
      params: params,
      signal: signal,
    });
    return res.data;
  },
};
