import { BaseFilter } from "@/model/BaseFilter";

export interface GetRoleFilter extends BaseFilter {
  status: string[] | null;
  roleName: string;
  roleCode: string;
  effectiveType: string;
}
