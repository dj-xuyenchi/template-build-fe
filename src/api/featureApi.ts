import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseFilter } from "@/model/BaseFilter";
import { BaseResponse } from "@/model/BaseResponse";
import { GetRoleFilter } from "@/model/cms/role/GetRoleFilter";
import { RoleDTO } from "@/model/cms/role/RoleDTO";
import {
  ArchiveActiveRequest,
  AuditFeatureRequest,
} from "@/model/feature/AuditFeatureRequest";
import { FeatureDTO } from "@/model/feature/FeatureDTO";
export interface ApiUriFilter extends BaseFilter {
  applicationName?: string;
  action?: string;
  applicationId?: string | null | number[];
  status?: string[];
}
export const featureApi = {
  getFeature: async (
    params: GetRoleFilter,
    signal?: AbortSignal,
  ): Promise<BaseResponse<FeatureDTO[]>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/feature/get-feature`,
      {
        params: params,
        signal: signal,
      },
    );
    return res.data;
  },
  auditFeature: async (
    params: AuditFeatureRequest,
  ): Promise<BaseResponse<RoleDTO>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/feature/audit-feature`,
      params,
    );
    return res.data;
  },
  archiveActive: async (
    params: ArchiveActiveRequest,
  ): Promise<BaseResponse<boolean>> => {
    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/feature/archive-active-feature`,
      params,
    );
    return res.data;
  },
};
