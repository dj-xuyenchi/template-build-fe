import { BaseDataTable } from "../../BaseDataTable";

export interface RoleApplyDTO extends BaseDataTable {
  roleApplyId: number;
  roleId: number;
  applyId: number;
  applyType: string;
  applyValue: string;
  applyName: string;
  roleName: string;
  effectiveType: string;
  effectiveFrom?: string;
  effectiveTo?: string;
  status: string;
  maker: string;
  updatedBy: string;
  optionApplyValue?: OptionAsSelect[];
  isLoadingOption: boolean
}
export interface OptionAsSelect {
  label: string;
  value: number;
}
export const ROLE_APPLY_ACTIVE = "ACTIVE";
export const ROLE_APPLY_INACTIVE = "INACTIVE";
export const ROLE_APPLY_DELETE = "DELETED";
