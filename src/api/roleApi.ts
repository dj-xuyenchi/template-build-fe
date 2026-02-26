import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseFilter } from "@/model/BaseFilter";
import { BaseResponse } from "@/model/BaseResponse";
import {
  ArchiveActiveRequest,
  AuditRoleRequest,
} from "@/model/cms/role/AuditRoleRequest";
import { GetRoleFilter } from "@/model/cms/role/GetRoleFilter";
import { RoleDTO } from "@/model/cms/role/RoleDTO";
export interface ApiUriFilter extends BaseFilter {
  applicationName?: string;
  action?: string;
  applicationId?: string | null | number[];
  status?: string[];
}
export const roleApi = {
  getRole: async (
    params: GetRoleFilter,
    signal: AbortSignal,
  ): Promise<BaseResponse<RoleDTO[]>> => {
    const res = await axiosClient.post(`${AUTHEN_SERVICE}/role/get-role`, {
      params: params,
      signal: signal,
    });
    return res.data;
  },
  auditRole: async (
    params: AuditRoleRequest,
  ): Promise<BaseResponse<RoleDTO>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/role/audit-role`,
      params,
    );
    return res.data;
  },
  archiveActive: async (
    params: ArchiveActiveRequest,
  ): Promise<BaseResponse<boolean>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/role/archive-active-role`,
      params,
    );
    return res.data;
  },
};
