import { BaseFilter } from "@/model/BaseFilter";

export interface GetRoleFilter extends BaseFilter {
    status: string[];
    roleName: string;
    roleCode: string;
    effectiveType: string;
}