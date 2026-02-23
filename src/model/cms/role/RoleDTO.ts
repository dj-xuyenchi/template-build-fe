import { BaseDataTable } from "@/model/BaseDataTable";

export interface RoleDTO extends BaseDataTable {
    roleId: number;
    roleCode: string;
    isErrorRoleCode?: boolean;
    roleName: string;
    isErrorRoleName?: boolean;
    roleDescription: string;
    effectiveType: string;
    isErrorRoleEffectiveType?: boolean;
    effectiveFrom: string | undefined;
    isErrorRoleEffectiveFrom?: boolean;
    effectiveTo: string | undefined;
    isErrorRoleEffectiveTo?: boolean;
    status: string;
    maker: string;
    updatedAt: string;
    updatedBy: string
}