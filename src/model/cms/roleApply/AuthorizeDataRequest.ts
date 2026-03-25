export interface AuthorizeDataRequest {
  createData: RoleApplyCreate[];
  updateData: RoleApplyUpdate[];
}

export interface RoleApplyCreate {
  roleId: number;
  applyId: number;
  applyType: string;
  effectiveType: string;
  effectiveFrom: string;
  effectiveTo: string;
}

export interface RoleApplyUpdate {
  roleApplyId: number;
  effectiveType: string;
  effectiveFrom: string;
  effectiveTo: string;
  status: string;
}
