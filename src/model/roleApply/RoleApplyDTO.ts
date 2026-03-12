import { BaseDataTable } from "../BaseDataTable";

export interface RoleApplyDTO extends BaseDataTable {
  roleApplyId: number;
  roleId: number;
  applyId: number;
  applyType: string;
  effectiveType: string;
  effectiveFrom: string;
  effectiveTo: string;
  status: string;
  maker: string;
  updatedAt: string;
  updatedBy: string;
}
