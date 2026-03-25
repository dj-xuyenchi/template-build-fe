import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseFilter } from "@/model/BaseFilter";
import { BaseResponse } from "@/model/BaseResponse";
import { CatApiDTO } from "@/model/cms/cat-api/CatApiDTO";
export interface GetApiFilter extends BaseFilter {}
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
};
