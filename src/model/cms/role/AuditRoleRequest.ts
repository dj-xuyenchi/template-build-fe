export interface AuditRoleRequest {
  create: CreateRoleRequestData[];
  update: UpdateRoleRequestData[];
}

export interface CreateRoleRequestData {
  roleCode: string;
  roleName: string;
  roleDescription: string;
  effectiveType: string;
  effectiveFrom: string;
  effectiveTo: string;
  status: string;
}
export interface UpdateRoleRequestData {
  roleId: number;
  roleCode: string;
  roleName: string;
  roleDescription: string;
  effectiveType: string;
  effectiveFrom: string;
  effectiveTo: string;
  status: string;
}

export interface ArchiveActiveRequest {
  id: number;
}
