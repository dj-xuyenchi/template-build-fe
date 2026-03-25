import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseFilter } from "@/model/BaseFilter";
import { BaseResponse } from "@/model/BaseResponse";
import { AuditSystemData } from "@/model/cms/system/AuditSystemData";
import { SystemDTO } from "@/model/cms/system/SystemDTO";
export interface GetSystemFilter extends BaseFilter {
  systemName?: string;
  systemCode?: string;
  systemId?: string | null | number[] | number;
  status?: string;
}
export const systemApi = {
  getSystem: async (
    params: GetSystemFilter,
    signal?: AbortSignal,
  ): Promise<BaseResponse<SystemDTO[]>> => {
    const res = await axiosClient.post(`${AUTHEN_SERVICE}/system/get-system`, {
      params: params,
      signal: signal,
    });
    return res.data;
  },
  auditSystem: async (
    request: AuditSystemData,
  ): Promise<BaseResponse<boolean>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/system/audit-system`,
      {
        ...request,
      },
    );
    return res.data;
  },
};
