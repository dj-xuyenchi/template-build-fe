import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseFilter } from "@/model/BaseFilter";
import { BaseResponse } from "@/model/BaseResponse";
import { RoleApplyDTO } from "@/model/roleApply/RoleApplyDTO";
export interface ApiUriFilter extends BaseFilter {
  applicationName?: string;
  action?: string;
  applicationId?: string | null | number[];
  status?: string[];
}
export interface GetRoleApplyFilter {}
export const roleApplyApi = {
  getRoleApply: async (
    params: GetRoleApplyFilter,
    signal: AbortSignal,
  ): Promise<BaseResponse<RoleApplyDTO[]>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/role-apply/get-role-apply`,
      {
        params: params,
        signal: signal,
      },
    );
    return res.data;
  },
};
