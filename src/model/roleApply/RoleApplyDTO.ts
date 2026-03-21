import { BaseDataTable } from "../BaseDataTable";

export interface RoleApplyDTO extends BaseDataTable {
  roleApplyId: number;
  roleId: number;
  applyId: number;
  applyType: string;
  applyValue: string;
  effectiveType: string;
  effectiveFrom?: string;
  effectiveTo?: string;
  status: string;
  maker: string;
  updatedAt: string;
  updatedBy: string;
}

export const ROLE_APPLY_ACTIVE = "ACTIVE";
export const ROLE_APPLY_INACTIVE = "INACTIVE";
export const ROLE_APPLY_DELETE = "DELETE";
