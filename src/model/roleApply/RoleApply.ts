export interface RoleApply {
  roleApplyId: number;
  createdAt: Date;
  createdBy: string;
  effectFrom?: Date;
  effectTo?: Date;
  effectType: string;
  flowType: string;
  flowTypeId: number;
  roleId: number;
  status: string;
  updatedAt?: Date;
  updatedBy?: string;
}
