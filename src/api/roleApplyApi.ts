import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseResponse } from "@/model/BaseResponse";
import { AuthorizeDataRequest } from "@/model/roleApply/AuthorizeDataRequest";
import { RoleApplyRequest } from "@/model/roleApply/DeleteRoleApplyRequest";
import { OptionAsSelect, RoleApplyDTO } from "@/model/roleApply/RoleApplyDTO";

export interface GetRoleApplyFilter {
  roleId: number[];
  applyType: string;
  applyValue: number;
  effectiveType: string;
  effectiveFrom: string;
  effectiveTo: string;
  keyword: string;
}
export interface GetOptionAsSelectRequest {
  applyType: string;
  keyword: string;
}
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
  deleteRoleApply: async (
    params: RoleApplyRequest,
  ): Promise<BaseResponse<boolean>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/role-apply/delete-role-apply`,
      {
        params: params,
      },
    );
    return res.data;
  },
  authorizeData: async (
    params: AuthorizeDataRequest,
  ): Promise<BaseResponse<boolean>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/role-apply/authorize-data`,
      {
        params: params,
      },
    );
    return res.data;
  },
  optionAsSelect: async (
    params: GetOptionAsSelectRequest,
  ): Promise<BaseResponse<OptionAsSelect[]>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/role-apply/get-option-as-select`,
      {
        params: params,
      },
    );
    return res.data;
  },
};
