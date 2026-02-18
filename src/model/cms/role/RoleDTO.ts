import { BaseDataTable } from "@/model/BaseDataTable";

export interface RoleDTO extends BaseDataTable {
    roleId: number,
    roleCode: string,
    roleName: string,
    roleDescription: string,
    effectiveType: string,
    effectiveFrom: string,
    effectiveTo: string,
    status: string,
    maker: string,
    updatedAt: string,
    updatedBy: string
}