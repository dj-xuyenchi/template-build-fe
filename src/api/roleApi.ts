import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseFilter } from "@/model/BaseFilter";
import { BasePageResult } from "@/model/BasePageResult";
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
        signal: AbortSignal
    ): Promise<BasePageResult<RoleDTO>> => {

        const res = await axiosClient.post(`${AUTHEN_SERVICE}/role/get-role`, {
            params: params,
            signal: signal,
        });
        return res.data;
    }, 
    createRole: async (
        params: GetRoleFilter,
        signal: AbortSignal
    ): Promise<BasePageResult<RoleDTO>> => {

        const res = await axiosClient.post(`${AUTHEN_SERVICE}/role/create-role`, {
            params: params,
            signal: signal,
        });
        return res.data;
    },
};
