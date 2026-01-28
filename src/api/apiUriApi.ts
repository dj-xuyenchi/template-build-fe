import { DeleteApi, ReOpenApi } from "./../model/api/ApiUri";
import axiosClient from "@/config/httpCall";
import { AUTH_SERVICE } from "@/constant/serviceUrl";
import { ApiUri, CreateApi, UpdateApi } from "@/model/api/ApiUri";
import { BaseFilter } from "@/model/BaseFilter";
import { BasePageResult } from "@/model/BasePageResult";
export interface ApiUriFilter extends BaseFilter {
  applicationName?: string;
  action?: string;
  applicationId?: string | null | number[];
  status?: string[];
}
export const apiUriApi = {
  getApiUri: async (
    params: ApiUriFilter,
    signal: AbortSignal
  ): Promise<BasePageResult<ApiUri>> => {
   
    const res = await axiosClient.get(`${AUTH_SERVICE}/api`, {
      params: params,
      signal: signal,
    });
    return res.data;
  },
  create: async (requestBody: CreateApi): Promise<ApiUri[]> => {
    const res = await axiosClient.post(
      `${AUTH_SERVICE}/api/create`,
      requestBody
    );
    return res.data;
  },
  update: async (requestBody: UpdateApi): Promise<object> => {
    const res = await axiosClient.post(
      `${AUTH_SERVICE}/api/update`,
      requestBody
    );
    return res.data;
  },
  delete: async (requestBody: DeleteApi): Promise<object> => {
    const res = await axiosClient.post(
      `${AUTH_SERVICE}/api/delete`,
      requestBody
    );
    return res.data;
  },
  reopen: async (requestBody: ReOpenApi): Promise<object> => {
    const res = await axiosClient.post(
      `${AUTH_SERVICE}/api/re-open`,
      requestBody
    );
    return res.data;
  },
};
